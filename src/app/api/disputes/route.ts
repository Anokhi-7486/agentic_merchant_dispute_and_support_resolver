import { NextRequest, NextResponse } from "next/server";
import transactionsData from "../../../../data/transactions.json";
import { Dispute } from "../../../lib/types";

// In-memory store for newly created custom disputes during runtime
const dynamicDisputes: Dispute[] = [...(transactionsData as Dispute[])];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: dynamicDisputes,
    total: dynamicDisputes.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const customData = await req.json();

    const newId = `DISP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTxnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newDispute: Dispute = {
      id: newId,
      transaction_id: newTxnId,
      case_title: customData.case_title || "Custom Merchant Dispute Scenario",
      dispute_category: customData.dispute_category || "ITEM_NOT_RECEIVED",
      amount: Number(customData.amount) || 150.0,
      currency: customData.currency || "USD",
      created_at: new Date().toISOString(),
      status: "UNDER_INVESTIGATION",
      customer: {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        name: customData.customer_name || "Custom Test Customer",
        email: customData.customer_email || "test.customer@fintech.dev",
        account_created: "2023-01-01",
        past_dispute_count: Number(customData.past_dispute_count) || 0,
        billing_address: customData.buyer_address || "100 Market St, San Francisco, CA 94105",
        shipping_address: customData.buyer_address || "100 Market St, San Francisco, CA 94105",
      },
      merchant: {
        id: `MERCH-${Math.floor(1000 + Math.random() * 9000)}`,
        name: customData.merchant_name || "Enterprise Merchant LLC",
        category: "Retail & E-commerce",
        rating: Number(customData.merchant_rating) || 4.9,
        dispute_rate_percentage: Number(customData.dispute_rate_percentage) || 0.25,
        verified_seller: true,
        protection_eligible: true,
      },
      items: [
        {
          sku: "CUSTOM-SKU-001",
          description: customData.item_description || "Custom Order Item",
          quantity: 1,
          unit_price: Number(customData.amount) || 150.0,
        },
      ],
      telemetry: {
        ip_address: "192.168.1.10",
        ip_country: "US",
        ip_region: "CA",
        ip_matches_buyer_address: customData.ip_matches !== false,
        device_fingerprint: "cust-fp-091a",
        device_matches_account_history: true,
        avs_result: customData.avs_result || "Y",
        avs_description:
          customData.avs_result === "Y"
            ? "Full Match: Street Address and 5-digit ZIP match"
            : "Mismatch detected",
        cvv_result: customData.cvv_result || "M",
        cvv_description: "Match: Card CVV matched",
        three_d_secure: {
          enrolled: true,
          authenticated: true,
          eci: "05",
          liability_shifted: true,
        },
      },
      shipping: {
        carrier: customData.carrier || "USPS Priority Mail",
        tracking_number: customData.tracking_number || `9400${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        service_level: "Standard",
        shipped_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        delivered_at:
          customData.delivery_status === "DELIVERED"
            ? new Date(Date.now() - 86400000).toISOString()
            : null,
        delivery_status: customData.delivery_status || "DELIVERED",
        signed_by: customData.signed_by || (customData.signature_present ? "CONFIRMED SIGNATURE" : null),
        signature_required_on_waybill: customData.signature_present || false,
        delivery_gps: {
          latitude: 37.7749,
          longitude: -122.4194,
          accuracy_meters: 5.0,
          matches_recipient_address: true,
        },
        handling_days: 1,
      },
      evidence_dossier: {
        order_confirmation_emailed: true,
        customer_communication_log: [
          {
            timestamp: new Date().toISOString(),
            from: "buyer",
            message: customData.buyer_claim_notes || "Customer filed formal dispute on transaction.",
          },
        ],
      },
    };

    // Prepend so it appears at top of queue
    dynamicDisputes.unshift(newDispute);

    return NextResponse.json({
      success: true,
      data: newDispute,
      message: "Custom dispute created and loaded into queue",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating dispute";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

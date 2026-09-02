import React from 'react';
import { Eye, HelpCircle, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { computeSHAPAttributions } from '../utils/mlEngine';

export default function ExplainabilityView({ inputs }) {
  const shapData = computeSHAPAttributions(inputs);

  // Maximum impact for bar scaling
  const maxImpact = Math.max(...shapData.attributions.map(a => Math.abs(a.impact)), 5.0);

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}>
            <Eye size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Explainable AI (SHAP Feature Attributions)</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Breakdown of positive and negative drivers influencing the predicted outcome</p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#38bdf8',
          background: 'rgba(6, 182, 212, 0.1)',
          padding: '6px 12px',
          borderRadius: '8px',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <Layers size={14} />
          <span>Baseline Score: {shapData.baseline}%</span>
        </div>
      </div>

      {/* SHAP Waterfall / Bar Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {shapData.attributions.map((item, idx) => {
          const isPositive = item.impact >= 0;
          const barWidthPercent = Math.min(100, Math.round((Math.abs(item.impact) / maxImpact) * 100));

          return (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'grid',
                gridTemplateColumns: '160px 100px 1fr 90px',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              {/* Feature Name */}
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>
                {item.feature}
              </span>

              {/* Value & Unit */}
              <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'var(--font-code)' }}>
                {item.value} {item.unit}
              </span>

              {/* Visual Bar representation */}
              <div style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', height: '8px', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  left: isPositive ? '50%' : `${50 - barWidthPercent / 2}%`,
                  width: `${barWidthPercent / 2}%`,
                  height: '100%',
                  background: isPositive ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #f43f5e, #fb7185)',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }} />
              </div>

              {/* Numerical Impact Delta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px',
                fontSize: '13px',
                fontWeight: '700',
                color: isPositive ? '#10b981' : '#f43f5e'
              }}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{isPositive ? `+${item.impact}` : item.impact} pts</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px 16px',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px dashed rgba(255, 255, 255, 0.1)',
        fontSize: '12px',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <HelpCircle size={16} color="#818cf8" />
        <span>
          <strong>Explainability Note:</strong> SHAP values calculate the additive contribution of each factor against the cohort baseline average score ({shapData.baseline}%).
        </span>
      </div>
    </div>
  );
}

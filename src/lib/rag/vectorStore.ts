import policiesData from "../../../data/paypal_merchant_policies.json";
import { Policy, RetrievedPolicyChunk } from "../types";

export interface VectorDocument {
  id: string;
  policy_id: string;
  clause_id: string;
  policy_title: string;
  clause_name: string;
  text: string;
  tags: string[];
  vector: number[];
}

export class MemoryVectorStore {
  private static instance: MemoryVectorStore;
  private documents: VectorDocument[] = [];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  private isIndexed = false;

  private constructor() {
    this.indexPolicies();
  }

  public static getInstance(): MemoryVectorStore {
    if (!MemoryVectorStore.instance) {
      MemoryVectorStore.instance = new MemoryVectorStore();
    }
    return MemoryVectorStore.instance;
  }

  /**
   * Tokenizes text into lowercase normalized alphanumeric tokens, stripping punctuation.
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 1);
  }

  /**
   * Pre-indexes all policy clauses from the local JSON knowledge base.
   */
  private indexPolicies(): void {
    if (this.isIndexed) return;

    const rawDocs: Array<{
      policy_id: string;
      clause_id: string;
      policy_title: string;
      clause_name: string;
      text: string;
      tags: string[];
    }> = [];

    const policies = policiesData as Policy[];
    for (const policy of policies) {
      for (const clause of policy.clauses) {
        const fullContent = `${policy.id} ${policy.title} ${policy.category} ${clause.clause_id} ${clause.name} ${clause.text} ${clause.tags.join(" ")}`;
        rawDocs.push({
          policy_id: policy.id,
          clause_id: clause.clause_id,
          policy_title: policy.title,
          clause_name: clause.name,
          text: clause.text,
          tags: clause.tags,
        });
      }
    }

    // Build vocabulary
    const docTokenFreqs: Array<Map<string, number>> = [];
    const docFreqs = new Map<string, number>();

    rawDocs.forEach((doc) => {
      const tokens = this.tokenize(
        `${doc.policy_id} ${doc.policy_title} ${doc.clause_id} ${doc.clause_name} ${doc.text} ${doc.tags.join(" ")}`
      );
      const tf = new Map<string, number>();
      const seen = new Set<string>();

      tokens.forEach((t) => {
        tf.set(t, (tf.get(t) || 0) + 1);
        if (!seen.has(t)) {
          seen.add(t);
          docFreqs.set(t, (docFreqs.get(t) || 0) + 1);
        }
        if (!this.vocabulary.has(t)) {
          this.vocabulary.set(t, this.vocabulary.size);
        }
      });

      docTokenFreqs.push(tf);
    });

    // Compute IDF
    const N = rawDocs.length;
    docFreqs.forEach((df, term) => {
      this.idf.set(term, Math.log((N + 1) / (df + 1)) + 1);
    });

    // Create normalized TF-IDF vector embeddings for each chunk
    this.documents = rawDocs.map((doc, idx) => {
      const tf = docTokenFreqs[idx];
      const vector = this.embedFromTf(tf);
      return {
        id: `${doc.clause_id}`,
        policy_id: doc.policy_id,
        clause_id: doc.clause_id,
        policy_title: doc.policy_title,
        clause_name: doc.clause_name,
        text: doc.text,
        tags: doc.tags,
        vector,
      };
    });

    this.isIndexed = true;
  }

  private embedFromTf(tf: Map<string, number>): number[] {
    const vec = new Array(this.vocabulary.size).fill(0);
    let sumSq = 0;

    tf.forEach((count, term) => {
      const termIdx = this.vocabulary.get(term);
      const idfVal = this.idf.get(term) || 1;
      if (termIdx !== undefined) {
        const val = count * idfVal;
        vec[termIdx] = val;
        sumSq += val * val;
      }
    });

    // L2 normalize
    const norm = Math.sqrt(sumSq) || 1;
    return vec.map((v) => v / norm);
  }

  /**
   * Generates a vector for arbitrary incoming text/queries.
   */
  public embedText(text: string): number[] {
    const tokens = this.tokenize(text);
    const tf = new Map<string, number>();
    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    return this.embedFromTf(tf);
  }

  /**
   * Cosine similarity between two unit-normalized vectors.
   */
  private cosineSimilarity(v1: number[], v2: number[]): number {
    let dot = 0;
    const len = Math.min(v1.length, v2.length);
    for (let i = 0; i < len; i++) {
      dot += v1[i] * v2[i];
    }
    return Math.max(0, Math.min(1, dot));
  }

  /**
   * Top-K semantic similarity search with hybrid keyword reinforcement.
   */
  public similaritySearch(query: string, topK = 4): RetrievedPolicyChunk[] {
    const queryTokens = this.tokenize(query);
    const queryVec = this.embedText(query);

    const scored = this.documents.map((doc) => {
      const cosSim = this.cosineSimilarity(queryVec, doc.vector);

      // Boost for exact policy ID / tag matches
      let keywordBoost = 0;
      const matchedKeywords: string[] = [];
      const lowerText = `${doc.policy_id} ${doc.clause_id} ${doc.policy_title} ${doc.text}`.toLowerCase();

      queryTokens.forEach((qt) => {
        if (doc.policy_id.toLowerCase().includes(qt)) {
          keywordBoost += 0.25;
          matchedKeywords.push(doc.policy_id);
        } else if (doc.tags.some((tag) => tag.toLowerCase() === qt)) {
          keywordBoost += 0.15;
          matchedKeywords.push(qt);
        } else if (lowerText.includes(qt)) {
          matchedKeywords.push(qt);
        }
      });

      const finalScore = Math.min(0.99, Number((cosSim * 0.75 + Math.min(0.25, keywordBoost)).toFixed(4)));

      return {
        policy_id: doc.policy_id,
        clause_id: doc.clause_id,
        policy_title: doc.policy_title,
        clause_name: doc.clause_name,
        snippet: doc.text,
        similarity_score: finalScore,
        matched_keywords: Array.from(new Set(matchedKeywords)),
      };
    });

    scored.sort((a, b) => b.similarity_score - a.similarity_score);
    return scored.slice(0, topK);
  }

  public getAllPolicies(): Policy[] {
    return policiesData as Policy[];
  }
}

export const vectorStore = MemoryVectorStore.getInstance();

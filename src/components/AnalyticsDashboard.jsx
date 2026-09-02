import React from 'react';
import { PieChart, TrendingUp, BarChart3, Users, Zap, BookMarked } from 'lucide-react';
import studentDataset from '../data/studentDataset.json';
import modelWeights from '../data/modelWeights.json';

export default function AnalyticsDashboard() {
  // Compute grade distribution buckets
  const bA = studentDataset.filter(s => s.final_grade >= 85).length;
  const bB = studentDataset.filter(s => s.final_grade >= 70 && s.final_grade < 85).length;
  const bC = studentDataset.filter(s => s.final_grade >= 58 && s.final_grade < 70).length;
  const bD = studentDataset.filter(s => s.final_grade < 58).length;

  const total = studentDataset.length;

  // Feature Importance weights from model training
  const featureWeights = modelWeights.feature_importance || [];

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Cohort Analytics & Exploratory Data Dashboard</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Statistical telemetry and feature impact distributions across student population</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Grade Distribution Histogram */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={16} color="#38bdf8" />
            <span>Grade Distribution Buckets</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Grade A/A+ */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                <span style={{ color: '#34d399' }}>Grade A/A+ (&ge;85%)</span>
                <span>{bA} students ({Math.round(bA / total * 100)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(bA / total) * 100}%`, height: '100%', background: '#34d399' }} />
              </div>
            </div>

            {/* Grade B */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                <span style={{ color: '#38bdf8' }}>Grade B (70-84%)</span>
                <span>{bB} students ({Math.round(bB / total * 100)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(bB / total) * 100}%`, height: '100%', background: '#38bdf8' }} />
              </div>
            </div>

            {/* Grade C */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                <span style={{ color: '#f59e0b' }}>Grade C (58-69%)</span>
                <span>{bC} students ({Math.round(bC / total * 100)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(bC / total) * 100}%`, height: '100%', background: '#f59e0b' }} />
              </div>
            </div>

            {/* Grade D/F */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                <span style={{ color: '#f43f5e' }}>Grade D/F (&lt;58%)</span>
                <span>{bD} students ({Math.round(bD / total * 100)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(bD / total) * 100}%`, height: '100%', background: '#f43f5e' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Global Feature Importance Leaderboard */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="#818cf8" />
            <span>Global Feature Weight Ranking</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {featureWeights.slice(0, 5).map((f, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(99, 102, 241, 0.2)',
                    color: '#818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '11px'
                  }}>
                    {idx + 1}
                  </span>
                  <span style={{ color: '#cbd5e1', fontWeight: '600' }}>{f.feature}</span>
                </div>

                <span style={{ fontFamily: 'var(--font-code)', color: '#818cf8', fontWeight: '600' }}>
                  {(f.weight * 100).toFixed(1)}% weight
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

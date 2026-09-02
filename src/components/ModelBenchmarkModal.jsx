import React from 'react';
import { X, Award, Check, Cpu, CheckCircle2 } from 'lucide-react';
import modelWeights from '../data/modelWeights.json';

export default function ModelBenchmarkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const benchmarks = modelWeights.benchmarks || [];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(3, 7, 18, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
              <Award size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800' }}>ML Model Benchmarking & Diagnostics</h2>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>Comparative evaluation across ensemble, linear, and tree-based models</p>
            </div>
          </div>

          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px', borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Metrics Table */}
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
                <th style={{ padding: '12px 14px' }}>Model Algorithm</th>
                <th style={{ padding: '12px 14px' }}>Model Type</th>
                <th style={{ padding: '12px 14px' }}>R&sup2; Score</th>
                <th style={{ padding: '12px 14px' }}>RMSE</th>
                <th style={{ padding: '12px 14px' }}>MAE</th>
                <th style={{ padding: '12px 14px' }}>Risk Acc</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((b, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    background: b.is_best ? 'rgba(99, 102, 241, 0.08)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '14px', fontWeight: '700', color: b.is_best ? '#818cf8' : '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {b.name}
                    {b.is_best && (
                      <span style={{ fontSize: '10px', background: '#6366f1', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
                        PRIMARY
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px', color: '#94a3b8' }}>{b.type}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-code)', fontWeight: '600', color: '#38bdf8' }}>{b.r2}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-code)' }}>{b.rmse}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-code)' }}>{b.mae}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-code)', color: '#10b981', fontWeight: '700' }}>{b.accuracy_cls}</td>
                  <td style={{ padding: '14px' }}>
                    {b.is_best ? (
                      <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600' }}>
                        <CheckCircle2 size={14} /> Production
                      </span>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '12px' }}>Evaluated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technical Rigor Highlights */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '18px'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#cbd5e1', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} color="#06b6d4" />
            <span>Cross-Validation & Hyperparameter Tuning Protocol</span>
          </h4>
          <ul style={{ fontSize: '12px', color: '#94a3b8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>5-Fold Stratified Cross-Validation:</strong> Prevents data leakage and ensures robust generalization score across high/low risk student subgroups.</li>
            <li><strong>Feature Standardization:</strong> Zero-mean unit-variance scaling applied to continuous attributes (`study_hours`, `quiz_scores`, `attendance_pct`).</li>
            <li><strong>GridSearchCV Optimization:</strong> Hyperparameters tuned for tree depth, learning rate (0.05), and L2 regularization penalties.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

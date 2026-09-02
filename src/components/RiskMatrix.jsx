import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, UserX, ArrowRight, Activity } from 'lucide-react';
import studentDataset from '../data/studentDataset.json';

export default function RiskMatrix({ currentInputs, onSelectStudent }) {
  // Compute risk statistics across sample dataset
  const totalStudents = studentDataset.length;
  const highRiskCount = studentDataset.filter(s => s.risk_level === 'High').length;
  const modRiskCount = studentDataset.filter(s => s.risk_level === 'Moderate').length;
  const lowRiskCount = studentDataset.filter(s => s.risk_level === 'Low').length;

  const highRiskPct = Math.round((highRiskCount / totalStudents) * 100);
  const modRiskPct = Math.round((modRiskCount / totalStudents) * 100);
  const lowRiskPct = Math.round((lowRiskCount / totalStudents) * 100);

  // Top 4 High Risk students for early intervention list
  const flaggedStudents = studentDataset
    .filter(s => s.risk_level === 'High')
    .slice(0, 4);

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#f43f5e' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Student At-Risk Early Warning Matrix</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Automated cohort triage & dropout prevention triggers</p>
          </div>
        </div>

        <span style={{ fontSize: '12px', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '4px 10px', borderRadius: '6px' }}>
          Active Cohort: {totalStudents} Students
        </span>
      </div>

      {/* Cohort Risk Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* High Risk Card */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#ef4444' }}>{highRiskCount}</span>
            <span style={{ fontSize: '12px', color: '#fca5a5', marginLeft: '6px' }}>({highRiskPct}%)</span>
            <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>High Risk Tier (&lt;58%)</p>
          </div>
        </div>

        {/* Moderate Risk Card */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
            <Activity size={22} />
          </div>
          <div>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b' }}>{modRiskCount}</span>
            <span style={{ fontSize: '12px', color: '#fcd34d', marginLeft: '6px' }}>({modRiskPct}%)</span>
            <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Moderate Risk (58-74%)</p>
          </div>
        </div>

        {/* Low Risk Card */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>{lowRiskCount}</span>
            <span style={{ fontSize: '12px', color: '#6ee7b7', marginLeft: '6px' }}>({lowRiskPct}%)</span>
            <p style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Low Risk Tier (&ge;75%)</p>
          </div>
        </div>
      </div>

      {/* Flagged Students List for Immediate Intervention */}
      <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#cbd5e1', marginBottom: '12px' }}>
        Priority Intervention Action Feed (Flagged Cohort Sample)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
        {flaggedStudents.map((student, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                  <UserX size={14} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc' }}>{student.id}</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#ef4444' }}>
                {student.final_grade}%
              </span>
            </div>

            <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', gap: '12px' }}>
              <span>Att: <strong style={{ color: '#e2e8f0' }}>{student.attendance_pct}%</strong></span>
              <span>Study: <strong style={{ color: '#e2e8f0' }}>{student.study_hours} hrs</strong></span>
              <span>GPA: <strong style={{ color: '#e2e8f0' }}>{student.past_gpa}</strong></span>
            </div>

            <button
              onClick={() => onSelectStudent(student)}
              className="btn-secondary"
              style={{ padding: '4px 10px', fontSize: '11px', justifyContent: 'center', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <span>Load Profile into Simulator</span>
              <ArrowRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

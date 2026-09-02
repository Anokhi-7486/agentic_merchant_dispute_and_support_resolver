import React from 'react';
import { Brain, GitBranch, ShieldCheck, Sparkles, BarChart2, Compass, Github } from 'lucide-react';

export default function Navbar({ onOpenBenchmarks, onOpenStudyPath }) {
  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Model Version */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Brain size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em' }} className="gradient-text">
                EduPredict AI
              </h1>
              <span style={{
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#818cf8',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                fontSize: '11px',
                fontWeight: '600',
                padding: '2px 8px',
                borderRadius: '20px'
              }}>
                v1.4.2 Enterprise
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Student Performance Prediction & Explainable AI Engine
            </p>
          </div>
        </div>

        {/* Status Indicators & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Vercel Status Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            color: '#10b981',
            fontWeight: '600'
          }}>
            <ShieldCheck size={14} />
            <span>Vercel Serverless Ready (94.2% Acc)</span>
          </div>

          {/* Action Buttons */}
          <button onClick={onOpenBenchmarks} className="btn-secondary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <BarChart2 size={15} color="#818cf8" />
            <span>Model Benchmarks</span>
          </button>

          <button onClick={onOpenStudyPath} className="btn-primary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <Compass size={15} color="#fff" />
            <span>AI Study Path</span>
          </button>

          <a
            href="https://github.com/Anokhi-7486/student_performance_analysis"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '8px 12px', textDecoration: 'none' }}
            title="View Source on GitHub"
          >
            <Github size={16} color="#f8fafc" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

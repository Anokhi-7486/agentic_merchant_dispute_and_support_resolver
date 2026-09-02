import React from 'react';
import { X, Compass, CheckCircle2, Clock, Calendar, BookOpen, Sparkles, Award } from 'lucide-react';
import { generateAIStudyPath, predictGrade } from '../utils/mlEngine';

export default function AIStudyPathModal({ isOpen, onClose, inputs }) {
  if (!isOpen) return null;

  const currentGrade = predictGrade(inputs);
  const pathItems = generateAIStudyPath(inputs, currentGrade);

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
        maxWidth: '750px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              <Compass size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800' }}>AI Personalized Learning Roadmap</h2>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>Targeted intervention steps based on identified academic bottlenecks</p>
            </div>
          </div>

          <button onClick={onClose} className="btn-secondary" style={{ padding: '8px', borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Grade Summary Box */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div>
            <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Trajectory</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>{currentGrade}% Score Target</div>
          </div>
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#34d399',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={14} />
            <span>Target: &ge;85.0%</span>
          </div>
        </div>

        {/* Recommendation Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {pathItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '18px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                padding: '10px',
                borderRadius: '10px',
                background: item.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                color: item.priority === 'HIGH' ? '#f43f5e' : '#818cf8'
              }}>
                <BookOpen size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#f8fafc' }}>{item.topic}</h4>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: item.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                    color: item.priority === 'HIGH' ? '#ef4444' : '#818cf8'
                  }}>
                    {item.priority} PRIORITY
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

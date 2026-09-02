import React from 'react';
import { Sliders, RotateCcw, TrendingUp, AlertTriangle, CheckCircle, Flame, Clock, BookOpen, UserCheck } from 'lucide-react';
import { predictGrade, classifyRisk } from '../utils/mlEngine';

export default function PredictorCard({ inputs, setInputs, baselineScore }) {
  const currentPredicted = predictGrade(inputs);
  const riskInfo = classifyRisk(currentPredicted);
  const delta = Math.round((currentPredicted - baselineScore) * 10) / 10;

  const handleSliderChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleReset = () => {
    setInputs({
      study_hours: 18,
      attendance_pct: 82,
      past_gpa: 3.1,
      sleep_hours: 7.0,
      screen_time_hours: 4.5,
      quiz_scores_avg: 76,
      online_courses: 1,
      extracurricular: 1,
      stress_level: 5
    });
  };

  const getLetterStyle = (grade) => {
    if (grade >= 90) return { letter: 'A+', color: '#10b981' };
    if (grade >= 80) return { letter: 'A', color: '#34d399' };
    if (grade >= 70) return { letter: 'B', color: '#38bdf8' };
    if (grade >= 60) return { letter: 'C', color: '#f59e0b' };
    if (grade >= 50) return { letter: 'D', color: '#fb923c' };
    return { letter: 'F', color: '#ef4444' };
  };

  const letterData = getLetterStyle(currentPredicted);

  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <Sliders size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>What-If Simulation Studio</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>Adjust student behavioral sliders to simulate performance changes</p>
          </div>
        </div>

        <button onClick={handleReset} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
          <RotateCcw size={14} />
          <span>Reset Sliders</span>
        </button>
      </div>

      {/* Main Grid: Prediction Score vs Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {/* Prediction Display Panel */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Glow Circle */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: riskInfo.color,
            filter: 'blur(80px)',
            opacity: 0.15,
            pointerEvents: 'none'
          }} />

          <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Predicted Final Score
          </span>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '14px 0 8px 0' }}>
            <span style={{ fontSize: '56px', fontWeight: '800', letterSpacing: '-0.03em', color: '#f8fafc' }}>
              {currentPredicted}%
            </span>
            <span style={{ fontSize: '28px', fontWeight: '800', color: letterData.color }}>
              ({letterData.letter})
            </span>
          </div>

          {/* Delta Indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: '600',
            color: delta >= 0 ? '#10b981' : '#ef4444',
            background: delta >= 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            padding: '4px 12px',
            borderRadius: '20px',
            marginBottom: '16px'
          }}>
            <TrendingUp size={14} style={{ transform: delta < 0 ? 'rotate(180deg)' : 'none' }} />
            <span>{delta >= 0 ? `+${delta}% shift from baseline` : `${delta}% shift from baseline`}</span>
          </div>

          {/* Risk Level Badge */}
          <div style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '10px',
            background: riskInfo.bg,
            border: `1px solid ${riskInfo.border}`,
            color: riskInfo.color,
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {riskInfo.level === 'High Risk' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
            <span>{riskInfo.badge}</span>
          </div>

          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px', lineHeight: '1.4' }}>
            {riskInfo.action}
          </p>
        </div>

        {/* Sliders Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Attendance % */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Attendance Rate</span>
              <span style={{ color: '#38bdf8' }}>{inputs.attendance_pct}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="1"
              value={inputs.attendance_pct}
              onChange={e => handleSliderChange('attendance_pct', e.target.value)}
            />
          </div>

          {/* Study Hours / Week */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Study Hours/Wk</span>
              <span style={{ color: '#818cf8' }}>{inputs.study_hours} hrs</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="0.5"
              value={inputs.study_hours}
              onChange={e => handleSliderChange('study_hours', e.target.value)}
            />
          </div>

          {/* Past GPA */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Past GPA</span>
              <span style={{ color: '#34d399' }}>{inputs.past_gpa} / 4.0</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.05"
              value={inputs.past_gpa}
              onChange={e => handleSliderChange('past_gpa', e.target.value)}
            />
          </div>

          {/* Quiz Score Avg */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Quiz/Assignment Avg</span>
              <span style={{ color: '#c084fc' }}>{inputs.quiz_scores_avg}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={inputs.quiz_scores_avg}
              onChange={e => handleSliderChange('quiz_scores_avg', e.target.value)}
            />
          </div>

          {/* Sleep Hours */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Sleep / Night</span>
              <span style={{ color: '#38bdf8' }}>{inputs.sleep_hours} hrs</span>
            </div>
            <input
              type="range"
              min="3.5"
              max="10.0"
              step="0.5"
              value={inputs.sleep_hours}
              onChange={e => handleSliderChange('sleep_hours', e.target.value)}
            />
          </div>

          {/* Screen Time Hours */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Screen Time/Day</span>
              <span style={{ color: '#fb923c' }}>{inputs.screen_time_hours} hrs</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="12.0"
              step="0.5"
              value={inputs.screen_time_hours}
              onChange={e => handleSliderChange('screen_time_hours', e.target.value)}
            />
          </div>

          {/* Stress Index */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1' }}>Self-Reported Stress Level (1-10)</span>
              <span style={{ color: inputs.stress_level > 6 ? '#ef4444' : '#10b981' }}>{inputs.stress_level} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={inputs.stress_level}
              onChange={e => handleSliderChange('stress_level', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PredictorCard from './components/PredictorCard';
import ExplainabilityView from './components/ExplainabilityView';
import RiskMatrix from './components/RiskMatrix';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ModelBenchmarkModal from './components/ModelBenchmarkModal';
import AIStudyPathModal from './components/AIStudyPathModal';
import { predictGrade } from './utils/mlEngine';
import { Sparkles, Github, BookOpen, Award, Layers } from 'lucide-react';

export default function App() {
  const [inputs, setInputs] = useState({
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

  const [isBenchmarksOpen, setIsBenchmarksOpen] = useState(false);
  const [isStudyPathOpen, setIsStudyPathOpen] = useState(false);

  const baselineScore = 78.5; // Baseline cohort benchmark

  const handleSelectStudentFromRiskMatrix = (student) => {
    setInputs({
      study_hours: student.study_hours,
      attendance_pct: student.attendance_pct,
      past_gpa: student.past_gpa,
      sleep_hours: student.sleep_hours,
      screen_time_hours: student.screen_time_hours,
      quiz_scores_avg: student.quiz_scores_avg,
      online_courses: student.online_courses,
      extracurricular: student.extracurricular,
      stress_level: student.stress_level
    });

    // Smooth scroll back up to simulator
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        onOpenBenchmarks={() => setIsBenchmarksOpen(true)}
        onOpenStudyPath={() => setIsStudyPathOpen(true)}
      />

      {/* Hero Banner Section */}
      <section style={{ padding: '32px 24px 16px 24px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '16px',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} color="#818cf8" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#818cf8', letterSpacing: '0.5px' }}>
                ENTERPRISE MACHINE LEARNING PLATFORM (15-20 LPA resume standard)
              </span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px' }} className="gradient-text">
              Predict Student Academic Trajectories & Diagnose At-Risk Cohorts
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '800px' }}>
              Powered by multi-model ensemble algorithms (XGBoost logic, Random Forest, Ridge Regression), real-time counterfactual simulation, and Explainable AI (SHAP feature attribution).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '10px 16px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Dataset Records</span>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8' }}>3,000+</div>
            </div>

            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '10px 16px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Primary Model R&sup2;</span>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#10b981' }}>0.924</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main style={{ padding: '0 24px 48px 24px', maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Row 1: Predictor Simulator & Explainability */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
          <PredictorCard
            inputs={inputs}
            setInputs={setInputs}
            baselineScore={baselineScore}
          />
          <ExplainabilityView inputs={inputs} />
        </div>

        {/* Row 2: At-Risk Early Warning Matrix */}
        <RiskMatrix
          currentInputs={inputs}
          onSelectStudent={handleSelectStudentFromRiskMatrix}
        />

        {/* Row 3: Cohort Analytics Dashboard */}
        <AnalyticsDashboard />
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        background: 'rgba(15, 23, 42, 0.8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#94a3b8'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            Student Performance Analysis & Prediction Engine &copy; 2026. Designed for 15-20 LPA Engineering Roles.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://github.com/Anokhi-7486/student_performance_analysis"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#818cf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Github size={14} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ModelBenchmarkModal
        isOpen={isBenchmarksOpen}
        onClose={() => setIsBenchmarksOpen(false)}
      />
      <AIStudyPathModal
        isOpen={isStudyPathOpen}
        onClose={() => setIsStudyPathOpen(false)}
        inputs={inputs}
      />
    </div>
  );
}

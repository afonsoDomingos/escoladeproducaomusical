import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  CreditCard, 
  ArrowRight, 
  Filter,
  Sparkles
} from 'lucide-react';

export const CoursesPage = ({ onSelectCourse, setActivePage, onOpenPayment }) => {
  const { courses } = useDatabase();
  const { canAccessPremium } = useAuth();
  const [filterCategory, setFilterCategory] = useState('Todos');

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '80vh', padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
            Grade Curricular de Elite
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', color: 'var(--purple-950)', fontWeight: 800 }}>
            Catálogo de Cursos & Formações
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Cursos estruturados passo a passo para você dominar as DAWs, plugins e técnicas que definem os maiores sucessos musicais do mercado.
          </p>
        </div>

        {/* 1.500 MT ALL-ACCESS BANNER */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--purple-300)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px 32px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
              }}
            >
              <Sparkles size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--purple-950)' }}>
                Passaporte Total: Todos os Cursos por Apenas 1.500 MT
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Uma única inscrição dá acesso ilimitado a todos os cursos, atualizações futuras, plugins e aulas ao vivo.
              </div>
            </div>
          </div>

          <button onClick={onOpenPayment} className="btn btn-gold btn-lg" style={{ fontWeight: 800 }}>
            <CreditCard size={18} /> Inscrever-se Agora
          </button>
        </div>

        {/* COURSES LIST */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
          {courses.map((course) => {
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

            return (
              <div
                key={course.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '220px' }}>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFF',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {course.level}
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px',
                        backgroundColor: '#FFFFFF',
                        color: 'var(--purple-900)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Star size={12} fill="#F59E0B" color="#F59E0B" /> {course.rating} (5.0)
                    </div>
                  </div>

                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} /> {course.duration}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <BookOpen size={14} /> {course.modules.length} Módulos ({totalLessons} Aulas)
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)', marginBottom: '10px' }}>
                      {course.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {course.shortDescription}
                    </p>

                    {/* MODULES LIST PREVIEW */}
                    <div style={{ backgroundColor: 'var(--purple-50)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--purple-900)', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Ementa Resumida:
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-body)' }}>
                        {course.modules.slice(0, 3).map((m, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={12} color="var(--purple-600)" /> {m.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--purple-200)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          color: 'var(--purple-900)',
                          fontSize: '0.8rem'
                        }}
                      >
                        SJ
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Instrutor</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>{course.instructor}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Valor</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--purple-800)' }}>1.500 MT</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => {
                        onSelectCourse(course);
                        setActivePage('curso-detalhe');
                      }}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      Acessar Curso & Aulas <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

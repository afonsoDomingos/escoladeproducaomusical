import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  BookOpen, 
  Award, 
  PlayCircle, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  Users, 
  FileText, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const CourseDetailPage = ({ course, onOpenPayment, onStartClassroom, setActivePage }) => {
  const { canAccessPremium } = useAuth();

  if (!course) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Nenhum curso selecionado</h2>
        <button onClick={() => setActivePage('cursos')} className="btn btn-primary" style={{ marginTop: '16px' }}>
          Voltar aos Cursos
        </button>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '80vh', padding: '30px 0 80px' }}>
      <div className="container">
        
        {/* BACK LINK */}
        <button
          onClick={() => setActivePage('cursos')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--purple-700)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          <ArrowLeft size={18} /> Voltar ao Catálogo de Cursos
        </button>

        {/* HERO BANNER CARD */}
        <div
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: '40px',
            border: '1px solid var(--border-purple)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '0'
            }}
          >
            {/* TEXT INFO */}
            <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="badge badge-purple">{course.level}</span>
                  <span className="badge badge-gold">Certificado Incluso</span>
                </div>

                <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--purple-950)', fontWeight: 900, marginBottom: '14px' }}>
                  {course.title}
                </h1>

                <p style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {course.description}
                </p>

                {/* META INFO */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <Clock size={16} color="var(--purple-600)" />
                    <span>{course.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <BookOpen size={16} color="var(--purple-600)" />
                    <span>{course.modules.length} Módulos ({totalLessons} Aulas)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <Users size={16} color="var(--purple-600)" />
                    <span>{course.studentsCount} Alunos Matriculados</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                <button
                  onClick={() => onStartClassroom(course)}
                  className="btn btn-primary btn-lg"
                  style={{ fontWeight: 700 }}
                >
                  <PlayCircle size={20} /> Entrar na Sala de Aula
                </button>

                {!canAccessPremium() && (
                  <button
                    onClick={onOpenPayment}
                    className="btn btn-gold btn-lg"
                    style={{ fontWeight: 700 }}
                  >
                    <CreditCard size={20} /> Desbloquear por 1.500 MT
                  </button>
                )}
              </div>
            </div>

            {/* THUMBNAIL COVER */}
            <div style={{ minHeight: '300px', position: 'relative' }}>
              <img
                src={course.thumbnail}
                alt={course.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* SYLLABUS & MODULES BREAKDOWN */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '32px' }}>
          
          {/* CURRICULUM MODULES */}
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', marginBottom: '20px', fontWeight: 800 }}>
              Conteúdo Programático Completo
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {course.modules.map((mod, mIdx) => (
                <div
                  key={mod.id}
                  className="card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-purple)'
                  }}
                >
                  <div
                    style={{
                      padding: '16px 20px',
                      backgroundColor: 'var(--purple-50)',
                      borderBottom: '1px solid var(--border-purple)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--purple-950)', fontSize: '1.05rem' }}>
                      {mod.title}
                    </div>
                    <span className="badge badge-purple">{mod.lessons.length} Aulas</span>
                  </div>

                  <div style={{ padding: '12px 16px' }}>
                    {mod.lessons.map((lesson, lIdx) => {
                      const isFree = lesson.isFree;
                      const hasAccess = isFree || canAccessPremium();

                      return (
                        <div
                          key={lesson.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px',
                            borderBottom: lIdx === mod.lessons.length - 1 ? 'none' : '1px solid var(--border-light)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {hasAccess ? (
                              <PlayCircle size={18} color="var(--purple-700)" />
                            ) : (
                              <Lock size={18} color="#EF4444" />
                            )}
                            <div>
                              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                                {lesson.title}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                {lesson.description?.substring(0, 80)}...
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>
                              {lesson.duration}
                            </span>
                            {isFree ? (
                              <span className="badge badge-green">Grátis</span>
                            ) : !canAccessPremium() ? (
                              <span className="badge badge-red">Premium 🔒</span>
                            ) : (
                              <span className="badge badge-purple">Liberada</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INSTRUCTOR & BENEFIT SIDEBAR */}
          <div>
            {/* INSTRUCTOR CARD */}
            <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--purple-700)', textTransform: 'uppercase', marginBottom: '14px' }}>
                Seu Professor & Mentor
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--purple-400)' }}
                />
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem' }}>{course.instructor}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{course.instructorRole}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Produtor musical com mais de 8 anos de experiência em estúdio, responsável por produções e masterizações no mercado de Moçambique e internacional.
              </p>
            </div>

            {/* WHAT'S INCLUDED */}
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--purple-50)', border: '1.5px solid var(--purple-200)' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--purple-950)', marginBottom: '14px', fontWeight: 800 }}>
                Esta inscrição inclui:
              </h4>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> {course.duration} de videoaulas em HD
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Arquivos de projeto (FLP / Ableton) para download
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Acesso aos canais de dúvidas com o mentor
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Certificado de conclusão nominal autenticado
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Acesso vitalício na plataforma
                </li>
              </ul>

              <button
                onClick={() => onStartClassroom(course)}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
              >
                Assistir Aulas do Curso
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

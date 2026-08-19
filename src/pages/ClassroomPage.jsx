import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { 
  Play, 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  FileText, 
  Lock, 
  CreditCard, 
  Award, 
  Sparkles, 
  ArrowLeft,
  BookOpen,
  Volume2,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ClassroomPage = ({ course, initialLessonId, onOpenPayment, setActivePage, onOpenCertificate }) => {
  const { currentUser, canAccessPremium, toggleLessonProgress, isLessonCompleted } = useAuth();
  const { generateCertificate } = useDatabase();

  // Find all lessons flattened for easy navigation
  const allLessons = (course?.modules || []).flatMap(m => m.lessons);
  const [currentLessonId, setCurrentLessonId] = useState(
    initialLessonId || allLessons[0]?.id || null
  );

  if (!course || allLessons.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Nenhuma aula encontrada para este curso.</h2>
        <button onClick={() => setActivePage('cursos')} className="btn btn-primary" style={{ marginTop: '16px' }}>
          Voltar aos Cursos
        </button>
      </div>
    );
  }

  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0];
  
  // Completed lessons calculation
  const completedCount = allLessons.filter(l => isLessonCompleted(l.id)).length;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);
  const isAllCompleted = progressPercent === 100;

  const isCurrentLessonLocked = !currentLesson.isFree && !canAccessPremium();

  const handleNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentLessonIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonId(allLessons[currentLessonIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleComplete = () => {
    toggleLessonProgress(currentLesson.id);
    // If completes the whole course, trigger celebratory effects
    if (!isLessonCompleted(currentLesson.id) && completedCount + 1 === allLessons.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleClaimCertificate = () => {
    const cert = generateCertificate(course.id, currentUser?.name, currentUser?.id);
    onOpenCertificate(cert);
  };

  return (
    <div style={{ backgroundColor: '#FAF8FF', minHeight: '90vh', padding: '24px 0 80px' }}>
      <div className="container">
        
        {/* TOP BAR BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setActivePage('curso-detalhe')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--purple-700)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} /> Voltar aos Detalhes do Curso
          </button>

          {/* PROGRESS SUMMARY BADGE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Progresso do Curso: <strong>{progressPercent}% Concluído</strong> ({completedCount}/{allLessons.length} Aulas)
            </div>

            {isAllCompleted && (
              <button
                onClick={handleClaimCertificate}
                className="btn btn-gold btn-sm"
                style={{ fontWeight: 700 }}
              >
                <Award size={16} /> Ver Certificado
              </button>
            )}
          </div>
        </div>

        {/* MAIN CLASSROOM WORKSPACE */}
        <div className="grid-split-layout">
          {/* LEFT: VIDEO PLAYER & LESSON CONTENT */}

          <div>
            {/* VIDEO CONTAINER OR LOCKED COVER */}
            <div
              style={{
                backgroundColor: '#0F172A',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                border: '2px solid var(--purple-300)',
                position: 'relative',
                minHeight: '440px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isCurrentLessonLocked ? (
                <div style={{ textAlign: 'center', padding: '40px 24px', color: '#FFFFFF', maxWidth: '500px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      border: '2px solid #EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <Lock size={32} color="#EF4444" />
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                    🔒 Conteúdo Exclusivo para Alunos Inscritos
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '24px', lineHeight: 1.5 }}>
                    Esta aula é restrita a alunos com inscrição confirmada. Inscreva-se hoje por apenas 1.500 MT e desbloqueie acesso total a todas as aulas, plugins e suporte.
                  </p>

                  <button
                    onClick={onOpenPayment}
                    className="btn btn-gold btn-lg"
                    style={{ fontWeight: 800 }}
                  >
                    <CreditCard size={18} /> Inscrever-me por 1.500 MT
                  </button>
                </div>
              ) : (
                <video
                  key={currentLesson.id}
                  controls
                  autoPlay
                  poster={course.thumbnail}
                  style={{ width: '100%', height: 'auto', maxHeight: '520px', display: 'block' }}
                >
                  <source src={currentLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              )}
            </div>

            {/* CONTROLS & MARK AS COMPLETED BAR */}
            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handlePrevLesson}
                  disabled={currentLessonIndex === 0}
                  className="btn btn-secondary btn-sm"
                  style={{ opacity: currentLessonIndex === 0 ? 0.5 : 1 }}
                >
                  <ChevronLeft size={16} /> Aula Anterior
                </button>

                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className="btn btn-secondary btn-sm"
                  style={{ opacity: currentLessonIndex === allLessons.length - 1 ? 0.5 : 1 }}
                >
                  Próxima Aula <ChevronRight size={16} />
                </button>
              </div>

              {currentUser && (
                <button
                  onClick={handleToggleComplete}
                  className="btn"
                  style={{
                    backgroundColor: isLessonCompleted(currentLesson.id) ? 'var(--emerald-50)' : 'var(--purple-50)',
                    color: isLessonCompleted(currentLesson.id) ? 'var(--emerald-600)' : 'var(--purple-700)',
                    border: `1.5px solid ${isLessonCompleted(currentLesson.id) ? '#10B981' : 'var(--purple-300)'}`
                  }}
                >
                  {isLessonCompleted(currentLesson.id) ? (
                    <>
                      <CheckCircle size={18} color="#10B981" /> Aula Concluída
                    </>
                  ) : (
                    <>
                      <Circle size={18} /> Marcar como Concluída
                    </>
                  )}
                </button>
              )}
            </div>

            {/* LESSON DETAILS & MATERIALS TAB */}
            <div className="card" style={{ padding: '28px', marginTop: '24px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', fontWeight: 800 }}>
                  {currentLesson.title}
                </h2>
                <span className="badge badge-purple">{currentLesson.duration}</span>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                {currentLesson.description}
              </p>

              {/* MATERIALS DOWNLOAD SECTION */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--purple-950)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={16} color="var(--purple-700)" />
                  Materiais e Arquivos desta Aula:
                </h4>

                {currentLesson.materials && currentLesson.materials.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentLesson.materials.map((mat, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          backgroundColor: 'var(--purple-50)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--purple-200)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={18} color="var(--purple-700)" />
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--purple-950)' }}>{mat.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mat.size}</div>
                          </div>
                        </div>

                        {canAccessPremium() || currentLesson.isFree ? (
                          <a
                            href="#download"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Download de "${mat.name}" iniciado!`);
                            }}
                            className="btn btn-sm btn-primary"
                          >
                            <Download size={14} /> Baixar Arquivo
                          </a>
                        ) : (
                          <span className="badge badge-red">🔒 Exclusivo Alunos</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Esta aula não contém arquivos anexos complementares.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: COURSE CURRICULUM SIDEBAR */}
          <div>
            <div
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                position: 'sticky',
                top: '96px',
                border: '1px solid var(--border-purple)'
              }}
            >
              {/* PROGRESS BAR */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--purple-950)', marginBottom: '6px' }}>
                  <span>Progresso do Curso</span>
                  <span>{progressPercent}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--purple-100)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      backgroundColor: progressPercent === 100 ? '#10B981' : 'var(--purple-600)',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', color: 'var(--purple-950)', marginBottom: '12px', fontWeight: 800 }}>
                Conteúdo do Curso
              </h4>

              {/* MODULES ACCORDION */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto', paddingRight: '4px' }}>
                {course.modules.map((mod) => (
                  <div key={mod.id} style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <div
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--purple-50)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--purple-900)'
                      }}
                    >
                      {mod.title}
                    </div>

                    <div style={{ padding: '6px' }}>
                      {mod.lessons.map((lesson) => {
                        const isCurrent = lesson.id === currentLesson.id;
                        const isDone = isLessonCompleted(lesson.id);
                        const isLocked = !lesson.isFree && !canAccessPremium();

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => {
                              setCurrentLessonId(lesson.id);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            style={{
                              padding: '10px 10px',
                              borderRadius: '6px',
                              backgroundColor: isCurrent ? 'var(--purple-100)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              marginBottom: '2px',
                              transition: 'all 0.15s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                              {isDone ? (
                                <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0 }} />
                              ) : isLocked ? (
                                <Lock size={15} color="#EF4444" style={{ flexShrink: 0 }} />
                              ) : (
                                <Play size={15} color={isCurrent ? "var(--purple-700)" : "var(--text-light)"} style={{ flexShrink: 0 }} />
                              )}
                              <span
                                style={{
                                  fontSize: '0.8rem',
                                  fontWeight: isCurrent ? 700 : 500,
                                  color: isCurrent ? 'var(--purple-950)' : isLocked ? 'var(--text-muted)' : 'var(--text-main)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {lesson.title}
                              </span>
                            </div>

                            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginLeft: '6px' }}>
                              {lesson.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* CLAIM CERTIFICATE BUTTON */}
              {isAllCompleted && (
                <div style={{ marginTop: '16px' }}>
                  <button
                    onClick={handleClaimCertificate}
                    className="btn btn-gold"
                    style={{ width: '100%', padding: '10px' }}
                  >
                    <Award size={18} /> Emitir Certificado Oficial
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

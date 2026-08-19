import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { 
  Play, 
  Lock, 
  Download, 
  CreditCard, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { AudioWaveVisualizer } from '../components/audio/AudioWaveVisualizer';


export const FreeLessonPage = ({ onOpenPayment }) => {
  const { canAccessPremium } = useAuth();
  const { courses } = useDatabase();

  const beatMakerCourse = courses.find(c => c.id === 'curso-beat-maker') || courses[0];
  const freeLesson = beatMakerCourse?.modules[0]?.lessons[0];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '80vh', padding: '36px 0 80px' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ marginBottom: '24px' }}>
          <span className="badge badge-dark" style={{ marginBottom: '8px' }}>
            Aula Gratuita
          </span>
          <h1 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)', color: '#000000', fontWeight: 800 }}>
            {freeLesson?.title || "Aula 1: Introdução ao Beat Making & Setup do Estúdio"}
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#666666' }}>
            Assista gratuitamente a esta aula inaugural ministrada por <strong>Silva Jermane</strong>.
          </p>
        </div>

        <div className="grid-split-layout">
          {/* MAIN VIDEO & DETAILS */}

          <div>
            {/* VIDEO PLAYER CONTAINER */}
            <div
              style={{
                backgroundColor: '#000000',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid #E5E5E5'
              }}
            >
              <video
                controls
                poster="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                style={{ width: '100%', height: 'auto', maxHeight: '480px', display: 'block' }}
              >
                <source src={freeLesson?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
                Seu navegador não suporta reprodução de vídeos.
              </video>

              {/* LIVE AUDIO WAVEFORM MONITOR UNDER VIDEO */}
              <div style={{ backgroundColor: '#09090B', padding: '8px 14px', borderTop: '1px solid #27272A', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#A1A1AA', whiteSpace: 'nowrap' }}>
                  ● WAVEFORM MONITOR
                </span>
                <div style={{ flex: 1 }}>
                  <AudioWaveVisualizer isPlaying={true} height={20} barCount={40} color="#FFFFFF" />
                </div>
              </div>
            </div>


            {/* LESSON DETAILS & MATERIALS */}
            <div className="card" style={{ padding: '24px', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-green">Aula Liberada</span>
                <span style={{ fontSize: '0.82rem', color: '#666666' }}>Duração: {freeLesson?.duration}</span>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#333333', lineHeight: 1.6, marginBottom: '20px' }}>
                {freeLesson?.description}
              </p>

              {/* DOWNLOADS */}
              <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#000000', marginBottom: '10px' }}>
                  Materiais para Download Gratuito:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(freeLesson?.materials || []).map((mat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        backgroundColor: '#F8F8F8',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #E5E5E5'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={16} color="#000000" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#000000' }}>{mat.name}</span>
                      </div>

                      <a
                        href="#download"
                        onClick={(e) => { e.preventDefault(); alert(`Download de ${mat.name} iniciado!`); }}
                        className="btn btn-sm btn-secondary"
                      >
                        <Download size={12} /> Baixar
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA PÓS-AULA */}
            <div
              style={{
                marginTop: '24px',
                padding: '28px',
                backgroundColor: '#0A0A0A',
                borderRadius: 'var(--radius-md)',
                color: '#FFFFFF',
                textAlign: 'center'
              }}
            >
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                Gostaste da aula? Continue a sua formação profissional.
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#AAAAAA', maxWidth: '500px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                Desbloqueie todas as aulas premium, biblioteca de plugins e obtenha seu Certificado Oficial por apenas 1.500 MT.
              </p>

              <button
                onClick={() => onOpenPayment()}
                className="btn btn-lg"
                style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 700 }}
              >
                <CreditCard size={16} /> Inscrever-me por 1.500 MT
              </button>
            </div>
          </div>

          {/* SIDEBAR AULAS BLOQUEADAS */}
          <div>
            <div className="card" style={{ padding: '18px' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000000', marginBottom: '12px' }}>
                Grade do Curso
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {beatMakerCourse?.modules.flatMap(m => m.lessons).map((lesson) => {
                  const isCurrent = lesson.id === freeLesson?.id;
                  const isLocked = !lesson.isFree && !canAccessPremium();

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => { if (isLocked) onOpenPayment(); }}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isCurrent ? '#F0F0F0' : '#FFFFFF',
                        border: '1px solid #E5E5E5',
                        cursor: isLocked ? 'pointer' : 'default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                        {isCurrent ? (
                          <Play size={14} color="#000000" />
                        ) : isLocked ? (
                          <Lock size={14} color="#888888" />
                        ) : (
                          <CheckCircle2 size={14} color="#000000" />
                        )}
                        <span style={{ fontSize: '0.8rem', fontWeight: isCurrent ? 700 : 500, color: '#000000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lesson.title}
                        </span>
                      </div>

                      <span style={{ fontSize: '0.72rem', color: '#888888' }}>
                        {isLocked ? '🔒 Premium' : 'Grátis'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {!canAccessPremium() && (
                <div style={{ marginTop: '14px', fontSize: '0.75rem', color: '#666666', borderTop: '1px solid #E5E5E5', paddingTop: '10px' }}>
                  🔒 As demais aulas exigem inscrição de 1.500 MT.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

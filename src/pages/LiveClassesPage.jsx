import React from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Video, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Lock, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Radio,
  PlayCircle
} from 'lucide-react';

export const LiveClassesPage = ({ onOpenPayment }) => {
  const { liveClasses } = useDatabase();
  const { canAccessPremium, currentUser } = useAuth();

  const handleJoinClass = (meetingUrl) => {
    if (!canAccessPremium()) {
      onOpenPayment();
      return;
    }
    window.open(meetingUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '85vh', padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
            <Radio size={12} style={{ animation: 'pulse 1s infinite' }} /> Sessões Interativas
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', color: 'var(--purple-950)', fontWeight: 800 }}>
            Aulas ao Vivo & Masterclasses
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Participe semanalmente de encontros por videochamada via Google Meet e Zoom para análise de projetos, feedback de mix e tira-dúvidas direto com o mentor.
          </p>
        </div>

        {/* ACCESS BANNER */}
        {!canAccessPremium() && (
          <div
            style={{
              backgroundColor: 'var(--rose-50)',
              border: '1.5px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: '20px 28px',
              marginBottom: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={24} color="#EF4444" />
              <div>
                <div style={{ fontWeight: 800, color: 'var(--rose-500)', fontSize: '1rem' }}>
                  Acesso Exclusivo para Alunos Inscritos
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
                  Os links de transmissão ao vivo do Google Meet e Zoom são liberados imediatamente após a confirmação do pagamento de 1.500 MT.
                </div>
              </div>
            </div>
            <button onClick={onOpenPayment} className="btn btn-gold btn-sm" style={{ fontWeight: 700 }}>
              Inscrever-se Agora (1.500 MT)
            </button>
          </div>
        )}

        {/* UPCOMING CLASSES GRID */}
        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', marginBottom: '24px', fontWeight: 800 }}>
            Próximas Sessões Agendadas
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {liveClasses.map((item) => {
              const hasAccess = canAccessPremium();

              return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    padding: '28px',
                    border: '1.5px solid var(--purple-200)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span className="badge badge-purple">{item.platform}</span>
                      <span className="badge badge-green">Status: {item.status}</span>
                    </div>

                    <h4 style={{ fontSize: '1.25rem', color: 'var(--purple-950)', fontWeight: 800, marginBottom: '12px' }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-body)', backgroundColor: 'var(--purple-50)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} color="var(--purple-700)" />
                        <span><strong>Data:</strong> {item.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} color="var(--purple-700)" />
                        <span><strong>Horário:</strong> {item.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Users size={16} color="var(--purple-700)" />
                        <span><strong>Professor:</strong> {item.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleJoinClass(item.meetingUrl)}
                      className={`btn ${hasAccess ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ width: '100%', padding: '12px' }}
                    >
                      {hasAccess ? (
                        <>
                          <Video size={18} /> Entrar na Sala de Aula ({item.platform}) <ExternalLink size={14} />
                        </>
                      ) : (
                        <>
                          <Lock size={16} color="#EF4444" /> Desbloquear Acesso na Inscrição
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RECORDED REPLAYS SHOWCASE */}
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', marginBottom: '20px', fontWeight: 800 }}>
            Gravações de Workshops Anteriores
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              {
                title: "Workshop: Segredos do 808 Saturado e Afinado",
                duration: "1h 45min",
                date: "Gravado em 05/08/2026",
                instructor: "Silva Jermane"
              },
              {
                title: "Masterclass: Como Produzir Amapiano & Afrobeat Comercial",
                duration: "2h 10min",
                date: "Gravado em 28/07/2026",
                instructor: "Silva Jermane"
              }
            ].map((rec, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircle size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.92rem' }}>{rec.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rec.duration} • {rec.date}</div>
                  </div>
                </div>

                <span className="badge badge-purple">Replay HD</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

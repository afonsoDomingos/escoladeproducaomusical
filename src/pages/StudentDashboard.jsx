import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlayCircle, 
  Award, 
  Download, 
  Video, 
  Sliders, 
  CreditCard,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const StudentDashboard = ({ setActivePage, onSelectCourse, onOpenPayment, onStartClassroom, onOpenCertificate }) => {
  const { currentUser, canAccessPremium, isLessonCompleted } = useAuth();
  const { courses, certificates, liveClasses, plugins } = useDatabase();

  if (!currentUser) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--purple-950)', marginBottom: '12px' }}>Acesso Restrito</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Por favor, entre na sua conta para visualizar o seu painel de aluno.</p>
        <button onClick={() => setActivePage('home')} className="btn btn-primary">
          Ir para Página Inicial
        </button>
      </div>
    );
  }

  // Calculate stats
  const allLessons = courses.flatMap(c => c.modules.flatMap(m => m.lessons));
  const completedLessonsCount = (currentUser.completedLessons || []).length;
  const remainingLessonsCount = Math.max(0, allLessons.length - completedLessonsCount);
  const myCertificates = certificates.filter(c => c.userId === currentUser.id || c.userName === currentUser.name);

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '85vh', padding: '36px 0 80px' }}>
      <div className="container">
        
        {/* WELCOME BANNER */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            border: '1.5px solid var(--border-purple)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Painel do Aluno</span>
              {currentUser.enrollmentStatus === 'approved' ? (
                <span className="badge badge-green">✓ Inscrição Ativa (Acesso Liberado)</span>
              ) : currentUser.enrollmentStatus === 'pending' ? (
                <span className="badge badge-gold">⏳ Inscrição Pendente de Validação</span>
              ) : (
                <span className="badge badge-red">⚠️ Inscrição Não Realizada</span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: 'var(--purple-950)', fontWeight: 800 }}>
              Olá, {currentUser.name}! 🎧
            </h1>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
              Bem-vindo ao seu ambiente de estudos. Acompanhe o seu progresso nas aulas, acesse materiais de apoio e participe das masterclasses ao vivo.
            </p>
          </div>

          {/* STATUS ACTION CTA */}
          {currentUser.enrollmentStatus !== 'approved' && (
            <div style={{ textAlign: 'right' }}>
              <button onClick={onOpenPayment} className="btn btn-gold btn-lg" style={{ fontWeight: 800 }}>
                <CreditCard size={18} /> {currentUser.enrollmentStatus === 'pending' ? 'Ver Status / Reenviar' : 'Ativar Inscrição (1.500 MT)'}
              </button>
            </div>
          )}
        </div>

        {/* PENDING NOTIFICATION ALERT (IF PENDING) */}
        {currentUser.enrollmentStatus === 'pending' && (
          <div
            style={{
              backgroundColor: 'var(--gold-50)',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Clock size={28} color="#D97706" />
              <div>
                <div style={{ fontWeight: 800, color: 'var(--gold-600)', fontSize: '1.05rem' }}>
                  Comprovativo de Pagamento em Análise
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                  A nossa equipa está validando o seu pagamento de 1.500 MT. Assim que aprovado, todo o conteúdo premium será liberado.
                </div>
              </div>
            </div>
            <button onClick={onOpenPayment} className="btn btn-secondary btn-sm" style={{ borderColor: '#F59E0B', color: '#D97706' }}>
              Detalhes do Pagamento
            </button>
          </div>
        )}

        {/* STATS OVERVIEW CARDS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '36px'
          }}
        >
          <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-950)' }}>{completedLessonsCount}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Aulas Concluídas</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-950)' }}>{remainingLessonsCount}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Aulas Restantes</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-950)' }}>{myCertificates.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Certificados Emitidos</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={20} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--purple-950)' }}>{plugins.length}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Plugins Disponíveis</div>
              </div>
            </div>
          </div>
        </div>

        {/* MY ENROLLED COURSES */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', fontWeight: 800 }}>
              Meus Cursos Inscritos
            </h3>
            <button onClick={() => setActivePage('cursos')} className="btn btn-secondary btn-sm">
              Ver Todos os Cursos
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {courses.map((course) => {
              const courseLessons = course.modules.flatMap(m => m.lessons);
              const courseCompleted = courseLessons.filter(l => isLessonCompleted(l.id)).length;
              const percent = Math.round((courseCompleted / courseLessons.length) * 100);

              return (
                <div
                  key={course.id}
                  className="card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1.5px solid var(--border-purple)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }}
                      />
                      <div>
                        <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{course.level}</span>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--purple-950)', fontWeight: 800, marginTop: '4px' }}>
                          {course.title}
                        </h4>
                      </div>
                    </div>

                    {/* PROGRESS BAR */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                        <span>Progresso do Aluno</span>
                        <span>{percent}% Concluído</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: 'var(--purple-100)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${percent}%`,
                            backgroundColor: percent === 100 ? '#10B981' : 'var(--purple-600)',
                            transition: 'width 0.4s'
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {courseCompleted} de {courseLessons.length} aulas assistidas
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                      onClick={() => onStartClassroom(course)}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      <PlayCircle size={16} /> Continuar Curso
                    </button>

                    {percent === 100 && (
                      <button
                        onClick={() => {
                          const cert = myCertificates.find(c => c.courseId === course.id) || certificates[0];
                          onOpenCertificate(cert);
                        }}
                        className="btn btn-gold btn-icon"
                        title="Ver Certificado"
                      >
                        <Award size={18} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUICK SHORTCUTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* AULAS AO VIVO SHORTCUT */}
          <div
            onClick={() => setActivePage('aulas-ao-vivo')}
            className="card"
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem' }}>Aulas ao Vivo</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Próxima sessão: 25 de Agosto</div>
              </div>
            </div>
            <ArrowRight size={18} color="var(--purple-600)" />
          </div>

          {/* PLUGINS SHORTCUT */}
          <div
            onClick={() => setActivePage('plugins')}
            className="card"
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem' }}>Plugins & Recursos</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Drumkits, VSTs e Presets</div>
              </div>
            </div>
            <ArrowRight size={18} color="var(--purple-600)" />
          </div>

          {/* ÁREA DE MASTER SHORTCUT */}
          <div
            onClick={() => setActivePage('area-master')}
            className="card"
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sliders size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--purple-950)', fontSize: '0.95rem' }}>Área de Masterização</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Solicite feedback ou master</div>
              </div>
            </div>
            <ArrowRight size={18} color="var(--purple-600)" />
          </div>
        </div>

      </div>
    </div>
  );
};

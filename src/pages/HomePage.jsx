import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { studioSynth } from '../utils/audioSynth';
import { AudioWaveVisualizer } from '../components/audio/AudioWaveVisualizer';
import { 
  PlayCircle, 
  ArrowRight, 
  Headphones, 
  Sliders, 
  Music, 
  Radio, 
  Video, 
  Zap, 
  Layers, 
  Download,
  Volume2,
  Activity,
  Sparkles
} from 'lucide-react';

export const HomePage = ({ setActivePage, onOpenPayment, onSelectCourse }) => {
  const { courses } = useDatabase();
  const [activePad, setActivePad] = useState(null);
  const [isWaveActive, setIsWaveActive] = useState(true);

  const pads = [
    { label: 'KICK 01', note: 'Punchy', sound: 'kick' },
    { label: 'SNARE', note: 'Crisp', sound: 'snare' },
    { label: '808 SUB', note: 'Slide C2', sound: '808' },
    { label: 'HI-HAT', note: 'Roll 1/16', sound: 'hihat' },
    { label: 'PERC 01', note: 'Afrobeat', sound: 'snare' },
    { label: 'CHORD', note: 'Minor 9th', sound: 'chord' },
    { label: 'VOCAL', note: 'Dry Chop', sound: 'vocal' },
    { label: 'MASTER', note: '-8 LUFS', sound: 'chord' }
  ];

  const handlePadClick = (idx, soundType) => {
    setActivePad(idx);
    setIsWaveActive(true);

    // Play synthesized instrument
    if (soundType === 'kick') studioSynth.playKick();
    else if (soundType === 'snare') studioSynth.playSnare();
    else if (soundType === '808') studioSynth.play808();
    else if (soundType === 'hihat') studioSynth.playHiHat();
    else if (soundType === 'chord') studioSynth.playChord();
    else if (soundType === 'vocal') studioSynth.playVocalChop();

    setTimeout(() => setActivePad(null), 180);
  };

  return (
    <div>
      {/* 1. HERO SECTION COM ONDAS DE ÁUDIO DINÂMICAS */}
      <section
        style={{
          paddingTop: '50px',
          paddingBottom: '70px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'center'
            }}
          >
            {/* HERO TEXT */}
            <div>
              {/* TAG DE IDENTIFICAÇÃO PRO COM ONDA SUTIL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-dark">
                  <Activity size={11} /> Moçambique • Maputo
                </span>
                <span className="badge badge-green">
                  Matrículas Abertas 2026
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.3rem, 5vw, 3.3rem)',
                  fontWeight: 900,
                  color: '#09090B',
                  lineHeight: 1.12,
                  letterSpacing: '-0.035em',
                  marginBottom: '16px'
                }}
              >
                ESCOLA DE PRODUÇÃO MUSICAL
              </h1>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                  marginBottom: '22px',
                  maxWidth: '520px'
                }}
              >
                Aprenda <strong>Produção Musical</strong>, <strong>Beat Making</strong>, <strong>Mixagem</strong> e <strong>Masterização</strong> do zero absoluto ao nível comercial com o mentor <strong>Silva Jermane</strong>.
              </p>

              {/* ONDA DE ÁUDIO INTERATIVA MINI */}
              <div
                style={{
                  backgroundColor: '#FAFAFA',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 16px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    FREQUÊNCIA DE ÁUDIO MASTER (20Hz - 20kHz)
                  </span>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#22C55E', fontWeight: 800 }}>
                    ● STEREO LIVE
                  </span>
                </div>
                <AudioWaveVisualizer isPlaying={isWaveActive} height={28} barCount={48} color="#09090B" />
              </div>

              {/* AULA GRATUITA NOTICE BOX */}
              <div
                onClick={() => setActivePage('aula-gratuita')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PlayCircle size={18} color="#09090B" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#09090B' }}>
                    Aula Inaugural Gratuita Liberada para Assistir
                  </span>
                </div>
                <ArrowRight size={14} color="#71717A" />
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <button
                  onClick={() => onOpenPayment()}
                  className="btn btn-primary btn-lg"
                >
                  Começar Agora (1.500 MT)
                </button>

                <button
                  onClick={() => setActivePage('cursos')}
                  className="btn btn-secondary btn-lg"
                >
                  Ver Cursos
                </button>
              </div>

              {/* SPECS MONOSPACE CHIPS */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '14px'
                }}
              >
                <span>● FL STUDIO & ABLETON</span>
                <span>● 24-BIT LOSSLESS</span>
                <span>● MEET & ZOOM</span>
              </div>
            </div>

            {/* HERO VISUAL STUDIO INTERACTIVE CONSOLE */}
            <div>
              <div
                className="card-dark"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                  position: 'relative'
                }}
              >
                {/* STUDIO CONSOLE HEADER */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272A', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }}></div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#A1A1AA', letterSpacing: '0.05em' }}>
                      EPM STUDIO SAMPLER • 44.1kHz
                    </span>
                  </div>

                  <div className="eq-bars">
                    <div className="eq-bar" style={{ background: '#FFFFFF' }}></div>
                    <div className="eq-bar" style={{ background: '#FFFFFF' }}></div>
                    <div className="eq-bar" style={{ background: '#FFFFFF' }}></div>
                    <div className="eq-bar" style={{ background: '#FFFFFF' }}></div>
                    <div className="eq-bar" style={{ background: '#FFFFFF' }}></div>
                  </div>
                </div>

                {/* ONDA DE ÁUDIO INTERNA DO CONSOLE */}
                <div style={{ backgroundColor: '#121214', border: '1px solid #27272A', borderRadius: 'var(--radius-xs)', padding: '10px 14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#71717A' }}>
                      OSCILLOSCOPE WAVE DISPLAY
                    </span>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#A1A1AA' }}>
                      -8.2 LUFS
                    </span>
                  </div>
                  <AudioWaveVisualizer isPlaying={isWaveActive} height={36} barCount={36} color="#FFFFFF" />
                </div>

                {/* BEAT PAD SAMPLER MATRIX (WITH REAL SYNTHESIZED SOUNDS) */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#71717A', marginBottom: '8px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Clique nos Pads para tocar sons reais:</span>
                    <Volume2 size={12} color="#A1A1AA" />
                  </div>

                  <div className="beat-pad-grid">
                    {pads.map((pad, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePadClick(idx, pad.sound)}
                        className={`beat-pad-btn ${activePad === idx ? 'active' : ''}`}
                        title={`Tocar ${pad.label}`}
                      >
                        <div>{pad.label}</div>
                        <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>{pad.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* INSTRUCTOR FOOTER BADGE */}
                <div
                  style={{
                    backgroundColor: '#18181B',
                    border: '1px solid #27272A',
                    borderRadius: 'var(--radius-xs)',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>
                      Silva Jermane (Jayon Tivane)
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#A1A1AA' }}>
                      Produtor Musical & Sound Engineer
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#22C55E', fontWeight: 700 }}>
                    1.500 MT / TOTAL
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAS OPÇÕES PRINCIPAIS: COMPRAR BEATS OU APRENDER EM CURSOS */}
      <section
        style={{
          padding: '40px 0',
          backgroundColor: 'var(--bg-page)',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 28px' }}>
            <span className="badge badge-dark" style={{ marginBottom: '6px' }}>Escolha o Seu Objetivo</span>
            <h2 style={{ fontSize: '1.75rem', color: '#09090B' }}>
              O Que Você Procura Hoje?
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Temos duas áreas exclusivas criadas sob medida para atender suas necessidades musicais:
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {/* OPÇÃO 1: COMPRAR BEATS */}
            <div
              onClick={() => setActivePage('beats-store')}
              className="card"
              style={{
                padding: '28px',
                cursor: 'pointer',
                border: '2px solid #09090B',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: '#09090B',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Music size={22} />
                  </div>
                  <span className="badge badge-green">Para Artistas & Cantores</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090B', marginBottom: '8px' }}>
                  🎵 Quero Comprar Beats & Instrumentais
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Navegue pelo nosso catálogo de batidas inéditas de <strong>Afrobeat, Amapiano, Trap, Kizomba e Marrabenta</strong>. Ouça prévias e compre licenças com áudio WAV e faixas abertas.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#09090B', fontFamily: 'var(--font-mono)' }}>
                  A partir de 1.000 MT
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#09090B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Explorar Beat Store <ArrowRight size={14} />
                </span>
              </div>
            </div>

            {/* OPÇÃO 2: APRENDER CURSOS */}
            <div
              onClick={() => setActivePage('cursos')}
              className="card"
              style={{
                padding: '28px',
                cursor: 'pointer',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      backgroundColor: '#F4F4F5',
                      color: '#09090B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-light)'
                    }}
                  >
                    <Sliders size={22} />
                  </div>
                  <span className="badge badge-dark">Para Produtores & DJs</span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090B', marginBottom: '8px' }}>
                  🎓 Quero Aprender Produção Musical
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Aprenda do zero ao nível avançado em <strong>Beat Making, Mixagem, Masterização comercial</strong>, com mentoria de Silva Jermane, aulas ao vivo e certificação oficial.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#09090B', fontFamily: 'var(--font-mono)' }}>
                  Acesso Total: 1.500 MT
                </span>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#09090B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Ver Cursos Disponíveis <ArrowRight size={14} />
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2b. OS 7 PILARES COM ONDAS E EFEITOS DINÂMICOS */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--bg-page)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-dark" style={{ marginBottom: '6px' }}>Ementa Oficial</span>
              <h2 style={{ fontSize: '1.9rem', color: '#09090B' }}>
                O Que Vais Aprender
              </h2>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Metodologia prática do zero ao avançado
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}
          >
            {[
              { num: "01", title: "Fundamentos de Produção", desc: "Teoria prática, escalas, harmonia aplicada e percepção auditiva.", icon: Music },
              { num: "02", title: "DAW & Workflow Profissional", desc: "Latência zero, templates de estúdio, atalhos e roteamento rápido.", icon: Sliders },
              { num: "03", title: "Criação de Batidas & 808s", desc: "Bateria orgânica, swing, ghost notes e afinação perfeita de 808.", icon: Headphones },
              { num: "04", title: "Síntese & Sound Design", desc: "Criação de timbres autorais em Vital/Serum, plucks e soundscapes.", icon: Zap },
              { num: "05", title: "Mixagem & Tratamento Vocal", desc: "EQ cirúrgica, compressores analógicos, de-esser e afinação vocal.", icon: Layers },
              { num: "06", title: "Mastering para Streaming", desc: "Loudness comercial (-8 LUFS), controle True Peak e imagem estéreo.", icon: Radio },
              { num: "07", title: "Exportação & Distribuição", desc: "Exportação de stems, metadados ISRC e lançamento no Spotify/Apple.", icon: Download }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--bg-subtle)',
                          color: '#09090B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        <IconComp size={17} />
                      </div>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-light)' }}>
                        {item.num}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '0.98rem', color: '#09090B', marginBottom: '6px', fontWeight: 700 }}>
                      {item.title}
                    </h3>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CURSOS PRINCIPAIS */}
      <section style={{ padding: '70px 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge badge-dark" style={{ marginBottom: '6px' }}>Formação Completa</span>
              <h2 style={{ fontSize: '1.9rem', color: '#09090B' }}>
                Cursos Principais
              </h2>
            </div>
            <button onClick={() => setActivePage('cursos')} className="btn btn-secondary btn-sm">
              Ver Todos os Cursos <ArrowRight size={13} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="card"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '180px', backgroundColor: '#000000' }}>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#09090B',
                        color: '#FFF',
                        padding: '2px 8px',
                        borderRadius: '3px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {course.level}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {course.duration} • {course.instructor}
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: '#09090B', marginBottom: '8px', fontWeight: 800 }}>
                      {course.title}
                    </h3>

                    <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.5 }}>
                      {course.shortDescription}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Valor Único</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#09090B', fontFamily: 'var(--font-mono)' }}>1.500 MT</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCourse(course);
                      setActivePage('curso-detalhe');
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Acessar Conteúdo do Curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PORQUÊ ESTE CURSO? */}
      <section style={{ padding: '70px 0', backgroundColor: 'var(--bg-page)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: '1.9rem', color: '#09090B', marginBottom: '8px' }}>
              Porquê Este Curso?
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Vantagens diretas para quem deseja produzir com padrão internacional.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '14px'
            }}
          >
            {[
              { title: "Aulas ao Vivo (Meet & Zoom)", desc: "Encontros interativos para tirar dúvidas diretamente na DAW.", icon: Video },
              { title: "Produção do Zero", desc: "Aprenda a construir batidas completas da concepção à exportação.", icon: Music },
              { title: "Mixagem & Sound Design", desc: "Técnicas de equalização, compressão e plugins profissionais.", icon: Sliders },
              { title: "Todos os Estilos Musicais", desc: "Afrobeat, Amapiano, Trap, R&B, House, Kizomba e Marrabenta.", icon: Radio },
              { title: "Feedback em Tempo Real", desc: "Análise individual dos seus projetos pelo mentor Silva Jermane.", icon: Zap }
            ].map((b, idx) => {
              const BIcon = b.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{ padding: '18px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <BIcon size={16} color="#09090B" />
                    <h3 style={{ fontSize: '0.92rem', color: '#09090B', fontWeight: 700 }}>{b.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA INSCRIÇÃO */}
      <section
        style={{
          padding: '60px 0',
          backgroundColor: '#09090B',
          color: '#FFFFFF',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '580px' }}>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
            Inscrição por Apenas 1.500 MT
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#A1A1AA', marginBottom: '24px', lineHeight: 1.6 }}>
            Pagamento via e-Mola (879 817 847) ou M-Pesa (842 737 924) para <strong>Silva Jermane Hlatswayo</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenPayment()}
              className="btn btn-lg"
              style={{ backgroundColor: '#FFFFFF', color: '#000000', fontWeight: 700 }}
            >
              Inscrever-se Agora (1.500 MT)
            </button>

            <button
              onClick={() => setActivePage('aula-gratuita')}
              className="btn btn-outline-white btn-lg"
            >
              <PlayCircle size={15} /> Assistir Aula Gratuita
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

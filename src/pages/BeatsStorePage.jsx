import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { 
  Play, 
  Pause, 
  ShoppingBag, 
  Sliders, 
  Music, 
  Check, 
  Copy, 
  X, 
  Radio, 
  Download, 
  ShieldCheck, 
  Zap,
  Phone,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { AudioWaveVisualizer } from '../components/audio/AudioWaveVisualizer';

export const BeatsStorePage = () => {
  const { beats, showToast } = useDatabase();

  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [selectedBeatForPurchase, setSelectedBeatForPurchase] = useState(null);
  const [licenseType, setLicenseType] = useState('standard'); // 'standard' | 'exclusive'
  const [copiedAccount, setCopiedAccount] = useState('');

  const genres = ['Todos', 'Afrobeat', 'Amapiano', 'Trap / Drill', 'Kizomba / Zouk', 'Marrabenta Fusion', 'R&B / Soul'];

  const filteredBeats = beats.filter(b => {
    const matchGenre = selectedGenre === 'Todos' || b.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchGenre && matchSearch;
  });

  const togglePlay = (beatId) => {
    if (currentPlayingId === beatId) {
      setCurrentPlayingId(null);
    } else {
      setCurrentPlayingId(beatId);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    showToast(`${type} copiado com sucesso!`, 'success');
    setTimeout(() => setCopiedAccount(''), 2500);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '85vh', padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* HEADER SECTION */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-dark">Beat Store Oficial</span>
              <span className="badge badge-green">Instrumentais Inéditos</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', fontWeight: 900, color: '#09090B', letterSpacing: '-0.03em', marginBottom: '8px' }}>
              Loja de Beats & Instrumentais
            </h1>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', maxWidth: '580px', lineHeight: 1.5 }}>
              Compre batidas e produções exclusivas produzidas por <strong>Silva Jermane</strong> para seus lançamentos musicais, singles, EPs e álbuns.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
            <input
              type="text"
              placeholder="Buscar por estilo ou nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '34px', fontSize: '0.85rem' }}
            />
            <Search size={15} color="#71717A" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* GENRE FILTER PILLS */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '28px' }}>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
                fontSize: '0.82rem',
                fontWeight: selectedGenre === g ? 700 : 500,
                backgroundColor: selectedGenre === g ? '#09090B' : '#FFFFFF',
                color: selectedGenre === g ? '#FFFFFF' : 'var(--text-body)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {g}
            </button>
          ))}
        </div>

        {/* BEATS CATALOG GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredBeats.map((beat) => {
            const isPlaying = currentPlayingId === beat.id;

            return (
              <div
                key={beat.id}
                className="card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isPlaying ? '1px solid #09090B' : '1px solid var(--border-light)',
                  boxShadow: isPlaying ? '0 8px 24px rgba(0,0,0,0.08)' : 'var(--shadow-card)'
                }}
              >
                <div>
                  {/* TOP: COVER & PLAY BUTTON */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
                      <img
                        src={beat.cover}
                        alt={beat.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <button
                        onClick={() => togglePlay(beat.id)}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,0,0,0.45)',
                          border: 'none',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s'
                        }}
                      >
                        {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span className="badge badge-dark" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                          {beat.genre}
                        </span>
                        {beat.isFeatured && (
                          <span className="badge badge-green" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                            Destaque
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '1.08rem', color: '#09090B', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {beat.title}
                      </h3>

                      <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {beat.bpm} BPM • {beat.key}
                      </div>
                    </div>
                  </div>

                  {/* WAVEFORM MONITOR */}
                  <div
                    style={{
                      backgroundColor: '#F8F8F8',
                      borderRadius: 'var(--radius-xs)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-light)',
                      marginBottom: '14px'
                    }}
                  >
                    <AudioWaveVisualizer isPlaying={isPlaying} height={24} barCount={36} color={isPlaying ? '#09090B' : '#A1A1AA'} />
                  </div>

                  {/* TAGS */}
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {beat.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#71717A',
                          backgroundColor: '#F4F4F5',
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PRICING & BUY ACTION */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>A partir de</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#09090B', fontFamily: 'var(--font-mono)' }}>
                        {beat.priceStandard} MT
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Exclusiva</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#71717A', fontFamily: 'var(--font-mono)' }}>
                        {beat.priceExclusive} MT
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedBeatForPurchase(beat);
                      setLicenseType('standard');
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', gap: '6px' }}
                  >
                    <ShoppingBag size={14} /> Comprar Licença do Beat
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* LICENSES EXPLANATION */}
        <div style={{ marginTop: '60px', backgroundColor: 'var(--bg-page)', borderRadius: 'var(--radius-md)', padding: '32px', border: '1px solid var(--border-light)' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#09090B', marginBottom: '16px', textAlign: 'center' }}>
            Como Funcionam as Licenças de Beats?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <span className="badge badge-green" style={{ marginBottom: '8px' }}>Licença Padrão (Lease)</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B', marginBottom: '6px' }}>Áudio MP3 & WAV Master</h3>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px' }}>
                <li>Gravação para 1 single comercial</li>
                <li>Monetização em streaming até 50.000 plays</li>
                <li>Uso em YouTube e redes sociais</li>
                <li>Download imediato sem marca d'água</li>
              </ul>
            </div>

            <div className="card" style={{ padding: '20px', border: '1px solid #09090B' }}>
              <span className="badge badge-dark" style={{ marginBottom: '8px' }}>Licença Exclusiva (WAV + Stems)</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#09090B', marginBottom: '6px' }}>Direito Total & Faixas Abertas</h3>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px' }}>
                <li>O beat sai imediatamente da loja</li>
                <li>Stems/Faixas separadas em 24-bit WAV</li>
                <li>Plays ilimitados no Spotify e Rádios</li>
                <li>Contrato oficial de cessão de direitos</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL DE COMPRA DE BEAT COM PAGAMENTO OFICIAL */}
      {selectedBeatForPurchase && (
        <div className="modal-overlay" onClick={() => setSelectedBeatForPurchase(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '28px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-dark">Checkout Beat</span>
                <h3 style={{ fontSize: '1.2rem', color: '#09090B', fontWeight: 800, marginTop: '2px' }}>
                  Comprar: {selectedBeatForPurchase.title}
                </h3>
              </div>
              <button onClick={() => setSelectedBeatForPurchase(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* SELEÇÃO DE LICENÇA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
              <div
                onClick={() => setLicenseType('standard')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: licenseType === 'standard' ? '2px solid #09090B' : '1px solid var(--border-light)',
                  backgroundColor: licenseType === 'standard' ? '#F4F4F5' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#09090B' }}>Padrão (Lease)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#09090B', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                  {selectedBeatForPurchase.priceStandard} MT
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Áudio WAV Master</div>
              </div>

              <div
                onClick={() => setLicenseType('exclusive')}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: licenseType === 'exclusive' ? '2px solid #09090B' : '1px solid var(--border-light)',
                  backgroundColor: licenseType === 'exclusive' ? '#F4F4F5' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#09090B' }}>Exclusiva (Stems)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#09090B', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                  {selectedBeatForPurchase.priceExclusive} MT
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>WAV + Faixas Abertas</div>
              </div>
            </div>

            {/* CONTAS OFICIAIS */}
            <div style={{ backgroundColor: '#FAFAFA', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#09090B', marginBottom: '8px' }}>
                Transfira o valor para as contas oficiais:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span>e-Mola</span>
                    <button onClick={() => handleCopy('879817847', 'e-Mola')} className="btn btn-sm btn-secondary" style={{ padding: '1px 5px', fontSize: '0.68rem' }}>
                      {copiedAccount === 'e-Mola' ? <Check size={10} /> : <Copy size={10} />}
                    </button>
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#000000' }}>879 817 847</div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                    <span>M-Pesa</span>
                    <button onClick={() => handleCopy('842737924', 'M-Pesa')} className="btn btn-sm btn-secondary" style={{ padding: '1px 5px', fontSize: '0.68rem' }}>
                      {copiedAccount === 'M-Pesa' ? <Check size={10} /> : <Copy size={10} />}
                    </button>
                  </div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 900, color: '#000000' }}>842 737 924</div>
                </div>
              </div>

              <div style={{ fontSize: '0.74rem', color: '#71717A' }}>
                Titular: <strong>Silva Jermane Hlatswayo</strong>
              </div>
            </div>

            {/* WHATSAPP CONFIRMATION BUTTON */}
            <a
              href={`https://wa.me/258879817847?text=${encodeURIComponent(
                `Olá Silva Jermane, quero comprar o Beat "${selectedBeatForPurchase.title}" com Licença ${licenseType === 'standard' ? 'Padrão (1.000 MT)' : 'Exclusiva (' + selectedBeatForPurchase.priceExclusive + ' MT)'}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <Phone size={15} /> Confirmar & Receber Arquivos no WhatsApp
            </a>

          </div>
        </div>
      )}

    </div>
  );
};

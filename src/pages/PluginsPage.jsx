import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Download, 
  ExternalLink, 
  Search, 
  Filter, 
  HelpCircle, 
  X, 
  Layers, 
  Laptop, 
  CheckCircle, 
  Sparkles,
  Lock
} from 'lucide-react';

const CATEGORIES = [
  'Todos',
  'Synth',
  'Compressor',
  'EQ',
  'Reverb',
  'Delay',
  'Mastering',
  'Drumkits',
  'Samples',
  'Presets',
  'VST3',
  'AU'
];

export const PluginsPage = ({ onOpenPayment }) => {
  const { plugins } = useDatabase();
  const { canAccessPremium } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedOS, setSelectedOS] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInstallGuidePlugin, setActiveInstallGuidePlugin] = useState(null);

  const filteredPlugins = plugins.filter((plugin) => {
    const matchCategory = selectedCategory === 'Todos' || plugin.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchOS = selectedOS === 'Todos' || plugin.operatingSystem.toLowerCase().includes(selectedOS.toLowerCase());
    const matchSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchOS && matchSearch;
  });

  const handleDownload = (plugin) => {
    if (plugin.type === 'Exclusivo Escola' && !canAccessPremium()) {
      onOpenPayment();
      return;
    }
    if (plugin.downloadUrl.startsWith('http')) {
      window.open(plugin.downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Download de "${plugin.name}" iniciado com sucesso!`);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '85vh', padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
            Arsenal de Estúdio
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', color: 'var(--purple-950)', fontWeight: 800 }}>
            Plugins, VSTs & Drumkits
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Biblioteca curada de instrumentos virtuais, efeitos essenciais de mixagem e masterização, drumkits e presets para turbinar a sua produção.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div
          className="card"
          style={{
            padding: '20px 24px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '32px',
            border: '1.5px solid var(--border-purple)'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* SEARCH INPUT */}
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <input
                type="text"
                placeholder="Pesquisar por nome ou efeito (ex: Vital, EQ, Reverb, 808)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px' }}
              />
              <Search size={18} color="var(--purple-400)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* OS FILTER */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Sistema:</span>
              <select
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '8px 14px' }}
              >
                <option value="Todos">Todos os SOs</option>
                <option value="Windows">Windows</option>
                <option value="macOS">macOS / Mac</option>
              </select>
            </div>
          </div>

          {/* CATEGORIES PILLS */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingTop: '16px',
              marginTop: '16px',
              borderTop: '1px solid var(--border-light)'
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  backgroundColor: selectedCategory === cat ? 'var(--purple-700)' : 'var(--purple-50)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--purple-800)',
                  border: selectedCategory === cat ? '1px solid var(--purple-700)' : '1px solid var(--purple-200)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PLUGINS GRID */}
        {filteredPlugins.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--purple-300)' }}>
            <h3 style={{ color: 'var(--purple-950)', marginBottom: '8px' }}>Nenhum recurso encontrado</h3>
            <p style={{ color: 'var(--text-muted)' }}>Tente ajustar a categoria ou a busca.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredPlugins.map((plugin) => {
              const isExclusive = plugin.type === 'Exclusivo Escola';
              const isLocked = isExclusive && !canAccessPremium();

              return (
                <div
                  key={plugin.id}
                  className="card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: isExclusive ? '1.5px solid var(--purple-400)' : '1px solid var(--border-purple)'
                  }}
                >
                  <div>
                    <div style={{ position: 'relative', height: '180px' }}>
                      <img
                        src={plugin.image}
                        alt={plugin.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          color: '#FFF',
                          backdropFilter: 'blur(6px)',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        {plugin.category}
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px'
                        }}
                      >
                        {isExclusive ? (
                          <span className="badge badge-gold">★ Exclusivo Alunos</span>
                        ) : (
                          <span className="badge badge-green">✓ Gratuito Oficial</span>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <Laptop size={14} color="var(--purple-600)" />
                        <span>Compatibilidade: <strong>{plugin.operatingSystem}</strong></span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '8px' }}>
                        {plugin.name}
                      </h3>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                        {plugin.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleDownload(plugin)}
                        className={`btn ${isLocked ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ flex: 1 }}
                      >
                        {isLocked ? (
                          <>
                            <Lock size={15} color="#EF4444" /> Desbloquear (1.500 MT)
                          </>
                        ) : (
                          <>
                            <Download size={15} /> Download Oficial
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveInstallGuidePlugin(plugin)}
                        className="btn btn-secondary btn-icon"
                        title="Como Instalar?"
                      >
                        <HelpCircle size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* INSTALLATION GUIDE MODAL */}
        {activeInstallGuidePlugin && (
          <div className="modal-overlay" onClick={() => setActiveInstallGuidePlugin(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HelpCircle size={20} color="var(--purple-700)" />
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--purple-950)' }}>
                    Guia de Instalação
                  </h3>
                </div>
                <button onClick={() => setActiveInstallGuidePlugin(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="var(--text-muted)" />
                </button>
              </div>

              <div style={{ backgroundColor: 'var(--purple-50)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
                <strong style={{ color: 'var(--purple-950)', fontSize: '0.95rem' }}>{activeInstallGuidePlugin.name}</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Compatível com: {activeInstallGuidePlugin.operatingSystem}</div>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>Instruções Passo a Passo:</div>
                <div style={{ whiteSpace: 'pre-line', backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  {activeInstallGuidePlugin.installGuide}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    handleDownload(activeInstallGuidePlugin);
                    setActiveInstallGuidePlugin(null);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Download size={16} /> Acessar Download
                </button>
                <button
                  onClick={() => setActiveInstallGuidePlugin(null)}
                  className="btn btn-secondary"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

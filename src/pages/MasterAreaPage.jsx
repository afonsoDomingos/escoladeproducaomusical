import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sliders, 
  Send, 
  CheckCircle2, 
  Radio, 
  Sparkles, 
  Volume2, 
  MessageSquare, 
  FileAudio, 
  Clock, 
  ArrowRight,
  Headphones
} from 'lucide-react';

export const MasterAreaPage = () => {
  const { currentUser } = useAuth();
  const { masterRequests, submitMasterRequest, showToast } = useDatabase();

  const [formData, setFormData] = useState({
    clientName: currentUser?.name || '',
    clientEmail: currentUser?.email || '',
    whatsapp: currentUser?.phone || '',
    songName: '',
    artistName: '',
    serviceType: 'Masterização para Streaming',
    fileUrl: '',
    notes: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.whatsapp || !formData.songName || !formData.fileUrl) {
      showToast('Por favor preencha todos os campos obrigatórios e o link do áudio.', 'error');
      return;
    }

    submitMasterRequest(formData);
    setFormData({
      clientName: currentUser?.name || '',
      clientEmail: currentUser?.email || '',
      whatsapp: currentUser?.phone || '',
      songName: '',
      artistName: '',
      serviceType: 'Masterização para Streaming',
      fileUrl: '',
      notes: ''
    });
    setShowForm(false);
  };

  const userRequests = masterRequests.filter(r => r.userId === currentUser?.id || r.clientEmail === currentUser?.email);

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '85vh', padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* HERO INTRO */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '40px',
            border: '1.5px solid var(--border-purple)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '10px' }}>Engenharia de Áudio Pro</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', color: 'var(--purple-950)', fontWeight: 900, marginBottom: '14px' }}>
              Precisas de uma Master Profissional para a Tua Música?
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
              Tratamento acústico de alto padrão e cadeia analógica para colocar a sua música no mesmo nível de volume, brilho e impacto dos maiores lançamentos mundiais.
            </p>

            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-gold btn-lg"
              style={{ fontWeight: 800 }}
            >
              <Sliders size={20} /> Solicitar Masterização / Mixagem
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=700&auto=format&fit=crop"
              alt="Mesa de Masterização e Monitores de Estúdio"
              style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '2px solid var(--purple-200)' }}
            />
          </div>
        </div>

        {/* FORM SECTION (ACCORDION OR TOGGLED) */}
        {showForm && (
          <div
            id="master-form-section"
            className="card"
            style={{
              padding: '36px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              marginBottom: '40px',
              border: '2px solid var(--purple-400)',
              animation: 'modalPop 0.3s ease'
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', fontWeight: 800 }}>
                Formulário de Solicitação de Serviço
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Envie os detalhes da sua música. Entraremos em contacto pelo WhatsApp para confirmar o orçamento e prazo de entrega.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Seu Nome Completo *</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp com Código do País *</label>
                  <input
                    type="tel"
                    placeholder="+258 84..."
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Nome da Música *</label>
                  <input
                    type="text"
                    placeholder="Ex: Minha História (Master)"
                    value={formData.songName}
                    onChange={(e) => setFormData({ ...formData, songName: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nome do Artista / Produtor *</label>
                  <input
                    type="text"
                    placeholder="Ex: Jayon feat...."
                    value={formData.artistName}
                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo de Serviço *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Masterização para Streaming">Masterização para Streaming (-8 LUFS)</option>
                    <option value="Mixagem Completa + Master">Mixagem Completa de Stems + Master</option>
                    <option value="Revisão de Mix">Revisão e Diagnóstico de Mixagem</option>
                    <option value="Consultoria & Feedback">Consultoria & Feedback Técnico 1-a-1</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Link para Download / Envio do Áudio (WAV / Stems) *</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... ou Dropbox / WeTransfer"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  className="form-input"
                  required
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Recomendado enviar em WAV 24-bit 44.1kHz sem limiters no master e com headroom de -6dB.
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Observações ou Músicas de Referência (Opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Gostaria de uma sonoridade parecida com o artista X, graves bem definidos..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
                  <Send size={18} /> Enviar Pedido de Masterização
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SERVICES OFFERED CARDS */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--purple-950)', marginBottom: '24px', fontWeight: 800 }}>
            Nossos Serviços de Engenharia Sonora
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              {
                title: "Masterização Comercial",
                desc: "Equalização analógica tonal, compressão multibanda e limitação com loudness competitivo para Spotify, Apple Music e Rádio.",
                icon: Radio
              },
              {
                title: "Mixagem de Stems",
                desc: "Alinhamento de fases, afinação vocal profissional (Melodyne), limpeza de frequências e profundidade estéreo 3D.",
                icon: Sliders
              },
              {
                title: "Revisão e Diagnóstico de Mix",
                desc: "Análise espectral detalhada da sua mixagem com relatório de correções antes do envio para a master final.",
                icon: FileAudio
              },
              {
                title: "Consultoria & Feedback",
                desc: "Sessão individual com Silva Jermane para avaliar timbres, harmonia, arranjo e dinâmica de projetos em DAW.",
                icon: MessageSquare
              }
            ].map((srv, idx) => {
              const SIcon = srv.icon;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{
                    padding: '24px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--purple-100)',
                      color: 'var(--purple-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <SIcon size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--purple-950)', marginBottom: '8px' }}>{srv.title}</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* MY SUBMITTED REQUESTS (IF ANY) */}
        {userRequests.length > 0 && (
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-xl)' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--purple-950)', marginBottom: '16px', fontWeight: 800 }}>
              Minhas Solicitações de Masterização
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {userRequests.map((req) => (
                <div
                  key={req.id}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--purple-50)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--purple-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--purple-950)', fontSize: '1rem' }}>
                      {req.songName} — <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{req.artistName}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Serviço: {req.serviceType} • Enviado em: {new Date(req.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <span className={`badge ${req.status === 'Concluído' ? 'badge-green' : req.status === 'Em Produção' ? 'badge-purple' : 'badge-gold'}`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

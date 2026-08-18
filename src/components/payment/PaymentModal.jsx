import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  X, 
  Smartphone, 
  Copy, 
  Check, 
  Upload, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { submitPayment, showToast } = useDatabase();

  const [step, setStep] = useState('instructions');
  const [copiedAccount, setCopiedAccount] = useState('');
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    method: 'M-Pesa',
    amount: 1500,
    transactionCode: '',
    paymentDate: new Date().toISOString().split('T')[0],
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop',
    notes: ''
  });

  const [previewImage, setPreviewImage] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    showToast(`${type} copiado!`, 'success');
    setTimeout(() => setCopiedAccount(''), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, proofUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.transactionCode) {
      showToast('Preencha os campos obrigatórios e código da transação.', 'error');
      return;
    }

    submitPayment(formData);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setStep('success');
  };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '28px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <span className="badge badge-dark" style={{ marginBottom: '4px' }}>Inscrição</span>
            <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
              Inscrição na Escola de Produção Musical
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666' }}>
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: INSTRUCTIONS */}
        {step === 'instructions' && (
          <div>
            {/* PRICE BANNER */}
            <div
              style={{
                backgroundColor: '#F8F8F8',
                border: '1px solid #E5E5E5',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: '#666666', fontWeight: 600 }}>Valor Total</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#000000' }}>1.500 MT</div>
              </div>
              <span className="badge badge-dark">Acesso Total</span>
            </div>

            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#000000', marginBottom: '12px' }}>
              Transfira para uma das contas oficiais:
            </div>

            {/* PAYMENT METHODS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              
              {/* E-MOLA */}
              <div
                style={{
                  border: '1px solid #E5E5E5',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>e-Mola</span>
                  <button
                    onClick={() => handleCopy('879817847', 'e-Mola')}
                    className="btn btn-sm btn-secondary"
                    style={{ padding: '2px 6px', fontSize: '0.72rem' }}
                  >
                    {copiedAccount === 'e-Mola' ? <Check size={11} /> : <Copy size={11} />}
                  </button>
                </div>
                <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#000000' }}>
                  879 817 847
                </div>
                <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '2px' }}>
                  Silva Jermane Hlatswayo
                </div>
              </div>

              {/* M-PESA */}
              <div
                style={{
                  border: '1px solid #E5E5E5',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#000000' }}>M-Pesa</span>
                  <button
                    onClick={() => handleCopy('842737924', 'M-Pesa')}
                    className="btn btn-sm btn-secondary"
                    style={{ padding: '2px 6px', fontSize: '0.72rem' }}
                  >
                    {copiedAccount === 'M-Pesa' ? <Check size={11} /> : <Copy size={11} />}
                  </button>
                </div>
                <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#000000' }}>
                  842 737 924
                </div>
                <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '2px' }}>
                  Silva Jermane Hlatswayo
                </div>
              </div>

            </div>

            {/* CTA JÁ PAGUEI */}
            <button
              onClick={() => setStep('form')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Já Paguei (Enviar Comprovativo) <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: FORM */}
        {step === 'form' && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  placeholder="+258 84..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Método *</label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="form-select"
                >
                  <option value="M-Pesa">M-Pesa (842 737 924)</option>
                  <option value="e-Mola">e-Mola (879 817 847)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Valor</label>
                <input
                  type="text"
                  value="1.500 MT"
                  disabled
                  className="form-input"
                  style={{ backgroundColor: '#F8F8F8', fontWeight: 700 }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Código da Transação *</label>
                <input
                  type="text"
                  placeholder="Ex: MP260815..."
                  value={formData.transactionCode}
                  onChange={(e) => setFormData({ ...formData, transactionCode: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* UPLOAD COMPROVATIVO */}
            <div className="form-group">
              <label className="form-label">Comprovativo (Imagem / Recibo)</label>
              <div
                style={{
                  border: '1px dashed #A3A3A3',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#FAFAFA',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="file"
                  id="proof-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="proof-upload" style={{ cursor: 'pointer', display: 'block', fontSize: '0.82rem', color: '#000000', fontWeight: 600 }}>
                  <Upload size={18} style={{ margin: '0 auto 4px' }} />
                  <div>Clique para anexar o comprovativo</div>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              <button
                type="button"
                onClick={() => setStep('instructions')}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Voltar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                Confirmar Pagamento
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS & CONFIRMATION */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#10B981', color: '#FFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
              <Check size={32} strokeWidth={3} />
            </div>

            <span className="badge badge-green" style={{ marginBottom: '8px' }}>
              ✓ Comprovativo Registado com Sucesso
            </span>

            <h3 style={{ fontSize: '1.35rem', color: '#000000', marginBottom: '8px', fontWeight: 900 }}>
              Obrigado, {formData.name.split(' ')[0]}!
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#666666', marginBottom: '20px', lineHeight: 1.5, maxWidth: '440px', margin: '0 auto 20px' }}>
              A sua inscrição foi enviada para o painel de validação. Para acelerar a libertação imediata das aulas, envie uma mensagem ao Diretor Silva Jermane via WhatsApp:
            </p>

            {/* RECIBO RESUMO */}
            <div style={{ backgroundColor: '#F8F8F8', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '14px 18px', textAlign: 'left', marginBottom: '20px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#666' }}>Aluno:</span>
                <strong style={{ color: '#000' }}>{formData.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#666' }}>Canal de Pagamento:</span>
                <strong style={{ color: '#000' }}>{formData.method} (1.500 MT)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#666' }}>Código da Transação:</span>
                <strong style={{ color: '#000', fontFamily: 'var(--font-mono)' }}>{formData.transactionCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Status Atual:</span>
                <span className="badge badge-dark" style={{ fontSize: '0.68rem' }}>Pendente de Validação</span>
              </div>
            </div>

            {/* AÇÕES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`https://wa.me/258879817847?text=${encodeURIComponent(`Olá Silva Jermane, fiz o pagamento de 1.500 MT para a Escola de Produção Musical.\n\nNome: ${formData.name}\nCanal: ${formData.method}\nCódigo de Transação: ${formData.transactionCode}\n\nPode confirmar o meu acesso, por favor?`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', backgroundColor: '#25D366', borderColor: '#25D366', color: '#FFFFFF', padding: '12px' }}
              >
                <MessageCircle size={16} /> Acelerar no WhatsApp (+258 879 817 847)
              </a>

              <button
                onClick={onClose}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Fechar e Continuar Navegando
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

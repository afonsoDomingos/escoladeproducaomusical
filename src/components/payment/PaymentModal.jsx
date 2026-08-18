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
  ArrowRight
} from 'lucide-react';

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

        {/* STEP 3: SUCCESS */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <CheckCircle2 size={40} color="#000000" style={{ margin: '0 auto 12px' }} />

            <h3 style={{ fontSize: '1.25rem', color: '#000000', marginBottom: '6px', fontWeight: 800 }}>
              Pagamento Enviado com Sucesso
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#666666', marginBottom: '18px', lineHeight: 1.5 }}>
              A sua inscrição será analisada pela nossa equipa. O acesso às aulas premium será liberado assim que confirmado.
            </p>

            <span className="badge badge-dark" style={{ marginBottom: '20px' }}>Status: Pendente</span>

            <div>
              <button onClick={onClose} className="btn btn-primary" style={{ minWidth: '160px' }}>
                Entendido
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

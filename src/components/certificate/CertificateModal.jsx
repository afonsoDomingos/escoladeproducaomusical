import React from 'react';
import { X, Download, Award, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal = ({ isOpen, onClose, certificate, onVerify }) => {
  if (!isOpen || !certificate) return null;

  const handleDownload = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '760px', padding: '24px', backgroundColor: '#FFFFFF' }}
      >
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#000000' }}>
            Certificado Oficial
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={handleDownload} className="btn btn-sm btn-primary">
              <Download size={13} /> Imprimir / Baixar
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* FRAME CERTIFICADO PRETO & BRANCO */}
        <div
          id="printable-certificate"
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #000000',
            borderRadius: '8px',
            padding: '36px 28px',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', color: '#666666', textTransform: 'uppercase' }}>
            APM • Academia de Produção Musical
          </div>

          
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginTop: '4px', letterSpacing: '-0.02em' }}>
            CERTIFICADO DE CONCLUSÃO
          </h1>

          <div style={{ width: '40px', height: '2px', backgroundColor: '#000000', margin: '12px auto 18px' }}></div>

          <p style={{ fontSize: '0.92rem', color: '#666666', marginBottom: '6px' }}>
            Certificamos que
          </p>

          <div 
            style={{ 
              fontSize: '1.6rem', 
              fontWeight: 800, 
              color: '#000000',
              borderBottom: '1px solid #CCCCCC',
              display: 'inline-block',
              padding: '0 20px 4px',
              marginBottom: '14px'
            }}
          >
            {certificate.userName}
          </div>

          <p style={{ fontSize: '0.92rem', color: '#444444', maxWidth: '540px', margin: '0 auto 18px', lineHeight: 1.5 }}>
            concluiu com êxito a formação profissional em:
          </p>

          <div
            style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#000000',
              backgroundColor: '#F5F5F5',
              padding: '8px 20px',
              borderRadius: '4px',
              display: 'inline-block',
              marginBottom: '28px',
              border: '1px solid #E5E5E5'
            }}
          >
            {certificate.courseTitle}
          </div>

          {/* DETAILS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px',
              alignItems: 'flex-end',
              borderTop: '1px solid #E5E5E5',
              paddingTop: '18px'
            }}
          >
            <div style={{ textAlign: 'left', fontSize: '0.78rem', color: '#666666' }}>
              <div><strong>Carga:</strong> {certificate.workload || '20 Horas'}</div>
              <div><strong>Data:</strong> {certificate.issueDate}</div>
              <div><strong>Código:</strong> {certificate.certificateNumber}</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  margin: '0 auto 4px',
                  backgroundColor: '#F5F5F5',
                  border: '1px solid #D4D4D4',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <Shield size={20} color="#000000" />
              </div>
              <div style={{ fontSize: '0.68rem', color: '#000000', fontWeight: 600 }}>
                {certificate.verificationCode}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#000000', borderBottom: '1px solid #000000', paddingBottom: '2px', marginBottom: '2px', display: 'inline-block' }}>
                Jayon Tivane
              </div>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#000000' }}>
                Jayon Tivane (Silva Jermane)
              </div>
              <div style={{ fontSize: '0.68rem', color: '#666666' }}>
                Diretor & Mentor • APM
              </div>
            </div>

          </div>
        </div>

        {/* VERIFICATION SHORTCUT */}
        <div style={{ marginTop: '14px', textAlign: 'center' }}>
          <button
            onClick={() => { onClose(); onVerify(certificate.verificationCode); }}
            style={{ background: 'none', border: 'none', color: '#000000', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Validar este certificado por código →
          </button>
        </div>

      </div>
    </div>
  );
};

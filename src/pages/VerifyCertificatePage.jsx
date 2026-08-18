import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Printer,
  Sparkles
} from 'lucide-react';

export const VerifyCertificatePage = ({ initialCode = '', onOpenCertificate }) => {
  const { getCertificateByCode } = useDatabase();
  const [searchCode, setSearchCode] = useState(initialCode);
  const [searchResult, setSearchResult] = useState(() => initialCode ? getCertificateByCode(initialCode) : null);
  const [hasSearched, setHasSearched] = useState(Boolean(initialCode));

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const cert = getCertificateByCode(searchCode.trim());
    setSearchResult(cert);
    setHasSearched(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '85vh', padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'var(--purple-100)',
              color: 'var(--purple-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <ShieldCheck size={32} />
          </div>

          <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Validação Pública Oficial</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--purple-950)', fontWeight: 800 }}>
            Verificar Autenticidade de Certificado
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Insira o código de autenticação do certificado (ex: <code>EPM-7841-VERIF</code> ou <code>EPM-2026-BM-7841</code>) para confirmar a validade oficial emitida pela Escola de Produção Musical.
          </p>
        </div>

        {/* SEARCH FORM */}
        <div
          className="card"
          style={{
            padding: '24px 32px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '32px',
            border: '1.5px solid var(--border-purple)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <input
                type="text"
                placeholder="Insira o código do certificado (ex: EPM-7841-VERIF)..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px', fontWeight: 600, textTransform: 'uppercase' }}
                required
              />
              <Search size={18} color="var(--purple-400)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontWeight: 700 }}>
              Verificar Certificado
            </button>
          </form>

          <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            💡 Dica: O código de validação está impresso no rodapé e no QR Code de todos os certificados emitidos.
          </div>
        </div>

        {/* RESULT PRESENTATION */}
        {hasSearched && (
          searchResult ? (
            <div
              className="card"
              style={{
                padding: '36px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid #10B981',
                boxShadow: 'var(--shadow-xl)',
                animation: 'modalPop 0.3s ease'
              }}
            >
              {/* SUCCESS BADGE */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--emerald-50)',
                      color: 'var(--emerald-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--purple-950)', fontWeight: 800 }}>
                      Certificado Válido & Autêntico
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--emerald-600)', fontWeight: 700 }}>
                      Registro Oficial Confirmado na Base de Dados
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCertificate(searchResult)}
                  className="btn btn-gold btn-sm"
                  style={{ fontWeight: 700 }}
                >
                  <Award size={16} /> Ver Documento Oficial
                </button>
              </div>

              {/* CERTIFICATE DETAILS GRID */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  backgroundColor: 'var(--purple-50)',
                  padding: '24px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--purple-200)',
                  marginBottom: '24px'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Nome do Aluno</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--purple-950)', marginTop: '2px' }}>{searchResult.userName}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Curso Concluído</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--purple-800)', marginTop: '2px' }}>{searchResult.courseTitle}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Carga Horária</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{searchResult.workload}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Data de Emissão</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{searchResult.issueDate}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Código do Certificado</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--purple-900)', marginTop: '2px' }}>{searchResult.certificateNumber}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Mentor Responsável</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{searchResult.director}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Este documento foi emitido e assinado digitalmente sob a chancela da <strong>Escola de Produção Musical</strong> em Maputo, Moçambique.
              </div>
            </div>
          ) : (
            <div
              className="card"
              style={{
                padding: '36px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '2px solid #EF4444',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--rose-50)',
                  color: 'var(--rose-500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <XCircle size={32} />
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--purple-950)', marginBottom: '8px' }}>
                Certificado Não Encontrado
              </h3>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 16px' }}>
                O código <strong>"{searchCode}"</strong> não corresponde a nenhum registro válido na nossa base de dados. Por favor verifique a digitação do código.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
};

import React from 'react';
import { 
  Music, 
  Phone, 
  Mail, 
  MapPin
} from 'lucide-react';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer = ({ setActivePage }) => {
  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        paddingTop: '50px',
        paddingBottom: '30px',
        borderTop: '1px solid #262626'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '40px'
          }}
        >
          {/* BRAND */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div 
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Music size={16} />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>
                ESCOLA DE PRODUÇÃO MUSICAL
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#888888', marginBottom: '16px', lineHeight: 1.5 }}>
              Formação prática em Produção Musical, Beat Making, Mixagem e Masterização em Moçambique.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="https://www.facebook.com/JAYONMZ" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#171717', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333333' }}>
                <FacebookIcon />
              </a>
              <a href="https://www.youtube.com/@jayontivane4672" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#171717', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333333' }}>
                <YoutubeIcon />
              </a>
              <a href="https://www.instagram.com/jayon_tivane" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#171717', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333333' }}>
                <InstagramIcon />
              </a>
              <a href="https://wa.me/258879817847" target="_blank" rel="noreferrer" style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: '#171717', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333333' }}>
                <Phone size={14} />
              </a>
            </div>
          </div>

          {/* CURSOS */}
          <div>
            <div style={{ fontSize: '0.88rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 700 }}>
              Cursos
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li>
                <button onClick={() => setActivePage('cursos')} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Curso de Beat Maker
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('cursos')} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Curso de Masterização
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('cursos')} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Curso de Produção Musical
                </button>
              </li>
            </ul>
          </div>

          {/* SERVIÇOS */}
          <div>
            <div style={{ fontSize: '0.88rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 700 }}>
              Recursos
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li>
                <button onClick={() => setActivePage('plugins')} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Biblioteca de Plugins
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('aulas-ao-vivo')} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Aulas ao Vivo
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('verificar-certificado')} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  Verificar Certificado
                </button>
              </li>
            </ul>
          </div>

          {/* CONTATO */}
          <div>
            <div style={{ fontSize: '0.88rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 700 }}>
              Contas Oficiais
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#888888' }}>
              <div>e-Mola: <strong>879 817 847</strong></div>
              <div>M-Pesa: <strong>842 737 924</strong></div>
              <div style={{ color: '#FFFFFF' }}>Titular: Silva Jermane Hlatswayo</div>
              <div>Email: silvativane.3@gmail.com</div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          style={{
            borderTop: '1px solid #262626',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.78rem',
            color: '#666666'
          }}
        >
          <div>
            © {new Date().getFullYear()} Escola de Produção Musical. Todos os direitos reservados.
          </div>
          <div>
            Mentor: Silva Jermane Hlatswayo
          </div>
        </div>
      </div>
    </footer>
  );
};

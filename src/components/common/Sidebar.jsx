import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Music, 
  Home,
  BookOpen, 
  PlayCircle, 
  Download, 
  Video, 
  Sliders, 
  Award, 
  CreditCard, 
  User, 
  LogOut, 
  Shield, 
  GraduationCap,
  Menu,
  X,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';

export const Sidebar = ({ activePage, setActivePage, onOpenAuth, onOpenPayment }) => {
  const { currentUser, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'beats-store', label: 'Loja de Beats', icon: ShoppingBag, badge: 'Comprar' },
    { id: 'cursos', label: 'Cursos & Aulas', icon: BookOpen },
    { id: 'aula-gratuita', label: 'Aula Gratuita', icon: PlayCircle, badge: 'Grátis' },
    { id: 'plugins', label: 'Plugins & Recursos', icon: Download },
    { id: 'aulas-ao-vivo', label: 'Aulas ao Vivo', icon: Video },
    { id: 'area-master', label: 'Área de Master', icon: Sliders },
    { id: 'verificar-certificado', label: 'Certificados', icon: Award }
  ];


  return (
    <>
      {/* MOBILE HEADER BAR (ONLY ON MOBILE/TABLET) */}
      <div
        className="show-on-mobile"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 990,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E5E5',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div style={{ width: '28px', height: '28px', backgroundColor: '#000000', color: '#FFF', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem' }}>
            APM
          </div>
          <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#000000', letterSpacing: '0.5px' }}>APM</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {(!currentUser || currentUser.enrollmentStatus !== 'approved') && (
            <button onClick={onOpenPayment} className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
              1.500 MT
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              backgroundColor: '#F5F5F5',
              border: '1px solid #E5E5E5',
              borderRadius: '4px',
              padding: '6px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div
          className="show-on-mobile"
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}

      {/* MAIN DEDICATED LEFT SIDEBAR */}
      <aside
        className={`global-sidebar ${mobileOpen ? 'open' : ''}`}
        style={{
          width: '250px',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E5E5',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 14px',
          zIndex: 999,
          flexShrink: 0
        }}
      >
        {/* TOP SECTION: BRAND & NAVIGATION */}
        <div>
          {/* BRAND */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer', 
              paddingBottom: '20px', 
              borderBottom: '1px solid #F0F0F0',
              marginBottom: '20px'
            }}
          >
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '0.85rem',
                letterSpacing: '-0.5px',
                flexShrink: 0
              }}
            >
              APM
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.98rem', lineHeight: 1.15, color: '#000000', letterSpacing: '-0.02em' }}>
                APM ACADEMY
              </div>
              <div style={{ fontSize: '0.65rem', color: '#666666', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Jayon Tivane
              </div>
            </div>
          </div>


          {/* MENU TITLE */}
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
            Menu Principal
          </div>

          {/* NAVIGATION LINKS */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {navLinks.map((link) => {
              const IconC = link.icon;
              const isActive = activePage === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    border: 'none',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? '#000000' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#333333',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.1s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IconC size={16} color={isActive ? '#FFFFFF' : '#000000'} />
                    <span>{link.label}</span>
                  </div>

                  {link.badge && (
                    <span 
                      style={{ 
                        fontSize: '0.65rem', 
                        fontWeight: 700, 
                        padding: '1px 5px', 
                        borderRadius: '3px',
                        backgroundColor: isActive ? '#333333' : '#F5F5F5',
                        color: isActive ? '#FFFFFF' : '#000000',
                        border: '1px solid #D4D4D4'
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* USER ROLES SHORTCUTS */}
          {currentUser && (
            <div style={{ marginTop: '18px', borderTop: '1px solid #F0F0F0', paddingTop: '14px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
                Área de Membros
              </div>

              {currentUser.role === 'admin' ? (
                <button
                  onClick={() => handleNavClick('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    border: activePage === 'admin' ? '1px solid #000000' : '1px solid #E5E5E5',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    backgroundColor: activePage === 'admin' ? '#000000' : '#FAFAFA',
                    color: activePage === 'admin' ? '#FFFFFF' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  <Shield size={16} />
                  <span>Painel Administrativo</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    border: activePage === 'dashboard' ? '1px solid #000000' : '1px solid #E5E5E5',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    backgroundColor: activePage === 'dashboard' ? '#000000' : '#FAFAFA',
                    color: activePage === 'dashboard' ? '#FFFFFF' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  <GraduationCap size={16} />
                  <span>Painel do Aluno</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: USER CARD & ENROLLMENT CTA */}
        <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '16px' }}>
          
          {/* CTA INSCRIÇÃO */}
          {(!currentUser || currentUser.enrollmentStatus !== 'approved') && (
            <button
              onClick={onOpenPayment}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '0.84rem',
                marginBottom: '12px',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <CreditCard size={14} /> Inscrever-se (1.500 MT)
            </button>
          )}

          {/* USER PROFILE INFO OR LOGIN */}
          {currentUser ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', backgroundColor: '#F8F8F8', borderRadius: '4px', border: '1px solid #E5E5E5', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '3px', backgroundColor: '#000000', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#000000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#666666' }}>
                      {currentUser.role === 'admin' ? '👑 Admin' : '🎓 Aluno Aprovado'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { logout(); setActivePage('home'); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626', padding: '4px' }}
                  title="Sair da Conta"
                >
                  <LogOut size={14} />
                </button>
              </div>

              {/* ATALHOS RÁPIDOS DIRETO NA SIDEBAR */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                <button
                  onClick={() => {
                    handleNavClick('admin');
                  }}
                  style={{
                    padding: '3px 4px',
                    fontSize: '0.68rem',
                    borderRadius: '3px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: currentUser.role === 'admin' ? '#000000' : '#FFFFFF',
                    color: currentUser.role === 'admin' ? '#FFFFFF' : '#333333',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                  title="Mudar para Silva (Admin)"
                >
                  👑 Silva Admin
                </button>

                <button
                  onClick={() => {
                    handleNavClick('dashboard');
                  }}
                  style={{
                    padding: '3px 4px',
                    fontSize: '0.68rem',
                    borderRadius: '3px',
                    border: '1px solid #E5E5E5',
                    backgroundColor: currentUser.role === 'student' ? '#000000' : '#FFFFFF',
                    color: currentUser.role === 'student' ? '#FFFFFF' : '#333333',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                  title="Mudar para Afonso (Aluno)"
                >
                  🎓 Afonso Aluno
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <User size={14} /> Entrar na Conta
            </button>
          )}
        </div>
      </aside>
    </>
  );
};


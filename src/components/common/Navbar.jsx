import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Music, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Shield, 
  GraduationCap, 
  PlayCircle, 
  CreditCard,
  ChevronDown,
  BookOpen,
  Download,
  Video,
  Sliders,
  Award,
  ArrowRight
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage, onOpenAuth, onOpenPayment }) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Auto close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Início', icon: Music },
    { id: 'cursos', label: 'Cursos', icon: BookOpen },
    { id: 'aula-gratuita', label: 'Aula Gratuita', icon: PlayCircle },
    { id: 'plugins', label: 'Plugins', icon: Download },
    { id: 'aulas-ao-vivo', label: 'Aulas ao Vivo', icon: Video },
    { id: 'area-master', label: 'Área de Master', icon: Sliders },
    { id: 'verificar-certificado', label: 'Certificados', icon: Award }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E5E5'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          
          {/* LOGO */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
          >
            <div 
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '6px',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Music size={17} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#000000' }}>
                ESCOLA DE PRODUÇÃO MUSICAL
              </div>
              <div style={{ fontSize: '0.65rem', color: '#666666', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Academia Profissional • Silva Jermane
              </div>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hide-tablet-mobile" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: activePage === item.id ? 700 : 500,
                  color: activePage === item.id ? '#000000' : '#666666',
                  cursor: 'pointer',
                  borderBottom: activePage === item.id ? '2px solid #000000' : '2px solid transparent',
                  padding: '6px 2px',
                  transition: 'color 0.15s'
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ACTIONS & USER CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* CTA Inscrever-se (Desktop) */}
            {(!currentUser || currentUser.enrollmentStatus !== 'approved') && (
              <button
                onClick={() => onOpenPayment()}
                className="btn btn-primary btn-sm hide-tablet-mobile"
              >
                <CreditCard size={13} /> Inscrever-se (1.500 MT)
              </button>
            )}

            {/* Profile Dropdown (Desktop & Quick access) */}
            {currentUser ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#F5F5F5',
                    border: '1px solid #E5E5E5',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '3px',
                      backgroundColor: '#000000',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hide-mobile" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#000000' }}>
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={12} color="#666666" />
                </button>

                {profileDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      right: 0,
                      width: '220px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '6px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                      border: '1px solid #E5E5E5',
                      padding: '6px',
                      zIndex: 1000,
                      animation: 'modalPop 0.15s ease'
                    }}
                  >
                    <div style={{ padding: '8px 10px', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#000000' }}>{currentUser.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#666666' }}>{currentUser.email}</div>
                    </div>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'flex-start', margin: '4px 0', border: 'none' }}
                      >
                        <Shield size={13} /> Painel Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', justifyContent: 'flex-start', margin: '4px 0', border: 'none' }}
                      >
                        <GraduationCap size={13} /> Painel do Aluno
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        setActivePage('home');
                      }}
                      className="btn btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', color: '#DC2626', background: 'none', border: 'none', padding: '6px 10px' }}
                    >
                      <LogOut size={13} /> Terminar Sessão
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-secondary btn-sm"
              >
                <User size={13} /> Entrar
              </button>
            )}

            {/* Mobile / Tablet Menu Button Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="show-tablet-mobile"
              style={{
                background: '#F5F5F5',
                border: '1px solid #E5E5E5',
                borderRadius: '4px',
                padding: '6px 8px',
                cursor: 'pointer',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* RESPONSIVE MOBILE DRAWER / OVERLAY */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 899,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'modalPop 0.2s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '340px',
              backgroundColor: '#FFFFFF',
              height: '100%',
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.1)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>
                Navegação
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navLinks.map((item) => {
                  const IconC = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '4px',
                        backgroundColor: isActive ? '#000000' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#000000',
                        border: 'none',
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IconC size={16} />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight size={14} style={{ opacity: isActive ? 1 : 0.3 }} />
                    </button>
                  );
                })}
              </div>

              {/* USER PROFILE SECTION IN MOBILE */}
              {currentUser && (
                <div style={{ marginTop: '20px', borderTop: '1px solid #E5E5E5', paddingTop: '16px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Sua Conta
                  </div>

                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '6px' }}
                    >
                      <Shield size={14} /> Painel Administrativo
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', marginBottom: '6px' }}
                    >
                      <GraduationCap size={14} /> Painel do Aluno
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      setActivePage('home');
                    }}
                    className="btn btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start', color: '#DC2626', background: 'none', border: 'none', padding: '6px 8px' }}
                  >
                    <LogOut size={14} /> Sair da Conta
                  </button>
                </div>
              )}
            </div>

            {/* BOTTOM CTA IN MOBILE */}
            {(!currentUser || currentUser.enrollmentStatus !== 'approved') && (
              <div style={{ marginTop: '24px', borderTop: '1px solid #E5E5E5', paddingTop: '16px' }}>
                <button
                  onClick={() => { onOpenPayment(); setMobileMenuOpen(false); }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <CreditCard size={15} /> Inscrever-se (1.500 MT)
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

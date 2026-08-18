import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, CheckCircle, UserX, Sparkles } from 'lucide-react';

export const RoleSwitcher = ({ setActivePage }) => {
  const { currentUser, switchRole } = useAuth();

  const handleSwitch = (role) => {
    switchRole(role);
    if (setActivePage) {
      if (role === 'admin') setActivePage('admin');
      else if (role === 'student_paid') setActivePage('dashboard');
      else if (role === 'guest') setActivePage('home');
    }
  };

  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student' && currentUser?.enrollmentStatus === 'approved';
  const isGuest = !currentUser;

  return (
    <div
      style={{
        backgroundColor: '#09090B',
        color: '#FFFFFF',
        padding: '6px 16px',
        fontSize: '0.78rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        zIndex: 9999,
        borderBottom: '1px solid #27272A',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#A1A1AA', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>
          <Sparkles size={12} color="#F59E0B" /> MODO DE TESTES / DEV:
        </span>
        <span style={{ fontWeight: 700, color: '#FAFAFA' }}>
          {isAdmin && '👑 Silva Jermane (Administrador)'}
          {isStudent && '🎓 Afonso Domingos (Aluno Matriculado)'}
          {isGuest && '👤 Visitante (Não Autenticado)'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', color: '#71717A', marginRight: '2px' }}>Alternar para:</span>

        {/* BOTAO ADMIN */}
        <button
          onClick={() => handleSwitch('admin')}
          className="btn btn-sm"
          style={{
            padding: '3px 10px',
            fontSize: '0.74rem',
            backgroundColor: isAdmin ? '#FFFFFF' : '#18181B',
            color: isAdmin ? '#09090B' : '#D4D4D8',
            border: isAdmin ? '1px solid #FFFFFF' : '1px solid #3F3F46',
            fontWeight: isAdmin ? 800 : 500,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          title="Entrar como Administrador e abrir painel de gestão"
        >
          <Shield size={12} /> 👑 Admin (Silva)
        </button>

        {/* BOTAO ALUNO */}
        <button
          onClick={() => handleSwitch('student_paid')}
          className="btn btn-sm"
          style={{
            padding: '3px 10px',
            fontSize: '0.74rem',
            backgroundColor: isStudent ? '#FFFFFF' : '#18181B',
            color: isStudent ? '#09090B' : '#D4D4D8',
            border: isStudent ? '1px solid #FFFFFF' : '1px solid #3F3F46',
            fontWeight: isStudent ? 800 : 500,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          title="Entrar como Aluno Aprovado e abrir sala de aulas"
        >
          <CheckCircle size={12} /> 🎓 Aluno (Afonso)
        </button>

        {/* BOTAO VISITANTE */}
        <button
          onClick={() => handleSwitch('guest')}
          className="btn btn-sm"
          style={{
            padding: '3px 10px',
            fontSize: '0.74rem',
            backgroundColor: isGuest ? '#FFFFFF' : '#18181B',
            color: isGuest ? '#09090B' : '#A1A1AA',
            border: isGuest ? '1px solid #FFFFFF' : '1px solid #27272A',
            fontWeight: isGuest ? 800 : 500,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          title="Deslogar e ver como visitante"
        >
          <UserX size={12} /> 👤 Visitante
        </button>
      </div>
    </div>
  );
};


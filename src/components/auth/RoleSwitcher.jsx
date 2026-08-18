import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, CheckCircle, Clock, UserX } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentUser, switchRole } = useAuth();

  return (
    <div
      style={{
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        padding: '5px 16px',
        fontSize: '0.76rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        zIndex: 1000,
        borderBottom: '1px solid #262626'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: '#888888' }}>Simulador de Acesso:</span>
        <span style={{ fontWeight: 600 }}>
          {currentUser ? `${currentUser.name} (${currentUser.role === 'admin' ? 'Admin' : currentUser.enrollmentStatus === 'approved' ? 'Aluno Pago' : 'Pendente'})` : 'Visitante'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
        <button
          onClick={() => switchRole('admin')}
          className="btn btn-sm"
          style={{
            padding: '2px 8px',
            fontSize: '0.72rem',
            backgroundColor: currentUser?.role === 'admin' ? '#FFFFFF' : '#1A1A1A',
            color: currentUser?.role === 'admin' ? '#000000' : '#CCCCCC',
            border: '1px solid #333333'
          }}
        >
          <Shield size={11} /> Admin (Silva)
        </button>

        <button
          onClick={() => switchRole('student_paid')}
          className="btn btn-sm"
          style={{
            padding: '2px 8px',
            fontSize: '0.72rem',
            backgroundColor: currentUser?.role === 'student' && currentUser?.enrollmentStatus === 'approved' ? '#FFFFFF' : '#1A1A1A',
            color: currentUser?.enrollmentStatus === 'approved' ? '#000000' : '#CCCCCC',
            border: '1px solid #333333'
          }}
        >
          <CheckCircle size={11} /> Aluno Pago
        </button>

        <button
          onClick={() => switchRole('student_pending')}
          className="btn btn-sm"
          style={{
            padding: '2px 8px',
            fontSize: '0.72rem',
            backgroundColor: currentUser?.role === 'student' && currentUser?.enrollmentStatus === 'pending' ? '#FFFFFF' : '#1A1A1A',
            color: currentUser?.enrollmentStatus === 'pending' ? '#000000' : '#CCCCCC',
            border: '1px solid #333333'
          }}
        >
          <Clock size={11} /> Aluno Pendente
        </button>

        <button
          onClick={() => switchRole('guest')}
          className="btn btn-sm"
          style={{
            padding: '2px 8px',
            fontSize: '0.72rem',
            backgroundColor: !currentUser ? '#FFFFFF' : '#1A1A1A',
            color: !currentUser ? '#000000' : '#CCCCCC',
            border: '1px solid #333333'
          }}
        >
          <UserX size={11} /> Visitante
        </button>
      </div>
    </div>
  );
};

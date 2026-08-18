import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const Toast = () => {
  const { toastMessage } = useDatabase();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isError = toastMessage.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#FFFFFF',
        color: '#0F172A',
        padding: '14px 20px',
        borderRadius: '12px',
        border: `1px solid ${isSuccess ? '#10B981' : isError ? '#EF4444' : '#7C3AED'}`,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        animation: 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '420px'
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={22} color="#10B981" />
      ) : isError ? (
        <AlertCircle size={22} color="#EF4444" />
      ) : (
        <Info size={22} color="#7C3AED" />
      )}
      <div style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>
        {toastMessage.message}
      </div>
    </div>
  );
};

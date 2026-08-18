import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDatabase } from '../../context/DatabaseContext';
import { X, Lock, Mail, User, Phone, AlertCircle } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register } = useAuth();
  const { showToast } = useDatabase();

  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Preencha todos os campos.');
      return;
    }
    const res = login(formData.email, formData.password);
    if (res.success) {
      showToast(`Bem-vindo, ${res.user.name}!`, 'success');
      onClose();
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As palavras-passe não coincidem.');
      return;
    }

    const res = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (res.success) {
      showToast('Conta criada com sucesso!', 'success');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '480px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
              {mode === 'login' && 'Entrar na Plataforma'}
              {mode === 'register' && 'Criar Conta de Aluno'}
              {mode === 'forgot' && 'Recuperar Palavra-passe'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '8px 12px', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '4px', fontSize: '0.82rem', marginBottom: '14px', border: '1px solid #FECACA' }}>
            {error}
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="seuemail@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Palavra-passe</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              Entrar
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.84rem', color: '#666666' }}>
              Ainda não tem conta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                style={{ background: 'none', border: 'none', color: '#000000', fontWeight: 700, cursor: 'pointer' }}
              >
                Cadastre-se grátis
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Telefone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+258 84..."
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div className="form-group">
                <label className="form-label">Palavra-passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirmar</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
              Criar Conta
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.84rem', color: '#666666' }}>
              Já tem conta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{ background: 'none', border: 'none', color: '#000000', fontWeight: 700, cursor: 'pointer' }}
              >
                Fazer Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

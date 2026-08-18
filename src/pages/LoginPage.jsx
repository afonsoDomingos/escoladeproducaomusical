import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDatabase } from '../context/DatabaseContext';
import { 
  Music, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { AudioWaveVisualizer } from '../components/audio/AudioWaveVisualizer';

export const LoginPage = ({ setActivePage }) => {
  const { login, register, setCurrentUser } = useAuth();
  const { students, showToast } = useDatabase();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Por favor preencha o seu email e palavra-passe.');
      return;
    }

    const res = login(formData.email, formData.password);
    if (res.success) {
      showToast(`Bem-vindo de volta, ${res.user.name}!`, 'success');
      if (res.user.role === 'admin') {
        setActivePage('admin');
      } else {
        setActivePage('dashboard');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As palavras-passe digitadas não coincidem.');
      return;
    }

    const res = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (res.success) {
      showToast('Conta criada com sucesso! Seja bem-vindo à Escola.', 'success');
      setActivePage('aula-gratuita');
    }
  };

  const handleQuickLogin = (roleType) => {
    if (roleType === 'admin') {
      const adminUser = students.find(s => s.role === 'admin') || {
        id: 'usr-admin',
        name: 'Silva Jermane Hlatswayo',
        email: 'silvativane.3@gmail.com',
        role: 'admin',
        enrollmentStatus: 'approved'
      };
      setCurrentUser(adminUser);
      showToast('Acesso de Administrador (Silva Jermane) concedido!', 'success');
      setActivePage('admin');
    } else if (roleType === 'student') {
      const studentUser = students.find(s => s.enrollmentStatus === 'approved' && s.role !== 'admin') || {
        id: 'usr-student',
        name: 'Carlos Tivane',
        email: 'carlos.aluno@gmail.com',
        role: 'student',
        enrollmentStatus: 'approved'
      };
      setCurrentUser(studentUser);
      showToast('Login como Aluno Pago realizado!', 'success');
      setActivePage('dashboard');
    } else {
      const guestUser = {
        id: 'usr-guest',
        name: 'Visitante',
        email: 'visitante@gmail.com',
        role: 'guest',
        enrollmentStatus: 'none'
      };
      setCurrentUser(guestUser);
      showToast('Sessão iniciada como Visitante.', 'info');
      setActivePage('home');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#F8F8F8',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-elevated)',
          padding: '36px 32px'
        }}
      >
        {/* BRAND & HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            onClick={() => setActivePage('home')}
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#09090B',
              color: '#FFFFFF',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              cursor: 'pointer'
            }}
          >
            <Music size={22} />
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#09090B', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            {mode === 'login' ? 'Entrar na Plataforma' : 'Criar Nova Conta'}
          </h2>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Escola de Produção Musical • Silva Jermane
          </p>

          <div style={{ margin: '14px 0 6px' }}>
            <AudioWaveVisualizer isPlaying={true} height={16} barCount={32} color="#09090B" />
          </div>
        </div>

        {/* MODE SWITCHER TABS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#F4F4F5',
            padding: '4px',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '20px'
          }}
        >
          <button
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              padding: '7px 0',
              border: 'none',
              borderRadius: '3px',
              fontSize: '0.84rem',
              fontWeight: mode === 'login' ? 700 : 500,
              backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
              color: mode === 'login' ? '#09090B' : '#71717A',
              boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer'
            }}
          >
            Fazer Login
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              padding: '7px 0',
              border: 'none',
              borderRadius: '3px',
              fontSize: '0.84rem',
              fontWeight: mode === 'register' ? 700 : 500,
              backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
              color: mode === 'register' ? '#09090B' : '#71717A',
              boxShadow: mode === 'register' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer'
            }}
          >
            Criar Conta
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div style={{ padding: '9px 12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {/* FORM: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
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
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Palavra-passe</label>
                <span style={{ fontSize: '0.74rem', color: '#71717A', cursor: 'pointer' }}>Esqueceu?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#71717A' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '11px', marginTop: '6px' }}>
              Entrar na Conta <ArrowRight size={15} />
            </button>
          </form>
        )}

        {/* FORM: REGISTER */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Nome Completo *</label>
              <input
                type="text"
                name="name"
                placeholder="Ex: João Matusse"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
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
              <label className="form-label">Telefone / WhatsApp *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+258 84 000 0000"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div className="form-group">
                <label className="form-label">Palavra-passe *</label>
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

              <div className="form-group">
                <label className="form-label">Confirmar *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '11px', marginTop: '6px' }}>
              Criar Minha Conta Grátis
            </button>
          </form>
        )}

        {/* ATALHOS RÁPIDOS DE ACESSO DEMO */}
        <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '24px', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center' }}>
            Acesso Rápido de Demonstração:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', fontSize: '0.78rem' }}
            >
              👑 Entrar como <strong>Silva Jermane (Admin)</strong>
            </button>

            <button
              onClick={() => handleQuickLogin('student')}
              className="btn btn-secondary btn-sm"
              style={{ justifyContent: 'flex-start', fontSize: '0.78rem' }}
            >
              🎓 Entrar como <strong>Aluno Matriculado (1.500 MT)</strong>
            </button>
          </div>
        </div>

        {/* BACK TO HOME */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={() => setActivePage('home')}
            style={{ background: 'none', border: 'none', fontSize: '0.82rem', color: '#71717A', cursor: 'pointer', textDecoration: 'underline' }}
          >
            ← Voltar para a Página Inicial
          </button>
        </div>

      </div>
    </div>
  );
};

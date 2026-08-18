import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/initialData';

const AuthContext = createContext();

const STORAGE_KEY = 'epm_current_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_USERS[1]; // Padrão: Aluno Demo Pago (João Mabunda)
    } catch {
      return INITIAL_USERS[1];
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (email, password) => {
    // Busca usuário nos usuários salvos ou dados iniciais
    const users = JSON.parse(localStorage.getItem('epm_users') || JSON.stringify(INITIAL_USERS));
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    } else if (email.toLowerCase().includes('admin')) {
      const adminUser = INITIAL_USERS[0];
      setCurrentUser(adminUser);
      return { success: true, user: adminUser };
    } else {
      // Cria um usuário aluno genérico se for login rápido
      const newUser = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: "+258 840 000 000",
        role: "student",
        enrollmentStatus: "none",
        completedLessons: [],
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const register = ({ name, email, phone, password }) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'student',
      enrollmentStatus: 'none', // Precisa fazer pagamento de 1.500 MT
      completedLessons: [],
      createdAt: new Date().toISOString()
    };

    const existingUsers = JSON.parse(localStorage.getItem('epm_users') || JSON.stringify(INITIAL_USERS));
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('epm_users', JSON.stringify(updatedUsers));

    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (roleType) => {
    if (roleType === 'admin') {
      setCurrentUser(INITIAL_USERS[0]); // Silva Jermane (Admin)
    } else if (roleType === 'student_paid') {
      setCurrentUser(INITIAL_USERS[1]); // João Mabunda (Aluno Aprovado)
    } else if (roleType === 'student_pending') {
      setCurrentUser(INITIAL_USERS[2]); // Carlos Tembe (Aluno Pendente)
    } else if (roleType === 'guest') {
      setCurrentUser(null); // Visitante Não Autenticado
    }
  };

  const toggleLessonProgress = (lessonId) => {
    if (!currentUser) return;
    const completed = currentUser.completedLessons || [];
    const isCompleted = completed.includes(lessonId);
    
    const updatedLessons = isCompleted
      ? completed.filter(id => id !== lessonId)
      : [...completed, lessonId];

    const updatedUser = { ...currentUser, completedLessons: updatedLessons };
    setCurrentUser(updatedUser);

    // Sincroniza lista de usuários
    const users = JSON.parse(localStorage.getItem('epm_users') || JSON.stringify(INITIAL_USERS));
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    localStorage.setItem('epm_users', JSON.stringify(updatedUsers));
  };

  const isLessonCompleted = (lessonId) => {
    return (currentUser?.completedLessons || []).includes(lessonId);
  };

  const canAccessPremium = () => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return currentUser.role === 'student' && currentUser.enrollmentStatus === 'approved';
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        switchRole,
        toggleLessonProgress,
        isLessonCompleted,
        canAccessPremium
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/initialData';

const AuthContext = createContext();

const STORAGE_KEY = 'epm_current_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null; // Padrão: Visitante (Guest)
    } catch {
      return null;
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
    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = (password || '').trim();

    // 1. Verifica Administrador Oficial (Silva Jermane)
    if (cleanEmail === 'silvativane.3@gmail.com') {
      if (cleanPassword === 'admin2026') {
        const adminUser = INITIAL_USERS[0];
        setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      } else {
        return { success: false, error: 'Senha incorreta para a conta de Administrador (Dica: admin2026)' };
      }
    }

    // 2. Verifica Aluno Oficial (Afonso Domingos)
    if (cleanEmail === 'afonsodomingos.prod@gmail.com') {
      if (cleanPassword === 'aluno2026') {
        const studentUser = INITIAL_USERS[1];
        setCurrentUser(studentUser);
        return { success: true, user: studentUser };
      } else {
        return { success: false, error: 'Senha incorreta para a conta do Aluno (Dica: aluno2026)' };
      }
    }

    // 3. Busca na base de usuários cadastrados
    const users = JSON.parse(localStorage.getItem('epm_users') || JSON.stringify(INITIAL_USERS));
    const found = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (found) {
      if (found.password && found.password !== cleanPassword) {
        return { success: false, error: 'Senha incorreta para este email.' };
      }
      setCurrentUser(found);
      return { success: true, user: found };
    }

    // 4. Usuário não encontrado
    return { success: false, error: 'Nenhuma conta encontrada com este email. Por favor, cadastre-se primeiro.' };
  };

  const register = ({ name, email, phone, password }) => {
    const cleanEmail = email.toLowerCase().trim();
    const existingUsers = JSON.parse(localStorage.getItem('epm_users') || JSON.stringify(INITIAL_USERS));
    
    // Verifica se email já existe
    if (existingUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Este email já está cadastrado. Por favor, faça login.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email: cleanEmail,
      phone: phone || "+258 840 000 000",
      password: password || '123456',
      role: 'student',
      enrollmentStatus: 'none', // Precisa fazer pagamento de 1.500 MT
      completedLessons: [],
      createdAt: new Date().toISOString()
    };

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
      setCurrentUser(INITIAL_USERS[1]); // Afonso Domingos (Aluno Aprovado)
    } else if (roleType === 'student_pending') {
      setCurrentUser(INITIAL_USERS[2] || {
        id: "usr-student-pending",
        name: "Carlos Tembe",
        email: "carlos@exemplo.com",
        phone: "+258 823 456 789",
        role: "student",
        enrollmentStatus: "pending"
      });
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

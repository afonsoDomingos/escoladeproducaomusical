import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COURSES,
  INITIAL_PLUGINS,
  INITIAL_LIVE_CLASSES,
  INITIAL_USERS,
  INITIAL_PAYMENTS,
  INITIAL_CERTIFICATES,
  INITIAL_MASTER_REQUESTS,
  INITIAL_BEATS
} from '../data/initialData';
import { useAuth } from './AuthContext';
import {
  beatsApi,
  coursesApi,
  usersApi,
  paymentsApi,
  pluginsApi,
  liveClassesApi,
  certificatesApi,
  masterRequestsApi
} from '../services/api';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const { currentUser, setCurrentUser } = useAuth();

  // Storage helper
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [courses, setCourses] = useState(() => loadState('epm_courses', INITIAL_COURSES));
  const [beats, setBeats] = useState(() => loadState('epm_beats', INITIAL_BEATS));
  const [plugins, setPlugins] = useState(() => loadState('epm_plugins', INITIAL_PLUGINS));
  const [liveClasses, setLiveClasses] = useState(() => loadState('epm_live_classes', INITIAL_LIVE_CLASSES));
  const [students, setStudents] = useState(() => loadState('epm_users', INITIAL_USERS));
  const [payments, setPayments] = useState(() => loadState('epm_payments', INITIAL_PAYMENTS));
  const [certificates, setCertificates] = useState(() => loadState('epm_certificates', INITIAL_CERTIFICATES));
  const [masterRequests, setMasterRequests] = useState(() => loadState('epm_master_requests', INITIAL_MASTER_REQUESTS));
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('epm_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('epm_beats', JSON.stringify(beats)); }, [beats]);
  useEffect(() => { localStorage.setItem('epm_plugins', JSON.stringify(plugins)); }, [plugins]);
  useEffect(() => { localStorage.setItem('epm_live_classes', JSON.stringify(liveClasses)); }, [liveClasses]);
  useEffect(() => { localStorage.setItem('epm_users', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('epm_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('epm_certificates', JSON.stringify(certificates)); }, [certificates]);
  useEffect(() => { localStorage.setItem('epm_master_requests', JSON.stringify(masterRequests)); }, [masterRequests]);

  // Sync with MongoDB API on mount (when backend is active)
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const [beatsRes, coursesRes, usersRes, paymentsRes, pluginsRes, liveRes] = await Promise.allSettled([
          beatsApi.getAll(),
          coursesApi.getAll(),
          usersApi.getAll(),
          paymentsApi.getAll(),
          pluginsApi.getAll(),
          liveClassesApi.getAll()
        ]);

        if (beatsRes.status === 'fulfilled' && beatsRes.value?.data?.length) {
          setBeats(beatsRes.value.data);
        }
        if (coursesRes.status === 'fulfilled' && coursesRes.value?.data?.length) {
          setCourses(coursesRes.value.data);
        }
        if (usersRes.status === 'fulfilled' && usersRes.value?.data?.length) {
          setStudents(usersRes.value.data);
        }
        if (paymentsRes.status === 'fulfilled' && paymentsRes.value?.data?.length) {
          setPayments(paymentsRes.value.data);
        }
        if (pluginsRes.status === 'fulfilled' && pluginsRes.value?.data?.length) {
          setPlugins(pluginsRes.value.data);
        }
        if (liveRes.status === 'fulfilled' && liveRes.value?.data?.length) {
          setLiveClasses(liveRes.value.data);
        }
      } catch {
        // Backend offline, keep local state
      }
    };

    syncWithBackend();
  }, []);



  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // ================= PAYMENTS & ENROLLMENT =================
  const submitPayment = ({ name, email, phone, method, amount, transactionCode, paymentDate, proofUrl, notes }) => {
    const newPayment = {
      id: `pay-${Date.now()}`,
      userId: currentUser?.id || `usr-${Date.now()}`,
      userName: name,
      userEmail: email,
      userPhone: phone,
      amount: amount || 1500,
      currency: "MT",
      method,
      transactionCode,
      paymentDate: paymentDate || new Date().toISOString().split('T')[0],
      proofUrl: proofUrl || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
      status: "Pendente",
      notes: notes || "Comprovativo enviado pelo formulário Já Paguei.",
      createdAt: new Date().toISOString()
    };

    setPayments(prev => [newPayment, ...prev]);

    // Atualiza status do aluno atual para 'pending'
    if (currentUser) {
      const updatedUser = { ...currentUser, enrollmentStatus: 'pending', phone: phone || currentUser.phone };
      setCurrentUser(updatedUser);
      setStudents(prev => prev.map(s => s.id === updatedUser.id ? updatedUser : s));
    }

    showToast("Pagamento enviado com sucesso! A sua inscrição será analisada pela nossa equipa.", "success");
    return newPayment;
  };

  const approvePayment = (paymentId) => {
    const targetPayment = payments.find(p => p.id === paymentId);
    if (!targetPayment) return;

    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: "Aprovada" } : p));

    // Atualiza o aluno correspondente para 'approved'
    setStudents(prev => prev.map(s => {
      if (s.id === targetPayment.userId || s.email === targetPayment.userEmail) {
        return { ...s, enrollmentStatus: "approved" };
      }
      return s;
    }));

    // Se for o usuário logado no momento, atualiza seu contexto
    if (currentUser && (currentUser.id === targetPayment.userId || currentUser.email === targetPayment.userEmail)) {
      setCurrentUser(prev => ({ ...prev, enrollmentStatus: "approved" }));
    }

    showToast(`Inscrição de ${targetPayment.userName} aprovada com sucesso! Acesso premium liberado.`, "success");
  };

  const rejectPayment = (paymentId, reason) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: "Rejeitada", rejectionReason: reason || "Dados ou comprovativo inválido." } : p));
    showToast("Pagamento marcado como rejeitado.", "info");
  };

  // ================= COURSES CRUD =================
  const addCourse = (courseData) => {
    const newCourse = {
      id: `curso-${Date.now()}`,
      rating: 5.0,
      studentsCount: 0,
      price: 1500,
      currency: "MT",
      modules: [],
      ...courseData
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast("Novo curso cadastrado com sucesso!", "success");
  };

  const updateCourse = (courseId, updatedData) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updatedData } : c));
    showToast("Curso atualizado com sucesso!", "success");
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    showToast("Curso removido.", "info");
  };

  const addModuleToCourse = (courseId, moduleTitle) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const newModule = {
          id: `mod-${Date.now()}`,
          title: moduleTitle,
          lessons: []
        };
        return { ...c, modules: [...c.modules, newModule] };
      }
      return c;
    }));
    showToast("Módulo adicionado com sucesso!", "success");
  };

  const deleteModuleFromCourse = (courseId, moduleId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, modules: c.modules.filter(m => m.id !== moduleId) };
      }
      return c;
    }));
    showToast("Módulo removido com sucesso!", "info");
  };

  const addLessonToModule = (courseId, moduleId, lessonData) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const updatedModules = c.modules.map(m => {
          if (m.id === moduleId) {
            const newLesson = {
              id: `les-${Date.now()}`,
              isFree: false,
              materials: [],
              ...lessonData
            };
            return { ...m, lessons: [...m.lessons, newLesson] };
          }
          return m;
        });
        return { ...c, modules: updatedModules };
      }
      return c;
    }));
    showToast("Aula adicionada ao módulo!", "success");
  };

  const deleteLessonFromModule = (courseId, moduleId, lessonId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const updatedModules = c.modules.map(m => {
          if (m.id === moduleId) {
            return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) };
          }
          return m;
        });
        return { ...c, modules: updatedModules };
      }
      return c;
    }));
    showToast("Aula excluída com sucesso!", "info");
  };

  const updateLessonInModule = (courseId, moduleId, lessonId, updatedLessonData) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const updatedModules = c.modules.map(m => {
          if (m.id === moduleId) {
            return {
              ...m,
              lessons: m.lessons.map(l => l.id === lessonId ? { ...l, ...updatedLessonData } : l)
            };
          }
          return m;
        });
        return { ...c, modules: updatedModules };
      }
      return c;
    }));
    showToast("Aula atualizada com sucesso!", "success");
  };


  // ================= STUDENTS & USERS CRUD =================
  const addStudent = (studentData) => {
    const newStudent = {
      id: `usr-${Date.now()}`,
      completedLessons: [],
      createdAt: new Date().toISOString(),
      ...studentData
    };
    setStudents(prev => [newStudent, ...prev]);
    showToast(`Aluno ${newStudent.name} adicionado com sucesso!`, "success");
    return newStudent;
  };

  const updateStudent = (studentId, updatedData) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...updatedData } : s));
    showToast("Dados do aluno atualizados!", "success");
  };

  const deleteStudent = (studentId) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    showToast("Usuário removido da base de dados.", "info");
  };

  // ================= PLUGINS CRUD =================
  const addPlugin = (pluginData) => {
    const newPlugin = {
      id: `plg-${Date.now()}`,
      ...pluginData
    };
    setPlugins(prev => [newPlugin, ...prev]);
    showToast("Plugin adicionado com sucesso!", "success");
  };

  const updatePlugin = (pluginId, updatedData) => {
    setPlugins(prev => prev.map(p => p.id === pluginId ? { ...p, ...updatedData } : p));
    showToast("Plugin atualizado!", "success");
  };

  const deletePlugin = (pluginId) => {
    setPlugins(prev => prev.filter(p => p.id !== pluginId));
    showToast("Plugin excluído.", "info");
  };

  // ================= LIVE CLASSES CRUD =================
  const addLiveClass = (classData) => {
    const newLive = {
      id: `live-${Date.now()}`,
      status: "Agendada",
      ...classData
    };
    setLiveClasses(prev => [newLive, ...prev]);
    showToast("Aula ao vivo agendada com sucesso!", "success");
  };

  const updateLiveClass = (liveId, updatedData) => {
    setLiveClasses(prev => prev.map(l => l.id === liveId ? { ...l, ...updatedData } : l));
    showToast("Aula ao vivo atualizada!", "success");
  };

  const deleteLiveClass = (liveId) => {
    setLiveClasses(prev => prev.filter(l => l.id !== liveId));
    showToast("Aula ao vivo cancelada.", "info");
  };

  // ================= CERTIFICATES =================
  const generateCertificate = (courseId, studentName = null, userId = null) => {
    const targetCourse = courses.find(c => c.id === courseId) || courses[0];
    const name = studentName || currentUser?.name || "Aluno Exemplar";
    const uId = userId || currentUser?.id || "usr-student";
    
    // Checa se já existe
    const existing = certificates.find(c => c.userId === uId && c.courseId === courseId);
    if (existing) return existing;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCert = {
      id: `cert-${Date.now()}`,
      certificateNumber: `EPM-2026-${randomSuffix}`,
      verificationCode: `EPM-${randomSuffix}-VERIF`,
      userId: uId,
      userName: name,
      courseId: targetCourse.id,
      courseTitle: targetCourse.title,
      issueDate: new Date().toISOString().split('T')[0],
      workload: targetCourse.duration?.split('•')[0]?.trim() || "20 Horas",
      director: "Silva Jermane Hlatswayo",
      status: "Válido"
    };

    setCertificates(prev => [newCert, ...prev]);
    showToast("🎉 Parabéns! O seu certificado de conclusão foi emitido!", "success");
    return newCert;
  };

  const getCertificateByCode = (code) => {
    if (!code) return null;
    const clean = code.trim().toUpperCase();
    return certificates.find(c => 
      c.verificationCode.toUpperCase() === clean || 
      c.certificateNumber.toUpperCase() === clean
    );
  };

  // ================= MASTER REQUESTS =================
  const submitMasterRequest = (formData) => {
    const newReq = {
      id: `mst-req-${Date.now()}`,
      userId: currentUser?.id || "usr-guest",
      createdAt: new Date().toISOString(),
      status: "Pendente",
      ...formData
    };
    setMasterRequests(prev => [newReq, ...prev]);
    showToast("Solicitação de masterização enviada com sucesso! Entraremos em contacto pelo WhatsApp.", "success");
    return newReq;
  };

  const updateMasterRequestStatus = (reqId, newStatus) => {
    setMasterRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: newStatus } : r));
    showToast("Status da solicitação de master atualizado.", "success");
  };

  // ================= BEATS CRUD =================
  const addBeat = (beatData) => {
    const newBeat = {
      id: `beat-${Date.now()}`,
      producer: "Silva Jermane (Jayon)",
      cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
      tags: ["Novo", "2026"],
      ...beatData
    };
    setBeats(prev => [newBeat, ...prev]);
    showToast(`Beat "${newBeat.title}" adicionado à loja com sucesso!`, "success");
    return newBeat;
  };

  const deleteBeat = (beatId) => {
    setBeats(prev => prev.filter(b => b.id !== beatId));
    showToast("Beat removido da loja.", "info");
  };

  const updateBeat = (beatId, updatedData) => {
    setBeats(prev => prev.map(b => b.id === beatId ? { ...b, ...updatedData } : b));
    showToast("Beat atualizado com sucesso!", "success");
  };

  return (
    <DatabaseContext.Provider
      value={{
        courses,
        beats,
        plugins,
        liveClasses,
        students,
        payments,
        certificates,
        masterRequests,
        toastMessage,
        showToast,
        submitPayment,
        approvePayment,
        rejectPayment,
        addCourse,
        updateCourse,
        deleteCourse,
        addModuleToCourse,
        deleteModuleFromCourse,
        addLessonToModule,
        deleteLessonFromModule,
        updateLessonInModule,
        addStudent,
        updateStudent,
        deleteStudent,
        addBeat,
        updateBeat,
        deleteBeat,

        addPlugin,
        updatePlugin,
        deletePlugin,
        addLiveClass,
        updateLiveClass,
        deleteLiveClass,
        generateCertificate,
        getCertificateByCode,
        submitMasterRequest,
        updateMasterRequestStatus
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};



export const useDatabase = () => useContext(DatabaseContext);

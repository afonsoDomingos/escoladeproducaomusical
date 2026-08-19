import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  CreditCard, 
  BookOpen, 
  Download, 
  Video, 
  Award, 
  Sliders, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit,
  Eye, 
  Search, 
  ShieldCheck, 
  TrendingUp,
  X,
  Unlock,
  AlertCircle,
  Menu,
  FileText,
  UserPlus,
  ShoppingBag,
  Music,
  Pencil,
  UserCheck,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage = ({ onOpenCertificate }) => {
  const { 
    courses, 
    beats,
    students, 
    payments, 
    plugins, 
    liveClasses, 
    certificates, 
    masterRequests, 
    mentorProfile,
    updateMentorProfile,
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
    updateMasterRequestStatus,
    showToast
  } = useDatabase();





  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'payments' | 'students' | 'courses' | 'plugins' | 'live' | 'master' | 'certificates' | 'beats'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Search states
  const [studentSearch, setStudentSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('Todos');
  const [selectedProofModal, setSelectedProofModal] = useState(null);

  // Beat Modal State
  const [showBeatModal, setShowBeatModal] = useState(false);
  const [beatForm, setBeatForm] = useState({
    title: '',
    genre: 'Afrobeat',
    bpm: 100,
    key: 'A Minor',
    priceStandard: 1000,
    priceExclusive: 2500,
    cover: '',
    tags: '',
    isFeatured: false
  });

  const handleCreateBeat = (e) => {
    e.preventDefault();
    if (!beatForm.title || !beatForm.genre) return;
    addBeat({
      ...beatForm,
      tags: beatForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      bpm: Number(beatForm.bpm),
      priceStandard: Number(beatForm.priceStandard),
      priceExclusive: Number(beatForm.priceExclusive)
    });
    setShowBeatModal(false);
    setBeatForm({ title: '', genre: 'Afrobeat', bpm: 100, key: 'A Minor', priceStandard: 1000, priceExclusive: 2500, cover: '', tags: '', isFeatured: false });
  };



  // New Student Modal State
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    enrollmentStatus: 'approved'
  });

  // New Course Modal State
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    shortDescription: '',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    instructor: 'Silva Jermane Hlatswayo',
    instructorRole: 'Produtor Musical & Sound Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    level: 'Iniciante ao Avançado',
    duration: '16 Horas • 20 Aulas'
  });

  // Add Lesson Modal State
  const [selectedCourseForLesson, setSelectedCourseForLesson] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    moduleId: '',
    title: '',
    duration: '15:00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: '',
    isFree: false
  });

  // Edit Lesson Modal State
  const [editingLessonData, setEditingLessonData] = useState(null); // { courseId, moduleId, lesson }

  const handleUpdateLesson = (e) => {
    e.preventDefault();
    if (!editingLessonData || !editingLessonData.lesson.title) return;
    updateLessonInModule(
      editingLessonData.courseId,
      editingLessonData.moduleId,
      editingLessonData.lesson.id,
      {
        title: editingLessonData.lesson.title,
        duration: editingLessonData.lesson.duration,
        videoUrl: editingLessonData.lesson.videoUrl,
        description: editingLessonData.lesson.description,
        isFree: editingLessonData.lesson.isFree
      }
    );
    setEditingLessonData(null);
  };


  // New Plugin Modal State
  const [showPluginModal, setShowPluginModal] = useState(false);
  const [pluginForm, setPluginForm] = useState({
    name: '',
    category: 'Synth',
    operatingSystem: 'Windows / macOS',
    type: 'Gratuito',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop',
    description: '',
    downloadUrl: 'https://vital.audio',
    installGuide: '1. Baixe o instalador oficial. 2. Instale no diretório VST3.'
  });

  // New Live Class Modal State
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [liveForm, setLiveForm] = useState({
    title: '',
    date: '2026-08-30',
    time: '19:00 (GMT+2)',
    instructor: 'Silva Jermane Hlatswayo',
    meetingUrl: 'https://meet.google.com/epm-session',
    platform: 'Google Meet',
    description: ''
  });

  // Edit Modals States & Handlers
  const [editingCourseData, setEditingCourseData] = useState(null);
  const handleUpdateCourse = (e) => {
    e.preventDefault();
    if (!editingCourseData || !editingCourseData.title) return;
    updateCourse(editingCourseData.id, editingCourseData);
    setEditingCourseData(null);
  };

  const [editingBeatData, setEditingBeatData] = useState(null);
  const handleUpdateBeat = (e) => {
    e.preventDefault();
    if (!editingBeatData || !editingBeatData.title) return;
    updateBeat(editingBeatData.id, editingBeatData);
    setEditingBeatData(null);
  };

  const [editingPluginData, setEditingPluginData] = useState(null);
  const handleUpdatePlugin = (e) => {
    e.preventDefault();
    if (!editingPluginData || !editingPluginData.name) return;
    updatePlugin(editingPluginData.id, editingPluginData);
    setEditingPluginData(null);
  };

  const [editingLiveData, setEditingLiveData] = useState(null);
  const handleUpdateLive = (e) => {
    e.preventDefault();
    if (!editingLiveData || !editingLiveData.title) return;
    updateLiveClass(editingLiveData.id, editingLiveData);
    setEditingLiveData(null);
  };

  const [editingStudentData, setEditingStudentData] = useState(null);
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    if (!editingStudentData || !editingStudentData.name) return;
    updateStudent(editingStudentData.id, editingStudentData);
    setEditingStudentData(null);
  };


  // Calculations for stats
  const totalRevenueMT = payments
    .filter(p => p.status === 'Aprovada')
    .reduce((acc, p) => acc + (p.amount || 1500), 0);
  const pendingPaymentsCount = payments.filter(p => p.status === 'Pendente').length;
  const pendingRevenueTotal = payments.filter(p => p.status === 'Pendente').reduce((acc, p) => acc + (p.amount || 1500), 0);
  const rejectedPaymentsCount = payments.filter(p => p.status === 'Rejeitada').length;
  const approvedStudentsCount = students.filter(s => s.enrollmentStatus === 'approved').length;

  // Receita por método de pagamento
  const revenueMpesa = payments.filter(p => p.status === 'Aprovada' && p.method === 'M-Pesa').reduce((acc, p) => acc + (p.amount || 1500), 0);
  const revenueEmola = payments.filter(p => p.status === 'Aprovada' && p.method === 'e-Mola').reduce((acc, p) => acc + (p.amount || 1500), 0);

  // Receita do mês atual
  const currentMonth = new Date().toISOString().slice(0, 7); // "2026-08"
  const revenueThisMonth = payments
    .filter(p => p.status === 'Aprovada' && (p.paymentDate || p.createdAt || '').startsWith(currentMonth))
    .reduce((acc, p) => acc + (p.amount || 1500), 0);

  // Número de transações aprovadas
  const totalApprovedTx = payments.filter(p => p.status === 'Aprovada').length;

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(studentSearch.toLowerCase()) || 
    s.email?.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.phone?.includes(studentSearch)
  );

  const filteredPayments = payments.filter(p => {
    if (paymentFilter === 'Todos') return true;
    return p.status === paymentFilter;
  });


  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.email) return;
    addStudent(studentForm);
    setShowStudentModal(false);
    setStudentForm({
      name: '',
      email: '',
      phone: '',
      role: 'student',
      enrollmentStatus: 'approved'
    });
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title) return;
    addCourse(courseForm);
    setShowCourseModal(false);
    setCourseForm({
      title: '',
      shortDescription: '',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
      instructor: 'Silva Jermane Hlatswayo',
      instructorRole: 'Produtor Musical & Sound Engineer',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      level: 'Iniciante ao Avançado',
      duration: '16 Horas • 20 Aulas'
    });
  };

  const handleCreatePlugin = (e) => {
    e.preventDefault();
    if (!pluginForm.name) return;
    addPlugin(pluginForm);
    setShowPluginModal(false);
  };

  const handleCreateLive = (e) => {
    e.preventDefault();
    if (!liveForm.title) return;
    addLiveClass(liveForm);
    setShowLiveModal(false);
  };

  const handleAddLessonSubmit = (e) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.moduleId || !selectedCourseForLesson) {
      showToast('Preencha os dados da aula e selecione o módulo.', 'error');
      return;
    }
    addLessonToModule(selectedCourseForLesson.id, lessonForm.moduleId, {
      title: lessonForm.title,
      duration: lessonForm.duration,
      videoUrl: lessonForm.videoUrl,
      description: lessonForm.description,
      isFree: lessonForm.isFree
    });
    setSelectedCourseForLesson(null);
  };

  const [mentorForm, setMentorForm] = useState(mentorProfile || {
    name: "Jayon Tivane",
    realName: "Silva Jermane Hlatswayo",
    title: "Produtor Musical, Beat Maker e Cantor",
    affiliation: "Membro da Euro Boys Mz",
    location: "Euro Boys Mz • Maputo",
    photo: "/jayon-tivane.jpg",
    badge1: "🇲🇿 Membro da Euro Boys Mz",
    badge2: "Afrobeat & Amapiano",
    badge3: "Mix & Master Pro",
    bioParagraph1: "Com uma trajectória sólida na música moçambicana como Produtor Musical, Beat Maker e Cantor, e como membro do conceituado grupo Euro Boys Mz, Jayon Tivane dedica-se a transmitir todo o seu conhecimento prático de estúdio.",
    bioParagraph2: "Nesta escola, o foco não é apenas teoria — vais aprender a produzir batidas que tocam nas rádios, dominar a afinação e mixagem de voz, além de preparar masters competitivos para o Spotify e plataformas mundiais.",
    experienceYears: "+8 Anos",
    totalCoursesCount: "3 Cursos",
    practiceRatio: "100%",
    whatsappNumber: "+258 879 817 847",
    whatsappMessage: "Olá Jayon Tivane, gostaria de tirar uma dúvida sobre os cursos da Escola de Produção Musical."
  });

  const handleSaveMentorProfile = (e) => {
    e.preventDefault();
    updateMentorProfile(mentorForm);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Visão Geral', icon: TrendingUp },
    { id: 'payments', label: 'Pagamentos', count: pendingPaymentsCount, isAlert: pendingPaymentsCount > 0, icon: CreditCard },
    { id: 'students', label: 'Controle de Alunos', count: students.length, icon: Users },
    { id: 'courses', label: 'Gestão de Cursos & Aulas', count: courses.length, icon: BookOpen },
    { id: 'mentor', label: 'Apresentação Jayon', icon: UserCheck },
    { id: 'beats', label: 'Loja de Beats', count: beats.length, icon: ShoppingBag },
    { id: 'plugins', label: 'Plugins & Recursos', count: plugins.length, icon: Download },
    { id: 'live', label: 'Aulas ao Vivo', count: liveClasses.length, icon: Video },
    { id: 'master', label: 'Área de Master', count: masterRequests.length, icon: Sliders },
    { id: 'certificates', label: 'Certificados', count: certificates.length, icon: Award }
  ];



  return (
    <div style={{ backgroundColor: '#F8F8F8', minHeight: '90vh' }}>
      
      {/* MOBILE TOGGLE TOP BAR */}
      <div
        className="show-tablet-mobile"
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E5E5',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Menu size={16} /> Menu de Gestão
        </button>
        <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>
          Painel Administrativo Geral
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)' }}>
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside
          style={{
            width: '260px',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E5E5E5',
            padding: '24px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
          className={mobileSidebarOpen ? '' : 'hide-tablet-mobile'}
        >
          <div>
            {/* ADMIN PROFILE CARD */}
            <div style={{ padding: '12px', backgroundColor: '#FAFAFA', borderRadius: 'var(--radius-sm)', border: '1px solid #E5E5E5', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    backgroundColor: '#000000',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}
                >
                  SJ
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#000000' }}>Silva Jermane</div>
                  <div style={{ fontSize: '0.7rem', color: '#666666' }}>Controle Total • Admin</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
              Módulos de Controle
            </div>

            {/* SIDEBAR NAVIGATION LIST */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sidebarItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileSidebarOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 700 : 500,
                      backgroundColor: isActive ? '#000000' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#333333',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.1s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IconComp size={16} color={isActive ? '#FFFFFF' : '#000000'} />
                      <span>{item.label}</span>
                    </div>

                    {item.count !== undefined && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '10px',
                          backgroundColor: item.isAlert ? '#DC2626' : isActive ? '#333333' : '#E5E5E5',
                          color: item.isAlert || isActive ? '#FFFFFF' : '#000000'
                        }}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* QUICK SHORTCUT ACTIONS */}
          <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => setShowCourseModal(true)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Plus size={14} /> Novo Curso
            </button>
            <button
              onClick={() => setShowStudentModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <UserPlus size={14} /> Adicionar Aluno
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT CANVAS ================= */}
        <main style={{ flex: 1, padding: '28px 32px', overflowX: 'hidden' }}>
          
          {/* TAB 1: VISÃO GERAL & FATURAMENTO */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#000000', fontWeight: 800 }}>
                  Dashboard de Faturamento
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#666666' }}>
                  Controle financeiro completo — receitas confirmadas, pendentes e histórico de transações.
                </p>
              </div>

              {/* ROW 1: KPIs PRINCIPAIS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                <div className="card" style={{ padding: '20px', borderLeft: '4px solid #16A34A' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>💰 Receita Confirmada</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#16A34A', marginTop: '6px' }}>
                    {totalRevenueMT.toLocaleString()} MT
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '4px' }}>{totalApprovedTx} transações aprovadas</div>
                </div>

                <div className="card" style={{ padding: '20px', borderLeft: `4px solid ${pendingPaymentsCount > 0 ? '#DC2626' : '#D4D4D4'}` }}>
                  <div style={{ fontSize: '0.75rem', color: '#666666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>⏳ A Confirmar</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: pendingPaymentsCount > 0 ? '#DC2626' : '#000000', marginTop: '6px' }}>
                    {pendingRevenueTotal.toLocaleString()} MT
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '4px' }}>{pendingPaymentsCount} pagamentos a aprovar</div>
                </div>

                <div className="card" style={{ padding: '20px', borderLeft: '4px solid #000000' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>📅 Receita Este Mês</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#000000', marginTop: '6px' }}>
                    {revenueThisMonth.toLocaleString()} MT
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '4px' }}>{currentMonth}</div>
                </div>

                <div className="card" style={{ padding: '20px', borderLeft: '4px solid #7C3AED' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🎓 Alunos Ativos</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7C3AED', marginTop: '6px' }}>
                    {approvedStudentsCount}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#666666', marginTop: '4px' }}>{students.length} cadastrados no total</div>
                </div>
              </div>

              {/* ROW 2: BREAKDOWN POR MÉTODO */}
              <div className="grid-2cols-responsive" style={{ marginBottom: '24px' }}>
                {/* M-Pesa */}

                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 800, color: '#000000', marginBottom: '12px', fontSize: '0.95rem' }}>
                    📱 Receita por Canal
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'M-Pesa (842 737 924)', value: revenueMpesa, color: '#E53E3E' },
                      { label: 'e-Mola (879 817 847)', value: revenueEmola, color: '#3182CE' },
                    ].map(({ label, value, color }) => {
                      const pct = totalRevenueMT > 0 ? Math.round((value / totalRevenueMT) * 100) : 0;
                      return (
                        <div key={label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 600 }}>{label}</span>
                            <span style={{ fontWeight: 800 }}>{value.toLocaleString()} MT ({pct}%)</span>
                          </div>
                          <div style={{ height: '8px', backgroundColor: '#F0F0F0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, backgroundColor: color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Resumo Rápido */}
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 800, color: '#000000', marginBottom: '12px', fontSize: '0.95rem' }}>
                    📊 Resumo Rápido
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { label: 'Cursos publicados', value: `${courses.length}`, icon: '🎓' },
                      { label: 'Beats na loja', value: `${beats.length}`, icon: '🎵' },
                      { label: 'Pedidos de Masterização', value: `${masterRequests.length}`, icon: '🎚️' },
                      { label: 'Pagamentos rejeitados', value: `${rejectedPaymentsCount}`, icon: '❌' },
                      { label: 'Sessões ao vivo agendadas', value: `${liveClasses.length}`, icon: '📹' },
                    ].map(({ label, value, icon }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #F0F0F0' }}>
                        <span style={{ fontSize: '0.82rem', color: '#444444' }}>{icon} {label}</span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#000000' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ALERTA DE PENDENTES */}
              {pendingPaymentsCount > 0 && (
                <div className="card" style={{ padding: '20px', marginBottom: '24px', border: '2px solid #DC2626' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={18} color="#DC2626" />
                      <strong style={{ color: '#DC2626', fontSize: '0.95rem' }}>
                        ⚠️ {pendingPaymentsCount} pagamento(s) aguardando a sua validação — {pendingRevenueTotal.toLocaleString()} MT em trânsito
                      </strong>
                    </div>
                    <button onClick={() => setActiveTab('payments')} className="btn btn-primary btn-sm">
                      Ver Todos os Pagamentos
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {payments.filter(p => p.status === 'Pendente').map(p => (
                      <div
                        key={p.id}
                        style={{ padding: '12px 16px', backgroundColor: '#FEF2F2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', border: '1px solid #FECACA' }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, color: '#000000', fontSize: '0.88rem' }}>
                            {p.userName} — {(p.amount || 1500).toLocaleString()} MT ({p.method})
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                            Código: <strong>{p.transactionCode}</strong> • Tel: {p.userPhone} • {p.paymentDate}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => setSelectedProofModal(p)} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                            <Eye size={12} /> Ver Recibo
                          </button>
                          <button onClick={() => approvePayment(p.id)} className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                            <CheckCircle2 size={12} /> ✅ Aprovar Acesso
                          </button>
                          <button onClick={() => rejectPayment(p.id, 'Comprovativo não identificado')} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#DC2626' }}>
                            <XCircle size={12} /> Rejeitar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HISTÓRICO RECENTE */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ fontWeight: 800, color: '#000000', marginBottom: '14px', fontSize: '0.95rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🕐 Histórico de Transações Recentes</span>
                  <button onClick={() => setActiveTab('payments')} style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Ver todos</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {payments.slice(0, 6).map(p => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '4px', backgroundColor: '#FAFAFA', border: '1px solid #F0F0F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.status === 'Aprovada' ? '#16A34A' : p.status === 'Pendente' ? '#DC2626' : '#9CA3AF', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#000000' }}>{p.userName}</div>
                          <div style={{ fontSize: '0.72rem', color: '#666666' }}>{p.method} • {p.transactionCode} • {p.paymentDate}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: p.status === 'Aprovada' ? '#16A34A' : p.status === 'Pendente' ? '#DC2626' : '#9CA3AF' }}>
                          {(p.amount || 1500).toLocaleString()} MT
                        </div>
                        <span className={`badge ${p.status === 'Aprovada' ? 'badge-green' : p.status === 'Pendente' ? 'badge-dark' : 'badge-red'}`} style={{ fontSize: '0.65rem' }}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {payments.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#999', fontSize: '0.84rem', padding: '20px' }}>Nenhuma transação registrada ainda.</div>
                  )}
                </div>
              </div>
            </div>
          )}


          {/* TAB 2: GESTÃO DE PAGAMENTOS */}
          {activeTab === 'payments' && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
                    Validação de Pagamentos
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#666666' }}>
                    Confirme as transações de e-Mola e M-Pesa. A aprovação libera o acesso instantaneamente.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Todos', 'Pendente', 'Aprovada', 'Rejeitada'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setPaymentFilter(st)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #D4D4D4',
                        fontSize: '0.75rem',
                        fontWeight: paymentFilter === st ? 700 : 500,
                        backgroundColor: paymentFilter === st ? '#000000' : '#FFFFFF',
                        color: paymentFilter === st ? '#FFFFFF' : '#000000',
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000000', backgroundColor: '#FAFAFA' }}>
                      <th style={{ padding: '10px 12px' }}>Aluno</th>
                      <th style={{ padding: '10px 12px' }}>Método</th>
                      <th style={{ padding: '10px 12px' }}>Código Transação</th>
                      <th style={{ padding: '10px 12px' }}>Valor</th>
                      <th style={{ padding: '10px 12px' }}>Data</th>
                      <th style={{ padding: '10px 12px' }}>Comprovativo</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                      <th style={{ padding: '10px 12px' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #E5E5E5' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 700, color: '#000000' }}>{p.userName}</div>
                          <div style={{ fontSize: '0.72rem', color: '#666666' }}>{p.userEmail} • {p.userPhone}</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-dark">{p.method}</span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: 600, color: '#000000' }}>
                          {p.transactionCode}
                        </td>
                        <td style={{ padding: '12px', fontWeight: 700 }}>
                          {p.amount || 1500} MT
                        </td>
                        <td style={{ padding: '12px', color: '#666666' }}>
                          {p.paymentDate}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => setSelectedProofModal(p)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                          >
                            <Eye size={12} /> Ver Recibo
                          </button>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${p.status === 'Aprovada' ? 'badge-green' : p.status === 'Pendente' ? 'badge-dark' : 'badge-red'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          {p.status === 'Pendente' ? (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => approvePayment(p.id)}
                                className="btn btn-primary btn-sm"
                                style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                              >
                                <CheckCircle2 size={12} /> Aprovar
                              </button>
                              <button
                                onClick={() => rejectPayment(p.id, "Comprovativo não identificado")}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '3px 8px', fontSize: '0.72rem', color: '#DC2626' }}
                              >
                                <XCircle size={12} /> Rejeitar
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.72rem', color: '#888888' }}>Concluído</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CONTROLE DE ALUNOS & USUÁRIOS */}
          {activeTab === 'students' && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
                    Controle de Alunos & Usuários
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#666666' }}>
                    Cadastre novos alunos manualmente, libere acessos ou remova contas da plataforma.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', width: '220px' }}>
                    <input
                      type="text"
                      placeholder="Buscar aluno..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '32px', fontSize: '0.82rem' }}
                    />
                    <Search size={14} color="#888888" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>

                  <button
                    onClick={() => setShowStudentModal(true)}
                    className="btn btn-primary btn-sm"
                  >
                    <UserPlus size={14} /> Novo Aluno
                  </button>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000000', backgroundColor: '#FAFAFA' }}>
                      <th style={{ padding: '10px 12px' }}>Nome</th>
                      <th style={{ padding: '10px 12px' }}>Email</th>
                      <th style={{ padding: '10px 12px' }}>Telefone</th>
                      <th style={{ padding: '10px 12px' }}>Perfil</th>
                      <th style={{ padding: '10px 12px' }}>Status Matrícula</th>
                      <th style={{ padding: '10px 12px' }}>Aulas Feitas</th>
                      <th style={{ padding: '10px 12px' }}>Ações de Controle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((std) => (
                      <tr key={std.id} style={{ borderBottom: '1px solid #E5E5E5' }}>
                        <td style={{ padding: '12px', fontWeight: 700, color: '#000000' }}>
                          {std.name}
                        </td>
                        <td style={{ padding: '12px', color: '#333333' }}>
                          {std.email}
                        </td>
                        <td style={{ padding: '12px', color: '#666666' }}>
                          {std.phone || '—'}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${std.role === 'admin' ? 'badge-dark' : 'badge-green'}`}>
                            {std.role === 'admin' ? 'Administrador' : 'Aluno'}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${std.enrollmentStatus === 'approved' ? 'badge-green' : std.enrollmentStatus === 'pending' ? 'badge-dark' : 'badge-red'}`}>
                            {std.enrollmentStatus === 'approved' ? 'Liberado (1.500 MT)' : std.enrollmentStatus === 'pending' ? 'Pendente' : 'Não Inscrito'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>
                          {(std.completedLessons || []).length} aulas
                        </td>
                        <td style={{ padding: '12px' }}>
                          {std.role !== 'admin' && (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {std.enrollmentStatus !== 'approved' ? (
                                <button
                                  onClick={() => {
                                    const matchingPayment = payments.find(p => p.userId === std.id || p.userEmail === std.email);
                                    if (matchingPayment) approvePayment(matchingPayment.id);
                                    else showToast(`Acesso liberado para ${std.name}!`, 'success');
                                  }}
                                  className="btn btn-sm btn-primary"
                                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                                  title="Liberar Acesso Imediato"
                                >
                                  <Unlock size={11} /> Liberar Acesso
                                </button>
                              ) : (
                                <button
                                  onClick={() => generateCertificate('curso-beat-maker', std.name, std.id)}
                                  className="btn btn-sm btn-secondary"
                                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                                  title="Gerar Certificado"
                                >
                                  <Award size={11} /> Certificado
                                </button>
                              )}

                              <button
                                onClick={() => setEditingStudentData({ ...std })}
                                className="btn btn-sm btn-secondary"
                                style={{ padding: '3px 6px' }}
                                title="Editar Dados do Aluno"
                              >
                                <Pencil size={12} />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Tem certeza que deseja remover o usuário ${std.name}?`)) {
                                    deleteStudent(std.id);
                                  }
                                }}
                                className="btn btn-sm btn-secondary"
                                style={{ padding: '3px 6px', color: '#DC2626' }}
                                title="Remover Usuário"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: GESTÃO COMPLETA DE CURSOS, MÓDULOS E AULAS */}
          {activeTab === 'courses' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
                    Gestão Completa de Cursos, Módulos & Aulas
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#666666' }}>
                    Adicione ou remova módulos e aulas individualmente com total controle.
                  </p>
                </div>

                <button onClick={() => setShowCourseModal(true)} className="btn btn-primary btn-sm">
                  <Plus size={14} /> Novo Curso
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {courses.map((course) => (
                  <div key={course.id} className="card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #E5E5E5', paddingBottom: '14px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          style={{ width: '64px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                        />
                        <div>
                          <h4 style={{ fontSize: '1.05rem', color: '#000000', fontWeight: 800 }}>
                            {course.title}
                          </h4>
                          <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                            {course.duration} • {course.modules.length} Módulos • Instrutor: {course.instructor}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => {
                            const modTitle = prompt('Nome do novo Módulo para este curso:');
                            if (modTitle) addModuleToCourse(course.id, modTitle);
                          }}
                          className="btn btn-secondary btn-sm"
                        >
                          <Plus size={12} /> + Módulo
                        </button>
                        <button
                          onClick={() => {
                            if (course.modules.length === 0) {
                              showToast('Adicione um módulo primeiro.', 'error');
                              return;
                            }
                            setSelectedCourseForLesson(course);
                            setLessonForm({ ...lessonForm, moduleId: course.modules[0].id });
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          <Plus size={12} /> + Adicionar Aula
                        </button>
                        <button
                          onClick={() => setEditingCourseData({ ...course })}
                          className="btn btn-secondary btn-sm"
                          title="Editar informações do curso"
                        >
                          <Pencil size={12} /> Editar Curso
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Excluir curso completo "${course.title}"?`)) deleteCourse(course.id);
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#DC2626' }}
                          title="Excluir Curso Completo"
                        >
                          <Trash2 size={12} /> Excluir Curso
                        </button>
                      </div>
                    </div>

                    {/* MODULES & INDIVIDUAL LESSONS WITH DELETE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {course.modules.map((mod) => (
                        <div key={mod.id} style={{ backgroundColor: '#F8F8F8', padding: '14px', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{ fontWeight: 800, color: '#000000', fontSize: '0.88rem' }}>
                              📁 {mod.title} ({mod.lessons.length} Aulas)
                            </div>

                            <button
                              onClick={() => {
                                if (confirm(`Remover módulo "${mod.title}" e todas as suas aulas?`)) {
                                  deleteModuleFromCourse(course.id, mod.id);
                                }
                              }}
                              className="btn btn-sm btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '0.68rem', color: '#DC2626' }}
                            >
                              <Trash2 size={11} /> Excluir Módulo
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {mod.lessons.length === 0 ? (
                              <div style={{ fontSize: '0.75rem', color: '#888888', fontStyle: 'italic', padding: '4px' }}>
                                Nenhuma aula neste módulo. Clique em "+ Adicionar Aula" acima.
                              </div>
                            ) : (
                              mod.lessons.map((les) => (
                                <div key={les.id} style={{ padding: '8px 10px', backgroundColor: '#FFFFFF', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', border: '1px solid #E5E5E5' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Video size={13} color="#000000" />
                                    <span style={{ fontWeight: 600, color: '#000000' }}>{les.title}</span>
                                    {les.isFree && <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>Grátis</span>}
                                  </div>

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#888888', fontSize: '0.75rem' }}>{les.duration}</span>
                                    <button
                                      onClick={() => {
                                        setEditingLessonData({
                                          courseId: course.id,
                                          moduleId: mod.id,
                                          lesson: { ...les }
                                        });
                                      }}
                                      style={{ background: 'none', border: 'none', color: '#09090B', cursor: 'pointer', padding: '3px' }}
                                      title="Editar Aula / Vídeo"
                                    >
                                      <Edit size={13} />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Remover aula "${les.title}"?`)) {
                                          deleteLessonFromModule(course.id, mod.id, les.id);
                                        }
                                      }}
                                      style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '3px' }}
                                      title="Excluir Aula"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>

                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PLUGINS */}
          {activeTab === 'plugins' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
                  Biblioteca de Plugins & VSTs
                </h3>
                <button onClick={() => setShowPluginModal(true)} className="btn btn-primary btn-sm">
                  <Plus size={14} /> Novo Plugin
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {plugins.map((plg) => (
                  <div key={plg.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="badge badge-dark">{plg.category}</span>
                        <span className="badge badge-green">{plg.type}</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', color: '#000000', fontWeight: 800, marginBottom: '4px' }}>{plg.name}</h4>
                      <p style={{ fontSize: '0.78rem', color: '#666666', marginBottom: '10px' }}>{plg.description}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', borderTop: '1px solid #E5E5E5', paddingTop: '10px' }}>
                      <button onClick={() => setEditingPluginData({ ...plg })} className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                        <Pencil size={12} /> Editar
                      </button>
                      <button onClick={() => deletePlugin(plg.id)} className="btn btn-secondary btn-sm" style={{ color: '#DC2626', padding: '3px 8px', fontSize: '0.72rem' }}>
                        <Trash2 size={12} /> Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AULAS AO VIVO */}
          {activeTab === 'live' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
                  Aulas ao Vivo (Meet & Zoom)
                </h3>
                <button onClick={() => setShowLiveModal(true)} className="btn btn-primary btn-sm">
                  <Plus size={14} /> Nova Sessão
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {liveClasses.map((live) => (
                  <div key={live.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className="badge badge-dark">{live.platform}</span>
                        <span className="badge badge-green">{live.date} às {live.time}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', color: '#000000', fontWeight: 800 }}>{live.title}</h4>
                      <div style={{ fontSize: '0.78rem', color: '#666666' }}>Link: {live.meetingUrl}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setEditingLiveData({ ...live })} className="btn btn-secondary btn-sm" title="Editar Sessão">
                        <Pencil size={12} /> Editar
                      </button>
                      <button onClick={() => deleteLiveClass(live.id)} className="btn btn-secondary btn-sm" style={{ color: '#DC2626' }}>
                        <Trash2 size={12} /> Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MASTER REQUESTS */}
          {activeTab === 'master' && (
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800, marginBottom: '16px' }}>
                Pedidos de Masterização
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000000', backgroundColor: '#FAFAFA' }}>
                      <th style={{ padding: '10px 12px' }}>Cliente</th>
                      <th style={{ padding: '10px 12px' }}>Música</th>
                      <th style={{ padding: '10px 12px' }}>Serviço</th>
                      <th style={{ padding: '10px 12px' }}>Áudio</th>
                      <th style={{ padding: '10px 12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {masterRequests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: '1px solid #E5E5E5' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 700 }}>{req.clientName}</div>
                          <div style={{ fontSize: '0.72rem', color: '#666666' }}>WhatsApp: {req.whatsapp}</div>
                        </td>
                        <td style={{ padding: '12px' }}><strong>{req.songName}</strong> ({req.artistName})</td>
                        <td style={{ padding: '12px' }}>{req.serviceType}</td>
                        <td style={{ padding: '12px' }}>
                          <a href={req.fileUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: '#000000', fontWeight: 600 }}>
                            Ouvir ↗
                          </a>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <select
                            value={req.status}
                            onChange={(e) => updateMasterRequestStatus(req.id, e.target.value)}
                            className="form-select"
                            style={{ padding: '3px 6px', fontSize: '0.75rem', width: 'auto' }}
                          >
                            <option value="Pendente">Pendente</option>
                            <option value="Em Produção">Em Produção</option>
                            <option value="Concluído">Concluído</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: CERTIFICADOS */}
          {activeTab === 'certificates' && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#000000', fontWeight: 800 }}>
                  Certificados Emitidos
                </h3>
                <button
                  onClick={() => {
                    const studentName = prompt('Nome do aluno:');
                    if (studentName) generateCertificate('curso-beat-maker', studentName);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} /> Emitir Certificado
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #000000', backgroundColor: '#FAFAFA' }}>
                      <th style={{ padding: '10px 12px' }}>Aluno</th>
                      <th style={{ padding: '10px 12px' }}>Curso</th>
                      <th style={{ padding: '10px 12px' }}>Código Validação</th>
                      <th style={{ padding: '10px 12px' }}>Data</th>
                      <th style={{ padding: '10px 12px' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert) => (
                      <tr key={cert.id} style={{ borderBottom: '1px solid #E5E5E5' }}>
                        <td style={{ padding: '12px', fontWeight: 700 }}>{cert.userName}</td>
                        <td style={{ padding: '12px' }}>{cert.courseTitle}</td>
                        <td style={{ padding: '12px' }}><code>{cert.verificationCode}</code></td>
                        <td style={{ padding: '12px', color: '#666666' }}>{cert.issueDate}</td>
                        <td style={{ padding: '12px' }}>
                          <button onClick={() => onOpenCertificate(cert)} className="btn btn-secondary btn-sm" style={{ padding: '3px 8px', fontSize: '0.72rem' }}>
                            <Eye size={12} /> Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB BEATS: GESTÃO DE BEATS */}
          {activeTab === 'beats' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', color: '#000000', fontWeight: 800, marginBottom: '4px' }}>
                    🎵 Gestão de Beats & Instrumentais
                  </h2>
                  <p style={{ fontSize: '0.84rem', color: '#666666' }}>
                    Adicione ou remova beats da Loja de Beats. {beats.length} beats disponíveis na loja.
                  </p>
                </div>
                <button
                  onClick={() => setShowBeatModal(true)}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} /> Adicionar Beat
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {beats.map((beat) => (
                  <div key={beat.id} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img
                        src={beat.cover || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=120&auto=format&fit=crop'}
                        alt={beat.title}
                        style={{ width: '52px', height: '52px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#000000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{beat.title}</div>
                        <div style={{ fontSize: '0.74rem', color: '#666666' }}>{beat.genre} • {beat.bpm} BPM • {beat.key}</div>
                        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginTop: '2px', color: '#555' }}>
                          Lease: <strong>{beat.priceStandard} MT</strong> | Exclusiva: <strong>{beat.priceExclusive} MT</strong>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {beat.isFeatured && <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>★ Destaque</span>}
                      {!beat.isFeatured && <span />}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setEditingBeatData({ ...beat })}
                          className="btn btn-sm btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                          title="Editar Beat"
                        >
                          <Pencil size={12} /> Editar
                        </button>
                        <button
                          onClick={() => deleteBeat(beat.id)}
                          className="btn btn-sm btn-secondary"
                          style={{ color: '#DC2626', fontSize: '0.75rem', padding: '4px 10px' }}
                        >
                          <Trash2 size={12} /> Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB MENTOR: APRESENTAÇÃO DO MENTOR JAYON TIVANE */}
          {activeTab === 'mentor' && (

            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#000000', fontWeight: 800, marginBottom: '4px' }}>
                  👤 Apresentação do Mentor Jayon Tivane (Página Inicial)
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#666666' }}>
                  Personalize as informações, foto oficial, biografia, afiliação (Euro Boys Mz) e link de WhatsApp que aparecem na 2ª secção da Página Inicial.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
                
                {/* FORMULÁRIO DE EDIÇÃO */}
                <div className="card" style={{ padding: '24px' }}>
                  <form onSubmit={handleSaveMentorProfile}>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">Nome Artístico *</label>
                        <input
                          type="text"
                          value={mentorForm.name}
                          onChange={(e) => setMentorForm({ ...mentorForm, name: e.target.value })}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Nome Real *</label>
                        <input
                          type="text"
                          value={mentorForm.realName}
                          onChange={(e) => setMentorForm({ ...mentorForm, realName: e.target.value })}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Título / Profissão *</label>
                      <input
                        type="text"
                        value={mentorForm.title}
                        onChange={(e) => setMentorForm({ ...mentorForm, title: e.target.value })}
                        className="form-input"
                        required
                        placeholder="Produtor Musical, Beat Maker e Cantor"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Afiliação / Localização</label>
                      <input
                        type="text"
                        value={mentorForm.location}
                        onChange={(e) => setMentorForm({ ...mentorForm, location: e.target.value })}
                        className="form-input"
                        placeholder="Euro Boys Mz • Maputo"
                      />
                    </div>

                    {/* FOTO DO MENTOR COM UPLOAD */}
                    <div className="form-group">
                      <label className="form-label">Foto Oficial do Mentor</label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {mentorForm.photo && (
                          <img
                            src={mentorForm.photo}
                            alt="Preview Mentor"
                            style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #E5E5E5', flexShrink: 0 }}
                          />
                        )}
                        <input
                          type="text"
                          value={mentorForm.photo}
                          onChange={(e) => setMentorForm({ ...mentorForm, photo: e.target.value })}
                          className="form-input"
                          style={{ flex: '1 1 200px' }}
                          placeholder="/jayon-tivane.jpg ou link da foto"
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', fontSize: '0.75rem', padding: '5px 10px' }}>
                          📁 Escolher nova foto do computador
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setMentorForm({ ...mentorForm, photo: reader.result });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        <span style={{ fontSize: '0.72rem', color: '#666' }}>PNG, JPG ou WebP</span>
                      </div>
                    </div>

                    {/* BADGES */}
                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.72rem' }}>Badge 1</label>
                        <input
                          type="text"
                          value={mentorForm.badge1 || ''}
                          onChange={(e) => setMentorForm({ ...mentorForm, badge1: e.target.value })}
                          className="form-input"
                          placeholder="🇲🇿 Membro da Euro Boys Mz"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.72rem' }}>Badge 2</label>
                        <input
                          type="text"
                          value={mentorForm.badge2 || ''}
                          onChange={(e) => setMentorForm({ ...mentorForm, badge2: e.target.value })}
                          className="form-input"
                          placeholder="Afrobeat & Amapiano"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.72rem' }}>Badge 3</label>
                        <input
                          type="text"
                          value={mentorForm.badge3 || ''}
                          onChange={(e) => setMentorForm({ ...mentorForm, badge3: e.target.value })}
                          className="form-input"
                          placeholder="Mix & Master Pro"
                        />
                      </div>
                    </div>

                    {/* BIOGRAFIAS */}
                    <div className="form-group">
                      <label className="form-label">Biografia — Parágrafo 1</label>
                      <textarea
                        value={mentorForm.bioParagraph1}
                        onChange={(e) => setMentorForm({ ...mentorForm, bioParagraph1: e.target.value })}
                        className="form-input"
                        rows={3}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Biografia — Parágrafo 2</label>
                      <textarea
                        value={mentorForm.bioParagraph2}
                        onChange={(e) => setMentorForm({ ...mentorForm, bioParagraph2: e.target.value })}
                        className="form-input"
                        rows={3}
                      />
                    </div>

                    {/* MÉTRICAS */}
                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.72rem' }}>Experiência</label>
                        <input
                          type="text"
                          value={mentorForm.experienceYears}
                          onChange={(e) => setMentorForm({ ...mentorForm, experienceYears: e.target.value })}
                          className="form-input"
                          placeholder="+8 Anos"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.72rem' }}>Cursos</label>
                        <input
                          type="text"
                          value={mentorForm.totalCoursesCount}
                          onChange={(e) => setMentorForm({ ...mentorForm, totalCoursesCount: e.target.value })}
                          className="form-input"
                          placeholder="3 Cursos"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.72rem' }}>% Prático</label>
                        <input
                          type="text"
                          value={mentorForm.practiceRatio}
                          onChange={(e) => setMentorForm({ ...mentorForm, practiceRatio: e.target.value })}
                          className="form-input"
                          placeholder="100%"
                        />
                      </div>
                    </div>

                    {/* WHATSAPP */}
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">Número WhatsApp *</label>
                        <input
                          type="tel"
                          value={mentorForm.whatsappNumber}
                          onChange={(e) => setMentorForm({ ...mentorForm, whatsappNumber: e.target.value })}
                          className="form-input"
                          placeholder="+258 879 817 847"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Mensagem Padrão do WhatsApp</label>
                        <input
                          type="text"
                          value={mentorForm.whatsappMessage || ''}
                          onChange={(e) => setMentorForm({ ...mentorForm, whatsappMessage: e.target.value })}
                          className="form-input"
                          placeholder="Olá Jayon Tivane..."
                        />
                      </div>
                    </div>


                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '10px' }}>
                      <Sparkles size={16} /> Salvar Apresentação do Mentor
                    </button>
                  </form>
                </div>

                {/* PREVIEW VISUAL AO VIVO */}
                <div className="card" style={{ padding: '24px', backgroundColor: '#FAFAFA', border: '1.5px solid #000000' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#000' }}>👁️ Visualização em Tempo Real (Página Inicial):</strong>
                    <span className="badge badge-dark" style={{ fontSize: '0.65rem' }}>Ao Vivo</span>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <img
                      src={mentorForm.photo || '/jayon-tivane.jpg'}
                      alt="Preview"
                      style={{ width: '140px', height: '140px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #000', margin: '0 auto', display: 'block' }}
                      onError={(e) => { e.target.src = '/jayon-tivane.jpg'; }}
                    />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000', marginTop: '10px', marginBottom: '2px' }}>
                      {mentorForm.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#4F46E5', fontWeight: 700 }}>
                      {mentorForm.realName} • {mentorForm.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#666' }}>
                      {mentorForm.location}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '12px' }}>
                    {mentorForm.badge1 && <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{mentorForm.badge1}</span>}
                    {mentorForm.badge2 && <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>{mentorForm.badge2}</span>}
                    {mentorForm.badge3 && <span className="badge badge-dark" style={{ fontSize: '0.65rem' }}>{mentorForm.badge3}</span>}
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, marginBottom: '14px', textAlign: 'justify' }}>
                    {mentorForm.bioParagraph1}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '14px' }}>
                    <div style={{ padding: '6px', backgroundColor: '#FFF', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>{mentorForm.experienceYears}</div>
                      <div style={{ fontSize: '0.62rem', color: '#666' }}>Experiência</div>
                    </div>
                    <div style={{ padding: '6px', backgroundColor: '#FFF', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>{mentorForm.totalCoursesCount}</div>
                      <div style={{ fontSize: '0.62rem', color: '#666' }}>Cursos</div>
                    </div>
                    <div style={{ padding: '6px', backgroundColor: '#FFF', borderRadius: '4px', border: '1px solid #E5E5E5' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900 }}>{mentorForm.practiceRatio}</div>
                      <div style={{ fontSize: '0.62rem', color: '#666' }}>Prático</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#666', textAlign: 'center', backgroundColor: '#E0E7FF', padding: '6px 10px', borderRadius: '4px' }}>
                    💬 WhatsApp Conectado: <strong>{mentorForm.whatsappNumber}</strong>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>


      {/* MODAL: NOVO ALUNO */}
      {showStudentModal && (
        <div className="modal-overlay" onClick={() => setShowStudentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Adicionar Novo Aluno</h3>
              <button onClick={() => setShowStudentModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateStudent}>
              <div className="form-group">
                <label className="form-label">Nome Completo *</label>
                <input type="text" value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Telefone / WhatsApp</label>
                <input type="tel" value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} className="form-input" placeholder="+258 84..." />
              </div>
              <div className="form-group">
                <label className="form-label">Status da Inscrição</label>
                <select value={studentForm.enrollmentStatus} onChange={(e) => setStudentForm({ ...studentForm, enrollmentStatus: e.target.value })} className="form-select">
                  <option value="approved">Liberado (Acesso Premium)</option>
                  <option value="pending">Pendente de Comprovativo</option>
                  <option value="none">Não Inscrito</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Salvar Aluno</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAIS (PROOFS, COURSES, LESSONS, PLUGINS, LIVE) */}
      {selectedProofModal && (
        <div className="modal-overlay" onClick={() => setSelectedProofModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#000000', fontWeight: 800 }}>
                Recibo — {selectedProofModal.userName}
              </h3>
              <button onClick={() => setSelectedProofModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: '#FAFAFA', padding: '10px', borderRadius: '4px', marginBottom: '14px', fontSize: '0.8rem', border: '1px solid #E5E5E5' }}>
              <div><strong>Método:</strong> {selectedProofModal.method}</div>
              <div><strong>Código:</strong> {selectedProofModal.transactionCode}</div>
              <div><strong>Valor:</strong> {selectedProofModal.amount || 1500} MT</div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <img
                src={selectedProofModal.proofUrl}
                alt="Comprovativo"
                style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #E5E5E5' }}
              />
            </div>

            {selectedProofModal.status === 'Pendente' && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => { approvePayment(selectedProofModal.id); setSelectedProofModal(null); }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <CheckCircle2 size={14} /> Aprovar Pagamento
                </button>
                <button
                  onClick={() => { rejectPayment(selectedProofModal.id, "Inválido"); setSelectedProofModal(null); }}
                  className="btn btn-secondary"
                  style={{ color: '#DC2626' }}
                >
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CREATE COURSE MODAL */}
      {showCourseModal && (
        <div className="modal-overlay" onClick={() => setShowCourseModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Novo Curso</h3>
              <button onClick={() => setShowCourseModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateCourse}>
              <div className="form-group">
                <label className="form-label">Título do Curso *</label>
                <input type="text" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Descrição Curta</label>
                <input type="text" value={courseForm.shortDescription} onChange={(e) => setCourseForm({ ...courseForm, shortDescription: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Duração / Aulas</label>
                <input type="text" value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} className="form-input" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Salvar Curso</button>
            </form>
          </div>
        </div>
      )}

      {/* ADD LESSON MODAL */}
      {selectedCourseForLesson && (
        <div className="modal-overlay" onClick={() => setSelectedCourseForLesson(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Adicionar Aula em "{selectedCourseForLesson.title}"</h3>
              <button onClick={() => setSelectedCourseForLesson(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddLessonSubmit}>
              <div className="form-group">
                <label className="form-label">Módulo *</label>
                <select value={lessonForm.moduleId} onChange={(e) => setLessonForm({ ...lessonForm, moduleId: e.target.value })} className="form-select" required>
                  {selectedCourseForLesson.modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Título da Aula *</label>
                <input type="text" value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">URL do Vídeo (MP4) *</label>
                <input type="url" value={lessonForm.videoUrl} onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Duração</label>
                <input type="text" value={lessonForm.duration} onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })} className="form-input" placeholder="15:00" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Adicionar Aula</button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT LESSON MODAL */}
      {editingLessonData && (
        <div className="modal-overlay" onClick={() => setEditingLessonData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-dark" style={{ marginBottom: '4px' }}>Editar Conteúdo</span>
                <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Atualizar Aula</h3>
              </div>
              <button onClick={() => setEditingLessonData(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateLesson}>
              <div className="form-group">
                <label className="form-label">Título da Aula *</label>
                <input
                  type="text"
                  value={editingLessonData.lesson.title}
                  onChange={(e) => setEditingLessonData({
                    ...editingLessonData,
                    lesson: { ...editingLessonData.lesson, title: e.target.value }
                  })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Link do Vídeo da Aula (URL) *</label>
                <input
                  type="text"
                  value={editingLessonData.lesson.videoUrl}
                  onChange={(e) => setEditingLessonData({
                    ...editingLessonData,
                    lesson: { ...editingLessonData.lesson, videoUrl: e.target.value }
                  })}
                  className="form-input"
                  required
                  placeholder="https://commondatastorage... ou https://www.youtube.com/..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Duração</label>
                  <input
                    type="text"
                    value={editingLessonData.lesson.duration}
                    onChange={(e) => setEditingLessonData({
                      ...editingLessonData,
                      lesson: { ...editingLessonData.lesson, duration: e.target.value }
                    })}
                    className="form-input"
                    placeholder="25:00"
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '22px' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={editingLessonData.lesson.isFree || false}
                      onChange={(e) => setEditingLessonData({
                        ...editingLessonData,
                        lesson: { ...editingLessonData.lesson, isFree: e.target.checked }
                      })}
                    />
                    Aula Grátis (Degustação)
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Descrição / Resumo da Aula</label>
                <textarea
                  value={editingLessonData.lesson.description || ''}
                  onChange={(e) => setEditingLessonData({
                    ...editingLessonData,
                    lesson: { ...editingLessonData.lesson, description: e.target.value }
                  })}
                  className="form-input"
                  rows={3}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                Salvar Alterações da Aula
              </button>
            </form>
          </div>
        </div>
      )}


      {/* CREATE PLUGIN MODAL */}
      {showPluginModal && (
        <div className="modal-overlay" onClick={() => setShowPluginModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Cadastrar Plugin</h3>
              <button onClick={() => setShowPluginModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreatePlugin}>
              <div className="form-group">
                <label className="form-label">Nome *</label>
                <input type="text" value={pluginForm.name} onChange={(e) => setPluginForm({ ...pluginForm, name: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Link Oficial *</label>
                <input type="url" value={pluginForm.downloadUrl} onChange={(e) => setPluginForm({ ...pluginForm, downloadUrl: e.target.value })} className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Salvar Plugin</button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE LIVE MODAL */}
      {showLiveModal && (
        <div className="modal-overlay" onClick={() => setShowLiveModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Agendar Aula ao Vivo</h3>
              <button onClick={() => setShowLiveModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateLive}>
              <div className="form-group">
                <label className="form-label">Tema da Aula *</label>
                <input type="text" value={liveForm.title} onChange={(e) => setLiveForm({ ...liveForm, title: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Link Reunião (Meet / Zoom) *</label>
                <input type="url" value={liveForm.meetingUrl} onChange={(e) => setLiveForm({ ...liveForm, meetingUrl: e.target.value })} className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Agendar</button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE BEAT MODAL */}
      {showBeatModal && (
        <div className="modal-overlay" onClick={() => setShowBeatModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>Adicionar Beat à Loja</h3>
              <button onClick={() => setShowBeatModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateBeat}>
              <div className="form-group">
                <label className="form-label">Título do Beat *</label>
                <input type="text" value={beatForm.title} onChange={(e) => setBeatForm({ ...beatForm, title: e.target.value })} className="form-input" required placeholder="Ex: Maputo Groove" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Género</label>
                  <select value={beatForm.genre} onChange={(e) => setBeatForm({ ...beatForm, genre: e.target.value })} className="form-input">
                    <option>Afrobeat</option>
                    <option>Amapiano</option>
                    <option>Trap / Drill</option>
                    <option>Kizomba / Zouk</option>
                    <option>Marrabenta Fusion</option>
                    <option>R&B / Soul</option>
                    <option>Hip-Hop</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">BPM</label>
                  <input type="number" value={beatForm.bpm} onChange={(e) => setBeatForm({ ...beatForm, bpm: e.target.value })} className="form-input" min={60} max={200} />
                </div>
                <div className="form-group">
                  <label className="form-label">Tom (Key)</label>
                  <input type="text" value={beatForm.key} onChange={(e) => setBeatForm({ ...beatForm, key: e.target.value })} className="form-input" placeholder="Ex: F Minor" />
                </div>
                <div className="form-group">
                  <label className="form-label">Preço Lease (MT)</label>
                  <input type="number" value={beatForm.priceStandard} onChange={(e) => setBeatForm({ ...beatForm, priceStandard: e.target.value })} className="form-input" min={0} />
                </div>
                <div className="form-group">
                  <label className="form-label">Preço Exclusiva (MT)</label>
                  <input type="number" value={beatForm.priceExclusive} onChange={(e) => setBeatForm({ ...beatForm, priceExclusive: e.target.value })} className="form-input" min={0} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={beatForm.isFeatured} onChange={(e) => setBeatForm({ ...beatForm, isFeatured: e.target.checked })} />
                    Destaque na Loja
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tags (separadas por vírgula)</label>
                <input type="text" value={beatForm.tags} onChange={(e) => setBeatForm({ ...beatForm, tags: e.target.value })} className="form-input" placeholder="Ex: Guitar, Smooth, Rema Style" />
              </div>
              <div className="form-group">
                <label className="form-label">URL da Capa (Imagem)</label>
                <input type="url" value={beatForm.cover} onChange={(e) => setBeatForm({ ...beatForm, cover: e.target.value })} className="form-input" placeholder="https://images.unsplash.com/..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                <Music size={14} /> Publicar Beat na Loja
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: EDITAR CURSO ===== */}
      {editingCourseData && (
        <div className="modal-overlay" onClick={() => setEditingCourseData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '540px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>✏️ Editar Curso & Capa</h3>
              <button onClick={() => setEditingCourseData(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateCourse}>
              <div className="form-group">
                <label className="form-label">Título do Curso *</label>
                <input type="text" value={editingCourseData.title} onChange={(e) => setEditingCourseData({ ...editingCourseData, title: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Descrição Curta</label>
                <textarea value={editingCourseData.shortDescription || ''} onChange={(e) => setEditingCourseData({ ...editingCourseData, shortDescription: e.target.value })} className="form-input" rows={2} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Preço (MT)</label>
                  <input type="number" value={editingCourseData.price || 1500} onChange={(e) => setEditingCourseData({ ...editingCourseData, price: Number(e.target.value) })} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nível</label>
                  <select value={editingCourseData.level || 'Iniciante'} onChange={(e) => setEditingCourseData({ ...editingCourseData, level: e.target.value })} className="form-select">
                    <option>Iniciante</option>
                    <option>Intermédio</option>
                    <option>Intermediário ao Avançado</option>
                    <option>Avançado</option>
                  </select>
                </div>
              </div>

              {/* CAPA / THUMBNAIL COM PREVIEW E UPLOAD */}
              <div className="form-group">
                <label className="form-label">Capa do Curso (Imagem / Thumbnail)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  {editingCourseData.thumbnail && (
                    <img
                      src={editingCourseData.thumbnail}
                      alt="Preview da Capa"
                      style={{ width: '80px', height: '56px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #E5E5E5', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <input
                      type="url"
                      value={editingCourseData.thumbnail || ''}
                      onChange={(e) => setEditingCourseData({ ...editingCourseData, thumbnail: e.target.value })}
                      className="form-input"
                      placeholder="https://images.unsplash.com/... ou link da imagem"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', fontSize: '0.75rem', padding: '5px 10px' }}>
                    📁 Escolher imagem do meu computador
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingCourseData({ ...editingCourseData, thumbnail: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#666' }}>PNG, JPG ou WebP</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Salvar Alterações do Curso</button>
            </form>
          </div>
        </div>
      )}


      {/* ===== MODAL: EDITAR BEAT ===== */}
      {editingBeatData && (
        <div className="modal-overlay" onClick={() => setEditingBeatData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>✏️ Editar Beat</h3>
              <button onClick={() => setEditingBeatData(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateBeat}>
              <div className="form-group">
                <label className="form-label">Título do Beat *</label>
                <input type="text" value={editingBeatData.title} onChange={(e) => setEditingBeatData({ ...editingBeatData, title: e.target.value })} className="form-input" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Género</label>
                  <input type="text" value={editingBeatData.genre} onChange={(e) => setEditingBeatData({ ...editingBeatData, genre: e.target.value })} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">BPM</label>
                  <input type="number" value={editingBeatData.bpm} onChange={(e) => setEditingBeatData({ ...editingBeatData, bpm: Number(e.target.value) })} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Preço Lease (MT)</label>
                  <input type="number" value={editingBeatData.priceStandard} onChange={(e) => setEditingBeatData({ ...editingBeatData, priceStandard: Number(e.target.value) })} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Preço Exclusiva (MT)</label>
                  <input type="number" value={editingBeatData.priceExclusive} onChange={(e) => setEditingBeatData({ ...editingBeatData, priceExclusive: Number(e.target.value) })} className="form-input" />
                </div>
              </div>
              {/* CAPA DO BEAT COM PREVIEW E UPLOAD */}
              <div className="form-group">
                <label className="form-label">Capa do Beat (Arte / Thumbnail)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  {editingBeatData.cover && (
                    <img
                      src={editingBeatData.cover}
                      alt="Capa do Beat"
                      style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #E5E5E5', flexShrink: 0 }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <input
                      type="url"
                      value={editingBeatData.cover || ''}
                      onChange={(e) => setEditingBeatData({ ...editingBeatData, cover: e.target.value })}
                      className="form-input"
                      placeholder="https://images.unsplash.com/... ou link da capa"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', fontSize: '0.75rem', padding: '5px 10px' }}>
                    📁 Escolher arte do meu computador
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingBeatData({ ...editingBeatData, cover: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#666' }}>PNG, JPG ou WebP</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={editingBeatData.isFeatured || false} onChange={(e) => setEditingBeatData({ ...editingBeatData, isFeatured: e.target.checked })} />
                  Destaque na Loja (★)
                </label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>Salvar Alterações do Beat</button>
            </form>
          </div>
        </div>
      )}


      {/* ===== MODAL: EDITAR PLUGIN ===== */}
      {editingPluginData && (
        <div className="modal-overlay" onClick={() => setEditingPluginData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>✏️ Editar Plugin</h3>
              <button onClick={() => setEditingPluginData(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdatePlugin}>
              <div className="form-group">
                <label className="form-label">Nome do Plugin *</label>
                <input type="text" value={editingPluginData.name} onChange={(e) => setEditingPluginData({ ...editingPluginData, name: e.target.value })} className="form-input" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Categoria</label>
                  <input type="text" value={editingPluginData.category} onChange={(e) => setEditingPluginData({ ...editingPluginData, category: e.target.value })} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo</label>
                  <select value={editingPluginData.type} onChange={(e) => setEditingPluginData({ ...editingPluginData, type: e.target.value })} className="form-select">
                    <option>Gratuito</option>
                    <option>Pago</option>
                    <option>Exclusivo Escola</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea value={editingPluginData.description || ''} onChange={(e) => setEditingPluginData({ ...editingPluginData, description: e.target.value })} className="form-input" rows={2} />
              </div>
              <div className="form-group">
                <label className="form-label">URL de Download</label>
                <input type="url" value={editingPluginData.downloadUrl || ''} onChange={(e) => setEditingPluginData({ ...editingPluginData, downloadUrl: e.target.value })} className="form-input" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>Salvar Alterações do Plugin</button>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: EDITAR AULA AO VIVO ===== */}
      {editingLiveData && (
        <div className="modal-overlay" onClick={() => setEditingLiveData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>✏️ Editar Aula ao Vivo</h3>
              <button onClick={() => setEditingLiveData(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateLive}>
              <div className="form-group">
                <label className="form-label">Título da Sessão *</label>
                <input type="text" value={editingLiveData.title} onChange={(e) => setEditingLiveData({ ...editingLiveData, title: e.target.value })} className="form-input" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Data</label>
                  <input type="date" value={editingLiveData.date} onChange={(e) => setEditingLiveData({ ...editingLiveData, date: e.target.value })} className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Horário</label>
                  <input type="text" value={editingLiveData.time} onChange={(e) => setEditingLiveData({ ...editingLiveData, time: e.target.value })} className="form-input" placeholder="19:00 (GMT+2)" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Link da Reunião</label>
                <input type="url" value={editingLiveData.meetingUrl} onChange={(e) => setEditingLiveData({ ...editingLiveData, meetingUrl: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Plataforma</label>
                <select value={editingLiveData.platform} onChange={(e) => setEditingLiveData({ ...editingLiveData, platform: e.target.value })} className="form-select">
                  <option>Google Meet</option>
                  <option>Zoom</option>
                  <option>Microsoft Teams</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>Salvar Alterações da Sessão</button>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL: EDITAR ALUNO ===== */}
      {editingStudentData && (
        <div className="modal-overlay" onClick={() => setEditingStudentData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '480px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#000000', fontWeight: 800 }}>✏️ Editar Aluno</h3>
              <button onClick={() => setEditingStudentData(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpdateStudent}>
              <div className="form-group">
                <label className="form-label">Nome Completo *</label>
                <input type="text" value={editingStudentData.name} onChange={(e) => setEditingStudentData({ ...editingStudentData, name: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" value={editingStudentData.email} onChange={(e) => setEditingStudentData({ ...editingStudentData, email: e.target.value })} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Telefone / WhatsApp</label>
                <input type="tel" value={editingStudentData.phone || ''} onChange={(e) => setEditingStudentData({ ...editingStudentData, phone: e.target.value })} className="form-input" placeholder="+258 84..." />
              </div>
              <div className="form-group">
                <label className="form-label">Status de Inscrição</label>
                <select value={editingStudentData.enrollmentStatus} onChange={(e) => setEditingStudentData({ ...editingStudentData, enrollmentStatus: e.target.value })} className="form-select">
                  <option value="approved">Aprovado (Acesso Premium)</option>
                  <option value="pending">Pendente de Comprovativo</option>
                  <option value="none">Não Inscrito</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>Salvar Alterações do Aluno</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';

// Components
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { RoleSwitcher } from './components/auth/RoleSwitcher';
import { AuthModal } from './components/auth/AuthModal';
import { PaymentModal } from './components/payment/PaymentModal';
import { CertificateModal } from './components/certificate/CertificateModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BeatsStorePage } from './pages/BeatsStorePage';
import { FreeLessonPage } from './pages/FreeLessonPage';

import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { PluginsPage } from './pages/PluginsPage';
import { MasterAreaPage } from './pages/MasterAreaPage';
import { LiveClassesPage } from './pages/LiveClassesPage';
import { VerifyCertificatePage } from './pages/VerifyCertificatePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';


const MainApp = () => {
  const { currentUser } = useAuth();
  const { courses } = useDatabase();

  const [activePage, setActivePage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [verifyCodeInitial, setVerifyCodeInitial] = useState('');

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenPayment = () => {
    setPaymentModalOpen(true);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setActivePage('curso-detalhe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartClassroom = (course, lessonId = null) => {
    setSelectedCourse(course);
    setSelectedLessonId(lessonId);
    setActivePage('sala-de-aula');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCertificate = (cert) => {
    setActiveCertificate(cert);
    setCertificateModalOpen(true);
  };

  const handleVerifyFromCertificate = (code) => {
    setVerifyCodeInitial(code);
    setActivePage('verificar-certificado');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      
      {/* SIMULADOR DE ACESSO DISCRETO NO TOPO */}
      <RoleSwitcher />

      {/* GLOBAL LAYOUT: SIDEBAR + MAIN CONTENT */}
      <div style={{ display: 'flex', flex: 1, minHeight: '100vh' }} className="app-layout">
        
        {/* DEDICATED LEFT SIDEBAR */}
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenAuth={handleOpenAuth}
          onOpenPayment={handleOpenPayment}
        />

        {/* MAIN APPLICATION CANVAS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
          
          <main style={{ flex: 1 }}>
            {activePage === 'home' && (
              <HomePage
                setActivePage={setActivePage}
                onOpenPayment={handleOpenPayment}
                onSelectCourse={handleSelectCourse}
              />
            )}

            {activePage === 'beats-store' && (
              <BeatsStorePage />
            )}


            {activePage === 'aula-gratuita' && (
              <FreeLessonPage
                onOpenPayment={handleOpenPayment}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'cursos' && (
              <CoursesPage
                onSelectCourse={handleSelectCourse}
                setActivePage={setActivePage}
                onOpenPayment={handleOpenPayment}
              />
            )}

            {activePage === 'curso-detalhe' && (
              <CourseDetailPage
                course={selectedCourse}
                onOpenPayment={handleOpenPayment}
                onStartClassroom={handleStartClassroom}
                setActivePage={setActivePage}
              />
            )}

            {activePage === 'sala-de-aula' && (
              <ClassroomPage
                course={selectedCourse}
                initialLessonId={selectedLessonId}
                onOpenPayment={handleOpenPayment}
                setActivePage={setActivePage}
                onOpenCertificate={handleOpenCertificate}
              />
            )}

            {activePage === 'dashboard' && (
              <StudentDashboard
                setActivePage={setActivePage}
                onSelectCourse={handleSelectCourse}
                onOpenPayment={handleOpenPayment}
                onStartClassroom={handleStartClassroom}
                onOpenCertificate={handleOpenCertificate}
              />
            )}

            {activePage === 'plugins' && (
              <PluginsPage
                onOpenPayment={handleOpenPayment}
              />
            )}

            {activePage === 'aulas-ao-vivo' && (
              <LiveClassesPage
                onOpenPayment={handleOpenPayment}
              />
            )}

            {activePage === 'area-master' && (
              <MasterAreaPage />
            )}

            {activePage === 'verificar-certificado' && (
              <VerifyCertificatePage
                initialCode={verifyCodeInitial}
                onOpenCertificate={handleOpenCertificate}
              />
            )}

            {activePage === 'admin' && (
              <AdminDashboardPage
                onOpenCertificate={handleOpenCertificate}
              />
            )}

            {activePage === 'login' && (
              <LoginPage
                setActivePage={setActivePage}
              />
            )}
          </main>


          {/* RODAPÉ */}
          <Footer setActivePage={setActivePage} />
        </div>

      </div>

      {/* TOAST FEEDBACK */}
      <Toast />

      {/* MODALS */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        certificate={activeCertificate}
        onVerify={handleVerifyFromCertificate}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <MainApp />
      </DatabaseProvider>
    </AuthProvider>
  );
}

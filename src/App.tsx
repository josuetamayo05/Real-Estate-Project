import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPropertyEdit } from './pages/admin/AdminPropertyEdit';

import { WhatsAppButton } from './components/common/WhatsAppButton';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <WhatsAppButton phoneNumber="5352365254" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Properties />} />
        <Route path="/propiedad/:slug" element={<PropertyDetail />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />

        {/* Panel Administrativo */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/nueva" element={<AdminPropertyEdit />} />
      </Routes>
    </BrowserRouter>
  );
}
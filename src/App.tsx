import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import Home from '@/pages/Home';
import Programs from '@/pages/Programs';
import ProgramDetail from '@/pages/ProgramDetail';
import About from '@/pages/About';
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import LinguaFranca from '@/pages/LinguaFranca';
import Testimonials from '@/pages/Testimonials';
import Account from '@/pages/Account';
import Cart from '@/pages/Cart';
import Terms from '@/pages/Terms';

import { Toaster } from '@/components/ui/sonner';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lingua-franca" element={<LinguaFranca />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
}

export default App;

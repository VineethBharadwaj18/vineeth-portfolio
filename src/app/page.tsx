'use client';
import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import HomeComponent from './components/pages/Home';
import About from './components/pages/About';
import Projects from './components/pages/Projects';
import Contact from './components/pages/Contact';

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activePage, setActivePage] = useState('Home');

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background', isDark ? '#000000' : '#ffffff');
    root.style.setProperty('--foreground', isDark ? '#ffffff' : '#000000');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <HomeComponent isDark={isDark} />;
      case 'About':
        return <About isDark={isDark} />;
      case 'Projects':
        return <Projects isDark={isDark} />;
      case 'Contact':
        return <Contact isDark={isDark} />;
      default:
        return <HomeComponent isDark={isDark} />;
    }
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
        transition: 'all 0.3s ease',
        padding: scrolled ? '0.5rem 1rem' : '1.5rem 2rem',
        background: 'transparent',
        boxSizing: 'border-box'
      }}>
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>

      {/* Page Content */}
      {renderPage()}
    </div>
  );
}

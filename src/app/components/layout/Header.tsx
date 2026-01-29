'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Header({ isDark, setIsDark, activePage, setActivePage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    setIsMounted(true);
    const root = document.documentElement;
    root.style.setProperty('--background', isDark ? '#000000' : '#ffffff');
    root.style.setProperty('--foreground', isDark ? '#ffffff' : '#000000');
  }, [isDark]);

  if (!isMounted) {
    return (
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[960px] h-[60px]" />
    );
  }

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0, scale: 0.95 }}
        animate={{ 
          y: 20, 
          opacity: 1,
          scale: 1,
          width: scrolled ? '70%' : '90%',
          maxWidth: scrolled ? '700px' : '960px'
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 15,
          mass: 0.5,
          delay: 0.1
        }}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 
          flex items-center justify-between rounded-full border 
          ${isDark ? 'border-white/30 bg-white/10' : 'border-black/20 bg-black/10'}
          backdrop-blur-lg px-4 md:px-6 py-3 h-[60px]
          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]`}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: scrolled ? 0.9 : 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 10,
            delay: 0.2
          }}
          className="flex-shrink-0"
        >
          <Image
            src="/mvb.png"
            alt="MVB Logo"
            width={32}
            height={32}
            className="rounded-full"
            priority
          />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            gap: scrolled ? '0.5rem' : '1.5rem'
          }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex flex-1 justify-center mx-4"
        >
          <nav className={`flex items-center text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>
            {navItems.map((item) => (
              <div key={item} className="flex items-center mx-1 md:mx-2">
                {activePage === item && (
                  <motion.span 
                    className="w-2 h-2 bg-green-400 rounded-full mr-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                )}
                <a 
                  href="#" 
                  className={`px-1 py-1 block hover:text-green-400 transition-colors ${
                    activePage === item ? 'font-semibold' : ''
                  } ${
                    scrolled ? 'text-sm' : 'text-base'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(item);
                  }}
                >
                  {item}
                </a>
              </div>
            ))}
          </nav>
        </motion.div>

        {/* Mobile Menu Button and Theme Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-3 md:gap-4"
        >
          <motion.button
            className={`${isDark ? 'text-white' : 'text-black'} md:hidden p-1`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
          
          <motion.button 
            onClick={() => setIsDark(!isDark)}
            className="p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? (
              <Sun size={scrolled ? 18 : 20} className="text-white" />
            ) : (
              <Moon size={scrolled ? 18 : 20} className="text-black" />
            )}
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
            className={`fixed top-[85px] left-1/2 -translate-x-1/2 z-40 w-[85%] max-w-[400px]
              rounded-2xl border px-6 py-4 backdrop-blur-lg
              ${isDark ? 'bg-white/10 border-white/30 text-white' : 'bg-black/10 border-black/30 text-black'}
              shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]`}
          >
            <nav className="flex flex-col items-start space-y-3 w-full text-sm font-medium pl-4">
              {navItems.map((item) => (
                <div key={item} className="flex items-center w-full">
                  {activePage === item && (
                    <motion.span 
                      className="w-2 h-2 bg-green-400 rounded-full mr-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  )}
                  <a 
                    href="#" 
                    className={`py-2 block transition-colors ${
                      activePage === item ? 'text-green-400 font-semibold' : isDark ? 'text-white' : 'text-black'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePage(item);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item}
                  </a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


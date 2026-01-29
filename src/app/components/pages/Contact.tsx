'use client';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import WhatsAppButton from '../WhatsAppButton';

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'vineeth@example.com', link: 'mailto:vineeth@example.com' },
    { icon: Phone, label: 'Phone', value: '+91 7997491801', link: 'tel:+917997491801' },
    { icon: MapPin, label: 'Location', value: 'India', link: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', link: '#' },
    { icon: Linkedin, label: 'LinkedIn', link: '#' },
    { icon: Twitter, label: 'Twitter', link: '#' },
    { icon: Mail, label: 'Email', link: '#' },
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Contact Section */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--foreground)',
        padding: '6rem 2rem 4rem',
        boxSizing: 'border-box'
      }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-green-400' 
                        : 'bg-gray-100 border-gray-300 text-black focus:border-green-400'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-green-400' 
                        : 'bg-gray-100 border-gray-300 text-black focus:border-green-400'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors resize-none ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-green-400' 
                        : 'bg-gray-100 border-gray-300 text-black focus:border-green-400'
                    }`}
                    placeholder="Your message..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-300 transition-colors"
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={idx}
                      href={info.link}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-colors group ${
                        isDark 
                          ? 'border-gray-700 hover:border-green-400' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      <Icon className="text-green-400 w-6 h-6 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{info.label}</p>
                        <p className="font-semibold">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Follow Me</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={idx}
                        href={social.link}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-lg border text-green-400 hover:bg-green-400 hover:text-black transition-colors ${
                          isDark 
                            ? 'border-gray-700' 
                            : 'border-gray-300'
                        }`}
                        title={social.label}
                      >
                        <Icon size={24} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}


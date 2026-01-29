'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Zap, Target, Database, Wrench } from 'lucide-react';
import WhatsAppButton from '../WhatsAppButton';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const skills = [
    { 
      category: 'Frontend', 
      icon: Code2,
      items: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '▲' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'Framer Motion', icon: '✨' }
      ] 
    },
    {
      category: 'Backend',
      icon: Database,
      items: [
        { name: 'Spring Boot', icon: '🍃' },
        { name: 'Python', icon: '🐍' },
        { name: 'SQL', icon: '🗄️' },
        { name: 'MySQL', icon: '🐬' }
      ]
    },
    { 
      category: 'Tools', 
      icon: Wrench,
      items: [
        { name: 'Git', icon: '🔀' },
        { name: 'Docker', icon: '🐳' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Figma', icon: '🎭' },
        { name: 'Webpack', icon: '📦' }
      ] 
    },
  ];

  const highlights = [
    { icon: Code2, title: 'Clean Code', description: 'Writing maintainable and scalable code' },
    { icon: Zap, title: 'Performance', description: 'Optimizing for speed and efficiency' },
    { icon: Target, title: 'User Focus', description: 'Creating intuitive user experiences' },
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* About Hero Section */}
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Me</h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              I&apos;m a passionate software engineer with a love for creating beautiful, functional web experiences.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Who I Am</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                I&apos;m a full-stack developer with expertise in modern web technologies. I specialize in building responsive,
                performant applications that solve real-world problems.
              </p>
              <p className="text-gray-400 leading-relaxed">
                With a strong foundation in both frontend and backend development, I create seamless user experiences
                backed by robust server-side logic.
              </p>
            </motion.div>

            {/* Right Column - Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-700 hover:border-green-400' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <Icon className="text-green-400 w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skillGroup, idx) => {
                const CategoryIcon = skillGroup.icon;
                return (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-lg border transition-colors ${
                      isDark 
                        ? 'border-gray-700 hover:border-green-400' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CategoryIcon className="text-green-400 w-6 h-6" />
                      <h3 className="text-xl font-semibold text-green-400">{skillGroup.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, sidx) => (
                        <motion.span
                          key={sidx}
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                            isDark
                              ? 'bg-gray-800 text-gray-300 hover:bg-green-400 hover:text-black'
                              : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-black'
                          }`}
                        >
                          <span>{skill.icon}</span>
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}


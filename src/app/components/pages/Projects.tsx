'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import WhatsAppButton from '../WhatsAppButton';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
  webviewUrl?: string;
}

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const projects: Project[] = [
    {
      title: 'Weather App',
      description: 'A real-time weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      tags: ['React', 'API', 'Tailwind CSS', 'Responsive'],
      link: 'https://weather-app-1801.vercel.app/',
      github: '#',
      image: '/project1.jpg',
      webviewUrl: 'https://weather-app-1801.vercel.app/'
    },
    {
      title: 'scaitsAI',
      description: 'An AI-powered chat application with real-time messaging, intelligent responses, and seamless user experience.',
      tags: ['Next.js', 'AI/ML', 'WebSocket', 'MongoDB'],
      link: 'https://openai.scaits.net',
      github: '#',
      image: '/project2.jpg',
      webviewUrl: 'https://openai.scaits.net'
    },
    {
      title: 'My Portfolio',
      description: 'A modern, interactive portfolio website showcasing projects with smooth animations and dark mode support.',
      tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      link: '#',
      github: '#',
      image: '/project3.jpg'
    },
    {
      title: 'i_shoots',
      description: 'A photography portfolio platform for showcasing and managing photography projects with gallery features.',
      tags: ['React', 'Firebase', 'Image Gallery', 'Responsive'],
      link: '#',
      github: '#',
      image: '/project4.jpg'
    },
  ];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Projects Section */}
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Projects</h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Here are some of my recent projects showcasing my skills and experience.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div ref={ref} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group rounded-lg border overflow-hidden transition-all hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20 ${isDark ? 'border-gray-700' : 'border-gray-300'
                  }`}
              >
                {/* Project Image or Webview */}
                <div className={`relative h-48 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  {project.webviewUrl ? (
                    <iframe
                      src={project.webviewUrl}
                      className="w-full h-full border-none pointer-events-none"
                      title={project.title}
                      scrolling="no"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center">
                      <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Project Image</span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tidx) => (
                      <span
                        key={tidx}
                        className={`px-2 py-1 rounded text-xs transition-colors ${isDark
                          ? 'bg-gray-800 text-gray-300 hover:bg-green-400 hover:text-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-black'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className={`flex gap-3 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}


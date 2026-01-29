'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star } from 'lucide-react';

const experienceData = [
	{
		title: 'Software Engineer',
		company: 'Varsity Education',
		duration: 'Jun 2024 — Present',
		logo: '/company1.jpg',
	},
	{
		title: 'Frontend Developer',
		company: 'Freelance Projects',
		duration: 'Mar 2023 — Present',
		logo: '/company2.png',
	},
];

export default function Experience({ isDark }: { isDark: boolean }) {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

	return (
		<section
			ref={ref}
			style={{
				background: 'var(--background)',
				color: 'var(--foreground)',
				transition: 'background 0.3s, color 0.3s',
			}}
			className="w-full py-20 px-6 md:px-20"
		>
			<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
				{/* Left Side */}
				<div>
					<div className="flex items-center gap-2 mb-4">
						<Star className="text-green-400 w-5 h-5" />
						<p className="text-sm tracking-widest font-semibold text-green-400">
							WORK HISTORY
						</p>
					</div>
					<h2 className="text-5xl font-bold mb-4">Experience</h2>
					<p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
						I have worked with some of the most innovative industry leaders to help
						build their top-notch products.
					</p>
				</div>

				{/* Right Side */}
				<div className="space-y-8">
					{experienceData.map((exp, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 40, scale: 0.95 }}
							animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
							transition={{ duration: 0.6, delay: idx * 0.2 }}
							className={`flex items-center justify-between border-b pb-4 ${
								isDark ? 'border-gray-600' : 'border-gray-300'
							}`}
						>
							<div className="flex items-center gap-4">
								<motion.div
									initial={{ scale: 0.8 }}
									animate={inView ? { scale: 1.1 } : {}}
									transition={{ type: 'spring', stiffness: 150 }}
								>
									<Image
										src={exp.logo}
										alt={exp.company}
										width={48}
										height={48}
										className="rounded-full"
									/>
								</motion.div>
								<div>
									<p className="font-semibold text-lg">{exp.title}</p>
									<p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>@{exp.company}</p>
								</div>
							</div>
							<p className={`text-sm whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
								{exp.duration}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}


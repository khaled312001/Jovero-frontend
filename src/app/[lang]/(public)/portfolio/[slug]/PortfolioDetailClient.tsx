'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Layers, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import Link from 'next/link';
import Image from 'next/image';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

interface PortfolioDetailClientProps {
    project: any;
    lang: string;
}

export default function PortfolioDetailClient({ project, lang }: PortfolioDetailClientProps) {
    const dict = useDictionary();
    const technologies = React.useMemo(() => {
        if (!project?.technologies) return [];
        if (Array.isArray(project.technologies)) return project.technologies;
        try {
            const parsed = JSON.parse(project.technologies);
            return Array.isArray(parsed) ? parsed : [parsed.toString()];
        } catch (e) {
            // If not valid JSON, treat as comma-separated string
            return project.technologies.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
    }, [project?.technologies]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-primary text-center px-6">
                <div className="max-w-md">
                    <h2 className="text-4xl font-display font-bold text-white mb-4">
                        {(dict.portfolio?.detail as any)?.notFound || 'Project Not Found'}
                    </h2>
                    <p className="text-brand-muted mb-8 italic">
                        {(dict.portfolio?.detail as any)?.notFoundDesc || 'This project could not be found.'}
                    </p>
                    <Link href={`/${lang}/portfolio`}>
                        <Button variant="primary" icon={<ArrowLeft size={20} />}>
                            {(dict.portfolio?.detail as any)?.backToPortfolio || 'Back to Portfolio'}
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const title = lang === 'en' && project.titleEn ? project.titleEn : project.title;
    const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
    const category = lang === 'en' && project.categoryEn ? project.categoryEn : project.category;

    return (
        <main className="min-h-screen bg-brand-primary overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-10" />
            </div>

            {/* Hero */}
            <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32">
                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <Link href={`/${lang}/portfolio`} className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm hover:gap-3 transition-all">
                                <ArrowLeft size={16} />
                                <span>{(dict.portfolio?.detail as any)?.backToPortfolio || 'BACK_TO_PORTFOLIO'}</span>
                            </Link>
                        </motion.div>

                        <motion.h1 variants={heroTextReveal} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
                            {title}
                        </motion.h1>

                        <motion.p variants={heroTextReveal} className="text-xl text-brand-muted leading-relaxed font-light mb-12">
                            {description}
                        </motion.p>

                        <motion.div variants={heroTextReveal} className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8">
                            <div>
                                <h4 className="text-brand-accent font-mono text-xs uppercase mb-2 flex items-center gap-2">
                                    <Tag size={14} /> {(dict.portfolio?.detail as any)?.category || 'Category'}
                                </h4>
                                <p className="text-white font-medium">{category}</p>
                            </div>
                            <div>
                                <h4 className="text-brand-accent font-mono text-xs uppercase mb-2 flex items-center gap-2">
                                    <User size={14} /> {(dict.portfolio?.detail as any)?.client || 'Client'}
                                </h4>
                                <p className="text-white font-medium">{project.client || (lang === 'ar' ? 'سري' : 'Confidential')}</p>
                            </div>
                            <div>
                                <h4 className="text-brand-accent font-mono text-xs uppercase mb-2 flex items-center gap-2">
                                    <Calendar size={14} /> {(dict.portfolio?.detail as any)?.duration || 'Duration'}
                                </h4>
                                <p className="text-white font-medium">{project.duration || (lang === 'ar' ? 'مستمر' : 'Ongoing')}</p>
                            </div>
                            {project.content && project.content.startsWith('http') && (
                                <div>
                                    <a href={project.content} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="shadow-neon-purple"
                                            icon={<ExternalLink size={18} />}
                                        >
                                            {(dict.portfolio?.grid as any)?.visitProject || (lang === 'ar' ? 'زيارة المشروع' : 'Visit Live Project')}
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            {project.images && project.images.length > 0 && (
                <section className="relative pb-20">
                    <div className="section-container">
                        <SectionReveal>
                            <div className="flex items-center gap-4 mb-12">
                                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
                                    {(dict.portfolio?.detail as any)?.gallery || 'Project Gallery'}
                                </h3>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {project.images.map((img: any, index: number) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-lg shadow-black/20"
                                    >
                                        <Image
                                            src={img.url}
                                            alt={img.alt || `${title} - Exhibit ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute bottom-4 left-4 text-white/60 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300 uppercase">
                                            {(dict.portfolio?.detail as any)?.viewExhibit || 'VIEW_EXHIBIT'} {index + 1}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </SectionReveal>
                    </div>
                </section>
            )}

            {/* Content & Tech Stack */}
            <section className="section-padding pt-0">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 space-y-12">
                            <SectionReveal>
                                <h3 className="text-2xl font-display font-bold text-white mb-6">
                                    {(dict.portfolio?.detail as any)?.challengeSolution || 'The Challenge & Solution'}
                                </h3>
                                <div className="prose prose-invert prose-lg max-w-none text-brand-muted font-light leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: project.content || `<p>${lang === 'ar' ? 'تفاصيل حالة الدراسة قريباً.' : 'Detailed case study content coming soon.'}</p>` }}
                                />
                            </SectionReveal>

                            {project.results && (
                                <SectionReveal>
                                    <div className="glass-card p-8 border-brand-accent/20 bg-brand-accent/5">
                                        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                                            <CheckCircle2 className="text-brand-accent" /> {(dict.portfolio?.detail as any)?.keyResults || 'Key Results'}
                                        </h3>
                                        <p className="text-brand-muted">{project.results}</p>
                                    </div>
                                </SectionReveal>
                            )}
                        </div>

                        <div>
                            <SectionReveal direction="left">
                                <div className="glass-card p-8 sticky top-32">
                                    <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
                                        {(dict.portfolio?.detail as any)?.techStack || 'Tech Stack'}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map((tech: string) => (
                                            <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-white/5 border border-white/10 rounded text-brand-accent">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SectionReveal>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

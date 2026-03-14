'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';
import { useDictionary } from '@/lib/contexts/DictionaryContext';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { Button } from '@/components/ui/Button';

interface Project {
    id: string;
    slug: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    image: string;
    category: string;
}

export function PortfolioGallery() {
    const params = useParams();
    const lang = params?.lang as string;
    const dict = useDictionary();
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [filter, setFilter] = React.useState('all');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const { data } = await publicApi.getPortfolio();
                // Take first 6 projects for the homepage
                setProjects(data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    if (loading && projects.length === 0) return null;

    return (
        <section className="relative py-32 bg-brand-primary overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
                            {dict.navbar.portfolio}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">
                                {dict.home.portfolio.title}
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-purple" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80 leading-relaxed">
                            {dict.home.portfolio.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                {/* Filter Tabs */}
                {projects.length > 0 && categories.length > 2 && (
                    <SectionReveal delay={0.1}>
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 border ${filter === cat
                                            ? 'bg-brand-accent border-brand-accent text-brand-primary font-bold shadow-neon-purple'
                                            : 'bg-brand-surface/50 border-white/10 text-brand-muted hover:border-brand-accent/50 hover:text-white'
                                        }`}
                                >
                                    {cat === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : cat}
                                </button>
                            ))}
                        </div>
                    </SectionReveal>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <Link href={`/${lang}/portfolio/${project.slug}`}>
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 bg-brand-surface group-hover:border-brand-accent/30 transition-all duration-500 shadow-2xl">
                                        {/* Image */}
                                        <Image
                                            src={getImageUrl(project.image)}
                                            alt={lang === 'en' && project.titleEn ? project.titleEn : project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                            <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="text-brand-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-2 block">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-2xl font-display font-black text-white mb-2 leading-tight">
                                                    {lang === 'en' && project.titleEn ? project.titleEn : project.title}
                                                </h3>
                                                <p className="text-white/70 text-sm line-clamp-2 mb-6 font-light">
                                                    {lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
                                                </p>

                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 rounded-xl bg-brand-accent text-brand-primary shadow-neon-purple scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                                        <ArrowRight size={20} />
                                                    </div>
                                                    <span className="text-white text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                        {dict.home.portfolio.viewProject}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Plus Icon - Top Right */}
                                        <div className="absolute top-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white opacity-0 -translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                                            <Plus size={24} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Button */}
                <SectionReveal delay={0.4}>
                    <div className="flex justify-center">
                        <Link href={`/${lang}/portfolio`}>
                            <Button
                                size="xl"
                                variant="neon"
                                icon={<ArrowRight size={20} className="rtl:-scale-x-100 group-hover:translate-x-2 transition-transform" />}
                                className="px-12 h-16 rounded-2xl font-black text-lg group"
                            >
                                {lang === 'ar' ? 'عرض كافة الأعمال' : 'View All Projects'}
                            </Button>
                        </Link>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Gavel, Globe, CheckCircle2 } from 'lucide-react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

export default function TermsPage() {
    const dict = useDictionary();
    const t = dict.terms;

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <div className="absolute inset-0 circuit-pattern opacity-10" />

                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-[0.2em] shadow-neon-purple uppercase">
                                <FileText size={18} />
                                {t.badge}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            {t.titleLine1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{t.titleHighlight}</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-brand-muted text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                            {t.lastUpdatedLabel}: {t.lastUpdated} | <span className="text-white">{t.jurisdiction}</span>
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding relative">
                <div className="section-container max-w-4xl relative z-10">
                    <div className="space-y-12">
                        <SectionReveal>
                            <div className="glass-card p-10 border-white/5">
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">{t.introTitle}</h2>
                                <p className="text-brand-muted leading-relaxed">
                                    {t.introContent}
                                </p>
                            </div>
                        </SectionReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {t.items.map((term: { title: string; content: string }, idx: number) => (
                                <SectionReveal key={idx} delay={idx * 0.1}>
                                    <div className="glass-card p-8 h-full hover-glow border-brand-accent/10">
                                        <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent w-fit mb-6">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-brand-text mb-4">{term.title}</h3>
                                        <p className="text-brand-muted text-sm leading-relaxed">{term.content}</p>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>

                        <SectionReveal>
                            <div className="glass-card p-12 border-brand-accent/20 bg-brand-accent/5 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 rtl:left-auto rtl:right-0 w-1 h-full bg-brand-accent shadow-neon-purple" />
                                <div className="flex flex-col md:flex-row items-center gap-10">
                                    <div className="p-8 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 group-hover:shadow-neon-purple transition-all duration-500 shrink-0">
                                        <Gavel size={56} />
                                    </div>
                                    <div className="rtl:text-right">
                                        <h2 className="text-3xl font-display font-black text-white mb-6 uppercase tracking-wider">{t.governingTitle}</h2>
                                        <p className="text-brand-muted leading-relaxed font-light text-lg">
                                            {t.governingContent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SectionReveal>

                        <SectionReveal>
                            <div className="text-center py-10">
                                <p className="text-brand-muted mb-4 flex items-center justify-center gap-2">
                                    <Globe size={16} className="text-brand-accent" />
                                    {t.footerNote}
                                </p>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>
        </>
    );
}

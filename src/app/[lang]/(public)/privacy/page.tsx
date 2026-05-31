'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

export default function PrivacyPage() {
    const dict = useDictionary();
    const p = dict.privacy;
    const sectionIcons = [<Lock size={20} key="i0" />, <Eye size={20} key="i1" />, <Shield size={20} key="i2" />, <FileText size={20} key="i3" />];

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
                                <Shield size={18} />
                                {p.badge}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            {p.titleLine1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{p.titleHighlight}</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-brand-muted text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                            {p.lastUpdatedLabel}: {p.lastUpdated} | <span className="text-white">{p.compliance}</span>
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
                                <h2 className="text-2xl font-display font-bold text-brand-text mb-6">{p.introTitle}</h2>
                                <p className="text-brand-muted leading-relaxed">
                                    {p.introContent}
                                </p>
                            </div>
                        </SectionReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {p.sections.map((section: { title: string; content: string }, idx: number) => (
                                <SectionReveal key={idx} delay={idx * 0.1}>
                                    <div className="glass-card p-8 h-full hover-glow border-brand-accent/10">
                                        <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent w-fit mb-6">
                                            {sectionIcons[idx] || sectionIcons[0]}
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-brand-text mb-4">{section.title}</h3>
                                        <p className="text-brand-muted text-sm leading-relaxed">{section.content}</p>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>

                        <SectionReveal>
                            <div className="glass-card p-12 border-brand-accent/20 bg-brand-accent/5 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 rtl:left-auto rtl:right-0 w-1 h-full bg-brand-accent shadow-neon-purple" />
                                <h2 className="text-2xl font-display font-black text-white mb-6 uppercase tracking-widest">{p.contactTitle}</h2>
                                <p className="text-brand-muted leading-relaxed mb-8 font-light italic">
                                    {p.contactContent}
                                </p>
                                <a href={`mailto:${p.contactEmail}`} className="text-brand-accent font-mono font-black text-xl tracking-tighter shadow-neon-purple inline-block p-4 bg-white/5 rounded-xl border border-brand-accent/30 hover:bg-brand-accent/10 transition-colors">{p.contactEmail}</a>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>
        </>
    );
}

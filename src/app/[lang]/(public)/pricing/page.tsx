'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ExternalLink, FileText, Tag, ShieldCheck, Layers, BadgeCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal, SectionHeading } from '@/components/ui/SectionReveal';
import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { MouseFollower } from '@/components/ui/MouseFollower';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useDictionary } from '@/lib/contexts/DictionaryContext';
import { WHATSAPP_URL } from '@/lib/utils';

const PDF_URL = '/pricing-plan.pdf';

// ============ HERO ============
function PricingHero() {
    const dict = useDictionary();
    const p = dict.pricing.hero;
    return (
        <section className="relative pt-48 pb-24 overflow-hidden bg-brand-primary">
            <MouseFollower />
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute inset-0 tech-grid opacity-20" />

            <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-accent/20 rounded-full blur-[128px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[128px] animate-pulse" />

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/3 left-[15%] p-4 glass-card border-brand-accent/20 opacity-40 shadow-neon-purple"
                >
                    <Tag className="text-brand-accent" size={32} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-1/3 right-[15%] p-4 glass-card border-brand-secondary/20 opacity-30 shadow-neon-purple"
                >
                    <FileText className="text-brand-secondary" size={32} />
                </motion.div>
            </div>

            <div className="section-container relative">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={heroTextReveal} className="mb-8">
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] bg-brand-glass border border-brand-accent/30 text-brand-accent shadow-neon-purple backdrop-blur-md">
                            <Sparkles size={14} className="animate-pulse" />
                            {p.badge}
                        </span>
                    </motion.div>

                    <motion.h1 variants={heroTextReveal} className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight">
                        {p.titleLine1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary filter drop-shadow-[0_0_20px_rgba(187,38,255,0.3)]">
                            {p.titleHighlight}
                        </span>
                    </motion.h1>

                    <motion.div variants={heroTextReveal}>
                        <p className="text-xl md:text-2xl text-brand-muted leading-relaxed max-w-2xl mx-auto font-light">
                            {p.subtitle}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// ============ HIGHLIGHTS ============
function HighlightsSection() {
    const dict = useDictionary();
    const items: { title: string; desc: string }[] = dict.pricing.highlights;
    const icons = [<ShieldCheck size={28} key="i0" />, <Layers size={28} key="i1" />, <BadgeCheck size={28} key="i2" />];

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {items.map((item, i) => (
                        <motion.div key={i} variants={staggerItem}>
                            <div className="glass-card p-8 group border-white/5 hover:border-brand-accent/30 h-full relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent w-fit mb-6 border border-brand-accent/20 group-hover:shadow-neon-purple transition-all duration-500">
                                    {icons[i] || icons[0]}
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-brand-accent transition-colors">{item.title}</h3>
                                <p className="text-brand-muted leading-relaxed font-light">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ============ PDF DOCUMENT VIEWER ============
function PdfViewerSection() {
    const dict = useDictionary();
    const doc = dict.pricing.doc;

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 bg-accent-gradient opacity-5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="section-container relative z-10">
                <SectionHeading badge={dict.pricing.hero.badge} title={doc.title} description={doc.subtitle} />

                <SectionReveal>
                    <div className="relative group mt-12 max-w-5xl mx-auto">
                        {/* Decorative gradient frame */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />

                        <div className="relative glass-card overflow-hidden border-white/10 bg-brand-dark/60 backdrop-blur-2xl rounded-3xl">
                            {/* Toolbar */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 border-b border-white/10 bg-white/[0.02]">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2.5 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent shrink-0">
                                        <FileText size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-bold text-sm truncate">{doc.title}</p>
                                        <p className="text-brand-muted text-xs font-mono uppercase tracking-widest opacity-70">PDF</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <a
                                        href={PDF_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-brand-muted border border-white/10 hover:text-white hover:border-brand-secondary/50 hover:bg-white/5 transition-all duration-300"
                                    >
                                        <ExternalLink size={16} />
                                        <span className="hidden sm:inline">{doc.openNewTab}</span>
                                    </a>
                                    <a
                                        href={PDF_URL}
                                        download
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-brand-primary bg-brand-accent hover:bg-white shadow-neon-purple transition-all duration-300"
                                    >
                                        <Download size={16} />
                                        {doc.download}
                                    </a>
                                </div>
                            </div>

                            {/* PDF embed — object with iframe fallback, then text fallback */}
                            <div className="relative w-full h-[70vh] min-h-[520px] lg:h-[880px] bg-[#1a1a24]">
                                <object data={`${PDF_URL}#view=FitH&toolbar=1`} type="application/pdf" className="w-full h-full">
                                    <iframe
                                        src={`${PDF_URL}#view=FitH&toolbar=1`}
                                        title={doc.title}
                                        className="w-full h-full border-0"
                                        loading="lazy"
                                    />
                                    {/* Final fallback if neither object nor iframe can render */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                                        <div className="p-5 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
                                            <FileText size={40} />
                                        </div>
                                        <p className="text-brand-muted max-w-md font-light">{doc.fallback}</p>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
                                                <Button variant="neon" size="md" icon={<ExternalLink size={18} />}>{doc.openNewTab}</Button>
                                            </a>
                                            <a href={PDF_URL} download>
                                                <Button variant="primary" size="md" icon={<Download size={18} />}>{doc.download}</Button>
                                            </a>
                                        </div>
                                    </div>
                                </object>
                            </div>
                        </div>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============ CTA ============
function PricingCta() {
    const params = useParams();
    const lang = params?.lang as string;
    const dict = useDictionary();
    const cta = dict.pricing.cta;

    return (
        <section className="section-padding relative overflow-hidden bg-brand-primary border-t border-white/5 text-center">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-brand-accent/15 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container relative z-10">
                <SectionReveal>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-[1.1] tracking-tight">
                        {cta.title}
                    </h2>
                    <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90 font-light">
                        {cta.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/${lang}/contact`} className="w-full sm:w-auto">
                            <Button size="xl" variant="primary" icon={<ArrowRight size={22} className="rtl:-scale-x-100" />} className="w-full sm:w-auto h-16 px-12 rounded-xl font-bold">
                                {cta.button}
                            </Button>
                        </Link>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button size="xl" variant="neon" className="w-full sm:w-auto h-16 px-12 rounded-xl font-bold border-white/20">
                                WhatsApp
                            </Button>
                        </a>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

// ============ PAGE ============
export default function PricingPage() {
    return (
        <>
            <PricingHero />
            <HighlightsSection />
            <PdfViewerSection />
            <PricingCta />
        </>
    );
}

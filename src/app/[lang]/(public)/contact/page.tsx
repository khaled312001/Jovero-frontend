'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { staggerContainer, heroTextReveal } from '@/lib/animations';
import { WHATSAPP_URL } from '@/lib/utils';
import { useSiteSettings } from '@/lib/contexts/SiteContext';
import { useDictionary } from '@/lib/contexts/DictionaryContext';

export default function ContactPage() {
    const dict = useDictionary();
    const contactDict = dict.contact;
    const { settings } = useSiteSettings();
    const whatsapp = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}` : WHATSAPP_URL;

    return (
        <>
            {/* Hero */}
            <section className="relative pt-48 pb-32 lg:pt-56 lg:pb-40 overflow-hidden bg-brand-primary">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 tech-grid opacity-20" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 circuit-pattern pointer-events-none"
                />

                <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-accent/10 rounded-full blur-[128px] animate-pulse" />

                <div className="section-container relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div variants={heroTextReveal} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-sm font-mono tracking-[0.2em] shadow-neon-purple">
                                <MessageCircle size={18} className="animate-pulse" />
                                <span className="uppercase">{contactDict.hero.badge}</span>
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroTextReveal}
                            className="text-4xl sm:text-6xl lg:text-8xl font-display font-black text-white mb-8 tracking-tighter drop-shadow-2xl"
                        >
                            {contactDict.hero.titleLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary">{contactDict.hero.titleHighlight}</span>
                        </motion.h1>
                        <motion.p variants={heroTextReveal} className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: contactDict.hero.subtitle }} />
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-10" />
                <div className="section-container relative z-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {/* WhatsApp Card */}
                        <SectionReveal direction="up" delay={0.1}>
                            <div className="glass-card p-10 hover-glow bg-brand-dark/40 border-white/5 relative group hover:border-brand-accent/30 transition-all duration-500 text-center h-full flex flex-col items-center">
                                <div className="p-5 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent mb-8 group-hover:shadow-neon-purple transition-all duration-500 scale-110">
                                    <MessageCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-display font-black text-white mb-4">{contactDict.info.techTitle}</h3>
                                <p className="text-brand-muted text-sm font-light mb-10 leading-relaxed">{contactDict.info.techDesc}</p>
                                <div className="mt-auto w-full">
                                    <Link href={whatsapp} target="_blank" className="w-full">
                                        <Button variant="outline" size="lg" className="w-full border-white/10 hover:border-brand-accent/30 group/btn overflow-hidden relative">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {contactDict.info.techBtn}
                                                <ArrowRight size={18} className="rtl:rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SectionReveal>

                        {/* Phone Card */}
                        <SectionReveal direction="up" delay={0.2}>
                            <div className="glass-card p-10 hover-glow bg-brand-dark/40 border-white/5 relative group hover:border-brand-secondary/30 transition-all duration-500 text-center h-full flex flex-col items-center">
                                <div className="p-5 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary mb-8 group-hover:shadow-neon-blue transition-all duration-500 scale-110">
                                    <MessageCircle size={32} className="rotate-[270deg]" /> {/* Using MessageCircle as Phone fallback if needed, but let's see imports */}
                                </div>
                                <h3 className="text-2xl font-display font-black text-white mb-4">{contactDict.info.phoneTitle}</h3>
                                <p className="text-brand-muted text-sm font-light mb-10 leading-relaxed">{contactDict.info.phoneDesc}</p>
                                <div className="mt-auto w-full">
                                    <Link href={`tel:${settings?.phone || '+201055709709'}`} className="w-full">
                                        <Button variant="outline" size="lg" className="w-full border-white/10 hover:border-brand-secondary/30 group/btn overflow-hidden relative">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {contactDict.info.phoneBtn}
                                                <ArrowRight size={18} className="rtl:rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SectionReveal>

                        {/* Email Card */}
                        <SectionReveal direction="up" delay={0.3}>
                            <div className="glass-card p-10 hover-glow bg-brand-dark/40 border-white/5 relative group hover:border-white/20 transition-all duration-500 text-center h-full flex flex-col items-center">
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white mb-8 transition-all duration-500 scale-110">
                                    <MessageCircle size={32} /> {/* Using MessageCircle for consistency in visual style */}
                                </div>
                                <h3 className="text-2xl font-display font-black text-white mb-4">{contactDict.info.emailTitle}</h3>
                                <p className="text-brand-muted text-sm font-light mb-10 leading-relaxed">{contactDict.info.emailDesc}</p>
                                <div className="mt-auto w-full">
                                    <Link href={`mailto:${settings?.email || 'info@jovero.net'}`} className="w-full">
                                        <Button variant="outline" size="lg" className="w-full border-white/10 hover:border-white/30 group/btn overflow-hidden relative">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {contactDict.info.emailBtn}
                                                <ArrowRight size={18} className="rtl:rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>
        </>
    );
}

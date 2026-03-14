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
            <section className="section-padding">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SectionReveal direction="right" delay={0.1}>
                            <div className="glass-card p-8 hover-glow bg-brand-dark/40 border-white/5 relative group hover:border-brand-secondary/30 transition-all duration-500">
                                <div className="p-4 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary w-fit mb-6 group-hover:shadow-neon-purple transition-all duration-500">
                                    <MessageCircle size={24} />
                                </div>
                                <h3 className="text-xl font-display font-black text-white mb-3">{contactDict.info.techTitle}</h3>
                                <p className="text-brand-muted text-sm font-light mb-8 italic">{contactDict.info.techDesc}</p>
                                <Link href={whatsapp} target="_blank">
                                    <Button variant="outline" size="lg" icon={<MessageCircle size={18} />} className="w-full border-white/10 hover:border-brand-secondary/30 flex-row-reverse rtl:flex-row gap-2">
                                        {contactDict.info.techBtn}
                                    </Button>
                                </Link>
                            </div>
                        </SectionReveal>

                        <SectionReveal direction="right" delay={0.3}>
                            <div className="glass-card p-8 bg-brand-dark/40 border-white/5">
                                <div className="flex flex-row-reverse rtl:flex-row-reverse ltr:flex-row items-center gap-6 mb-6">
                                    <div className="p-4 rounded-xl bg-white/5 text-brand-muted border border-white/10 flex-shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <h3 className="text-lg font-display font-black text-white rtl:text-right ltr:text-left">{contactDict.info.hoursTitle}</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex flex-row-reverse rtl:flex-row items-center justify-between text-sm">
                                        <span className="text-brand-muted font-light">{contactDict.info.monFri}</span>
                                        <span className="text-white font-mono" dir="ltr">09:00 - 18:00</span>
                                    </div>
                                    <div className="flex flex-row-reverse rtl:flex-row items-center justify-between text-sm">
                                        <span className="text-brand-muted font-light">{contactDict.info.sat}</span>
                                        <span className="text-white font-mono" dir="ltr">10:00 - 14:00</span>
                                    </div>
                                    <div className="pt-4 text-[10px] font-mono text-brand-muted/40 uppercase text-center border-t border-white/5 mt-4">{contactDict.info.timezone}</div>
                                </div>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="pb-32 relative overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-5" />
                <div className="section-container relative z-10">
                    <SectionReveal>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-brand-secondary/20 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                            <div className="glass-card p-2 overflow-hidden border-white/10 relative bg-brand-dark/50">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.8641668267813!2d8.5204!3d47.3863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a0d7d0f0000%3A0x0!2sHardstrasse%20201%2C%208005%20Z%C3%BCrich!5e0!3m2!1sen!2sch!4v1710691886490!5m2!1sen!2sch"
                                    width="100%"
                                    height="500"
                                    style={{ border: 0, borderRadius: '1.5rem', filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) brightness(0.8)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="JOVERO Office Location"
                                />
                                <div className="absolute top-8 right-8 p-4 glass-card bg-brand-primary/80 backdrop-blur-xl border-brand-accent/30 text-brand-accent shadow-neon-purple max-w-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-brand-accent animate-ping flex-shrink-0" />
                                        <span className="text-xs font-mono font-bold tracking-widest uppercase text-white rtl:text-right">{contactDict.map.liveOps}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </>
    );
}

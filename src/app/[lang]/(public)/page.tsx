'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, TrendingUp, ArrowRight, Shield, Zap, Users, Globe, CheckCircle2, Star, Terminal, Target, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { SectionReveal } from '@/components/ui/SectionReveal';

import { staggerContainer, staggerItem, heroTextReveal } from '@/lib/animations';
import { cn, WHATSAPP_URL, getImageUrl } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { MouseFollower } from '@/components/ui/MouseFollower';
import { useParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { useDictionary } from '@/lib/contexts/DictionaryContext';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';

// ============ HERO SECTION ============
function HeroSection({ data }: { data?: any }) {
    const params = useParams();
    const lang = params?.lang as string;
    const dict = useDictionary();
    // Always use dict values to ensure correct language translation
    const badgeText = dict.hero.badge;
    const titleLine1 = dict.hero.titleLine1;
    const titleLine2 = dict.hero.titleLine2;
    const description = dict.hero.subtitle;
    const primaryBtnText = dict.hero.ctaPrimary;
    const secondaryBtnText = dict.hero.ctaSecondary;


    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary">
            {/* Interactive Spotlight */}
            <MouseFollower />

            {/* Background Effects */}
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute inset-0 tech-grid opacity-20" />

            {/* Animated Circuit Pattern Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 circuit-pattern opacity-30"
            />

            {/* Dynamic Geometric Accents */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-brand-accent/20 rounded-full blur-[140px]"
                    style={{ willChange: 'transform, opacity' }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, -40, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] -left-[10%] w-[700px] h-[700px] bg-brand-secondary/20 rounded-full blur-[120px]"
                    style={{ willChange: 'transform, opacity' }}
                />
            </div>

            {/* Floating Tech Elements with Enhanced Motion */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[25%] left-[10%] p-5 glass-card neon-glow-blue border-brand-accent/30"
                    style={{ willChange: 'transform' }}
                >
                    <Terminal className="text-brand-accent" size={38} />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -15, 15, 0],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[55%] right-[12%] p-5 glass-card neon-glow-purple border-brand-secondary/30"
                    style={{ willChange: 'transform' }}
                >
                    <Target className="text-brand-secondary" size={38} />
                </motion.div>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                    }}
                    transition={{
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute bottom-[25%] left-[20%] p-3 glass-card opacity-30 border-white/10"
                >
                    <TrendingUp className="text-brand-accent" size={28} />
                </motion.div>
            </div>

            <div className="section-container relative z-10 pt-40 pb-20 lg:pt-48 lg:pb-32 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div variants={heroTextReveal} className="mb-10">
                        <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-glass border border-brand-accent/30 text-brand-accent text-xs font-mono tracking-[0.2em] shadow-neon-purple backdrop-blur-md">
                            <Shield size={16} className="animate-pulse" />
                            <span className="uppercase">{badgeText}</span>
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={heroTextReveal}
                        className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl px-4"
                    >
                        <span className="block mb-4 sm:mb-2 opacity-90">{titleLine1}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary filter drop-shadow-[0_0_40px_rgba(139,92,246,0.35)]">
                            {titleLine2}
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={heroTextReveal}
                        className="text-lg md:text-xl lg:text-2xl text-brand-muted max-w-4xl mx-auto mb-12 leading-relaxed font-light opacity-90"
                    >
                        {description}
                    </motion.p>

                    <motion.div variants={heroTextReveal} className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl px-4">
                        <Link href={`/${lang}/contact`} className="w-full sm:w-1/2">
                            <Button size="xl" variant="primary" icon={<ArrowRight size={22} className="rtl:-scale-x-100" />} className="w-full h-16 text-lg font-bold rounded-xl group shadow-neon-purple transition-all duration-500 hover:scale-105 active:scale-95">
                                {primaryBtnText}
                            </Button>
                        </Link>
                        <Link href={`/${lang}/portfolio`} className="w-full sm:w-1/2">
                            <Button size="xl" variant="neon" className="w-full h-16 text-lg font-bold rounded-xl border-white/20 hover:border-brand-secondary/50 transition-all duration-500 hover:scale-105 active:scale-95">
                                {secondaryBtnText}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Enhanced Trust indicators */}
                    <motion.div
                        variants={heroTextReveal}
                        className="mt-20 grid grid-cols-2 lg:flex lg:flex-nowrap items-center justify-center gap-6 sm:gap-12 w-full px-4"
                    >
                        {[
                            { icon: <Terminal size={20} />, text: dict.home.trustIndicators.programming, sub: dict.home.trustIndicators.programmingSub },
                            { icon: <Target size={20} />, text: dict.home.trustIndicators.marketing, sub: dict.home.trustIndicators.marketingSub },
                            { icon: <TrendingUp size={20} />, text: dict.home.trustIndicators.sales, sub: dict.home.trustIndicators.salesSub },
                            { icon: <Shield size={20} />, text: dict.home.trustIndicators.reliability, sub: dict.home.trustIndicators.reliabilitySub },
                        ].map((item, i) => (
                            <motion.div key={i} variants={staggerItem} className="flex flex-col items-center gap-3 group">
                                <span className="p-3.5 rounded-2xl bg-brand-surface border border-white/5 text-brand-accent shadow-neon-purple group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                <div className="text-center">
                                    <p className="text-white font-bold text-xs sm:text-sm mb-0.5 tracking-wide whitespace-nowrap">{item.text}</p>
                                    <p className="text-brand-muted text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 font-mono">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-brand-accent/40"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] font-mono">{dict.home.scrollExplore}</span>
                <div className="w-px h-12 bg-gradient-to-b from-brand-accent/50 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 48] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/3 bg-white shadow-[0_0_10px_white]"
                    />
                </div>
            </motion.div>
        </section>
    );
}

// Helper to map icon names to Lucide components
const ServiceIcon = ({ name, size = 32 }: { name: string; size?: number }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Code2;
    return <Icon size={size} />;
};

// ============ SERVICES SECTION ============
import * as LucideIcons from 'lucide-react';

function ServicesSection() {
    const params = useParams();
    const lang = params?.lang as string;
    const [services, setServices] = React.useState<any[]>([]);
    const dict = useDictionary();

    React.useEffect(() => {
        publicApi.getServices().then(({ data }) => {
            // Flatten services from all categories for the homepage showcase
            const allServices = data.flatMap((cat: any) => (cat.services || []).map((s: any) => ({
                title: lang === 'en' && s.titleEn ? s.titleEn : s.title,
                description: lang === 'en' && s.descriptionEn ? s.descriptionEn : s.description,
                icon: <ServiceIcon name={s.icon || 'Code2'} size={32} />,
                color: cat.id % 2 === 0 ? 'blue' : 'purple', // Alternate colors for variety
                href: `/services/${s.slug}`,
                slug: s.slug
            })))
                // Temporal filter to hide old services until DB is seeded
                .filter((s: any) => ![
                    'software-development-switzerland',
                    'tech-consulting-sweden',
                    'enterprise-solutions-saudi-arabia',
                    'mobile-app-innovation-uae',
                    'system-repair-legacy-maintenance',
                    'maintenance'
                ].includes(s.slug));

            setServices(allServices);
        }).catch(err => console.error(err));
    }, [lang]);

    const displayServices = services;


    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary">
            {/* ... header ... */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[15vw] font-display font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
                {dict.home.services.title.toUpperCase()}
            </div>

            <div className="absolute inset-0 tech-grid opacity-10" />

            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-24">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">{dict.home.services.title}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">{dict.home.services.title}</span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-purple" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                            {dict.home.services.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {displayServices.map((service, i) => (
                        <SectionReveal key={i} delay={i * 0.1}>
                            <ServiceCard
                                {...service}
                                className="h-full"
                            />
                        </SectionReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}


// ============ WHY CHOOSE US ============
function WhyChooseSection({ data }: { data?: any }) {
    const dict = useDictionary();
    // Always use dict values to ensure correct language translation
    const badge = dict.home.whyChoose.badge;
    const title = dict.home.whyChoose.title;
    const description = dict.home.whyChoose.subtitle;
    const btnText = dict.home.whyChoose.cta;

    const reasons = [
        {
            icon: <Shield size={24} />,
            title: dict.home.whyChoose.cards.licensed.title,
            description: dict.home.whyChoose.cards.licensed.desc,
        },
        {
            icon: <Zap size={24} />,
            title: dict.home.whyChoose.cards.performance.title,
            description: dict.home.whyChoose.cards.performance.desc,
        },
        {
            icon: <Users size={24} />,
            title: dict.home.whyChoose.cards.partners.title,
            description: dict.home.whyChoose.cards.partners.desc,
        },
        {
            icon: <Globe size={24} />,
            title: dict.home.whyChoose.cards.global.title,
            description: dict.home.whyChoose.cards.global.desc,
        },
    ];

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <SectionReveal direction="left" className="w-full lg:w-1/2">
                        <div className="max-w-xl">
                            <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{badge}</span>
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight">
                                {title}
                            </h2>
                            <p className="text-brand-muted text-lg leading-relaxed mb-10 opacity-80 font-light">
                                {description}
                            </p>

                            <Link href="/about">
                                <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} className="px-10 h-16 rounded-xl font-bold">
                                    {btnText}
                                </Button>
                            </Link>
                        </div>
                    </SectionReveal>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        {/* Decorative glow behind the grid */}
                        <div className="absolute inset-x-0 inset-y-0 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

                        {reasons.map((reason, i) => (
                            <SectionReveal key={i} direction="right" delay={i * 0.1}>
                                <div className="glass-card p-8 group hover:bg-white/[0.03] transition-all duration-500 border-white/5 h-full flex flex-col items-start">
                                    <div className="p-4 rounded-2xl bg-brand-surface border border-white/10 text-brand-accent w-fit mb-6 group-hover:shadow-neon-purple transition-all duration-500 group-hover:scale-110">
                                        {reason.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                                        {reason.title}
                                    </h3>
                                    <p className="text-brand-muted leading-relaxed text-sm opacity-70">
                                        {reason.description}
                                    </p>
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============ COUNTERS SECTION ============
function CountersSection({ data }: { data?: any }) {
    const dict = useDictionary();
    const defaultStats = [
        { label: dict.home.statistics.projects, value: "150", suffix: "+", icon: <Code2 size={24} /> },
        { label: dict.home.statistics.clients, value: "80", suffix: "+", icon: <Users size={24} /> },
        { label: dict.home.statistics.years, value: "5", suffix: "+", icon: <Star size={24} /> },
        { label: dict.home.statistics.support, value: "100", suffix: "%", icon: <CheckCircle2 size={24} /> },
    ];

    // Always use dict labels for translation correctness.
    // If DB provides stats, use their value/suffix but override labels with dict translations.
    const stats: any[] = data?.stats && data.stats.length > 0
        ? data.stats.map((s: any, i: number) => ({
            ...s,
            label: defaultStats[i]?.label || s.label,
            icon: defaultStats[i]?.icon || <Star size={24} />,
        }))
        : defaultStats;

    return (
        <section className="relative overflow-hidden py-24 bg-brand-primary border-y border-white/5">
            <div className="absolute inset-0 bg-accent-gradient opacity-10" />
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                    {stats.map((stat, i) => (
                        <AnimatedCounter
                            key={i}
                            end={parseInt(stat.value) || 0}
                            suffix={stat.suffix}
                            label={stat.label}
                            icon={stat.icon || defaultStats[i]?.icon || <Star size={24} />}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============ TESTIMONIALS SECTION ============
function TestimonialsSection() {
    const params = useParams();
    const lang = params?.lang as string;
    const [testimonials, setTestimonials] = React.useState<any[]>([]);
    const dict = useDictionary();

    React.useEffect(() => {
        publicApi.getTestimonials().then(({ data }) => setTestimonials(data)).catch(console.error);
    }, []);

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary">
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-24">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{dict.home.testimonialsBadge}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">{dict.home.testimonials.title}</span>
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-purple" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80 italic">
                            {dict.home.testimonials.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {testimonials.map((t, i) => {
                        const name = lang === 'en' && t.nameEn ? t.nameEn : t.name;
                        const role = lang === 'en' && t.roleEn ? t.roleEn : t.role;
                        const content = lang === 'en' && t.contentEn ? t.contentEn : t.content;

                        return (
                            <SectionReveal key={i} delay={i * 0.1}>
                                <div className="glass-card p-10 h-full flex flex-col group hover:bg-white/[0.04] transition-all duration-500 border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                        <Globe size={80} className="text-brand-accent" />
                                    </div>

                                    <div className="flex gap-1.5 mb-8 text-brand-accent">
                                        {Array.from({ length: t.rating }).map((_, j) => (
                                            <Star key={j} size={16} className="fill-current" />
                                        ))}
                                    </div>

                                    <p className="text-brand-muted text-lg leading-relaxed flex-1 mb-10 font-light opacity-90">
                                        &ldquo;{content}&rdquo;
                                    </p>

                                    <div className="flex items-center gap-5 border-t border-white/10 pt-8 mt-auto">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent font-black text-xl shadow-inner">
                                            {name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white font-black leading-none mb-1.5 text-lg">{name}</p>
                                            <p className="text-brand-accent text-xs font-mono uppercase tracking-[0.2em] opacity-80">{role}</p>
                                        </div>
                                    </div>
                                </div>
                            </SectionReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ============ PARTNERS SECTION ============
function PartnersSection() {
    const dict = useDictionary();
    const [partners, setPartners] = React.useState<any[]>([]);

    React.useEffect(() => {
        publicApi.getPartners().then(({ data }) => setPartners(data)).catch(console.error);
    }, []);

    const marqueeItems = [...partners, ...partners];

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-10" />

            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none opacity-50" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none opacity-50" />

            <div className="section-container relative z-10 px-0 max-w-none">
                <SectionReveal>
                    <div className="text-center mb-24 section-container pb-0">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
                            {dict.home.partners?.badge || 'PARTNERS'}
                        </span>
                        <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 text-glow tracking-tighter">
                            {dict.home.partners?.titleLine1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-white to-brand-secondary italic">{dict.home.partners?.titleHighlight}</span>
                        </h2>
                        <div className="w-32 h-1 bg-brand-accent mx-auto mb-10 rounded-full shadow-neon-purple" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80">
                            {dict.home.partners?.subtitle}
                        </p>
                    </div>
                </SectionReveal>

                {partners.length > 0 && (
                    <div className="relative w-full overflow-hidden py-10 group" dir="ltr">
                        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-primary to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-primary to-transparent z-10 pointer-events-none" />

                        <motion.div
                            className="flex whitespace-nowrap gap-10 w-max px-4"
                            animate={{
                                x: [0, "-50%"]
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 50,
                                    ease: "linear",
                                }
                            }}
                            style={{ display: 'flex' }}
                            whileHover={{ animationPlayState: 'paused' as any }}
                        >
                            {marqueeItems.map((partner, i) => (
                                <div
                                    key={i}
                                    className="group/card relative flex items-center gap-6 px-10 py-8 glass-card border-white/5 bg-white/[0.01] hover:bg-white/[0.05] transition-all duration-700 cursor-pointer overflow-hidden rounded-2xl min-w-[280px]"
                                >
                                    <div className="relative z-10 w-12 h-12 flex-shrink-0">
                                        <Image
                                            src={getImageUrl(partner.logo)}
                                            alt={partner.name}
                                            fill
                                            className="object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <div className="relative z-10 flex flex-col">
                                        <span className="text-xl font-display font-black tracking-widest text-brand-muted group-hover/card:text-white transition-colors duration-500 uppercase">
                                            {partner.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}


// ============ CONTACT CTA SECTION ============
function ContactFormSection({ data }: { data?: any }) {
    const dict = useDictionary();
    // Always use dict values to ensure correct language translation
    const badge = dict.home.contactBadge;
    const title = dict.home.contact.title;
    const description = dict.home.contact.subtitle;

    return (
        <section className="relative overflow-hidden py-32 bg-brand-primary border-t border-white/5">
            <div className="absolute inset-0 tech-grid opacity-5" />

            {/* Glow blobs */}
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="section-container relative z-10">
                <SectionReveal>
                    <div className="text-center mb-16">
                        <span className="text-brand-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">{badge}</span>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-glow tracking-tight uppercase italic">
                            {title}
                        </h2>
                        <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full shadow-neon-purple" />
                        <p className="text-brand-muted max-w-2xl mx-auto text-lg font-light opacity-80">
                            {description}
                        </p>
                    </div>
                </SectionReveal>

                <SectionReveal delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-lg mx-auto">
                        {/* WhatsApp Button */}
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.08)] hover:shadow-[0_0_50px_rgba(37,211,102,0.2)]"
                        >
                            <span className="text-[#25D366]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </span>
                            <span className="text-white font-bold text-lg">WhatsApp</span>
                        </a>

                        {/* Facebook Button */}
                        <a
                            href="https://www.facebook.com/profile.php?id=61569150491962"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60 transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(24,119,242,0.08)] hover:shadow-[0_0_50px_rgba(24,119,242,0.2)]"
                        >
                            <span className="text-[#1877F2]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </span>
                            <span className="text-white font-bold text-lg">Facebook</span>
                        </a>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}


// ============ INVOICE CTA SECTION ============
function InvoiceCtaSection() {
    const dict = useDictionary();
    const params = useParams();
    const lang = params?.lang as string;

    if (!dict.home.invoices) return null;

    return (
        <section className="relative overflow-hidden py-16 bg-brand-primary border-t border-white/5">
            <div className="section-container relative z-10">
                <div className="glass-card p-8 md:p-12 border-brand-accent/20 bg-brand-accent/5 overflow-hidden group">
                    {/* Animated background element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-accent/20 transition-all duration-700" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-brand-surface border border-brand-accent/20 text-brand-accent shadow-neon-purple group-hover:scale-110 transition-transform duration-500">
                                <Receipt size={32} />
                            </div>
                            <div className="text-left rtl:text-right">
                                <span className="text-brand-accent font-mono text-[10px] tracking-[0.4em] uppercase mb-1 block">
                                    {dict.home.invoices.badge}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-2">
                                    {dict.home.invoices.title}
                                </h3>
                                <p className="text-brand-muted text-sm md:text-base opacity-70 max-w-xl">
                                    {dict.home.invoices.subtitle}
                                </p>
                            </div>
                        </div>

                        <Link href={`/${lang}/invoices`} className="shrink-0 w-full md:w-auto">
                            <Button
                                variant="neon"
                                size="lg"
                                icon={<ArrowRight size={20} className="rtl:-scale-x-100" />}
                                className="w-full md:w-auto px-8 h-14 rounded-xl border-brand-accent/30 hover:border-brand-accent text-brand-accent shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500"
                            >
                                {dict.home.invoices.cta}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}


// ============ HOME PAGE ============
export default function HomePage() {
    const [data, setData] = React.useState<any>({});

    React.useEffect(() => {
        const load = async () => {
            try {
                const { data } = await publicApi.getPageSections('home');
                setData(data);
            } catch (e) {
                console.error(e);
            }
        };
        load();
    }, []);

    return (
        <>
            <HeroSection data={data.hero} />
            <ServicesSection />
            <PortfolioGallery />
            <WhyChooseSection data={data.features} />
            <CountersSection data={data.stats} />
            <TestimonialsSection />
            <PartnersSection />
            <ContactFormSection data={data.cta} />
            <InvoiceCtaSection />
        </>
    );
}

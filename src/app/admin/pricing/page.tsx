'use client';

import React from 'react';
import { Tag, ExternalLink, Download, FileText, Globe, Info, Eye } from 'lucide-react';

const PDF_URL = '/pricing-plan.pdf';

export default function AdminPricingPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                    <Tag size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text mb-1">Pricing Plans</h2>
                    <p className="text-brand-muted text-sm">
                        Manage the public Pricing page and the embedded pricing-plan PDF.
                    </p>
                </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                    href="/en/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 group hover:bg-white/5 transition-colors border-brand-glass-border flex items-center gap-4"
                >
                    <div className="p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent group-hover:scale-110 transition-transform">
                        <Eye size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-text">View Live Page (EN)</p>
                        <p className="text-xs text-brand-muted truncate">/en/pricing</p>
                    </div>
                    <ExternalLink size={16} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                </a>

                <a
                    href="/ar/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 group hover:bg-white/5 transition-colors border-brand-glass-border flex items-center gap-4"
                >
                    <div className="p-2.5 rounded-xl bg-brand-secondary/10 text-brand-secondary group-hover:scale-110 transition-transform">
                        <Globe size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-text">View Live Page (AR)</p>
                        <p className="text-xs text-brand-muted truncate">/ar/pricing</p>
                    </div>
                    <ExternalLink size={16} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                </a>

                <a
                    href={PDF_URL}
                    download
                    className="glass-card p-5 group hover:bg-white/5 transition-colors border-brand-glass-border flex items-center gap-4"
                >
                    <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform">
                        <Download size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-text">Download current PDF</p>
                        <p className="text-xs text-brand-muted truncate">pricing-plan.pdf</p>
                    </div>
                    <Download size={16} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                </a>
            </div>

            {/* How to update */}
            <div className="glass-card p-6 border-brand-accent/20 bg-brand-accent/5">
                <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 shrink-0">
                        <Info size={20} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-base font-bold text-brand-text">How to update the pricing document</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">
                            The pricing page embeds the PDF served from{' '}
                            <code className="px-1.5 py-0.5 rounded bg-black/30 text-brand-accent font-mono text-xs">frontend/public/pricing-plan.pdf</code>.
                            To publish a new version, replace that file (keep the same filename) and redeploy — the public page,
                            preview below, and download links all update automatically.
                        </p>
                    </div>
                </div>
            </div>

            {/* Live preview */}
            <div className="glass-card p-0 overflow-hidden border-brand-glass-border">
                <div className="flex items-center justify-between gap-4 p-5 border-b border-brand-glass-border bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent">
                            <FileText size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-text">Document Preview</p>
                            <p className="text-xs text-brand-muted font-mono uppercase tracking-widest">pricing-plan.pdf</p>
                        </div>
                    </div>
                    <a
                        href={PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-brand-accent bg-brand-accent/5 border border-brand-accent/20 hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
                    >
                        <ExternalLink size={14} />
                        Open
                    </a>
                </div>
                <div className="w-full h-[70vh] min-h-[480px] bg-[#1a1a24]">
                    <object data={`${PDF_URL}#view=FitH`} type="application/pdf" className="w-full h-full">
                        <iframe src={`${PDF_URL}#view=FitH`} title="Pricing PDF preview" className="w-full h-full border-0" loading="lazy" />
                        <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                            <FileText size={40} className="text-brand-accent" />
                            <p className="text-brand-muted text-sm max-w-sm">
                                Preview unavailable in this browser. Use the Open or Download links above.
                            </p>
                        </div>
                    </object>
                </div>
            </div>
        </div>
    );
}

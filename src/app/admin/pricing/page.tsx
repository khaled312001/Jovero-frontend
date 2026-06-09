'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Tag, ExternalLink, Download, FileText, Globe, Info, Eye, UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';
import { adminApi, publicApi } from '@/lib/api';
import { API_BASE_URL, formatBytes } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

const FALLBACK_PDF_URL = '/pricing-plan.pdf';
const MAX_SIZE = 10 * 1024 * 1024; // 10MB (matches backend multer limit)

function resolvePdfUrl(url?: string | null): string {
    if (!url) return FALLBACK_PDF_URL;
    if (url.startsWith('data:') || url.startsWith('http')) return url;
    if (url.startsWith('/uploads')) return `${API_BASE_URL.replace(/\/api$/, '')}${url}`;
    return url;
}

export default function AdminPricingPage() {
    const { showToast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [rawUrl, setRawUrl] = useState<string | null>(null); // value stored in backend (null = using bundled default)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const previewUrl = resolvePdfUrl(rawUrl);
    const isCustom = !!rawUrl;
    const embedSrc = previewUrl.startsWith('data:') ? previewUrl : `${previewUrl}#view=FitH`;

    const loadCurrent = () => {
        publicApi.getPricingPdf()
            .then(({ data }) => setRawUrl(data?.url || null))
            .catch(() => setRawUrl(null));
    };

    useEffect(() => { loadCurrent(); }, []);

    const pickFile = (file: File | null) => {
        if (!file) return;
        if (file.type !== 'application/pdf') {
            showToast('Please select a PDF file.', 'error');
            return;
        }
        if (file.size > MAX_SIZE) {
            showToast(`File too large (${formatBytes(file.size)}). Max 10MB.`, 'error');
            return;
        }
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            await adminApi.uploadPricingPdf(formData);
            showToast('Pricing PDF updated successfully.', 'success');
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            loadCurrent();
            setReloadKey((k) => k + 1);
        } catch (err: any) {
            showToast(err?.response?.data?.error || 'Failed to upload PDF.', 'error');
        } finally {
            setUploading(false);
        }
    };

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
                        Upload the pricing-plan PDF that appears on the public Pricing page. Changes go live immediately.
                    </p>
                </div>
            </div>

            {/* Status + quick links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-5 border-brand-glass-border flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${isCustom ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-brand-muted'}`}>
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-brand-text">Current source</p>
                        <p className="text-xs text-brand-muted truncate">{isCustom ? 'Custom uploaded PDF' : 'Default bundled PDF'}</p>
                    </div>
                </div>

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
                        <p className="text-sm font-bold text-brand-text">View Live (EN)</p>
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
                        <p className="text-sm font-bold text-brand-text">View Live (AR)</p>
                        <p className="text-xs text-brand-muted truncate">/ar/pricing</p>
                    </div>
                    <ExternalLink size={16} className="text-brand-muted group-hover:text-brand-accent transition-colors" />
                </a>
            </div>

            {/* Upload */}
            <div className="glass-card p-6 border-brand-glass-border">
                <h3 className="text-lg font-display font-bold text-brand-text mb-4">Upload new pricing PDF</h3>

                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); pickFile(e.dataTransfer.files?.[0] || null); }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${dragOver ? 'border-brand-accent bg-brand-accent/5' : 'border-white/10 hover:border-brand-accent/40 hover:bg-white/[0.02]'}`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf,.pdf"
                        className="hidden"
                        onChange={(e) => pickFile(e.target.files?.[0] || null)}
                    />
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-4 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                            <UploadCloud size={28} />
                        </div>
                        {selectedFile ? (
                            <div>
                                <p className="text-brand-text font-bold text-sm flex items-center justify-center gap-2">
                                    <FileText size={16} className="text-brand-accent" /> {selectedFile.name}
                                </p>
                                <p className="text-brand-muted text-xs mt-1">{formatBytes(selectedFile.size)}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-brand-text font-semibold text-sm">Click to choose a PDF, or drag &amp; drop it here</p>
                                <p className="text-brand-muted text-xs mt-1">PDF only · up to 10MB</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-brand-primary bg-brand-accent hover:bg-white shadow-neon-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                        {uploading ? 'Uploading…' : 'Upload & Publish'}
                    </button>
                    {selectedFile && !uploading && (
                        <button
                            onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="text-sm text-brand-muted hover:text-brand-text transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Note */}
            <div className="glass-card p-5 border-brand-accent/20 bg-brand-accent/5">
                <div className="flex items-start gap-3">
                    <Info size={18} className="text-brand-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-brand-muted leading-relaxed">
                        Uploading replaces the document shown on the public Pricing page instantly. If no custom file has
                        been uploaded, the site falls back to the bundled default at{' '}
                        <code className="px-1.5 py-0.5 rounded bg-black/30 text-brand-accent font-mono text-xs">public/pricing-plan.pdf</code>.
                    </p>
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
                            <p className="text-sm font-bold text-brand-text">Current Document Preview</p>
                            <p className="text-xs text-brand-muted font-mono uppercase tracking-widest">{isCustom ? 'custom' : 'default'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={previewUrl}
                            download
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-brand-muted border border-white/10 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <Download size={14} /> Download
                        </a>
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-brand-accent bg-brand-accent/5 border border-brand-accent/20 hover:bg-brand-accent hover:text-brand-primary transition-all"
                        >
                            <ExternalLink size={14} /> Open
                        </a>
                    </div>
                </div>
                <div className="w-full h-[70vh] min-h-[480px] bg-[#1a1a24]">
                    <object key={`${embedSrc}-${reloadKey}`} data={embedSrc} type="application/pdf" className="w-full h-full">
                        <iframe src={embedSrc} title="Pricing PDF preview" className="w-full h-full border-0" loading="lazy" />
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

'use client';

import React, { useState } from 'react';
import { Search, Download, FileText, AlertCircle, Loader2, Calendar, User, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { publicApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements';
import { formatDate } from '@/lib/utils';

export default function InvoicesPage({ dict, lang }: { dict: any, lang: string }) {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [invoice, setInvoice] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!invoiceNumber.trim()) return;

        setLoading(true);
        setError(null);
        setInvoice(null);

        try {
            const { data } = await publicApi.getInvoice(invoiceNumber.trim());
            setInvoice(data);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 404) {
                setError(dict?.invoices?.notFound || 'Invoice not found');
            } else {
                setError(dict?.common?.error || 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-brand-dark -z-10" />
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-accent/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-primary/5 blur-[100px] rounded-full -z-10" />

            <div className="section-container relative">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-6"
                        >
                            <FileText size={16} />
                            <span className="text-sm font-bold tracking-wider uppercase">
                                {dict?.invoices?.title || 'Invoice System'}
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-brand-text mb-6 tracking-tight leading-tight"
                        >
                            {dict?.invoices?.subtitle || 'Search and download your invoices'}
                        </motion.h1>
                    </div>

                    {/* Search Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 mb-12"
                    >
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Input
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    placeholder={dict?.invoices?.placeholder || 'Enter invoice number...'}
                                    className="h-14 text-lg bg-white/5 border-white/10 text-brand-text focus:border-brand-accent"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-14 px-8 bg-brand-accent hover:bg-brand-accent/90 text-brand-dark flex items-center gap-2 text-lg font-black"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <Search size={20} />
                                )}
                                {dict?.invoices?.search || 'Search'}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Results Area */}
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <Loader2 className="animate-spin text-brand-accent mb-4" size={48} />
                                <p className="text-brand-muted font-bold">{dict?.common?.loading || 'Loading...'}</p>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card p-12 text-center border-red-500/20"
                            >
                                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle size={40} className="text-red-500" />
                                </div>
                                <h3 className="text-2xl font-display font-black text-brand-text mb-4">
                                    {error}
                                </h3>
                                <p className="text-brand-muted text-lg mb-8">
                                    {dict?.invoices?.notFoundDesc || "Please double-check the invoice number and try again."}
                                </p>
                            </motion.div>
                        ) : invoice ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-card overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-brand-accent/20 to-transparent p-8 border-b border-brand-glass-border">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                        <div>
                                            <p className="text-brand-accent font-black text-sm uppercase tracking-widest mb-2">
                                                {dict?.invoices?.found || 'Invoice Found'}
                                            </p>
                                            <h3 className="text-3xl font-display font-black text-brand-text">
                                                #{invoice.invoiceNumber}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    if (invoice.pdfUrl.startsWith('data:')) {
                                                        const response = await fetch(invoice.pdfUrl);
                                                        const blob = await response.blob();
                                                        const blobUrl = URL.createObjectURL(blob);
                                                        const link = document.createElement('a');
                                                        link.href = blobUrl;
                                                        link.download = `Invoice-${invoice.invoiceNumber}.pdf`;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                                                    } else {
                                                        const link = document.createElement('a');
                                                        link.href = invoice.pdfUrl;
                                                        link.target = '_blank';
                                                        link.download = `Invoice-${invoice.invoiceNumber}.pdf`;
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    }
                                                } catch (error) {
                                                    console.error("Download failed:", error);
                                                    window.open(invoice.pdfUrl, '_blank');
                                                }
                                            }}
                                            className="px-8 py-4 bg-brand-accent hover:bg-brand-accent/90 text-brand-dark rounded-2xl flex items-center gap-3 text-lg font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20"
                                        >
                                            <Download size={24} />
                                            {dict?.invoices?.download || 'Download PDF'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-brand-muted">
                                            <User size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                {dict?.invoices?.details?.client || 'Client'}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-brand-text">
                                            {invoice.clientName || 'N/A'}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-brand-muted">
                                            <Calendar size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                {dict?.invoices?.details?.date || 'Date'}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-brand-text">
                                            {formatDate(invoice.date)}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-brand-muted">
                                            <DollarSign size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                {dict?.invoices?.details?.amount || 'Amount'}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-black text-brand-accent">
                                            {invoice.amount ? `${invoice.amount.toLocaleString()} USD` : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}

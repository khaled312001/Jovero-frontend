'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Download, FilePlus, Loader2, AlertCircle, CheckCircle2, Calendar, User, DollarSign, FileText } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';

export default function AdminInvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        invoiceNumber: '',
        clientName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        pdfUrl: '',
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const { data } = await adminApi.getInvoices();
            setInvoices(data);
        } catch (error) {
            console.error('Failed to fetch invoices:', error);
            toast.error('Failed to load invoices');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.pdfUrl) {
            toast.error('Please upload the PDF invoice');
            return;
        }

        try {
            setSubmitting(true);
            await adminApi.createInvoice({
                ...formData,
                amount: formData.amount ? parseFloat(formData.amount) : null,
            });
            toast.success('Invoice created successfully');
            setIsAdding(false);
            setFormData({
                invoiceNumber: '',
                clientName: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                pdfUrl: '',
            });
            fetchInvoices();
        } catch (error) {
            console.error('Failed to create invoice:', error);
            toast.error('Failed to create invoice. Number might be duplicate.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this invoice?')) return;

        try {
            await adminApi.deleteInvoice(id);
            toast.success('Invoice deleted');
            fetchInvoices();
        } catch (error) {
            toast.error('Failed to delete invoice');
        }
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-brand-text">Invoice Management</h1>
                    <p className="text-brand-muted">Upload and manage client invoices (PDF)</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    variant={isAdding ? 'outline' : 'primary'}
                    className="flex items-center gap-2"
                >
                    {isAdding ? 'Cancel' : (
                        <>
                            <Plus size={18} />
                            Add New Invoice
                        </>
                    )}
                </Button>
            </div>

            {/* Add Invoice Form */}
            {isAdding && (
                <div className="glass-card p-6 border-brand-primary/20 animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Input
                                label="Invoice Number *"
                                value={formData.invoiceNumber}
                                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                                placeholder="INV-2024-001"
                                required
                            />
                            <Input
                                label="Client Name"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                placeholder="Client / Company Name"
                            />
                            <Input
                                label="Amount (USD)"
                                type="number"
                                step="0.01"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="0.00"
                            />
                            <Input
                                label="Date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-muted uppercase tracking-wider">PDF Upload *</label>
                            <ImageUpload
                                value={formData.pdfUrl}
                                onChange={(url) => setFormData({ ...formData, pdfUrl: url })}
                                onRemove={() => setFormData({ ...formData, pdfUrl: '' })}
                            />
                            <p className="text-xs text-brand-muted/60">Upload the PDF file here. It will be stored securely.</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark px-8 py-6 text-lg font-black rounded-2xl"
                            >
                                {submitting ? <Loader2 className="animate-spin mr-2" /> : <FilePlus className="mr-2" size={20} />}
                                Create Invoice
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search & List */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-brand-glass-border">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
                        <Input
                            placeholder="Search by number or client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-10 bg-white/5 border-white/5 focus:border-brand-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-brand-muted text-xs font-black uppercase tracking-widest">
                                <th className="px-6 py-4">Invoice #</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-glass-border">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <Loader2 className="animate-spin text-brand-primary mx-auto mb-4" size={32} />
                                        <p className="text-brand-muted font-bold">Loading invoices...</p>
                                    </td>
                                </tr>
                            ) : filteredInvoices.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <FileText className="text-brand-muted" size={32} />
                                        </div>
                                        <p className="text-brand-muted font-bold text-lg">No invoices found</p>
                                        <p className="text-brand-muted/60">Create your first invoice to see it here.</p>
                                    </td>
                                </tr>
                            ) : filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-brand-text">#{inv.invoiceNumber}</p>
                                    </td>
                                    <td className="px-6 py-4 text-brand-muted font-medium">
                                        {inv.clientName || '-'}
                                    </td>
                                    <td className="px-6 py-4 font-black text-brand-accent">
                                        {inv.amount ? `${inv.amount.toLocaleString()} USD` : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-brand-muted/80 text-sm">
                                        {formatDate(inv.date)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <a
                                                href={inv.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-white/5 text-brand-accent hover:bg-brand-accent/10"
                                                title="View/Download PDF"
                                            >
                                                <Download size={16} />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(inv.id)}
                                                className="p-2 rounded-lg bg-white/5 text-red-500 hover:bg-red-500/10"
                                                title="Delete Invoice"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

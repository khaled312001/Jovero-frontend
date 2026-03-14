'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Globe, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/FormElements';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { ImageUpload } from '@/components/ui/ImageUpload';

interface Partner {
    id: string;
    name: string;
    nameEn: string | null;
    logo: string;
    website: string | null;
    isActive: boolean;
    order: number;
}

export default function AdminPartnersPage() {
    const [items, setItems] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', nameEn: '', logo: '', website: '' });
    const { showToast } = useToast();
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const { data } = await adminApi.getPartners();
            setItems(data);
        } catch (e) {
            console.error(e);
            showToast('Failed to fetch partners', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!form.name || !form.logo) {
            showToast('Name and Logo are required', 'error');
            return;
        }

        try {
            if (editing) {
                await adminApi.updatePartner(editing, form);
                showToast('Partner updated successfully', 'success');
            } else {
                await adminApi.createPartner(form);
                showToast('Partner created successfully', 'success');
            }
            setEditing(null);
            setShowAdd(false);
            setForm({ name: '', nameEn: '', logo: '', website: '' });
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save partner', 'error');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this partner?')) return;
        try {
            await adminApi.deletePartner(id);
            showToast('Partner deleted', 'success');
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to delete partner', 'error');
        }
    };

    const startEdit = (item: Partner) => {
        setEditing(item.id);
        setForm({
            name: item.name,
            nameEn: item.nameEn || '',
            logo: item.logo,
            website: item.website || ''
        });
        setShowAdd(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Success Partners</h2>
                    <p className="text-brand-muted text-sm">Manage company logos that appear on the homepage.</p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={() => {
                        setShowAdd(true);
                        setEditing(null);
                        setForm({ name: '', nameEn: '', logo: '', website: '' });
                    }}
                >
                    Add Partner
                </Button>
            </div>

            <AnimatePresence>
                {showAdd && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-lg font-display font-semibold text-brand-text">
                                {editing ? 'Edit' : 'New'} Partner
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <Input
                                        label="Partner Name (AR)"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="اسم الشركة"
                                    />
                                    <Input
                                        label="Partner Name (EN)"
                                        value={form.nameEn}
                                        onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                                        placeholder="Company Name"
                                    />
                                    <Input
                                        label="Website URL (Optional)"
                                        value={form.website}
                                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                                        placeholder="https://example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-muted mb-2 block">Logo</label>
                                    <ImageUpload
                                        value={form.logo}
                                        onChange={(url: string) => setForm({ ...form, logo: url })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>
                                    Save Partner
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={<X size={16} />}
                                    onClick={() => {
                                        setShowAdd(false);
                                        setEditing(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="skeleton h-32 rounded-2xl" />
                    ))
                ) : items.length === 0 ? (
                    <div className="col-span-full glass-card p-12 text-center text-brand-muted">
                        No partners added yet.
                    </div>
                ) : (
                    items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            className="glass-card p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                                    {item.logo ? (
                                        <Image
                                            src={getImageUrl(item.logo)}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    ) : (
                                        <ImageIcon className="text-brand-muted/30" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white leading-tight">{item.name}</h4>
                                    {item.nameEn && <p className="text-brand-muted text-xs">{item.nameEn}</p>}
                                    {item.website && (
                                        <a
                                            href={item.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand-accent text-[10px] uppercase font-mono mt-1 flex items-center gap-1 hover:underline"
                                        >
                                            <Globe size={10} /> Visit Site
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => startEdit(item)}
                                    className="p-2 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent transition-all"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

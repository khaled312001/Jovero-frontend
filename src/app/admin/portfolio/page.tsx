'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Star, ExternalLink, MoreVertical, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { adminApi } from '@/lib/api';
import { cn, getImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/FormElements';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface ProjectImage {
    id: string;
    url: string;
    order: number;
}

interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    client?: string;
    duration?: string;
    content?: string;
    results?: string;
    technologies: string[];
    isFeatured: boolean;
    isActive: boolean;
    image?: string;
    images?: ProjectImage[];
}

export default function AdminPortfolioPage() {
    const [items, setItems] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState({
        title: '', description: '', content: '', category: '', client: '', duration: '', technologies: '', results: '', isFeatured: false, image: '',
    });
    const [gallery, setGallery] = useState<ProjectImage[]>([]);
    const [uploadingImages, setUploadingImages] = useState(false);
    const { showToast } = useToast();

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            const { data } = await adminApi.getPortfolio();
            setItems(data);
        }
        catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            const payload = {
                ...form,
                technologies: form.technologies.split(',').map((s: string) => s.trim()).filter(Boolean)
            };
            if (editing) {
                await adminApi.updateProject(editing, payload);
                showToast('Project updated successfully', 'success');
            } else {
                await adminApi.createProject(payload);
                showToast('Project created successfully', 'success');
            }
            setShowForm(false);
            setEditing(null);
            resetForm();
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to save project', 'error');
        }
    };

    const resetForm = () => {
        setForm({ title: '', description: '', content: '', category: '', client: '', duration: '', technologies: '', results: '', isFeatured: false, image: '' });
        setGallery([]);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await adminApi.deleteProject(id);
            showToast('Project deleted', 'success');
            fetchItems();
        } catch (e) {
            console.error(e);
            showToast('Failed to delete project', 'error');
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editing || !e.target.files?.length) return;

        setUploadingImages(true);
        const formData = new FormData();
        Array.from(e.target.files).forEach(file => formData.append('images', file));

        try {
            const { data } = await adminApi.uploadProjectImages(editing, formData);
            setGallery([...gallery, ...data]);
            showToast('Images uploaded successfully', 'success');
        } catch (e) {
            console.error(e);
            showToast('Failed to upload images', 'error');
        } finally {
            setUploadingImages(false);
            e.target.value = '';
        }
    };

    const handleDeleteImage = async (imageId: string) => {
        try {
            await adminApi.deleteProjectImage(imageId);
            setGallery(gallery.filter(img => img.id !== imageId));
            showToast('Image removed', 'success');
        } catch (e) {
            console.error(e);
            showToast('Failed to delete image', 'error');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-brand-text">Portfolio Projects</h2>
                    <p className="text-brand-muted text-sm">Manage portfolio case studies.</p>
                </div>
                <Button variant="primary" size="sm" icon={<Plus size={16} />} onClick={() => {
                    setShowForm(true);
                    setEditing(null);
                    resetForm();
                }}>Add Project</Button>
            </div>

            {showForm && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-display font-semibold text-brand-text">{editing ? 'Edit' : 'New'} Project</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web App, Mobile, Design..." />
                        <Input label="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
                        <Input label="Duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="3 months" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-muted mb-2">Main Image (Thumbnail)</label>
                            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
                        </div>
                        {editing && (
                            <div>
                                <label className="block text-sm font-medium text-brand-muted mb-2">Project Gallery (Max 10)</label>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {gallery.map((img) => (
                                            <div key={img.id} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-brand-glass-border">
                                                <Image src={getImageUrl(img.url)} className="w-full h-full object-cover" alt="" fill sizes="80px" />
                                                <button
                                                    onClick={() => handleDeleteImage(img.id)}
                                                    className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className={cn(
                                            "w-20 h-20 rounded-lg border-2 border-dashed border-brand-glass-border flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent transition-colors",
                                            uploadingImages && "opacity-50 cursor-not-allowed"
                                        )}>
                                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} disabled={uploadingImages} />
                                            <Plus size={20} className="text-brand-muted" />
                                            <span className="text-[10px] text-brand-muted mt-1">{uploadingImages ? '...' : 'Add'}</span>
                                        </label>
                                    </div>
                                    <p className="text-[10px] text-brand-muted">Gallery images will be shown in a slider on the project page.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <Textarea label="Content / Case Study" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
                    <Input label="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, PostgreSQL" />
                    <Textarea label="Results" value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} placeholder="Key results and impact..." />
                    <label className="flex items-center gap-2 text-sm text-brand-text">
                        <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="rounded" />
                        Featured project
                    </label>
                    <div className="flex gap-3">
                        <Button variant="primary" size="sm" icon={<Save size={16} />} onClick={handleSave}>Save</Button>
                        <Button variant="ghost" size="sm" icon={<X size={16} />} onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)
                ) : items.length === 0 ? (
                    <div className="col-span-full glass-card p-12 text-center text-brand-muted">No projects yet.</div>
                ) : items.map((item) => (
                    <div key={item.id} className="glass-card p-6 group">
                        <div className="flex items-start justify-between mb-3">
                            <span className="px-2 py-0.5 rounded text-xs bg-brand-accent/10 text-brand-accent font-medium">{item.category}</span>
                            <div className="flex gap-1">
                                {item.isFeatured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                                <button onClick={() => {
                                    setEditing(item.id);
                                    setForm({
                                        title: item.title,
                                        description: item.description,
                                        content: item.content || '',
                                        category: item.category,
                                        client: item.client || '',
                                        duration: item.duration || '',
                                        technologies: item.technologies.join(', '),
                                        results: item.results || '',
                                        isFeatured: item.isFeatured,
                                        image: item.image || ''
                                    });
                                    setGallery(item.images || []);
                                    setShowForm(true);
                                }} className="p-1.5 rounded-lg hover:bg-brand-accent/10 text-brand-muted hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-all">
                                    <Edit size={14} />
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-brand-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            {item.image ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={getImageUrl(item.image)} className="object-cover bg-brand-surface" alt="" fill sizes="48px" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-brand-surface flex items-center justify-center">
                                    <LayoutGrid size={20} className="text-brand-muted/20" />
                                </div>
                            )}
                            <div>
                                <h4 className="font-semibold text-brand-text truncate w-40">{item.title}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-brand-muted">
                                    <LayoutGrid size={10} />
                                    <span>{item.images?.length || 0} images</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-brand-muted text-sm line-clamp-2 mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {item.technologies.slice(0, 3).map((t, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-brand-surface text-brand-muted">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Loader2, File as FileIcon } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { cn, getImageUrl } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import Image from 'next/image';

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
    onRemove?: () => void;
    accept?: string;
}

export function FileUpload({ value, onChange, label, className, onRemove, accept = "image/*,application/pdf" }: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const { showToast } = useToast();

    const isPdf = value?.toLowerCase().endsWith('.pdf');
    const isImage = value && !isPdf;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await adminApi.createMedia(formData);
            onChange(data.url);
            showToast('File uploaded successfully', 'success');
        } catch (error) {
            console.error('Upload failed:', error);
            showToast('Failed to upload file', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = () => {
        onChange('');
        if (onRemove) onRemove();
    };

    return (
        <div className={cn("space-y-2", className)}>
            {label && <label className="block text-sm font-medium text-brand-muted">{label}</label>}

            <div className="relative">
                {value ? (
                    <div className="relative overflow-hidden rounded-xl border border-white/10 group bg-white/5">
                        {isImage ? (
                            <div className="relative aspect-video w-full">
                                <Image src={getImageUrl(value)} alt="Preview" fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-brand-accent">
                                <FileText size={48} className="mb-2" />
                                <span className="text-xs font-mono opacity-60 truncate max-w-full px-4">
                                    {value.split('/').pop()}
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <Button
                                type="button"
                                variant="danger"
                                size="sm"
                                icon={<X size={16} />}
                                onClick={handleRemove}
                            >
                                Remove File
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all group"
                    >
                        {uploading ? (
                            <Loader2 className="w-8 h-8 text-brand-accent animate-spin mb-2" />
                        ) : (
                            <Upload className="w-8 h-8 text-brand-muted group-hover:text-brand-accent mb-2 transition-colors" />
                        )}
                        <span className="text-sm text-brand-muted group-hover:text-brand-text transition-colors">
                            {uploading ? 'Uploading...' : 'Click to upload file (Image or PDF)'}
                        </span>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={accept}
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </div>
        </div>
    );
}

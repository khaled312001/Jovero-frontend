import React from 'react';
import { getDictionary } from '@/i18n/getDictionary';
import InvoicesPage from './InvoiceClient';
import { Metadata } from 'next';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
    const dict = await getDictionary(lang as any);
    return {
        title: `${dict.invoices?.title || 'Invoice System'} | JOVERO`,
        description: dict.invoices?.subtitle || 'Search and download your invoices',
    };
}

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
    const dict = await getDictionary(lang as any);
    return <InvoicesPage dict={dict} lang={lang} />;
}

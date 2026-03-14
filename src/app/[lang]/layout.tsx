import type { Metadata } from 'next';
import '../globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.JOVERO.tech'),
    title: {
        default: 'JOVERO | Swiss Licensed Software Development Company',
        template: '%s | JOVERO',
    },
    description:
        'JOVERO is a Swiss-licensed software development company specializing in web development, mobile apps, UI/UX design, business systems, and digital marketing solutions.',
    keywords: [
        'software development',
        'Swiss software company',
        'web development',
        'mobile app development',
        'UI/UX design',
        'ERP systems',
        'digital marketing',
        'JOVERO',
        'Zürich',
    ],
    authors: [{ name: 'JOVERO' }],
    creator: 'JOVERO',
    publisher: 'JOVERO',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.JOVERO.tech',
        siteName: 'JOVERO',
        title: 'JOVERO | Swiss Licensed Software Development Company',
        description:
            'Swiss-licensed software development company delivering enterprise-grade web, mobile, and business solutions.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'JOVERO - Swiss Licensed Software Development',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JOVERO | Swiss Licensed Software Development Company',
        description:
            'Swiss-licensed software development company delivering enterprise-grade web, mobile, and business solutions.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const lang = params.lang || 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={lang} dir={dir} className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'JOVERO',
                            url: 'https://www.JOVERO.tech',
                            logo: 'https://www.JOVERO.tech/logo.png',
                            description:
                                'Swiss-licensed software development company specializing in enterprise solutions.',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Hardstrasse 201',
                                addressLocality: 'Zürich',
                                postalCode: '8005',
                                addressCountry: 'CH',
                            },
                            contactPoint: {
                                '@type': 'ContactPoint',
                                telephone: '+41-779412126',
                                contactType: 'customer service',
                            },
                            sameAs: [],
                        }),
                    }}
                />
            </head>
            <body className="antialiased">
                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}

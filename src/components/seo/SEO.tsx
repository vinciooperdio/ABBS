
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import abbslogo from '../../assets/images/abbslogo.svg';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string;
  canonicalUrl?: string;
  schema?: object;
  pathname?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'ABBS - La piattaforma per gestire tutti i tuoi abbonamenti',
  description = 'ABBS è la prima app italiana per gestire tutti i tuoi abbonamenti in un unico posto. Monitora, ottimizza e risparmia sui tuoi abbonamenti mensili.',
  image = abbslogo,
  article = false,
  keywords = 'abbs, abbonamenti, gestione abbonamenti, sottoscrizioni digitali, risparmiare sugli abbonamenti, app abbonamenti, piattaforma abbonamenti, monitor abbonamenti',
  canonicalUrl,
  schema,
  pathname,
}) => {
  const location = useLocation();
  const currentPathname = pathname || location?.pathname || '';
  
  const siteUrl = 'https://abbs.one';
  const url = `${siteUrl}${currentPathname}`;

  // Struttura JSON-LD di base per il sito web
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ABBS',
    url: siteUrl,
    description: 'Piattaforma per la gestione degli abbonamenti',
    potentialAction: {
      '@type': 'SearchAction',
      'target': `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // Schema per l'applicazione software
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'ABBS',
    'applicationCategory': 'BusinessApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR'
    },
    'operatingSystem': 'All',
    'description': 'App per la gestione degli abbonamenti'
  };

  // Schema per l'organizzazione
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'ABBS',
    'url': siteUrl,
    'logo': `${siteUrl}/logo.png`,
    'sameAs': [
      'https://www.linkedin.com/company/abbsapp',
      'https://www.instagram.com/abbsapp'
    ]
  };

  // Merge schema with base and app schema
  const finalSchema = schema || 
    (pathname === '/business' ? 
      { ...baseSchema, ...appSchema, '@type': ['WebSite', 'SoftwareApplication'] } : 
      { ...baseSchema, ...organizationSchema });

  return (
    <Helmet>
      <html lang="it" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl || url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ABBS" />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile specific */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="theme-color" content="#4B45CE" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />

      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
      
      {/* Google Search Console verification */}
      <meta name="google-site-verification" content="35a9c8c226f96780" />
    </Helmet>
  );
};

export default SEO;

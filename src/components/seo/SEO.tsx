import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

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
  description = 'ABBS ti aiuta a gestire tutti i tuoi abbonamenti in un unico posto. Scopri, monitora e ottimizza le tue spese in abbonamento con pochi clic.',
  image = 'https://abbsapp.it/og-image.jpg',
  article = false,
  keywords = 'abbonamenti, gestione abbonamenti, sottoscrizioni, risparmiare, SaaS, piattaforma abbonamenti',
  canonicalUrl,
  schema,
  pathname,
}) => {
  const location = useLocation();
  const currentPathname = pathname || location?.pathname || '';
  
  const siteUrl = 'https://abbsapp.it';
  const url = `${siteUrl}${currentPathname}`;

  // Struttura JSON-LD di base per il sito web
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ABBS',
    url: siteUrl,
    description: 'Piattaforma per la gestione degli abbonamenti',
  };

  // Unisci lo schema personalizzato con quello di base
  const schemaData = schema ? schema : baseSchema;

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

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />

      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      {/* Google Analytics - gestito separatamente dal componente GoogleAnalytics */}
    </Helmet>
  );
};

export default SEO; 
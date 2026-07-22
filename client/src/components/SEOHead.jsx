import React, { useEffect } from 'react';

/**
 * SEOHead component to dynamically inject title, meta tags, OpenGraph, Twitter, and JSON-LD structured data.
 */
const SEOHead = ({
  title = "Stitch Débarras - Service de Débarras & Recyclage Écoresponsable",
  description = "Stitch Débarras est votre partenaire n°1 pour le débarras de maisons, appartements, caves et locaux professionnels en France. Devis gratuit et intervention rapide.",
  keywords = "débarras maison, débarras gratuit, vide maison, débarras cave, recyclage mobilier, eco-responsable, débarras professionnel, brocante",
  canonicalUrl = typeof window !== 'undefined' ? window.location.href : 'https://stitch-debarras.fr',
  ogImage = "https://stitch-debarras.fr/og-image.jpg",
  ogType = "website",
  jsonLd = null
}) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function for link elements
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // 3. Open Graph / Facebook Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'Stitch Débarras');
    setMetaTag('property', 'og:locale', 'fr_FR');

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    setLinkTag('canonical', canonicalUrl);

    // 6. JSON-LD Dynamic Injection
    if (jsonLd) {
      let scriptTag = document.getElementById('dynamic-json-ld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-json-ld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(jsonLd);
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
};

export default SEOHead;

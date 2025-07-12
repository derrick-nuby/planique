import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://planique.derrick.rw';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Planique - Executive Insights Platform",
      template: "%s | Planique"
    },
    description: "Transform GitHub project activity into clear, business-friendly reports and visualizations. Designed for non-technical stakeholders like CEOs, project managers, and operations leads.",
    keywords: ["github", "project management", "executive insights", "business intelligence", "dashboard", "analytics", "reporting", "project tracking"],
    authors: [{ name: "Derrick Iradukunda" }],
    creator: "Derrick Nuby",
    publisher: "Planique",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Planique",
      title: "Planique - Executive Insights Platform",
      description: "Transform GitHub project activity into clear, business-friendly reports and visualizations. Designed for non-technical stakeholders like CEOs, project managers, and operations leads.",
      images: [
        {
          url: `${siteUrl}/images/favicons/android-chrome-512x512.png`,
          width: 512,
          height: 512,
          alt: "Planique - Executive Insights Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Planique - Executive Insights Platform",
      description: "Transform GitHub project activity into clear, business-friendly reports and visualizations. Designed for non-technical stakeholders like CEOs, project managers, and operations leads.",
      images: [`${siteUrl}/images/favicons/android-chrome-512x512.png`],
      creator: "@Derrick-Nuby",
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
    icons: {
      icon: [
        { url: "/images/sv-logo.svg", type: "image/svg+xml" },
        { url: "/images/favicons/favicon-32x32.png", type: "image/png" },
        { url: "/images/favicons/favicon-16x16.png", type: "image/png" },
      ],
      apple: "/images/favicons/apple-touch-icon.png",
    },
    manifest: `${siteUrl}/manifest.json`,
    alternates: {
      canonical: siteUrl,
      languages: {
        'en-US': `${siteUrl}/en-US`,
        'fr-RW': `${siteUrl}/fr-RW`,
        'rw-RW': `${siteUrl}/rw-RW`,
      },
    },
  };
}
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amadeni.derrick.rw';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Amadeni - Digital Debt-Tracking for Kiosks",
      template: "%s | Amadeni"
    },
    description: "A digital debt-tracking application designed for small kiosks and informal businesses in Rwanda. Track customer debts easily with offline-capable functionality.",
    keywords: ["debt-tracking", "small business", "kiosk", "Rwanda", "offline-first", "Amadeni", "customer management"],
    authors: [{ name: "Derrick Iradukunda" }],
    creator: "Derrick Nuby",
    publisher: "Amadeni",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "Amadeni",
      title: "Amadeni - Digital Debt-Tracking for Kiosks",
      description: "A digital debt-tracking application designed for small kiosks and informal businesses in Rwanda. Track customer debts easily with offline-capable functionality.",
      images: [
        {
          url: `${siteUrl}/images/favicons/android-chrome-512x512.png`,
          width: 512,
          height: 512,
          alt: "Amadeni - Digital Debt-Tracking for Kiosks",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Amadeni - Digital Debt-Tracking for Kiosks",
      description: "A digital debt-tracking application designed for small kiosks and informal businesses in Rwanda. Track customer debts easily with offline-capable functionality.",
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
import { business } from '@/lib/business';

// Static-friendly Google Maps embed using the public Maps URL.
// Requires no API key; the iframe loads on the client lazily.
export default function MapEmbed({ className = '' }: { className?: string }) {
  const q = encodeURIComponent(business.address.full);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-card border border-hairline shadow-card ${className}`}>
      <iframe
        title={`Map showing the location of ${business.name}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[280px] w-full"
        allowFullScreen
      />
    </div>
  );
}

import { Link } from 'react-router';

interface HeroBannerProps {
  title: string;
  breadcrumbs: { name: string; path?: string }[];
  backgroundImage: string;
}

export default function HeroBanner({ title, breadcrumbs, backgroundImage }: HeroBannerProps) {
  return (
    <section
      className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-display text-4xl md:text-6xl lg:text-[77px] text-white leading-tight mb-4">
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.name} className="flex items-center gap-2">
              {index > 0 && <span className="text-white/50">/</span>}
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-white">{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

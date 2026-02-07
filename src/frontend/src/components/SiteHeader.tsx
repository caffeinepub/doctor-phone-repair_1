import { Link, useNavigate } from '@tanstack/react-router';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SiteHeader() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/generated/doctor-phone-repair-logo.dim_512x512.png"
            alt="Doctor Phone Repair Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-foreground">Doctor Phone Repair</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('locations')}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Locations
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </button>
          <Button onClick={() => navigate({ to: '/book' })} className="ml-2">
            <Phone className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('locations')}
              className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Locations
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </button>
            <Button onClick={() => { navigate({ to: '/book' }); setMobileMenuOpen(false); }} className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}


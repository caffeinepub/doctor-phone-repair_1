import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';

export default function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:+919706499653" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4" />
                +91 97064 99653
              </a>
              <a href="tel:+917086219818" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4" />
                +91 70862 19818
              </a>
              <a href="mailto:drphonetdatsk@gmail.com" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4" />
                drphonetdatsk@gmail.com
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Locations</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Main Office - 2nd floor TDA COMPLEX Tinsukia Assam</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Sub branch - Rupai siding Tinsukia Assam</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/book" className="block text-muted-foreground hover:text-foreground">
                Book Appointment
              </Link>
              <Link to="/admin/appointments" className="block text-muted-foreground hover:text-foreground">
                Admin
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          © 2026. Built with ❤️ using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}


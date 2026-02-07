import { useNavigate } from '@tanstack/react-router';
import { CheckCircle2, Phone, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BookingSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold">Appointment Request Submitted!</h1>
          
          <p className="mb-8 text-lg text-muted-foreground">
            Thank you for choosing Doctor Phone Repair. We've received your appointment request and will contact you shortly to confirm the details.
          </p>

          <div className="mb-8 rounded-lg bg-muted/50 p-6 text-left">
            <h3 className="mb-3 font-semibold">Next Steps:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Our team will review your request within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>We'll call you to confirm your preferred date and time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Bring your device to the selected location at the scheduled time</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate({ to: '/' })} className="w-full" size="lg">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate({ to: '/book' })}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Book Another Appointment
            </Button>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Questions? Call us at{' '}
              <a href="tel:+919706499653" className="font-medium text-primary hover:underline">
                +91 97064 99653
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


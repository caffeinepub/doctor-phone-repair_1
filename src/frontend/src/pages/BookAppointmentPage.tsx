import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppointmentForm from '@/components/AppointmentForm';

export default function BookAppointmentPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Book Your Appointment</h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and we'll get back to you shortly to confirm your appointment.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Please provide your information and describe the issue with your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentForm />
          </CardContent>
        </Card>

        <div className="mt-8 rounded-lg bg-muted/50 p-6">
          <h3 className="mb-3 font-semibold">What happens next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                1
              </span>
              <span>We'll review your appointment request</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                2
              </span>
              <span>Our team will contact you to confirm the date and time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                3
              </span>
              <span>Visit us at your scheduled time with your device</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


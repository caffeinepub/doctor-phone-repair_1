import { useNavigate } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Wrench, Battery, Droplets, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: 'Screen Replacement',
      price: 'Rs 800',
      description: 'Professional screen replacement for all phone models',
    },
    {
      icon: <Battery className="h-8 w-8 text-primary" />,
      title: 'Battery Replacement',
      price: 'Rs 650',
      description: 'Genuine battery replacement with warranty',
    },
    {
      icon: <Droplets className="h-8 w-8 text-primary" />,
      title: 'Water Damage Repair',
      price: 'Rs 300',
      description: 'Expert water damage diagnosis and repair',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Dead Phone Repair',
      price: 'Rs 800',
      description: 'Revive your non-responsive device',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Expert Phone Repair Services in Tinsukia
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                Fast, reliable, and affordable mobile repair solutions. Get your device fixed by certified technicians.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" onClick={() => navigate({ to: '/book' })} className="text-base">
                  <Phone className="mr-2 h-5 w-5" />
                  Book Appointment
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-base"
                >
                  View Services
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/assets/generated/doctor-phone-repair-hero.dim_1600x900.png"
                alt="Phone repair workspace with tools and devices"
                className="w-full max-w-2xl rounded-lg shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-16 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Services & Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Transparent pricing with no hidden charges. All prices start from:
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Card key={index} className="transition-shadow hover:shadow-soft">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">
                    starts from {service.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="scroll-mt-16 bg-muted/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Visit Our Locations</h2>
            <p className="text-lg text-muted-foreground">
              Two convenient locations to serve you better
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Main Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  2nd floor TDA COMPLEX<br />
                  Tinsukia, Assam
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Sub Branch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rupai siding<br />
                  Tinsukia, Assam
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-16 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have questions? Reach out to us anytime
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <a href="tel:+919706499653" className="block hover:text-foreground">
                          +91 97064 99653
                        </a>
                        <a href="tel:+917086219818" className="block hover:text-foreground">
                          +91 70862 19818
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <a
                        href="mailto:drphonetdatsk@gmail.com"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        drphonetdatsk@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={() => navigate({ to: '/book' })} className="w-full" size="lg">
                      <Phone className="mr-2 h-5 w-5" />
                      Book Your Appointment Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}


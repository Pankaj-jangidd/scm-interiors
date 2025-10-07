import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.projectType) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    toast.success("Thank you! We'll get back to you shortly.");
    setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Get in Touch With Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to discuss your next interior project — connect with us directly or book a
            free visit.
          </p>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <a
              href="tel:+918824374977"
              className="bg-card p-8 rounded-xl shadow-md hover-lift text-center"
            >
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Call Now</h3>
              <p className="text-muted-foreground">+91 8824374977</p>
            </a>

            <a
              href="mailto:srichamundeshwariinteriors@gmail.com"
              className="bg-card p-8 rounded-xl shadow-md hover-lift text-center"
            >
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Mail Us</h3>
              <p className="text-muted-foreground text-xs md:text-sm break-all">
                srichamundeshwariinteriors@gmail.com
              </p>
            </a>

            <a
              href="https://wa.me/918824374977?text=Hi,%20I%20want%20to%20discuss%20an%20interior%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card p-8 rounded-xl shadow-md hover-lift text-center"
            >
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Chat on WhatsApp</h3>
              <p className="text-muted-foreground">Message us instantly</p>
            </a>
          </div>

          {/* Booking Form */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              Book a Free Design Visit
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-card p-8 rounded-xl shadow-lg"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="projectType">Type of Project *</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                      <SelectItem value="modular-kitchen">Modular Kitchen</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message / Additional Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
                  Schedule My Visit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Visit Our Workspace
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg max-w-2xl mx-auto text-center">
            <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
            <p>
              #25 Vinayaka Layout, Doddanagamangala, Electronic City Phase 2, Bangalore 560-100
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

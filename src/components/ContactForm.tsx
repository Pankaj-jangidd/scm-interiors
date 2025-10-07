import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useAdmin } from '@/contexts/AdminContext';

const ContactForm = () => {
  const { addContactSubmission } = useAdmin();
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

    // Basic phone validation
    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    addContactSubmission(formData);
    toast.success('Thank you! We will get back to you shortly.');
    setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
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
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your project..."
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
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-6">
          Book a Visit
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

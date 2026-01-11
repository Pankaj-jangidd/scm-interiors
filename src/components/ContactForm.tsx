import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/emailService";
import { submitContactForm } from "@/integrations/supabase/contact";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.projectType) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase database
      await submitContactForm(formData);

      // Send email notification
      const emailResult = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message,
      });

      if (emailResult.success) {
        toast.success("Thank you! We will get back to you shortly.");
      } else {
        toast.success("Form submitted! (Email notification pending)");
      }

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
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
            disabled={isSubmitting}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+91 XXXXX XXXXX"
            required
            disabled={isSubmitting}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="your.email@example.com"
            disabled={isSubmitting}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="projectType">Type of Project *</Label>
          <Select
            value={formData.projectType}
            onValueChange={(value) =>
              setFormData({ ...formData, projectType: value })
            }
            disabled={isSubmitting}
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

        <div>
          <Label htmlFor="message">Add a Custom Message</Label>
          <Textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Message..."
            disabled={isSubmitting}
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 mt-6"
        >
          {isSubmitting ? "Submitting..." : "Book a Visit"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Instagram,
} from "lucide-react";
import { sendContactEmail } from "@/lib/emailService";
import { submitContactForm } from "@/integrations/supabase/contact";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  project: z.string().min(1, "Please select a project type"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fullText = "Let's Connect";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Typewriter effect - triggers on scroll into view, replays each time
  useEffect(() => {
    let typeTimer: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (typeTimer) clearInterval(typeTimer);
          setDisplayText("");
          let index = 0;
          typeTimer = setInterval(() => {
            if (index <= fullText.length) {
              setDisplayText(fullText.slice(0, index));
              index++;
            } else {
              if (typeTimer) clearInterval(typeTimer);
            }
          }, 150);
        } else {
          if (typeTimer) clearInterval(typeTimer);
          setDisplayText("");
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (typeTimer) clearInterval(typeTimer);
      observer.disconnect();
    };
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const adaptedData = {
        name: data.name,
        phone: "",
        email: data.email,
        projectType: data.project,
        message: data.message,
      };

      await submitContactForm(adaptedData);
      await sendContactEmail(adaptedData);

      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Failed to submit:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <section
        ref={sectionRef}
        id="contact"
        className="lg:h-[calc(100vh-71px)] bg-secondary/50 flex items-center justify-center scroll-mt-[72px] py-16 lg:py-0 overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-[30px]"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-950">
              Contact Us
            </h2>
            <div className="w-16 h-1 bg-[#6B7C59] mt-2" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-stretch">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6 }}
              className="h-full flex flex-col"
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4"
                style={{
                  fontWeight: 950,
                  WebkitTextStroke: "1.5px currentColor",
                  minHeight: "1.2em",
                }}
              >
                {displayText.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={index !== 0 ? "text-[#6B7C59]" : ""}
                  >
                    {word}
                    {index === 0 && " "}
                  </span>
                ))}
                {displayText.length > 0 && (
                  <span
                    className="inline-block bg-gray-900 ml-1"
                    style={{
                      width: "4px",
                      height: "0.8em",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                )}
              </h2>

              {/* Contact Info Items */}
              <div className="flex-1 flex flex-col gap-4 justify-start">
                {/* Phone Number */}
                <motion.a
                  href="tel:+918824374977"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(58,69,42,0.1)",
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md border border-transparent transition-all duration-100"
                  style={{ height: "92px" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                    alt="Phone"
                    className="w-9 h-9 flex-shrink-0"
                  />
                  <p className="text-base text-gray-900 transition-colors duration-75 font-medium">
                    +91 88243 74977
                  </p>
                </motion.a>

                {/* Email Address */}
                <motion.a
                  href="mailto:scminteriorss@gmail.com"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(58,69,42,0.1)",
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md border border-transparent transition-all duration-100"
                  style={{ height: "92px" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png"
                    alt="Gmail"
                    className="w-9 h-9 flex-shrink-0"
                  />
                  <p className="text-base text-gray-900 transition-colors duration-75 font-medium break-all">
                    scminteriorss@gmail.com
                  </p>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/918824374977"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(58,69,42,0.1)",
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md border border-transparent transition-all duration-100"
                  style={{ height: "92px" }}
                >
                  <img
                    src="/whatsapp-icon.png"
                    alt="WhatsApp"
                    className="w-10 h-10 flex-shrink-0"
                  />
                  <p className="text-base text-gray-900 transition-colors duration-75 font-medium">
                    +91 88243 74977
                  </p>
                </motion.a>

                {/* Address */}
                <motion.a
                  href="https://maps.app.goo.gl/9KBhhyvtgDQx7ucM9"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(58,69,42,0.1)",
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  className="flex items-center gap-4 group cursor-pointer bg-white px-6 rounded-xl shadow-md border border-transparent transition-all duration-100"
                  style={{ minHeight: "92px" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2642/2642502.png"
                    alt="Google Maps"
                    className="w-9 h-9 flex-shrink-0"
                  />
                  <p className="text-sm md:text-base text-gray-900 transition-colors duration-75 font-medium">
                    Electronic City, Bangalore 560100
                  </p>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg h-full flex flex-col justify-center"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#6B7C59]/30 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#6B7C59]/30 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Project Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Project Type
                  </label>
                  <select
                    {...register("project")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.project ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#6B7C59]/30 transition-all bg-white`}
                  >
                    <option value="">Select a project type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.project && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.project.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={2}
                    {...register("message")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-[#6B7C59]/30 transition-all resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6B7C59] hover:bg-[#5A6B4A] text-white font-medium py-4 rounded-lg transition-colors disabled:opacity-50 uppercase tracking-widest text-sm shadow-md hover:shadow-lg"
                  >
                    {isSubmitting ? "Sending..." : "SEND MESSAGE"}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-green-600 mt-2"
                  >
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">
                      Message sent successfully!
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 text-red-600 mt-2"
                  >
                    <XCircle size={20} />
                    <span className="text-sm font-medium">
                      Failed to send message
                    </span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;

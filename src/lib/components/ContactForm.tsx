"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { CircleAlert, Send, Zap } from "lucide-react";
import { sendEmail } from "@/lib/utils/email";
import { FormData, FormErrors } from "@/lib/utils/types";
import { validateField, validateForm } from "@/lib/utils/validation";
import Button from "@/lib/components/Button";
import { containerVariants, itemVariants } from "@/lib/utils/variants";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    content: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[fieldName]) {
      const fieldError = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
        general: "",
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setTouched((prev) => ({ ...prev, [name]: true }));

    if (value.length > 0) {
      const fieldError = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, content: true });

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await sendEmail(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", content: "" });
      setTouched({});
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isFormValid =
    !hasErrors && !!formData.name && !!formData.email && !!formData.content;

  if (submitted) {
    return (
      <div className="bg-green-500/10 border border-green-500/50">
        <div className="p-4 sm:p-6 text-center">
          <Zap className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-green-400" />
          <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-2">
            Message Sent
          </h3>
          <p className="text-white/70 font-mono text-xs sm:text-sm">
            Connection established. I&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6"
      noValidate
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {errors.general && (
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-md"
        >
          <CircleAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-xs sm:text-sm font-mono">
            {errors.general}
          </span>
        </motion.div>
      )}

      <motion.div className="space-y-2" variants={itemVariants}>
        <label className="font-mono text-xs sm:text-sm text-white/70">
          Name
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-black/50 transition-colors ${
              errors.name && touched.name
                ? "border-red-500 focus:border-red-500"
                : "border-white/20 focus:border-pink-500"
            }`}
            placeholder="Enter your name..."
            maxLength={50}
          />
          {errors.name && touched.name && (
            <div className="flex items-center gap-1 mt-1">
              <CircleAlert className="w-3 h-3 text-red-400" />
              <span className="text-red-400 text-xs font-mono break-words">
                {errors.name}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <label className="font-mono text-xs sm:text-sm text-white/70">
          Email
        </label>
        <div className="relative">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`flex h-10 w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-black/50 transition-colors focus:outline-none ${
              errors.email && touched.email
                ? "border-red-500 focus:border-red-500"
                : "border-white/20 focus:border-pink-500"
            }`}
            placeholder="your@email.com"
            maxLength={100}
          />
          {errors.email && touched.email && (
            <div className="flex items-center gap-1 mt-1">
              <CircleAlert className="w-3 h-3 text-red-400" />
              <span className="text-red-400 text-xs font-mono break-words">
                {errors.email}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <label className="font-mono text-xs sm:text-sm text-white/70">
            Message
          </label>
          <span className="font-mono text-xs text-white/50">
            {formData.content.length}/1000
          </span>
        </div>
        <div className="relative">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`flex w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-black/50 transition-colors min-h-[120px] resize-none ${
              errors.content && touched.content
                ? "border-red-500 focus:border-red-500"
                : "border-white/20 focus:border-pink-500"
            }`}
            placeholder="Tell me about your project, idea, or just say hello..."
            maxLength={1000}
          />
          {errors.content && touched.content && (
            <div className="flex items-center gap-1 mt-1">
              <CircleAlert className="w-3 h-3 text-red-400" />
              <span className="text-red-400 text-xs font-mono break-words">
                {errors.content}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Honeypot — hidden from users, bots will fill this */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
          }
        />
      </div>

      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`w-full font-mono transition-all ${
            isFormValid
              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}

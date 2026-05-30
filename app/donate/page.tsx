"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { QrCode, Heart, IndianRupee, FileCheck, Download, ExternalLink, FileText, FileSignature, HandCoins, BarChart3, TrendingUp, Users, AlertCircle, CheckCircle2 } from 'lucide-react';

// Placeholders for external definitions
const QR_PLACEHOLDER = '/donation.png'; 
const HERO_IMAGE_PATH = '/image_18.png'; 
const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

// Dummy icons for highlights (since they weren't in the original provided snippet, I'll define some relevant ones)
const statIcons = [Users, HandCoins, FileSignature, TrendingUp, BarChart3];

export default function DonatePage() {
  // --- Form State & Logic (Preserved from original donate logic) ---
  const [form, setForm] = useState<Record<string, string>>({
    name: '',
    panCard: '',
    phoneNumber: '',
    amount: '',
    transactionId: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Simple validation logic
  const validateForm = () => {
    const newErrors: any = {};
    if (!form.amount) {
      newErrors.amount = 'Donation amount is required';
    } else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      newErrors.amount = 'Donation amount must be a positive number';
    }
    
    if (!form.name) newErrors.name = 'Full Name is required';
    
    if (!form.phoneNumber || !/^\d{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = 'Valid 10-digit Phone Number required';
    }
    
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
    if (!form.panCard) {
      newErrors.panCard = 'PAN Card Number is required';
    } else if (!panRegex.test(form.panCard)) {
      newErrors.panCard = 'Invalid PAN Card format (e.g. ABCDE1234F)';
    }
    
    if (!form.transactionId) newErrors.transactionId = 'Transaction ID / UTR is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setErrors({});
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          amount: Number(form.amount),
          phoneNumber: form.phoneNumber.trim(),
          panCard: form.panCard.toUpperCase().trim(),
          transactionId: form.transactionId.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 400 && data.errors) {
          // Validation errors from Zod
          const mappedErrors: any = {};
          Object.entries(data.errors).forEach(([field, msgs]: [string, any]) => {
            mappedErrors[field] = msgs[0];
          });
          setErrors(mappedErrors);
        } else if (res.status === 409 && data.errors) {
          // Conflict / Duplicate transaction UTR error
          setErrors(data.errors);
          setServerError(data.message || "A donation with this transaction ID has already been recorded.");
        } else {
          setServerError(data.message || "Failed to process donation. Please check your inputs.");
        }
        return;
      }

      // Success
      setSubmitted(true);
    } catch (err) {
      console.error("Donation submission error:", err);
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------------------------------------

  return (
    <div className="font-sans">
      {/* 
        ========================================================================
        NEW Donate Hero Section (Top Part) 
        - Replicated structure of the 'Annual Reports Background' example provided
        - Corrected colors to match previously established palette
        ========================================================================
      */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE_PATH}
            alt="Support NIDAAN Background"
            className="w-full h-full object-cover"
          />
          {/* Black overlay with opacity from example */}
          <div className="absolute inset-0 bg-black/85"></div>
        </div>

        {/* Hero Content - Corrected with motion and colors */}
        <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-12 lg:px-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center md:text-left"
          >
            {/* Small uppercase tag using the secondary orange color */}
            <span className="text-xs font-semibold tracking-widest uppercase text-[#de5212] mb-4 block">
              Make a Difference
            </span>
            {/* Main Header using bold styles and orange accent */}
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Support Our Cause: Donate to <span className="text-white relative inline-block px-2 before:absolute before:inset-x-0 before:bottom-2 before:h-3 before:bg-[#ffcc00] before:-z-10">NIDAAN</span>
            </h1>
            {/* Description using text-white/70 from example */}
            <p className="text-md text-white/70 max-w-2xl leading-relaxed">
              Your contribution directly funds therapy sessions, special education, and life-skills training for children with disabilities. Every rupee counts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 
        ========================================================================
        Donate Content Section (Bottom Part) 
        - Integrated original donate grid into the 'F8F9FA' light theme block look
        - Aligned colors with the positive light theme palette
        ========================================================================
      */}
      <section className="bg-zinc-50 py-16 md:py-24 px-6 md:px-12 lg:px-24 font-sans text-zinc-900 min-h-[400px]">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Column: QR Code + Bank Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              {/* QR Code Card - Stylized like report cards from example */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col items-center gap-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Scan &amp; Donate
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-100">
                  {/* Actual QR code image placeholder */}
                  <div className="w-88 h-88 flex items-center justify-center rounded-xl overflow-hidden">
                    <img
                      src={QR_PLACEHOLDER}
                      alt="UPI QR Code"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-zinc-400 mb-1 font-medium">UPI ID</div>
                  <div className="text-base font-bold tracking-wide text-black">nidaan@upi</div>
                </div>
                {/* Bank Details */}
                <div className="w-full border-t border-zinc-200 pt-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Account Name</span>
                    <span className="font-semibold text-black">NIDAAN Society</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Account No.</span>
                    <span className="font-semibold text-black">XXXX XXXX XXXX</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">IFSC Code</span>
                    <span className="font-semibold text-black">XXXX0000000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Bank</span>
                    <span className="font-semibold text-black">State Bank of India</span>
                  </div>
                </div>
              </div>

              {/* Tax Exemption Note */}
              <div className="bg-[#ffcc00]/15 border border-[#ffcc00]/40 rounded-2xl p-5 text-sm text-zinc-800 leading-relaxed shadow-sm">
                <span className="text-[#de5212] font-bold">80G Tax Exemption:</span> Donations to NIDAAN are eligible for 50% tax deduction under Section 80G of the Income Tax Act. A receipt will be issued after verification of your PAN card.
              </div>
            </motion.div>

            {/* Right Column: Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  // Success State - Stylized like report cards from example
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-zinc-200 rounded-3xl p-10 flex flex-col items-center text-center gap-5 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-sans text-2xl text-black font-bold">Thank You, {form.name.split(' ')[0]}!</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed max-w-sm">
                      Your donation of <span className="text-[#de5212] font-bold">₹{Number(form.amount).toLocaleString('en-IN')}</span> has been recorded. We will send your 80G receipt to your registered details shortly. Together, we change lives.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', panCard: '', phoneNumber: '', amount: '', transactionId: '' }); }}
                      className="mt-2 text-xs text-zinc-400 underline underline-offset-2 hover:text-black transition-colors"
                    >
                      Make another donation
                    </button>
                  </motion.div>
                ) : (
                  // Active Form State
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-white border border-zinc-200 rounded-3xl p-8 flex flex-col gap-5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-4 h-4 text-[#de5212] fill-[#de5212]" />
                      <span className="text-sm font-bold uppercase tracking-widest text-zinc-600">Confirm Your Donation</span>
                    </div>
                    <p className="text-xs text-zinc-400 -mt-2">After completing UPI, fill this form to record your donation.</p>

                    {/* Preset amounts selection */}
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Select Amount (₹)</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {PRESET_AMOUNTS.map(amt => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, amount: String(amt) }))}
                            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                              form.amount === String(amt)
                                ? 'bg-[#ffcc00] border-[#ffcc00] text-black shadow-sm'
                                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                            }`}
                          >
                            <IndianRupee className="w-3 h-3" />{amt.toLocaleString('en-IN')}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        value={form.amount}
                        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                        placeholder="Or enter custom amount"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white text-black placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#de5212]/20 focus:border-[#de5212] ${errors.amount ? 'border-red-500 focus:ring-red-200' : 'border-zinc-200'}`}
                      />
                      {errors.amount && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.amount}</p>}
                    </div>

                    {/* Input fields mapping */}
                    {[
                      { key: 'name', label: 'Full Name', placeholder: 'As per PAN card' },
                      { key: 'panCard', label: 'PAN Card Number', placeholder: 'ABCDE1234F' },
                      { key: 'phoneNumber', label: 'Phone Number', placeholder: '10-digit mobile number' },
                      { key: 'transactionId', label: 'Transaction ID / UTR ID', placeholder: 'From your payment app / bank' },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-zinc-800 mb-1.5">{label}</label>
                        <input
                          value={form[key]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white text-black placeholder:text-zinc-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#de5212]/20 focus:border-[#de5212] ${errors[key] ? 'border-red-500 focus:ring-red-200' : 'border-zinc-200'}`}
                        />
                        {errors[key] && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[key]}</p>}
                      </div>
                    ))}

                    {serverError && (
                      <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{serverError}</p>
                    )}

                    {/* CTA Button using the primary orange color for guide */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#de5212] hover:bg-[#c6440e] text-white font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2 shadow-md shadow-[#de5212]/10"
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Heart className="w-4 h-4 fill-white" /> Confirm Donation</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* 
            ========================================================================
            Compliance Note (Replicated from bottom of example provided)
            ========================================================================
          */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center border-t border-zinc-200 pt-8"
          >
            <p className="text-xs text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              All records are verified in accordance with Section 80G regulation of the Income Tax Act. For donation verification or financial statements, please write to us at{' '}
              <a href="mailto:nirtnidaan@gmail.com" className="text-zinc-900 font-medium underline underline-offset-2 hover:text-[#de5212] transition-colors">
                nirtnidaan@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
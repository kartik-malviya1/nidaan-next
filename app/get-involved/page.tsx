// @ts-nocheck
"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, GraduationCap, Users, BookOpen, Mic, Hand, Activity, Brain, Music, Palette, CheckCircle2 } from 'lucide-react';

const tabs = ['Volunteer', 'Internship'];

const volunteerRoles = [
    { icon: Heart, title: 'Classroom Support', desc: 'Assist special educators in daily classroom activities and individualized learning sessions.' },
    { icon: Hand, title: 'Therapy Assistance', desc: 'Support therapists during OT, Speech, and Physiotherapy sessions under supervision.' },
    { icon: Users, title: 'Recreational Activities', desc: 'Lead or assist in sports, arts, music, dance, and outdoor activities for our children.' },
    { icon: Mic, title: 'Awareness Campaigns', desc: 'Help organize and run community outreach and awareness programs in underserved areas.' },
    { icon: Palette, title: 'Art & Creativity', desc: 'Facilitate art, craft, and creative therapy sessions that promote self-expression.' },
    { icon: Activity, title: 'Community Initiatives', desc: 'Participate in screening camps, health drives, and family support programs.' },
];

const internshipAreas = [
    { icon: Brain, title: 'Psychology', desc: 'Practical exposure to psychometric assessments, ABA therapy, behaviour therapy, and counselling services.' },
    { icon: BookOpen, title: 'Special Education', desc: 'Hands-on training in IEP development, adaptive curriculum, and inclusive classroom practices.' },
    { icon: Hand, title: 'Occupational Therapy', desc: 'Clinical placement under RCI-registered OTs covering sensory integration, motor development and ADL.' },
    { icon: Mic, title: 'Speech Therapy', desc: 'Supervised practicum in speech-language pathology, AAC devices, and articulation therapy.' },
    { icon: Activity, title: 'Physiotherapy', desc: 'Rehabilitation-focused internship covering neuro-developmental techniques and paediatric physiotherapy.' },
    { icon: Users, title: 'Child Development & Outreach', desc: 'Field experience in early intervention, community screening camps, and family guidance programs.' },
];

const benefits = [
    'Certificate of completion from NIDAAN / NIRT',
    'Hands-on multidisciplinary exposure',
    'Mentorship from RCI-registered professionals',
    'Real-world clinical & field experience',
    'Letter of recommendation on merit',
    'Contribution to meaningful social impact',
];

const initialForm = {
    type: 'Volunteer',
    name: '',
    email: '',
    phone: '',
    city: '',
    qualification: '',
    institution: '',
    area: '',
    duration: '',
    availability: '',
    motivation: '',
};

export default function VolunteerInternship() {
    const [activeTab, setActiveTab] = useState('Volunteer');
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit application');
            }
            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setForm(prev => ({ ...prev, type: tab }));
    };

    const roles = activeTab === 'Volunteer' ? volunteerRoles : internshipAreas;

    return (
        <div>
            {/* ── HERO (covers navbar, same pattern as Contact) ── */}
            <section className="relative pt-26 pb-20 lg:pt-26 lg:pb-26 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/image_20.png"
                        alt="Volunteer & Internship at NIDAAN"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl text-left"
                    >
                        <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4 block">
                            Support Our Cause
                        </span>

                        <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white mb-2 leading-tight">
                            Volunteer & Internship
                            <br />
                            at <span></span><span className="text-amber-500">NIDAAN</span>
                        </h1>

                        <p className="text-lg text-white/70 text-left leading-relaxed">
                            Join NIDAAN to empower children with special needs while gaining hands-on experience in therapy, education, rehabilitation, and outreach.
                        </p>

                        <p className="text-white font-medium italic mt-4">
                            "Learn, grow, and create impact with Team NIDAAN."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="py-20 bg-muted/40 w-full">
                <div className="sm:max-w-7xl max-w-screen mx-auto px-6">

                    {/* Tab toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="flex bg-background rounded-full p-1 border border-border shadow-sm">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === tab
                                        ? 'bg-foreground text-background shadow-sm'
                                        : 'text-muted-foreground hover:text-[#de5212]'
                                        }`}
                                >
                                    {tab === 'Volunteer' ? '🤝 Volunteer' : '🎓 Internship'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

                        {/* Left: Info */}
                        <div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'Volunteer' ? (
                                        <div className="mb-8">
                                            <h3 className="font-sans text-2xl mb-3">Make a Difference</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Participants work alongside our multidisciplinary team through
                                                classroom support, therapy assistance, recreational activities,
                                                awareness campaigns, and community initiatives.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="mb-8">
                                            <h3 className="font-sans text-2xl mb-3">Build Your Career in Inclusive Care</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Our structured internship program provides supervised, hands-on
                                                clinical and field experience for students of psychology, special
                                                education, rehabilitation sciences, and more.
                                            </p>
                                        </div>
                                    )}

                                    {/* Role cards */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        {roles.map((role, i) => (
                                            <motion.div
                                                key={role.title}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.06 }}
                                                className="bg-background rounded-2xl p-4 border border-border
                                   hover:border-[#de5212]/30 hover:shadow-sm transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-[#de5212]/10 flex items-center justify-center mb-3">
                                                    <role.icon className="w-4 h-4 text-[#de5212]" />
                                                </div>
                                                <div className="text-sm font-semibold mb-1 text-black">{role.title}</div>
                                                <div className="text-xs text-muted-foreground leading-relaxed">{role.desc}</div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Benefits */}
                                    <div className="bg-foreground text-white rounded-3xl p-7">
                                        <h4 className="font-sans text-lg mb-5 text-white">What You Gain</h4>
                                        <ul className="space-y-3">
                                            {benefits.map(b => (
                                                <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                                                    <CheckCircle2 className="w-4 h-4 text-[#ffcc00] flex-shrink-0 mt-0.5" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right: Form */}
                        <div>
                            <div className="bg-background rounded-3xl border border-border p-8 shadow-sm">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10"
                                    >
                                        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-5">
                                            <CheckCircle2 className="w-14 h-14 text-white fill-green-500" />
                                        </div>
                                        <h3 className="font-sans text-2xl mb-3">Application Received!</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                                            Thank you for your interest in joining Team NIDAAN. We will
                                            review your application and get back to you within 3–5 working days.
                                        </p>
                                        <button
                                            onClick={() => { setSubmitted(false); setForm(initialForm); }}
                                            className="mt-6 text-sm text-primary font-medium hover:underline"
                                        >
                                            Submit another application
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h3 className="font-sans text-xl mb-6">
                                            {activeTab === 'Volunteer' ? 'Volunteer Application' : 'Internship Application'}
                                        </h3>
                                        <form onSubmit={handleSubmit} className="space-y-4">

                                            {/* Type selector */}
                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">
                                                    I want to
                                                </label>
                                                <div className="flex gap-3">
                                                    {tabs.map(t => (
                                                        <label
                                                            key={t}
                                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border
                                cursor-pointer text-sm font-medium transition-all ${form.type === t
                                                                    ? 'border-[#de5212] bg-[#de5212] text-background'
                                                                    : 'border-border text-muted-foreground hover:border-[#de5212]/40'
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="type"
                                                                value={t}
                                                                checked={form.type === t}
                                                                onChange={() => handleTabChange(t)}
                                                                className="sr-only"
                                                            />
                                                            {t}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">Full Name *</label>
                                                    <input name="name" value={form.name} onChange={handleChange} required
                                                        placeholder="Your full name"
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                       focus:outline-none focus:ring-2 focus:ring-[#de5212]/30 focus:border-[#de5212] transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">Email *</label>
                                                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                                                        placeholder="your@email.com"
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                       focus:outline-none focus:ring-2 focus:ring-[#de5212]/30 focus:border-[#de5212] transition-all" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">Phone *</label>
                                                    <input name="phone" value={form.phone} onChange={handleChange} required
                                                        placeholder="+91 XXXXX XXXXX"
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                       focus:outline-none focus:ring-2 focus:ring-[#de5212]/30 focus:border-[#de5212] transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">City *</label>
                                                    <select name="city" value={form.city} onChange={handleChange} required
                                                        className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-background
               text-sm text-foreground appearance-none cursor-pointer
               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                                                        <option value="">Select city</option>
                                                        <option>Bhopal</option>
                                                        <option>Indore</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">
                                                    {form.type === 'Internship' ? 'Institution / University *' : 'Qualification / Profession *'}
                                                </label>
                                                <input name="institution" value={form.institution} onChange={handleChange} required
                                                    placeholder={form.type === 'Internship' ? 'Name of your college / university' : 'e.g. B.Ed Student / Social Worker'}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">
                                                    Area of Interest *
                                                </label>
                                                <select name="area" value={form.area} onChange={handleChange} required
                                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                                                    <option value="">Select area</option>
                                                    <option>Psychology & Counselling</option>
                                                    <option>Special Education</option>
                                                    <option>Speech Therapy</option>
                                                    <option>Occupational Therapy</option>
                                                    <option>Physiotherapy</option>
                                                    <option>ABA Therapy</option>
                                                    <option>Classroom Support</option>
                                                    <option>Recreational & Arts Activities</option>
                                                    <option>Community Outreach & Awareness</option>
                                                    <option>Child Development</option>
                                                    <option>Social Work</option>
                                                    <option>Administration & Management</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">Duration</label>
                                                    <select name="duration" value={form.duration} onChange={handleChange}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                                                        <option value="">Preferred duration</option>
                                                        <option>1 month</option>
                                                        <option>2 months</option>
                                                        <option>3 months</option>
                                                        <option>6 months</option>
                                                        <option>Ongoing / Flexible</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">Availability</label>
                                                    <select name="availability" value={form.availability} onChange={handleChange}
                                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                                                        <option value="">When are you available?</option>
                                                        <option>Weekdays (Full time)</option>
                                                        <option>Weekdays (Part time)</option>
                                                        <option>Weekends only</option>
                                                        <option>Flexible</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold mb-1.5 text-foreground/70 uppercase tracking-wider">
                                                    Why do you want to join NIDAAN? *
                                                </label>
                                                <textarea name="motivation" value={form.motivation} onChange={handleChange} required rows={4}
                                                    placeholder="Tell us about your motivation, relevant experience, and what you hope to contribute..."
                                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm
                                     focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                                            </div>

                                            {error && (
                                                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                                                    {error}
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full flex items-center justify-center gap-2 bg-[#de5212] text-white py-3
                                   rounded-xl font-semibold text-sm hover:bg-[#de5212]/90 transition-colors disabled:opacity-60"
                                            >
                                                {loading ? (
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>Submit Application <ArrowRight className="w-4 h-4" /></>
                                                )}
                                            </button>

                                            <p className="text-center text-xs text-muted-foreground">
                                                Or email us directly at{' '}
                                                <a href="mailto:nirtnidaan@gmail.com" className="text-primary font-medium hover:underline">
                                                    nirtnidaan@gmail.com
                                                </a>
                                                {' '}| Toll Free: 18008904648
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
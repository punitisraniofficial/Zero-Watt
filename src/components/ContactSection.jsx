import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Campus Pilot Deployment',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      topic: 'Campus Pilot Deployment',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section className="space-y-6 scroll-mt-20" id="contact">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border-subtle pb-4">
        <div>
          <div className="text-xs font-telemetry-mono text-primary font-bold tracking-widest uppercase">
            08 / GET IN TOUCH
          </div>
          <h2 className="text-2xl sm:text-3xl font-headline-md text-forest-deep font-bold mt-1">
            Connect with ZeroWatt
          </h2>
        </div>
        <p className="text-sm font-body-sm text-on-surface-variant max-w-xl text-left sm:text-right">
          Interested in deploying ZeroWatt on your campus, exploring hardware research collaborations, or reviewing our engineering blueprint? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information Panel */}
        <div className="lg:col-span-5 bg-surface-base border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="px-2.5 py-1 rounded-full text-xs font-telemetry-mono font-semibold bg-secondary-container text-primary">
              CAMPUS &amp; RESEARCH LAB
            </span>
            <h3 className="text-xl font-bold font-headline-sm text-forest-deep mt-3">
              JECRC University
            </h3>
            <p className="text-xs sm:text-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
              Smart Energy &amp; Embedded Systems Research Group · Plot No. IS-2036 to 2039, Ramchandrapura Industrial Area, Vidhani, Jaipur, Rajasthan 303905.
            </p>
          </div>

          <div className="space-y-4 text-xs font-telemetry-mono pt-4 border-t border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border-subtle flex items-center justify-center text-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-outline uppercase font-bold">Direct Contact Email</div>
                <a href="mailto:punitisrani16@gmail.com" className="font-semibold text-forest-deep hover:text-primary transition-colors">
                  punitisrani16@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border-subtle flex items-center justify-center text-primary">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-outline uppercase font-bold">Open Source Repository</div>
                <a 
                  href="https://github.com/punitisraniofficial/Zero-Watt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-forest-deep hover:text-primary transition-colors"
                >
                  github.com/punitisraniofficial/Zero-Watt
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border-subtle flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-base">schedule</span>
              </div>
              <div>
                <div className="text-[10px] text-outline uppercase font-bold">Inquiry Response Time</div>
                <span className="font-semibold text-forest-deep">Typically within 24 hours</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
            <div className="text-[10px] font-telemetry-mono text-primary font-bold uppercase tracking-wider mb-1">
              Project Motto
            </div>
            <div className="text-sm font-headline-sm font-semibold text-forest-deep italic">
              "यत्र आवश्यकता, तत्र ऊर्जा"
            </div>
            <div className="text-xs text-on-surface-variant mt-0.5">
              Where there is need, there is energy.
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-surface-base border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary-container text-primary flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold font-headline-sm text-forest-deep">
                Message Dispatched!
              </h3>
              <p className="text-xs sm:text-sm font-body-sm text-on-surface-variant max-w-md">
                Thank you for reaching out to the ZeroWatt engineering team at JECRC University. We have recorded your note and will follow up shortly.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-muted text-forest-deep font-telemetry-mono text-xs font-semibold border border-border-subtle transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-telemetry-mono font-bold text-forest-deep mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Prof. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-subtle focus:bg-surface-base focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-forest-deep outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-telemetry-mono font-bold text-forest-deep mb-1.5 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rajesh@university.edu.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-subtle focus:bg-surface-base focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-forest-deep outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-telemetry-mono font-bold text-forest-deep mb-1.5 uppercase">
                  Inquiry Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-subtle focus:bg-surface-base focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-forest-deep outline-none transition-all"
                >
                  <option value="Campus Pilot Deployment">Campus Pilot Deployment / Demonstration</option>
                  <option value="Academic Research Collaboration">Academic Research &amp; Energy Modeling</option>
                  <option value="Hardware Architecture Review">Hardware Architecture &amp; ESP32 Code Review</option>
                  <option value="Viva & Evaluator Feedback">Viva Flow / Evaluator Inquiries</option>
                  <option value="Other">Other Discussions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-telemetry-mono font-bold text-forest-deep mb-1.5 uppercase">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your institution, pilot requirements, or questions regarding ZeroWatt..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-subtle focus:bg-surface-base focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm text-forest-deep outline-none transition-all resize-y"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-telemetry-mono text-on-surface-variant">
                  * All fields marked with asterisk are required
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-telemetry-mono font-semibold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Dispatch Message</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

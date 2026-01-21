'use client'

import React, { useState } from 'react';
import { ArrowRight, Check, Receipt, Clock, DollarSign } from 'lucide-react';

export default function OPALanding() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && role) {
      console.log('Signup:', { email, role });
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <nav className="px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            OPA
          </div>
          <a 
            href="#early-access" 
            className="text-sm text-slate-600 hover:text-purple-600 transition-colors duration-300"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-transparent opacity-40 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Stop chasing receipts.
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Start making your day.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            You're managing million-dollar productions while hunting down $47 coffee runs. 
            OPA handles the petty cash chaos so you can focus on what actually matters.
          </p>
          <a 
            href="#early-access" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-sm text-slate-500 mt-4">Early access launching soon. No credit card required.</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              You know this feeling.
            </h2>
            <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
              <p>
                It's 11 PM the night before wrap. You're reconciling petty cash with a stack of crumpled receipts, 
                three different spreadsheets, and a PA who swears they submitted everything but can't find the Home Depot run from Tuesday.
              </p>
              <p>
                Meanwhile, you've got a dozen texts about tomorrow's call time, a location change to coordinate, 
                and the knowledge that you'll be doing this exact same dance on the next show.
              </p>
              <p className="font-medium text-slate-900">
                There has to be a better way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            OPA does the tedious work.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Receipt Wrangling</h3>
              <p className="text-slate-600">
                Snap, upload, or forward receipts. They're automatically categorized, tracked, and matched to petty cash disbursements. No more shoebox archaeology.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Petty Cash Tracking</h3>
              <p className="text-slate-600">
                Know exactly where every dollar went, who spent it, and what's left in the envelope. Real-time balances that actually balance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hours Back</h3>
              <p className="text-slate-600">
                What used to take three hours of reconciliation now takes fifteen minutes. Get back to the work that needs a human brain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-purple-300 uppercase text-sm font-medium mb-8 tracking-wider">Trusted by production teams</p>
          <blockquote className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
            "I used to dread petty cash reconciliation. Now I actually get to leave set on time."
          </blockquote>
          <p className="text-slate-300">— Production Coordinator, currently in beta</p>
        </div>
      </section>

      {/* Features List */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Everything you need. Nothing you don't.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Snap photos of receipts or forward email confirmations',
              'Automatic categorization and data extraction',
              'Real-time petty cash balance tracking',
              'Multi-user access for coordinators and PAs',
              'Export reports for accounting in seconds',
              'Works offline (because you\'re on location)',
              'Simple search: "Find that Lowe\'s receipt from last Tuesday"',
              'Reminder nudges when receipts are missing'
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg hover:bg-white transition-colors duration-300">
                <Check className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-6 py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            What's Coming Next
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            We're building OPA alongside production professionals. Here's what's on deck:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Vendor Payment Tracking</h3>
              <p className="text-slate-600">Know who's been paid, who's waiting, and when.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Budget vs. Actual Reporting</h3>
              <p className="text-slate-600">Real-time spend tracking against your show budget.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Purchase Order Management</h3>
              <p className="text-slate-600">Generate, track, and reconcile POs without the paperwork.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Call Sheet Integration</h3>
              <p className="text-slate-600">Connect your daily logistics to your spending.</p>
            </div>
          </div>
          <p className="text-center text-slate-600 mt-8 italic">
            Want a say in what we build next? Join the beta and tell us what you need.
          </p>
        </div>
      </section>

      {/* Early Access Form */}
      <section id="early-access" className="px-6 py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-purple-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Get Early Access
              </h2>
              <p className="text-slate-600 mb-8 text-center">
                Join production professionals who are done with spreadsheet hell. 
                We'll notify you when OPA launches.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                  >
                    <option value="">Select your role...</option>
                    <option value="production-manager">Production Manager</option>
                    <option value="production-coordinator">Production Coordinator</option>
                    <option value="office-pa">Office PA</option>
                    <option value="upm">UPM</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Join the Waitlist
                </button>
                <p className="text-xs text-slate-500 text-center">
                  No spam. Just updates when we're ready to launch.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                You're on the list!
              </h2>
              <p className="text-slate-600 mb-6">
                We'll send you an email when OPA is ready to make your petty cash problems disappear.
              </p>
              <p className="text-sm text-slate-500">
                In the meantime, we'd love to hear about your biggest receipt-tracking nightmares. 
                Just reply to the confirmation email.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              OPA
            </div>
            <p className="text-slate-600 text-sm">
              Built for production professionals who have better things to do than chase receipts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client'

import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Receipt, Clock, DollarSign, Camera, FileText, TrendingUp, Download, Edit3 } from 'lucide-react';

export default function OPALanding() {
  useEffect(() => {
    // Intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]"></div>

      {/* Header */}
      <nav className="relative z-20 px-6 py-5 border-b border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="relative group">
            <h1 className="text-3xl font-black tracking-tighter text-cyan-400 uppercase transition-all duration-300 group-hover:text-cyan-300">
              OPA
            </h1>
            <div className="absolute -bottom-1 left-0 w-8 h-1 bg-gradient-to-r from-pink-500 to-transparent group-hover:w-12 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
          </div>
          <a 
            href="#early-access" 
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          >
            Request Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative">
          <h2 className="text-6xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-slate-50 to-cyan-400 bg-clip-text text-transparent">
              Built for People Who
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Actually Run Production
            </span>
          </h2>
          <p className="text-xl text-slate-400 mb-4 max-w-3xl leading-relaxed">
            If you've ever wrapped a job at 2am with a camera roll full of receipts and zero patience left — this is for you.
          </p>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
            OPA is your digital production office assistant that tracks petty cash, reimbursements, and receipts in real time — the way production actually works.
          </p>
          <a 
            href="#early-access" 
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-slate-950 px-8 py-4 rounded-full text-lg font-bold hover:shadow-[0_0_40px_rgba(6,182,212,0.6),0_0_60px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 shadow-lg relative overflow-hidden"
          >
            <span className="relative z-10">Request Early Access</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10 px-6 py-20 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-cyan-400 tracking-tight">
            The Problem You Already Know
          </h2>
          <p className="text-2xl font-bold mb-12 text-slate-200">
            Production doesn't fall apart at prep. It falls apart at wrap.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-800/30 border-l-2 border-pink-500 rounded backdrop-blur-sm hover:bg-slate-800/50 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400 transition-all duration-300">
              <p className="text-slate-200">Camera roll receipt chaos</p>
            </div>
            
            <div className="p-5 bg-slate-800/30 border-l-2 border-pink-500 rounded backdrop-blur-sm hover:bg-slate-800/50 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400 transition-all duration-300" style={{ animationDelay: '100ms' }}>
              <p className="text-slate-200 text-lg font-medium">"I'll fix this later"</p>
            </div>
            
            <div className="p-5 bg-slate-800/30 border-l-2 border-pink-500 rounded backdrop-blur-sm hover:bg-slate-800/50 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400 transition-all duration-300" style={{ animationDelay: '200ms' }}>
              <p className="text-slate-200 text-lg font-medium">"Wait, how much did I give you?"</p>
            </div>
            
            <div className="p-5 bg-slate-800/30 border-l-2 border-pink-500 rounded backdrop-blur-sm hover:bg-slate-800/50 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400 transition-all duration-300" style={{ animationDelay: '300ms' }}>
              <p className="text-slate-200">Mislabeled Dropbox scans</p>
            </div>
            
            <div className="p-5 bg-slate-800/30 border-l-2 border-pink-500 rounded backdrop-blur-sm hover:bg-slate-800/50 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400 transition-all duration-300" style={{ animationDelay: '400ms' }}>
              <p className="text-slate-200">Excel hell — rebuilding the same spreadsheet every job</p>
            </div>
            
            <div className="p-5 bg-slate-800/30 border-l-2 border-pink-500 rounded backdrop-blur-sm hover:bg-slate-800/50 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:border-pink-400 transition-all duration-300" style={{ animationDelay: '500ms' }}>
              <p className="text-slate-200 text-lg font-medium">"What is this charge?"</p>
            </div>
          </div>

          <p className="text-lg text-slate-400 italic mt-10 text-center">
            You've done this job. You know exactly what we're talking about.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-cyan-400 tracking-tight">
            What OPA Actually Does
          </h2>
          
          <div className="space-y-8">
            {[
              {
                emoji: '📁',
                title: 'Job-Based Tracking That Makes Sense',
                description: 'Everything lives inside a job folder — company info, job number, crew position, and expenses. No floating receipts. No mixing jobs. No camera roll archaeology.'
              },
              {
                emoji: '💵',
                title: 'Petty Cash Envelopes That Don\'t Lie',
                description: 'Open an envelope, log the starting amount, and OPA tracks your running spend, remaining balance, and every receipt tied to a line item. You always know where the money went — before wrap.'
              },
              {
                emoji: '💳',
                title: 'Reimbursements Without the Guesswork',
                description: 'Log reimbursements separately from petty cash with card last-four, actual receipt date, and editable line numbers. So accounting can reconcile without blowing you up.'
              },
              {
                emoji: '📸',
                title: 'Receipts, Captured Once',
                description: 'Snap receipts in-app with smart cropping. No re-sorting. No re-naming. No re-uploading at wrap. Done.'
              },
              {
                emoji: '🧾',
                title: 'Line Numbers You Don\'t Have to Fight',
                description: 'OPA suggests standard production line items — because they\'re usually the same — but lets you override anything when a job does something weird. You stay in control.'
              },
              {
                emoji: '📊',
                title: 'Budget Visibility That Actually Helps',
                description: 'Keep your budget up to date with easy-to-see line totals across all envelopes. Know where you stand on every category without building a pivot table.'
              },
              {
                emoji: '📤',
                title: 'Wrap-Ready Exports',
                description: 'When the job\'s done, OPA exports clean PDFs that look like real production paperwork — not a phone dump that accounting has to fix.'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group relative grid md:grid-cols-[auto,1fr] gap-6 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-pink-500/5 border border-slate-800/50 hover:border-cyan-500/50 hover:shadow-[0_0_60px_rgba(6,182,212,0.2),0_0_40px_rgba(236,72,153,0.15)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-cyan-500 to-pink-500 group-hover:h-full transition-all duration-500 rounded-l-2xl group-hover:shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
                <div className="text-cyan-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-300 text-5xl">
                  {feature.emoji}
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-3 text-slate-50 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10 px-6 py-20 my-16">
        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-800/50 text-center hover:border-cyan-500/30 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-500">
          <h2 className="text-4xl font-black mb-8 text-cyan-400 tracking-tight">
            Why This Matters
          </h2>
          <p className="text-xl text-slate-300 mb-6 leading-relaxed">
            Production hasn't modernized the messiest part of the job: tracking money in the field.
          </p>
          <p className="text-xl text-slate-300 leading-relaxed">
            OPA fixes the part everyone hates but everyone has to do — so you can stop rebuilding expense reports at 2am and actually go home.
          </p>
        </div>
      </section>

      {/* Audience Section */}
      <section className="fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-cyan-400 tracking-tight text-center">
            Who This Is For
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Production Managers',
              'Coordinators',
              'Line Producers',
              'Freelancers juggling multiple jobs',
              'Anyone trusted with money on set'
            ].map((audience, i) => (
              <div 
                key={i}
                className="p-6 bg-slate-800/20 border-2 border-transparent rounded-xl text-center hover:border-cyan-500 hover:bg-cyan-500/5 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
              >
                <h3 className="font-bold text-slate-100">
                  {audience}
                </h3>
              </div>
            ))}
          </div>

          <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mt-12 text-center">
            If you've ever said "I'll clean this up later" — this is for you.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="early-access" className="fade-in opacity-0 translate-y-8 transition-all duration-700 relative z-10 px-6 py-24 my-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-50 tracking-tight">
            Early Access
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            OPA is being built by people who have done this job. Early access means:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {[
              'Using it before anyone else',
              'Helping decide what ships next',
              'Finally having a system that respects production reality'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-slate-300">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <a
            href="https://forms.gle/your-typeform-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-slate-950 px-10 py-5 rounded-full text-xl font-bold hover:shadow-[0_0_50px_rgba(6,182,212,0.6),0_0_70px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Request Early Access</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500">
            © 2025 OPA. Built for production, by production.
          </p>
        </div>
      </footer>
    </div>
  );
}

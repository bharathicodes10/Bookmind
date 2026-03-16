'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const HeroSection = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload PDF',
      description: 'Add your book file',
    },
    {
      number: 2,
      title: 'AI Processing',
      description: 'We analyze the content',
    },
    {
      number: 3,
      title: 'Voice Chat',
      description: 'Discuss with AI',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <div className="rounded-2xl bg-gradient-to-r from-[#F5E6D3] to-[#F0DCC8] p-8 sm:p-12 lg:p-16 shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Section */}
            <div className="flex-1 z-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-serif">
                Your Library
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed max-w-md">
                Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
              </p>
              <Button
                className="w-fit bg-white text-gray-900 hover:bg-gray-100 border-0 rounded-lg font-semibold text-base px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer" asChild
              >
                <Link className="text-xl" href="/books/new">
                + Add a new book
                </Link>
              </Button>
            </div>

            {/* Center Section - Illustration */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full h-80 flex items-center justify-center">
                {/* Vintage Globe and Books Illustration */}
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full max-w-xs drop-shadow-lg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Books - Left Stack */}
                  <rect x="30" y="180" width="50" height="15" fill="#8B4513" rx="2" />
                  <rect x="30" y="160" width="50" height="15" fill="#A0522D" rx="2" />
                  <rect x="30" y="140" width="50" height="15" fill="#654321" rx="2" />

                  {/* Books - Right Stack */}
                  <rect x="220" y="190" width="50" height="12" fill="#C85A54" rx="2" />
                  <rect x="220" y="170" width="50" height="12" fill="#B85A4A" rx="2" />
                  <rect x="220" y="150" width="50" height="12" fill="#A85040" rx="2" />

                  {/* Open Book - Center */}
                  <path
                    d="M 120 160 Q 150 120 180 160 L 180 200 Q 150 180 120 200 Z"
                    fill="#D4A574"
                    stroke="#8B6F47"
                    strokeWidth="2"
                  />
                  <line x1="150" y1="120" x2="150" y2="200" stroke="#8B6F47" strokeWidth="1.5" />

                  {/* Globe - Top */}
                  <circle cx="150" cy="80" r="35" fill="#6B9BD1" stroke="#4A6B9A" strokeWidth="2" />

                  {/* Globe grid lines */}
                  <circle cx="150" cy="80" r="35" fill="none" stroke="#5A7BA0" strokeWidth="0.5" />
                  <ellipse cx="150" cy="80" rx="35" ry="12" fill="none" stroke="#5A7BA0" strokeWidth="0.5" />
                  <ellipse cx="150" cy="80" rx="35" ry="25" fill="none" stroke="#5A7BA0" strokeWidth="0.5" />

                  {/* Continents - Simple shapes */}
                  <ellipse cx="130" cy="70" rx="8" ry="10" fill="#6B8E23" />
                  <ellipse cx="155" cy="85" rx="10" ry="8" fill="#6B8E23" />
                  <ellipse cx="165" cy="70" rx="7" ry="9" fill="#6B8E23" />

                  {/* Globe Stand - Metal pole */}
                  <rect x="145" y="115" width="10" height="30" fill="#A0A0A0" stroke="#707070" strokeWidth="1" />

                  {/* Lamp post on right */}
                  <rect x="220" y="100" width="6" height="50" fill="#8B7355" stroke="#654321" strokeWidth="1" />
                  <path
                    d="M 221 100 Q 240 95 245 105 Q 240 110 221 110 Z"
                    fill="#D4A574"
                    stroke="#8B6F47"
                    strokeWidth="1"
                  />

                  {/* Decorative elements */}
                  <circle cx="170" cy="230" r="3" fill="#C9A961" opacity="0.6" />
                  <circle cx="190" cy="240" r="2" fill="#C9A961" opacity="0.6" />
                  <circle cx="80" cy="235" r="2.5" fill="#C9A961" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Right Section - Steps Card */}
            <div className="flex-1">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                {steps.map((step) => (
                  <div key={step.number} className="mb-8 last:mb-0">
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm font-serif">
                        {step.number}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pt-0.5">
                        <h3 className="font-semibold text-gray-900 text-base mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HeroSection;

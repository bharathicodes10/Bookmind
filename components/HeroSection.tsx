'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Book from '../public/assets/download.png';
import Image from 'next/image';

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
        <div className="rounded-2xl bg-gradient-to-r from-[#c0d2f8] to-[#24a4d7] p-8 sm:p-8 lg:p-10 shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Section */}
            <div className="flex-1 z-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-serif">
                BookMeetsAI
              </h1>
              <p className="text-base sm:text-lg text-gray-900 mb-8 leading-relaxed max-w-md">
               Upload a book. Have a real conversation with the book.
              </p>
              <Button
                className="w-fit bg-white text-gray-900 hover:bg-gray-100 border-0 rounded-lg font-semibold text-base px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer" asChild
              >
                <Link className="text-xl shadow-sm" href="/books/new">
                + Upload your first book
                </Link>
              </Button>
            </div>

            {/* Center Section - Illustration */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full h-auto flex items-start justify-center">
                {/* Vintage Globe and Books Illustration */}
               <Image src={Book} width={400} height={400} alt="book image" className='rounded-md'/>
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

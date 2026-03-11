'use client';

import React from 'react';
import { Plus } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="mb-10 md:mb-16 flex items-center justify-center p-6 py-24">
      {/* Main Card Container */}
      <div className="w-full max-w-7xl h-80 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 h-full">
          {/* Left Section - Text & CTA */}
          <div className="md:col-span-2 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 p-8 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-950 mb-3">
              Your Library
            </h1>
            
            <p className="text-base text-amber-900 mb-6 leading-relaxed font-serif">
              Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
            </p>
            
            <button className="flex items-center justify-center gap-2 bg-amber-900 text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-950 transition-all duration-300 shadow-lg hover:shadow-xl w-fit cursor-pointer">
              <Plus size={20} />
              Add new book
            </button>
          </div>

          {/* Center Section - Illustration */}
          <div className="md:col-span-2 bg-gradient-to-b from-amber-100 to-orange-50 flex items-center justify-center p-6">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Decorative Books Stack */}
              <div className="relative w-24 h-32">
                {/* Book 1 - Dark Brown */}
                <div className="absolute bottom-0 left-0 w-20 h-24 bg-amber-900 rounded-sm shadow-lg transform -rotate-12 opacity-90"></div>
                
                {/* Book 2 - Medium Brown */}
                <div className="absolute bottom-1 left-4 w-20 h-24 bg-amber-800 rounded-sm shadow-lg transform -rotate-6 opacity-95"></div>
                
                {/* Book 3 - Lighter Brown */}
                <div className="absolute bottom-2 left-8 w-20 h-24 bg-amber-700 rounded-sm shadow-lg opacity-100"></div>
                
                {/* Globe - Top Right */}
                <div className="absolute -top-2 right-0 w-12 h-12 bg-gradient-to-b from-amber-600 to-amber-700 rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-amber-500 rounded-full opacity-80"></div>
                </div>
                
                {/* Lamp Post */}
                <div className="absolute -top-1 right-4 w-0.5 h-16 bg-amber-900 opacity-70">
                  <div className="absolute -top-2 right-0 w-5 h-3 bg-amber-700 rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Steps Card */}
          <div className="md:col-span-1 p-6 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full h-fit">
              <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-full flex items-center justify-center font-serif font-bold text-blue-600 text-sm shadow-md">
                  1
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-amber-900 text-sm">
                    Upload PDF
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Add your book file
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-full flex items-center justify-center font-serif font-bold text-blue-600 text-sm shadow-md">
                  2
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-amber-900 text-sm">
                    AI Processing
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    We analyze the content
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-full flex items-center justify-center font-serif font-bold text-blue-600 text-sm shadow-md">
                  3
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-amber-900 text-sm">
                    Voice Chat
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Discuss with AI
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

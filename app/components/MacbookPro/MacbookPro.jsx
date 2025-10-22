'use client';
import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
// import "nicescroll"; // Removed top-level import to avoid SSR issues
import Image from "next/image";
import galleryImage from "../../../public/image.png";
import vector from "../../../public/vector.svg";

const tabs = ["About Me", "Experiences", "Recommended"];

export const MacbookPro = () => {
  const [activeTab, setActiveTab] = useState("About Me");
  const [images, setImages] = useState([galleryImage, galleryImage, galleryImage]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(120);
  const aboutRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      setImageWidth(window.innerWidth >= 768 ? 150 : 120);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = aboutRef.current;
    if (!el) return;

    import("nicescroll").then(() => {
      $(el).niceScroll({
        cursorcolor: "#61656A",
        cursorwidth: "8px",
        background: "#363C43",
        cursorborder: "none",
        cursorborderradius: "12px",
        autohidemode: false,
        cursoropacitymin: 1,
        cursoropacitymax: 1,
        cursorminheight: 20,
        cursorfixedheight: false,
        cursorborderradius: "12px",
        cursorwidth: "8px",
        cursorborderradius: "12px",
        cursorcolor: "#888989",
        cursorbg: "linear-gradient(to bottom, #888989, #4A4E54)",
        boxzoom: false,
        cursorboxshadow: "4px 4px 4.9px 0px rgba(0,0,0,0.25)"
      });
    });

    return () => {
      if ($(el).getNiceScroll) {
        $(el).getNiceScroll().remove();
      }
    };
  }, [activeTab, images, currentIndex, imageWidth]);

  const getTabIndex = (tab) => tabs.indexOf(tab);

  const handleAddImage = () => {
    // Add a new image to the gallery
    setImages([...images, galleryImage]);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 3 ? prev + 1 : prev));
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-b from-[#373E44] to-[#191B1F] p-4 md:p-6 min-w-[768px]">
      <div className="h-full w-full flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 md:gap-8 items-center w-full max-w-full xl:max-w-[1400px] px-4 md:px-6">
          {/* Left Panel - Empty but responsive */}
          <div className="w-full h-[calc(100vh-12rem)] border border-gray-500 rounded-[27px]">
            {/* Keep empty as per requirements */}
          </div>

          {/* Right Panel - Widgets */}
          <div className="w-full flex flex-col gap-4">
            {/* About Me Widget */}
            <article className="w-full bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_rgba(0,0,0,0.4)] px-3 py-4">
              <div className="flex gap-[10px]">
                {/* Sidebar */}
                <div className="flex flex-col items-center gap-[50px] md:gap-[70px] py-2">
                  <Image className="w-5 h-5" alt="Help icon" src={vector} width={20} height={20} />
                  <div className="grid grid-cols-2 gap-[2px] w-5">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-[8px] h-[8px] bg-[#4A4E54] rounded-[2px]"
                        />
                      ))}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex gap-2">
                  {/* Content Area */}
                  <div className="flex-1">
                    {/* Tabs */}
                    <div className="bg-[#171717] rounded-[23px] p-[5px] mb-4 shadow-[inset_0px_4.96px_12.4px_2.48px_rgba(0,0,0,0.25)]">
                      <div className="flex gap-[5px] relative">
                        {/* Sliding active background */}
                        <div 
                          className="absolute h-[40px] rounded-[16px] bg-[#28292F] shadow-[0px_4px_10px_2px_rgba(0,0,0,0.5),inset_0px_-3px_8px_rgba(0,0,0,0.3),inset_0px_1px_0px_rgba(255,255,255,0.1)] transition-all duration-500 ease-in-out"
                          style={{
                            width: `calc((100% - 10px) / 3)`,
                            transform: `translateX(calc(${getTabIndex(activeTab)} * 100% + ${getTabIndex(activeTab)} * 5px))`,
                          }}
                        />
                        {tabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 h-[40px] rounded-[16px] font-medium text-[15px] relative overflow-hidden transition-colors duration-300 ease-in-out z-10 ${
                              activeTab === tab
                                ? "text-white"
                                : "text-[#A3ADB2] hover:text-white group"
                            }`}
                          >
                            {activeTab !== tab && (
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#616161] to-[#616161] opacity-0 group-hover:opacity-15 translate-x-[-100%] group-hover:translate-x-0 transition-all duration-500 ease-out" />
                            )}
                            <span className="relative z-10">{tab}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div ref={aboutRef} className="text-[#969696] text-[14px] leading-[22px] font-normal max-h-[120px] md:max-h-[140px] pr-4 overflow-y-auto scrollbar-dark">
                      {activeTab === "About Me" && (
                        <>
                          Hello! I&apos;m Dave, your sales rep here from Salesforce. I&apos;ve been
                          working at this awesome company for 3 years now.
                          <br />
                          <br />
                          I was born and raised in Albany, NY & have been living in
                          Santa Carla for the past 10 years my wife Tiffany and my 4 year
                          old twin daughters- Emma and Ella. Both of them are just
                          starting school, so my calender is usually blocked between 9-10
                          AM. This is a...
                        </>
                      )}
                      {activeTab === "Experiences" && (
                        <>
                          With over 3 years at Salesforce, I&apos;ve led multiple successful sales campaigns
                          and helped numerous clients transform their business processes.
                          <br />
                          <br />
                          My expertise includes CRM implementation, data analytics, and team leadership.
                          I&apos;ve worked with Fortune 500 companies and startups alike, always
                          focusing on delivering measurable results and building long-term partnerships.
                        </>
                      )}
                      {activeTab === "Recommended" && (
                        <>
                          Based on my experience, I highly recommend Salesforce for any organization
                          looking to streamline their sales and customer relationship management.
                          <br />
                          <br />
                          The platform&apos;s robust features, scalability, and integration capabilities
                          make it an excellent choice for businesses of all sizes. I&apos;ve seen firsthand
                          how it can increase productivity and drive revenue growth.
                        </>
                      )}
                    </div>
                  </div>

                  {/* Scrollbar */}
                  <div className="w-2 flex items-center justify-center py-1">
                    <div className="w-2 h-10 md:h-12 rounded-lg bg-gradient-to-b from-[#61656A] to-[#363C43] shadow-[0_4px_12px_0_rgba(0,0,0,0.25)] opacity-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </article>

            {/* Divider Above Gallery */}
            <div className="w-[90%] mx-auto h-[3px] bg-[#363C43] rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.33)]" />

            {/* Gallery Widget */}
            <article className="w-full bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_rgba(0,0,0,0.4)] px-3 py-4">
              <div className="flex gap-[10px]">
                {/* Sidebar */}
                <div className="flex flex-col items-center gap-[50px] md:gap-[70px] py-2">
                  <Image className="w-5 h-5" alt="Help icon" src={vector} width={20} height={20} />
                  <div className="grid grid-cols-2 gap-[2px] w-5">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-[8px] h-[8px] bg-[#4A4E54] rounded-[2px]"
                        />
                      ))}
                  </div>
                </div>

                {/* Gallery Content */}
                <div className="flex-1 pl-2 min-w-0">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5 gap-3">
                    <div className="bg-[#171717] rounded-[20px] px-4 md:px-5 py-1.5 md:py-2 shadow-[inset_0px_4px_10px_2px_rgba(0,0,0,0.25)] flex-shrink-0">
                      <h2 className="text-white text-[16px] font-semibold">Gallery</h2>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Add Image Button */}
                      <button
                        onClick={handleAddImage}
                        className="px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-[#FFFFFF08] text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-[0px_3.26px_3.26px_rgba(255,255,255,0.15)_inset,0px_0px_48.91px_rgba(255,255,255,0.05)_inset,9px_10px_7.1px_rgba(0,0,0,0.4),-0.5px_-0.5px_6.9px_rgba(255,255,255,0.1)] hover:bg-[#FFFFFF12] transition-all whitespace-nowrap"
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        ADD IMAGE
                      </button>

                      {/* Navigation Arrows */}
                      <div className="flex gap-2">
                        <button 
                          onClick={handlePrevious}
                          disabled={currentIndex === 0}
                          className="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full bg-gradient-to-b from-[#303439] to-[#161718] shadow-[4px_5px_30px_5px_rgba(16,17,19,0.5),-5px_-3px_30px_-10px_rgba(149,190,230,0.3)] flex items-center justify-center hover:shadow-[4px_5px_30px_5px_rgba(16,17,19,0.7),-5px_-3px_30px_-10px_rgba(149,190,230,0.5)] transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12L6 8L10 4" stroke="#6F787C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button 
                          onClick={handleNext}
                          disabled={currentIndex >= images.length - 3}
                          className="w-[32px] h-[32px] md:w-[38px] md:h-[38px] rounded-full bg-gradient-to-b from-[#303439] to-[#161718] shadow-[4px_5px_30px_5px_rgba(16,17,19,0.5),-5px_-3px_30px_-10px_rgba(149,190,230,0.3)] flex items-center justify-center hover:shadow-[4px_5px_30px_5px_rgba(16,17,19,0.7),-5px_-3px_30px_-10px_rgba(149,190,230,0.5)] transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#6F787C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image Grid */}
                  <div className="flex gap-3 overflow-hidden pb-1 pt-1">
                    <div 
                      className="flex gap-3 transition-transform duration-500 ease-in-out py-3 px-1"
                      style={{
                        transform: `translateX(-${currentIndex * (imageWidth + 12)}px)`
                      }}
                    >
                      {images.map((src, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 rounded-[20px] overflow-visible group cursor-pointer"
                          style={{ width: imageWidth, height: imageWidth }}
                        >
                          <div className="w-full h-full rounded-[20px] overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-5deg] group-hover:shadow-2xl">
                            <Image
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              alt={`Gallery ${i + 1}`}
                              src={src}
                              width={imageWidth}
                              height={imageWidth}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Divider Below Gallery */}
            <div className="w-[90%] mx-auto h-[3px] bg-[#363C43] rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.33)]" />
          </div>
        </div>
      </div>
    </main>
  );
};

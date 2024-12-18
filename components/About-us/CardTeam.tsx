"use client";

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Check } from 'lucide-react'
import Image from "next/image";
import SocialMediaCard from "./SocialMediaCard";

export default function CardTeam() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className=" h-auto   grid w-auto auto-rows-fr grid-cols-1 lg:gap-1 md:gap-8 gap-3  lg:grid-cols-2 md:grid-cols-1">
      <div className="    w-auto h-[500px]  flex items-center justify-center p-6">
        <div className="relative lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] w-[200px] h-[200px]">
          {/* Main circular container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative arc */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-[6px] -translate-x-1/2 lg:w-[290px] md:w-[290px] w-[240px]  lg:h-48 md:h-48 h-26 bg-yellow-300 rounded-[100%] z-0"
            />

            {/* Main content container */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-xl aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Center Image Placeholder */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className=" lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] w-[250px] h-[250px]   inset-8 rounded-full flex items-center justify-center "
                >
                  <Image
                    src="/assets/lyminh.png"
                    alt="Team Member Image"
                    width={150}
                    height={150}
                    className=" object-contain w-full h-full  lg:-mt-[220px] lg:-ml-[120px] md:-mt-[220px] md:-ml-[120px] -mt-[170px] -ml-[100px] "
                  />
                </motion.div>

                {/* AI Content Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute -left-[120px] top-1/4 -translate-x-1/2 bg-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <span className="font-medium">Phy Lymann</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Automation Tools Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute -left-[150px] top-1/2 bg-pink-500 text-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Back-end Developer</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                

                {/* Stats Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute lg:-ml-[24px] md:-ml-[24px] -ml-[78px]  -bottom-[60px] w-[300px]  text-white rounded-xl "
                    >
                      <SocialMediaCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "url(#goo)" }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              d="M 100 100 Q 150 150 200 100"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Filter for smooth curves */}
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="    w-auto h-[500px]  flex items-center justify-center p-6">
        <div className="relative lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] w-[200px] h-[200px]">
          {/* Main circular container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative arc */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-[6px] -translate-x-1/2 lg:w-[290px] md:w-[290px] w-[240px]  lg:h-48 md:h-48 h-26 bg-yellow-300 rounded-[100%] z-0"
            />

            {/* Main content container */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-xl aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Center Image Placeholder */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className=" lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] w-[250px] h-[250px]   inset-8 rounded-full flex items-center justify-center "
                >
                  <Image
                    src="/assets/roza.png"
                    alt="Team Member Image"
                    width={150}
                    height={150}
                    className=" object-contain w-full h-full  lg:-mt-[220px] lg:-ml-[120px] md:-mt-[220px] md:-ml-[120px] -mt-[170px] -ml-[100px] "
                  />
                </motion.div>

                {/* AI Content Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute -left-[120px] top-1/4 -translate-x-1/2 bg-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <span className="font-medium">Phy Lymann</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Automation Tools Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute -left-[150px] top-1/2 bg-pink-500 text-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Back-end Developer</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                

                {/* Stats Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute lg:-ml-[24px] md:-ml-[24px] -ml-[78px]  -bottom-[60px] w-[300px]  text-white rounded-xl "
                    >
                      <SocialMediaCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "url(#goo)" }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              d="M 100 100 Q 150 150 200 100"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Filter for smooth curves */}
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="    w-auto h-[500px]  flex items-center justify-center p-6">
        <div className="relative lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] w-[200px] h-[200px]">
          {/* Main circular container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative arc */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-[6px] -translate-x-1/2 lg:w-[290px] md:w-[290px] w-[240px]  lg:h-48 md:h-48 h-26 bg-yellow-300 rounded-[100%] z-0"
            />

            {/* Main content container */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-xl aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Center Image Placeholder */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className=" lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] w-[250px] h-[250px]   inset-8 rounded-full flex items-center justify-center "
                >
                  <Image
                    src="/assets/chhumhy.png"
                    alt="Team Member Image"
                    width={150}
                    height={150}
                    className=" object-contain w-full h-full  lg:-mt-[220px] lg:-ml-[120px] md:-mt-[220px] md:-ml-[120px] -mt-[170px] -ml-[100px] "
                  />
                </motion.div>

                {/* AI Content Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute -left-[120px] top-1/4 -translate-x-1/2 bg-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <span className="font-medium">Phy Lymann</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Automation Tools Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute -left-[150px] top-1/2 bg-pink-500 text-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Back-end Developer</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                

                {/* Stats Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute lg:-ml-[24px] md:-ml-[24px] -ml-[78px]  -bottom-[60px] w-[300px]  text-white rounded-xl "
                    >
                      <SocialMediaCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "url(#goo)" }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              d="M 100 100 Q 150 150 200 100"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Filter for smooth curves */}
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="    w-auto h-[500px]  flex items-center justify-center p-6">
        <div className="relative lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] w-[200px] h-[200px]">
          {/* Main circular container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative arc */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-[6px] -translate-x-1/2 lg:w-[290px] md:w-[290px] w-[240px]  lg:h-48 md:h-48 h-26 bg-yellow-300 rounded-[100%] z-0"
            />

            {/* Main content container */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-xl aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Center Image Placeholder */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className=" lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] w-[250px] h-[250px]   inset-8 rounded-full flex items-center justify-center "
                >
                  <Image
                    src="/assets/seamey.png"
                    alt="Team Member Image"
                    width={150}
                    height={150}
                    className=" object-contain w-full h-full  lg:-mt-[220px] lg:-ml-[120px] md:-mt-[220px] md:-ml-[120px] -mt-[170px] -ml-[100px] "
                  />
                </motion.div>

                {/* AI Content Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute -left-[120px] top-1/4 -translate-x-1/2 bg-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <span className="font-medium">Phy Lymann</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Automation Tools Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute -left-[150px] top-1/2 bg-pink-500 text-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Back-end Developer</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                

                {/* Stats Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute lg:-ml-[24px] md:-ml-[24px] -ml-[78px]  -bottom-[60px] w-[300px]  text-white rounded-xl "
                    >
                      <SocialMediaCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "url(#goo)" }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              d="M 100 100 Q 150 150 200 100"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Filter for smooth curves */}
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="    w-auto h-[500px]  flex items-center justify-center p-6">
        <div className="relative lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] w-[200px] h-[200px]">
          {/* Main circular container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative arc */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-[6px] -translate-x-1/2 lg:w-[290px] md:w-[290px] w-[240px]  lg:h-48 md:h-48 h-26 bg-yellow-300 rounded-[100%] z-0"
            />

            {/* Main content container */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-xl aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Center Image Placeholder */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className=" lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] w-[250px] h-[250px]   inset-8 rounded-full flex items-center justify-center "
                >
                  <Image
                    src="/assets/sovanarith.png"
                    alt="Team Member Image"
                    width={150}
                    height={150}
                    className=" object-contain w-full h-full  lg:-mt-[220px] lg:-ml-[120px] md:-mt-[220px] md:-ml-[120px] -mt-[170px] -ml-[100px] "
                  />
                </motion.div>

                {/* AI Content Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute -left-[120px] top-1/4 -translate-x-1/2 bg-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <span className="font-medium">Phy Lymann</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Automation Tools Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute -left-[150px] top-1/2 bg-pink-500 text-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Back-end Developer</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                

                {/* Stats Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute lg:-ml-[24px] md:-ml-[24px] -ml-[78px]  -bottom-[60px] w-[300px]  text-white rounded-xl "
                    >
                      <SocialMediaCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "url(#goo)" }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              d="M 100 100 Q 150 150 200 100"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Filter for smooth curves */}
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="    w-auto h-[500px]  flex items-center justify-center p-6">
        <div className="relative lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] w-[200px] h-[200px]">
          {/* Main circular container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Decorative arc */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-0 left-[6px] -translate-x-1/2 lg:w-[290px] md:w-[290px] w-[240px]  lg:h-48 md:h-48 h-26 bg-yellow-300 rounded-[100%] z-0"
            />

            {/* Main content container */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-xl aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Center Image Placeholder */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className=" lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] w-[250px] h-[250px]   inset-8 rounded-full flex items-center justify-center "
                >
                  <Image
                    src="/assets/kimla.png"
                    alt="Team Member Image"
                    width={150}
                    height={150}
                    className=" object-contain w-full h-full  lg:-mt-[220px] lg:-ml-[120px] md:-mt-[220px] md:-ml-[120px] -mt-[170px] -ml-[100px] "
                  />
                </motion.div>

                {/* AI Content Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="absolute -left-[120px] top-1/4 -translate-x-1/2 bg-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <span className="font-medium">Phy Lymann</span>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-yellow-400 rounded-full p-1"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Automation Tools Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      className="absolute -left-[150px] top-1/2 bg-pink-500 text-white rounded-full shadow-lg py-2 px-4 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="font-medium">Back-end Developer</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                

                {/* Stats Badge */}
                <AnimatePresence>
                  {isVisible && (
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute lg:-ml-[24px] md:-ml-[24px] -ml-[78px]  -bottom-[60px] w-[300px]  text-white rounded-xl "
                    >
                      <SocialMediaCard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Decorative Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ filter: "url(#goo)" }}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
              d="M 100 100 Q 150 150 200 100"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Filter for smooth curves */}
          <svg width="0" height="0">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

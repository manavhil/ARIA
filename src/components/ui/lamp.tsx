"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex flex-col items-center overflow-hidden bg-black w-full", className)}>
      {/* Lamp beams — fixed height, doesn't push content */}
      <div className="relative flex w-full h-48 items-end justify-center isolate z-0 pointer-events-none">
        {/* Left cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto right-1/2 h-40 overflow-visible w-[26rem] bg-gradient-conic from-orange-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-black h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-36 h-full left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "12rem" }}
          whileInView={{ opacity: 1, width: "26rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))` }}
          className="absolute inset-auto left-1/2 h-40 w-[26rem] bg-gradient-conic from-transparent via-transparent to-orange-500 [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-36 h-full right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-black h-32 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Bottom black fade */}
        <div className="absolute bottom-0 h-24 w-full scale-x-150 bg-black blur-2xl z-10" />

        {/* Central soft glow */}
        <div className="absolute bottom-8 z-10 h-24 w-[22rem] rounded-full bg-orange-500 opacity-30 blur-3xl" />

        {/* Inner glow */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "14rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-10 z-20 h-24 rounded-full bg-amber-400 blur-2xl opacity-60"
        />

        {/* Lamp bar line */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "26rem" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 z-30 h-0.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600"
        />
      </div>

      {/* Content sits naturally below the lamp */}
      <div className="relative z-10 w-full flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

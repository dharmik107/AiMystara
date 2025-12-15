import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  // Made children optional to fix "Property 'children' is missing" errors in strict mode
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  className?: string;
}

// Typed as React.FC to support JSX intrinsic attributes like 'key'
export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", delay = 0.25, className = "" }) => {
  // Added HTMLDivElement type to useRef
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} className={`${className}`} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }} // Apple-esque bezier
      >
        {children}
      </motion.div>
    </div>
  );
};
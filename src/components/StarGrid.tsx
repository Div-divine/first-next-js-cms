"use client"
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import usePrefersReducedMotion from "@/hooks/usePreferedReducedMotion"

export default function StarGrid() {
  const grid = [14, 30] as const;

  const container = useRef(null);
  const preferesReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {

    if(preferesReducedMotion){
      gsap.set(container.current, {opacity: 1});
      gsap.set(".star-grid-item", {opacity: .2, scale: 1});
      return ;
    }

    gsap.set(".star-grid-item", { opacity: 0, transformOrigin: "center", color: "#FFF" });
    gsap.set(container.current, { opacity: 1 });

    const tl = gsap.timeline();

    // Entrance animation
    tl.to(".star-grid-item", {
      keyframes: [
        {
          opacity: 0,
          duration: 0
        },
        {
          opacity: 0.4,
          rotate: "+=180",
          color: "#FFD057",
          scale: 3,
          duration: 0.6,
          stagger: {
            grid: grid,
            from: "center",
            amount: 2
          }
        },
        {
          opacity: 0.2,
          rotate: "+=180",
          color: "#FFF",
          delay: -2,
          scale: 1,
          duration: 0.6,
          stagger: {
            grid: grid,
            from: "center",
            amount: 3
          }
        }
      ]
    })

    // Loop animation

    tl.to(".star-grid-item", {
      delay: 8,
      repeat: -1,
      repeatDelay: 8,

      keyframes: [
        {
          opacity: 0.4,
          rotate: "+=180",
          color: "#FFD057",
          scale: 3,
          duration: 0.6,
          stagger: {
            grid: grid,
            from: "center",
            amount: 2
          }
        },
        {
          opacity: 0.2,
          rotate: "+=180",
          color: "#FFF",
          delay: -2,
          scale: 1,
          duration: 0.6,
          stagger: {
            grid: grid,
            from: "center",
            amount: 3
          }
        }
      ]
    })

  }, { scope: container })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 935 425"
      className="absolute -top-14 -z-10 opacity-0"
      id="star-grid"
      ref={container}
      style={{
        maskImage: "linear-gradient(black, transparent)",
      }}
    >
      <g className="star-grid-group">
        {[...Array(grid[0])].map((_, i) => {
          return [...Array(grid[1])].map((_, j) => {
            return (
              <path
                key={`${i}-${j}`}  // Ensure unique keys
                fill="currentColor"
                opacity=".2"
                className="star-grid-item"
                d={`M${j * 32},${i * 32 + 10}a0.14,0.14,0,0,1,0.26,0l0.14,0.36a2.132,2.132,0,0,0,1.27,1.27l0.37,0.14a0.14,0.14,0,0,1,0,0.26l-0.37,0.14a2.132,2.132,0,0,0,-1.27,1.27l-0.14,0.37a0.14,0.14,0,0,1,-0.26,0l-0.14,-0.37a2.132,2.132,0,0,0,-1.27,-1.27l-0.36,-0.14a0.14,0.14,0,0,1,0,-0.26l0.37,-0.14a2.132,2.132,0,0,0,1.26,-1.27l0.14,-0.36z`}
              />
            );
          });
        })}
      </g>
    </svg>
  );
}

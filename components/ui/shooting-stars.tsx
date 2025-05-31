"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  scale: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offsetX = Math.random() * window.innerWidth;
  const offsetY = Math.random() * window.innerHeight;

  switch (side) {
    case 0:
      return { x: offsetX, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offsetY, angle: 135 };
    case 2:
      return { x: offsetX, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offsetY, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 500,
  maxSpeed = 800,
  minDelay = 1500,
  maxDelay = 3000,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 2,
  className,
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const lastTimeRef = useRef<number | null>(null);

  // Add new stars periodically
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const addStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

      setStars((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), x, y, angle, speed, scale: 1 },
      ]);

      const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutId = setTimeout(addStar, nextDelay);
    };

    addStar();

    return () => clearTimeout(timeoutId);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  // Move all stars
  useEffect(() => {
    const update = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      setStars((prevStars) =>
        prevStars
          .map((star) => {
            const dx =
              star.speed * delta * Math.cos((star.angle * Math.PI) / 180);
            const dy =
              star.speed * delta * Math.sin((star.angle * Math.PI) / 180);
            const newX = star.x + dx;
            const newY = star.y + dy;
            const newScale = star.scale + delta * 1.5; // gradual size increase
            return { ...star, x: newX, y: newY, scale: newScale };
          })
          .filter(
            (star) =>
              star.x > -100 &&
              star.x < window.innerWidth + 100 &&
              star.y > -100 &&
              star.y < window.innerHeight + 100
          )
      );

      requestAnimationFrame(update);
    };

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      className={cn(
        "w-full h-full absolute inset-0 pointer-events-none",
        className
      )}
    >
      {stars.map((star) => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ))}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

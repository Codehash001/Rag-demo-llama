"use client"

import React, { useEffect, useState, useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  speed: number;
  progress: number;
}

const SpaceBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  const nebulae = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.1)`,
    }));
  }, []);

  useEffect(() => {
    const generateStars = (): void => {
      const newStars: Star[] = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random(),
        speed: Math.random() * 0.05 + 0.01,
      }));
      setStars(newStars);
    };

    generateStars();

    const starAnimation = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          opacity: Math.abs(Math.sin((Date.now() * star.speed) / 1000)),
        }))
      );
    }, 50);

    const shootingStarAnimation = setInterval(() => {
      setShootingStars((prevShootingStars) => {
        const updatedShootingStars = prevShootingStars
          .map((star) => ({
            ...star,
            progress: star.progress + star.speed,
          }))
          .filter((star) => star.progress < 1);

        if (Math.random() < 0.1 && updatedShootingStars.length < 5) {
          updatedShootingStars.push({
            id: Date.now(),
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            endX: Math.random() * 100,
            endY: Math.random() * 100,
            speed: Math.random() * 0.02 + 0.01,
            progress: 0,
          });
        }

        return updatedShootingStars;
      });
    }, 50);

    return () => {
      clearInterval(starAnimation);
      clearInterval(shootingStarAnimation);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-900 to-blue-900 overflow-hidden">
      {nebulae.map((nebula) => (
        <div
          key={nebula.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}%`,
            height: `${nebula.size}%`,
            backgroundColor: nebula.color,
            filter: 'blur(30px)',
          }}
        />
      ))}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      ))}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.startX + (star.endX - star.startX) * star.progress}%`,
            top: `${star.startY + (star.endY - star.startY) * star.progress}%`,
            width: '2px',
            height: '2px',
            boxShadow: '0 0 4px 2px white',
            opacity: 1 - star.progress,
          }}
        />
      ))}
    </div>
  );
};

export default SpaceBackground;
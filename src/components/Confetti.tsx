// Simple confetti burst using canvas
import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const colors = ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#f87171', '#a78bfa'];

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}


const Confetti: React.FC<ConfettiProps> = ({ trigger, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Helper to detect mobile devices
  function isMobile() {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|BlackBerry/i.test(navigator.userAgent);
  }

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    // Reduce confetti on mobile
    const isMobileDevice = isMobile();
    const PARTICLE_COUNT = isMobileDevice ? 10 : 32;
    const FRAME_COUNT = isMobileDevice ? 35 : 70;

    const confetti = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: canvas.width / dpr / 2,
      y: canvas.height / dpr / 2,
      r: randomBetween(4, 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: randomBetween(0, 2 * Math.PI),
      speed: randomBetween(3, 7),
      gravity: 0.15 + Math.random() * 0.1,
      alpha: 1,
    }));

    let frame = 0;
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((c) => {
        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed + c.gravity * frame;
        c.alpha -= 0.012;
        if (!ctx) return;
        ctx.globalAlpha = Math.max(c.alpha, 0);
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
      });
      frame++;
      if (frame < FRAME_COUNT) {
        animationRef.current = requestAnimationFrame(draw);
      } else {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onComplete) onComplete();
      }
    }
    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [trigger, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
      aria-hidden="true"
    />
  );
};

export default Confetti;

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

    const confetti = Array.from({ length: 32 }).map(() => ({
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
      if (frame < 70) {
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

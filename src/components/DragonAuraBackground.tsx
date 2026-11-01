import React, { useEffect, useRef } from 'react';

export const DragonAuraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Golden Dragon & Phoenix Energy Ribbons
    const ribbons = [
      { color: 'rgba(212, 175, 55, 0.18)', speed: 0.0008, waveLength: 0.0012, amp: 90, offset: 0, width: 3 },
      { color: 'rgba(201, 164, 92, 0.14)', speed: 0.0012, waveLength: 0.0018, amp: 120, offset: Math.PI / 3, width: 2.5 },
      { color: 'rgba(52, 90, 72, 0.22)', speed: 0.0007, waveLength: 0.0010, amp: 80, offset: Math.PI / 2, width: 4 },
      { color: 'rgba(223, 186, 116, 0.12)', speed: 0.0015, waveLength: 0.0022, amp: 140, offset: Math.PI, width: 2 },
      { color: 'rgba(201, 164, 92, 0.08)', speed: 0.0009, waveLength: 0.0015, amp: 110, offset: Math.PI * 1.5, width: 3.5 },
    ];

    // Floating Golden Embers & Sparks
    const particleCount = width < 768 ? 24 : 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.6 + 0.25), // floating upward
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
      maxAlpha: Math.random() * 0.7 + 0.3,
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient glow spots
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      gradient.addColorStop(0, 'rgba(38, 59, 50, 0.15)');
      gradient.addColorStop(0.5, 'rgba(201, 164, 92, 0.04)');
      gradient.addColorStop(1, 'rgba(18, 18, 18, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Flowing Dragon & Phoenix Ribbons
      ribbons.forEach((ribbon, idx) => {
        ctx.beginPath();
        ctx.lineWidth = ribbon.width;
        ctx.strokeStyle = ribbon.color;
        ctx.shadowColor = '#C9A45C';
        ctx.shadowBlur = 12;

        const baseHeight = height * (0.2 + idx * 0.15);
        for (let x = 0; x <= width; x += 15) {
          const y =
            baseHeight +
            Math.sin(x * ribbon.waveLength + time * ribbon.speed + ribbon.offset) * ribbon.amp +
            Math.cos(x * ribbon.waveLength * 0.7 + time * (ribbon.speed * 0.8)) * (ribbon.amp * 0.4);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Reset shadow for particles
      ctx.shadowBlur = 0;

      // Draw Golden Embers
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Pulse alpha
        p.alpha += Math.sin(time * p.pulse) * 0.015;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;

        // Wrap around edges
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.shadowColor = 'rgba(201, 164, 92, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full opacity-70 transition-opacity duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

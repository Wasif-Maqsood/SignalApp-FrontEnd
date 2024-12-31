import React, { useEffect, useRef } from 'react';
import './css/NetworkAnimation.css';

const NetworkAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      ctx.scale(scale, scale);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      brightness: number;
      pulseDirection: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 2 + 1;
        this.brightness = Math.random();
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        if (this.y > window.innerHeight) this.y = 0;

        // Pulsing effect
        this.brightness += 0.01 * this.pulseDirection;
        if (this.brightness > 1 || this.brightness < 0.3) {
          this.pulseDirection *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${this.brightness})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
      }
    }

    const createParticles = () => {
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const drawLines = () => {
      if (!ctx) return;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connecting lines
      ctx.shadowBlur = 0; // Disable shadow for lines
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-animation" />;
};

export default NetworkAnimation;

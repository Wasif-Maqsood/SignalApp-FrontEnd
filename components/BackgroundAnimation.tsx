import React, { useEffect, useRef } from 'react';
import './css/BackgroundAnimation.css';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let gradientOpacity = 0;
    let fadeIn = true;

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
      color: string;
      originalX: number;
      originalY: number;
      force: number;
      angle: number;
      distance: number;
      drag: number;
      random: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 2 + 0.1;
        this.color = '#7B3FE4';
        this.force = 0;
        this.angle = 0;
        this.distance = 0;
        this.drag = 0.95;
        this.random = Math.random();
      }

      update(mouseX: number, mouseY: number) {
        // Calculate distance from mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.distance = distance;

        // Calculate force and angle
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        this.force = force < 0 ? 0 : force;
        this.angle = Math.atan2(dy, dx);

        // Apply force
        if (distance < maxDistance) {
          this.vx -= Math.cos(this.angle) * this.force * 0.2;
          this.vy -= Math.sin(this.angle) * this.force * 0.2;
        }

        // Spring back to original position
        const dxOrig = this.originalX - this.x;
        const dyOrig = this.originalY - this.y;
        this.vx += dxOrig * 0.03;
        this.vy += dyOrig * 0.03;

        // Update position
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      const numParticles = (window.innerWidth * window.innerHeight) / 15000;
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particles.push(new Particle(x, y));
      }
    };

    const drawGradient = () => {
      const gradient1 = ctx.createRadialGradient(
        window.innerWidth * 0.1,
        window.innerHeight * 0.1,
        0,
        window.innerWidth * 0.1,
        window.innerHeight * 0.1,
        window.innerWidth * 0.5
      );
      gradient1.addColorStop(0, `rgba(123, 63, 228, ${0.1 * gradientOpacity})`);
      gradient1.addColorStop(1, 'rgba(123, 63, 228, 0)');

      const gradient2 = ctx.createRadialGradient(
        window.innerWidth * 0.9,
        window.innerHeight * 0.9,
        0,
        window.innerWidth * 0.9,
        window.innerHeight * 0.9,
        window.innerWidth * 0.5
      );
      gradient2.addColorStop(0, `rgba(168, 85, 247, ${0.1 * gradientOpacity})`);
      gradient2.addColorStop(1, 'rgba(168, 85, 247, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Update gradient opacity
      if (fadeIn) {
        gradientOpacity += 0.005;
        if (gradientOpacity >= 1) fadeIn = false;
      } else {
        gradientOpacity -= 0.005;
        if (gradientOpacity <= 0) fadeIn = true;
      }
    };

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Smooth mouse movement
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      // Draw gradient background
      drawGradient();

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY);
        particle.draw(ctx);
      });

      // Draw connections
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123, 63, 228, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-animation" />;
};

export default BackgroundAnimation;

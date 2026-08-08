import React, { useRef, useState, useEffect } from 'react';
import { RotateCw, Sparkles } from 'lucide-react';

interface Props {
  accentColor?: string;
}

export const InteractiveProduct3D: React.FC<Props> = ({ accentColor = '#d97706' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 15, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    let animationFrameId: number;
    let localY = rotation.y;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (autoRotate && !isDragging) {
        localY += 0.8;
      }

      const rotRadY = (localY * Math.PI) / 180;
      const rotRadX = (rotation.x * Math.PI) / 180;

      // Draw background dynamic glow aura
      const gradient = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 220);
      gradient.addColorStop(0, `${accentColor}33`);
      gradient.addColorStop(0.6, `${accentColor}0a`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 220, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Wireframe / Metallic Audiophile Headphones
      ctx.save();
      ctx.translate(centerX, centerY);

      // Headband Arc
      ctx.beginPath();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 6;
      ctx.arc(0, -10, 110, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Outer Ring Band Accent
      ctx.beginPath();
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2.5;
      ctx.arc(0, -10, 118, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();

      // Compute 3D ear cup positions
      const cosY = Math.cos(rotRadY);
      const sinY = Math.sin(rotRadY);

      const offsetRadius = 110;
      const cup1X = cosY * offsetRadius;
      const cup1Z = sinY * offsetRadius;
      const cup2X = -cosY * offsetRadius;
      const cup2Z = -sinY * offsetRadius;

      // Draw Rear Cup first for depth
      const cups = [
        { x: cup1X, z: cup1Z, label: 'L' },
        { x: cup2X, z: cup2Z, label: 'R' }
      ].sort((a, b) => a.z - b.z);

      cups.forEach((cup) => {
        const scale = 0.85 + (cup.z / offsetRadius) * 0.25;
        const cupY = Math.sin(rotRadX) * 15 + 40;

        ctx.save();
        ctx.translate(cup.x, cupY);
        ctx.scale(scale, scale);

        // Cup Body Outer Ring
        ctx.beginPath();
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.ellipse(0, 0, 48, 62, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner Acoustic Chamber
        ctx.beginPath();
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.ellipse(0, 0, 36, 48, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Metallic Center Grille Pattern
        ctx.beginPath();
        ctx.fillStyle = accentColor;
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cup.label, 0, 1);

        ctx.restore();
      });

      ctx.restore();

      // Floating particles around object
      const time = Date.now() * 0.002;
      for (let i = 0; i < 8; i++) {
        const pAngle = time + (i * Math.PI) / 4;
        const px = centerX + Math.cos(pAngle) * (140 + Math.sin(time + i) * 15);
        const py = centerY + Math.sin(pAngle * 0.8) * (80 + Math.cos(time + i) * 10);

        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [rotation, isDragging, autoRotate, accentColor]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation((prev) => ({
      x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.5)),
      y: prev.y + deltaX * 0.8
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative group flex flex-col items-center justify-center">
      <div
        className="cursor-grab active:cursor-grabbing relative border border-slate-800/80 rounded-3xl bg-slate-900/60 backdrop-blur-xl p-4 shadow-2xl overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Interactive 3D Canvas */}
        <canvas
          ref={canvasRef}
          width={500}
          height={380}
          className="max-w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        />

        {/* Floating badge label */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>3D Interactive Stage</span>
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-slate-300 animate-spin" />
          <span>Click & Drag to Rotate</span>
        </div>
      </div>
    </div>
  );
};
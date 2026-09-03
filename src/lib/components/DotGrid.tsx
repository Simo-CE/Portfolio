"use client";

import { useEffect, useRef } from "react";

const DOT_SPACING = 20;
const DOT_RADIUS = 1;
const INFLUENCE_RADIUS = 80;
const DISPLACEMENT_STRENGTH = 6;
const SPRING_FACTOR = 0.08;
const RETURN_FACTOR = 0.92;
const VELOCITY_DECAY = 0.95;
const MIN_SPEED = 0.5;
const MAX_SPEED_FACTOR = 10;
const DOT_COLOR = "#303030";

interface Dot {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

interface GridState {
  dots: Dot[];
  mouseX: number;
  mouseY: number;
  prevMouseX: number;
  prevMouseY: number;
  velocityX: number;
  velocityY: number;
  isVisible: boolean;
  rafId: number;
  isAnimating: boolean;
  dpr: number;
  viewW: number;
  viewH: number;
}

function createGridState(): GridState {
  return {
    dots: [],
    mouseX: -1000,
    mouseY: -1000,
    prevMouseX: -1000,
    prevMouseY: -1000,
    velocityX: 0,
    velocityY: 0,
    isVisible: true,
    rafId: 0,
    isAnimating: false,
    dpr: 1,
    viewW: 0,
    viewH: 0,
  };
}

function sizeCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: GridState
) {
  state.dpr = window.devicePixelRatio || 1;
  state.viewW = window.innerWidth;
  state.viewH = window.innerHeight;
  canvas.width = state.viewW * state.dpr;
  canvas.height = state.viewH * state.dpr;
  canvas.style.width = `${state.viewW}px`;
  canvas.style.height = `${state.viewH}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

function buildDots(state: GridState) {
  const dots: Dot[] = [];
  const half = DOT_SPACING / 2;
  for (let x = half; x < state.viewW; x += DOT_SPACING) {
    for (let y = half; y < state.viewH; y += DOT_SPACING) {
      dots.push({ x, y, offsetX: 0, offsetY: 0 });
    }
  }
  state.dots = dots;
}

function drawFrame(ctx: CanvasRenderingContext2D, state: GridState) {
  ctx.clearRect(0, 0, state.viewW * state.dpr, state.viewH * state.dpr);
  ctx.fillStyle = DOT_COLOR;
  for (const dot of state.dots) {
    ctx.beginPath();
    ctx.arc(
      dot.x + dot.offsetX,
      dot.y + dot.offsetY,
      DOT_RADIUS,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}

function stepPhysics(state: GridState): boolean {
  const vx = state.velocityX;
  const vy = state.velocityY;
  const speed = Math.sqrt(vx * vx + vy * vy);
  const speedFactor = Math.min(speed / MAX_SPEED_FACTOR, 1);
  const radiusSq = INFLUENCE_RADIUS * INFLUENCE_RADIUS;
  let anyDisplaced = false;

  for (const dot of state.dots) {
    const dx = dot.x - state.mouseX;
    const dy = dot.y - state.mouseY;
    const distSq = dx * dx + dy * dy;

    if (distSq < radiusSq && speed > MIN_SPEED) {
      const dist = Math.sqrt(distSq);
      const influence = Math.pow(1 - dist / INFLUENCE_RADIUS, 2);
      const targetX = vx * influence * DISPLACEMENT_STRENGTH * speedFactor;
      const targetY = vy * influence * DISPLACEMENT_STRENGTH * speedFactor;
      dot.offsetX += (targetX - dot.offsetX) * SPRING_FACTOR;
      dot.offsetY += (targetY - dot.offsetY) * SPRING_FACTOR;
    } else {
      dot.offsetX *= RETURN_FACTOR;
      dot.offsetY *= RETURN_FACTOR;
      if (Math.abs(dot.offsetX) < 0.01) dot.offsetX = 0;
      if (Math.abs(dot.offsetY) < 0.01) dot.offsetY = 0;
    }

    if (dot.offsetX !== 0 || dot.offsetY !== 0) {
      anyDisplaced = true;
    }
  }

  state.velocityX *= VELOCITY_DECAY;
  state.velocityY *= VELOCITY_DECAY;

  return anyDisplaced;
}

function tick(ctx: CanvasRenderingContext2D, state: GridState) {
  if (!state.isVisible) {
    state.rafId = requestAnimationFrame(() => tick(ctx, state));
    return;
  }

  const anyDisplaced = stepPhysics(state);
  drawFrame(ctx, state);

  if (
    anyDisplaced ||
    Math.abs(state.velocityX) > 0.1 ||
    Math.abs(state.velocityY) > 0.1
  ) {
    state.rafId = requestAnimationFrame(() => tick(ctx, state));
  } else {
    state.isAnimating = false;
  }
}

function ensureAnimating(ctx: CanvasRenderingContext2D, state: GridState) {
  if (!state.isAnimating) {
    state.isAnimating = true;
    state.rafId = requestAnimationFrame(() => tick(ctx, state));
  }
}

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;
    const isInteractive = !prefersReducedMotion && !isTouchDevice;

    const state = createGridState();

    sizeCanvas(canvas, ctx, state);
    buildDots(state);
    drawFrame(ctx, state);

    const handleMouseMove = (e: MouseEvent) => {
      state.prevMouseX = state.mouseX;
      state.prevMouseY = state.mouseY;
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      state.velocityX = state.mouseX - state.prevMouseX;
      state.velocityY = state.mouseY - state.prevMouseY;
      ensureAnimating(ctx, state);
    };

    const handleMouseLeave = () => {
      state.mouseX = -1000;
      state.mouseY = -1000;
      state.velocityX = 0;
      state.velocityY = 0;
    };

    const handleVisibilityChange = () => {
      state.isVisible = !document.hidden;
      if (document.hidden) handleMouseLeave();
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeCanvas(canvas, ctx, state);
        buildDots(state);
        drawFrame(ctx, state);
      }, 100);
    };

    if (isInteractive) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(state.rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none dot-grid-canvas"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "motion/react";

type CursorState = "default" | "interactive" | "sticky";

const DOT_SIZE = 6;
const RING_SIZE = 36;
const INTERACTIVE_RING_SIZE = 50;

const tightSpring: SpringOptions = { damping: 28, stiffness: 600, mass: 0.1 };
const looseSpring: SpringOptions = { damping: 20, stiffness: 300, mass: 0.8 };
const stateSpring: SpringOptions = { damping: 25, stiffness: 300, mass: 0.5 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [ringFilled, setRingFilled] = useState(false);

  const currentTargetRef = useRef<HTMLElement | null>(null);
  const stickyElementRef = useRef<HTMLElement | null>(null);
  const isInViewportRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const cursorStateRef = useRef<CursorState>("default");
  const initializedRef = useRef(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const ringScaleX = useMotionValue(1);
  const ringScaleY = useMotionValue(1);
  const dotScaleX = useMotionValue(1);
  const dotScaleY = useMotionValue(1);

  const dotX = useSpring(mouseX, tightSpring);
  const dotY = useSpring(mouseY, tightSpring);
  const ringX = useSpring(mouseX, looseSpring);
  const ringY = useSpring(mouseY, looseSpring);
  const smoothOpacity = useSpring(opacity, { damping: 30, stiffness: 400 });
  const smoothRingScaleX = useSpring(ringScaleX, stateSpring);
  const smoothRingScaleY = useSpring(ringScaleY, stateSpring);
  const smoothDotScaleX = useSpring(dotScaleX, stateSpring);
  const smoothDotScaleY = useSpring(dotScaleY, stateSpring);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(hasFinePointer && !prefersReducedMotion);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      setEnabled(
        !e.matches && window.matchMedia("(pointer: fine)").matches
      );
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      document.documentElement.classList.remove("custom-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  const updateVisibility = useCallback(() => {
    const show =
      enabled &&
      initializedRef.current &&
      isInViewportRef.current &&
      isDocumentVisibleRef.current;
    opacity.set(show ? 1 : 0);
  }, [enabled, opacity]);

  const resetState = useCallback(() => {
    cursorStateRef.current = "default";
    stickyElementRef.current = null;
    ringScaleX.set(1);
    ringScaleY.set(1);
    dotScaleX.set(1);
    dotScaleY.set(1);
    setRingFilled(false);
  }, [ringScaleX, ringScaleY, dotScaleX, dotScaleY]);

  const applyElementState = useCallback(
    (target: HTMLElement | null) => {
      if (target) {
        const type = target.getAttribute("data-cursor");

        if (type === "sticky") {
          cursorStateRef.current = "sticky";
          stickyElementRef.current = target;

          const rect = target.getBoundingClientRect();
          const padX = 24;
          const padY = 20;
          ringScaleX.set((rect.width + padX) / RING_SIZE);
          ringScaleY.set((rect.height + padY) / RING_SIZE);
          dotScaleX.set(0);
          dotScaleY.set(0);
          setRingFilled(true);
        } else {
          cursorStateRef.current = "interactive";
          stickyElementRef.current = null;

          const s = INTERACTIVE_RING_SIZE / RING_SIZE;
          ringScaleX.set(s);
          ringScaleY.set(s);
          dotScaleX.set(1.3);
          dotScaleY.set(1.3);
          setRingFilled(false);
        }
      } else {
        resetState();
      }

      currentTargetRef.current = target;
    },
    [ringScaleX, ringScaleY, dotScaleX, dotScaleY, resetState]
  );

  const initializeAtPointer = useCallback(
    (x: number, y: number) => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      mouseX.jump(x);
      mouseY.jump(y);
      dotX.jump(x);
      dotY.jump(y);
      ringX.jump(x);
      ringY.jump(y);

      isInViewportRef.current = true;

      const el = document.elementFromPoint(x, y);
      const target = (el as HTMLElement | null)?.closest(
        "[data-cursor], a, button, [role='button']"
      ) as HTMLElement | null;
      applyElementState(target);
      updateVisibility();
    },
    [
      mouseX,
      mouseY,
      dotX,
      dotY,
      ringX,
      ringY,
      applyElementState,
      updateVisibility,
    ]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return;

      if (!initializedRef.current) {
        initializeAtPointer(e.clientX, e.clientY);
        return;
      }

      if (!isInViewportRef.current) {
        isInViewportRef.current = true;
        updateVisibility();
      }

      const stickyEl = stickyElementRef.current;
      if (stickyEl && cursorStateRef.current === "sticky") {
        if (!document.contains(stickyEl)) {
          resetState();
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          return;
        }

        const rect = stickyEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        mouseX.set(cx + dx * 0.15);
        mouseY.set(cy + dy * 0.15);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    },
    [
      enabled,
      mouseX,
      mouseY,
      initializeAtPointer,
      resetState,
      updateVisibility,
    ]
  );

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      if (!enabled || !initializedRef.current) return;

      const target = (e.target as HTMLElement | null)?.closest(
        "[data-cursor], a, button, [role='button']"
      ) as HTMLElement | null;

      if (target === currentTargetRef.current) return;
      applyElementState(target);
    },
    [enabled, applyElementState]
  );

  const handleMouseLeave = useCallback(() => {
    isInViewportRef.current = false;
    updateVisibility();
  }, [updateVisibility]);

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      isInViewportRef.current = true;

      if (!initializedRef.current && enabled) {
        initializeAtPointer(e.clientX, e.clientY);
        return;
      }

      updateVisibility();
    },
    [enabled, initializeAtPointer, updateVisibility]
  );

  const handleVisibilityChange = useCallback(() => {
    isDocumentVisibleRef.current = !document.hidden;
    if (document.hidden) {
      isInViewportRef.current = false;
      initializedRef.current = false;
      resetState();
    }
    updateVisibility();
  }, [updateVisibility, resetState]);

  const handleBlur = useCallback(() => {
    isDocumentVisibleRef.current = false;
    updateVisibility();
  }, [updateVisibility]);

  const handleFocus = useCallback(() => {
    isDocumentVisibleRef.current = true;
    updateVisibility();
  }, [updateVisibility]);

  useEffect(() => {
    if (!enabled) return;

    initializedRef.current = false;
    mouseX.jump(-100);
    mouseY.jump(-100);
    opacity.jump(0);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [
    enabled,
    handleMouseMove,
    handleMouseOver,
    handleMouseLeave,
    handleMouseEnter,
    handleVisibilityChange,
    handleBlur,
    handleFocus,
    mouseX,
    mouseY,
    opacity,
  ]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none rounded-full transition-[background-color,border-color] duration-300 ease-out print-hidden"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: RING_SIZE,
          height: RING_SIZE,
          scaleX: smoothRingScaleX,
          scaleY: smoothRingScaleY,
          opacity: smoothOpacity,
          mixBlendMode: "difference",
          zIndex: 9999,
          backgroundColor: ringFilled ? "white" : "transparent",
          border: `1.5px solid ${ringFilled ? "transparent" : "rgba(255,255,255,0.8)"}`,
        }}
      />
      <motion.div
        className="fixed pointer-events-none bg-white rounded-full print-hidden"
        style={{
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
          width: DOT_SIZE,
          height: DOT_SIZE,
          scaleX: smoothDotScaleX,
          scaleY: smoothDotScaleY,
          opacity: smoothOpacity,
          mixBlendMode: "difference",
          zIndex: 9999,
        }}
      />
    </>
  );
}

import { useRef, useState } from "react";

export default function Magnetic({
  children,
  as: Component = "div",
  className,
  dataCursor,
  onClick,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  dataCursor?: string;
  onClick?: () => void;
}) {
  const ref: React.RefObject<HTMLDivElement | null> = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    if (!boundingRect) return;
    const { width, height, left, top } = boundingRect;

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    const dampening = 0.3;

    setPosition({ x: middleX * dampening, y: middleY * dampening });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;

  return (
    <Component
      className={className}
      data-cursor={dataCursor}
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 100,
        mass: 2,
        delay: 0.01,
      }}
    >
      {children}
    </Component>
  );
}

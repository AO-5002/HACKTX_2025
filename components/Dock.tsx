"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "motion/react";
import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelWidth?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

/* ---------- Dock Item ---------- */
function DockItem({
  children,
  className = "",
  onClick,
  mouseY,
  spring,
  distance = 200,
  magnification = 70,
  baseItemSize = 50,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseY: MotionValue<number>;
  spring: SpringOptions;
  distance?: number;
  baseItemSize?: number;
  magnification?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize,
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        flexShrink: 0, // prevents resizing parent
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full text-white bg-black border-neutral-700 border-2 shadow-md cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(
              child as React.ReactElement<{ isHovered?: MotionValue<number> }>,
              { isHovered }
            )
          : child
      )}
    </motion.div>
  );
}

/* ---------- Dock Label ---------- */
function DockLabel({
  children,
  isHovered,
}: {
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsub = isHovered.on("change", (v) => setIsVisible(v === 1));
    return () => unsub();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 10 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-full top-1/2 -translate-y-1/2 ml-2 rounded-md px-2 py-0.5 text-xs text-white whitespace-pre"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Dock Icon ---------- */
function DockIcon({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

/* ---------- Main Dock ---------- */
export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelWidth = 72, // fixed sidebar width
  baseItemSize = 50,
}: DockProps) {
  const mouseY = useMotionValue(Infinity);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full ${className}`}
      style={{ width: panelWidth }}
      onMouseMove={({ pageY }) => mouseY.set(pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      role="toolbar"
      aria-label="Application dock"
    >
      <div className="flex flex-col items-center gap-4 py-6 rounded-full p-2 bg-black">
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseY={mouseY}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}

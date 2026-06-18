"use client";

import { useRef, useCallback, useState } from "react";
import { hapticLight } from "@/lib/haptics";

interface LongPressOptions {
  duration?: number;
  onLongPress?: () => void;
}

export function useLongPress({ duration = 400, onLongPress }: LongPressOptions = {}) {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [isPressed, setIsPressed] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setIsPressed(true);
      setTriggered(false);
      timer.current = setTimeout(() => {
        setTriggered(true);
        hapticLight();
        onLongPress?.();
      }, duration);
    },
    [duration, onLongPress]
  );

  const cancel = useCallback(() => {
    setIsPressed(false);
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const end = useCallback(() => {
    cancel();
  }, [cancel]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: end,
    onTouchEnd: end,
    onMouseLeave: cancel,
    isPressed,
    triggered,
  };
}

import { useCallback } from "react";

type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "selection"
  | "success"
  | "warning"
  | "error";

const vibrationPatterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  selection: 5,
  success: [10, 50, 10],
  warning: [25, 50, 25],
  error: [50, 25, 50, 25, 50],
};

export function useHaptic() {
  const trigger = useCallback((type: HapticType = "light") => {
    if (!navigator.vibrate) {
      return false;
    }

    try {
      const pattern = vibrationPatterns[type];
      navigator.vibrate(pattern);
      return true;
    } catch {
      return false;
    }
  }, []);

  const isSupported =
    typeof navigator !== "undefined" && "vibrate" in navigator;

  return {
    trigger,
    isSupported,
  };
}

export default useHaptic;

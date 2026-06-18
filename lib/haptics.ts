"use client";

export function hapticLight() {
  navigator.vibrate?.(10);
}

export function hapticMedium() {
  navigator.vibrate?.(20);
}

export function hapticHeavy() {
  navigator.vibrate?.(35);
}

export function hapticSuccess() {
  navigator.vibrate?.([10, 50, 10]);
}

export function hapticError() {
  navigator.vibrate?.([20, 30, 20, 30, 20]);
}

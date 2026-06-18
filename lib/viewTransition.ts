export function navigateWithTransition(navigate: () => void) {
  if (typeof document !== "undefined" && document.startViewTransition) {
    document.startViewTransition(() => {
      navigate();
    });
  } else {
    navigate();
  }
}

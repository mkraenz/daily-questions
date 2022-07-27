export const getAccessibilityHiddenProps = (accessibilityHidden: boolean) => {
  return {
    accessibilityElementsHidden: accessibilityHidden,
    importantForAccessibility: accessibilityHidden
      ? "no-hide-descendants"
      : "auto",
  } as const;
};

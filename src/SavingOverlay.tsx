// @ts-ignore
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal(props: { children: ReactNode }) {
  const { children } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

export function SavingOverlay() {
  return (
    <Portal>
      <div className="saving-overlay" onClick={(e) => e.stopPropagation()} />
    </Portal>
  );
}

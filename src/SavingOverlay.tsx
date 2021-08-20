import { createPortal } from "react-dom";
import { useEffect, useState, ReactNode } from "react";

function Portal(props: { children: ReactNode }) {
  let { children } = props;
  let [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

export function SavingOverlay() {
  return (
    <Portal>
      <div className="saving-overlay" onClick={e => e.stopPropagation()} />
    </Portal>
  );
}

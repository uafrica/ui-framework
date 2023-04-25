import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useLocationState(): any | null {
  const location = useLocation();

  return useMemo(() => location.state, [location]);
}

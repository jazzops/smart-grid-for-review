
import { useEffect } from "react";
import { initMapStyles } from "./mapStyles";

export function useMapStyles() {
  useEffect(() => {
    initMapStyles();
  }, []);
}

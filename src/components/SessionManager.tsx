"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function SessionManager() {
  const router = useRouter();
  const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes

  const logout = useCallback(() => {
    // Clear any local session tokens here
    localStorage.removeItem("bluemantle_session");
    router.push("/");
  }, [router]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, INACTIVITY_LIMIT);
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => document.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, [logout, INACTIVITY_LIMIT]);

  return null;
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { SessionManager } from "./SessionManager";

export function SecurityGuard({ children }: { children: React.ReactNode }) {
  const [securityMessage, setSecurityMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Instant logout function - no second chances
    const instantLogout = () => {
      localStorage.removeItem("bluemantle_session");
      console.clear();
      console.log("%cSecurity Alert: Unauthorized access attempt detected.", "color: red; font-weight: bold; font-size: 16px;");
      window.location.href = "/";
    };

    // 1. Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Inspect Shortcuts
    const handleKeydown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a' || e.key === 'p')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
      ) {
        e.preventDefault();
        instantLogout();
        return false;
      }
    };

    // 3. DevTools Detection via Window Dimensions
    // When DevTools opens as a docked panel, innerWidth/Height shrinks
    const detectDevToolsBySize = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        instantLogout();
      }
    };

    // 4. DevTools Detection via Console Profiling
    // DevTools intercepts toString() calls on logged objects
    const detectDevToolsByConsole = () => {
      const element = new Image();
      let devtoolsOpen = false;

      Object.defineProperty(element, 'id', {
        get: () => {
          devtoolsOpen = true;
          return '';
        }
      });

      console.dir(element);

      if (devtoolsOpen) {
        instantLogout();
      }
    };

    // Run detection checks every 1.5 seconds
    const interval = setInterval(() => {
      detectDevToolsBySize();
      detectDevToolsByConsole();
    }, 1500);

    // Also check on resize (devtools docking triggers resize)
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("resize", detectDevToolsBySize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("resize", detectDevToolsBySize);
    };
  }, []);

  return (
    <div className="relative select-none">
      <SessionManager />
      {/* Security Message Toast */}
      {securityMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000] bg-error text-on_error px-6 py-3 rounded-full shadow-ambient flex items-center gap-3 animate-bounce">
          <ShieldAlert className="w-5 h-5" />
          <span className="font-bold text-sm">{securityMessage}</span>
        </div>
      )}
      {children}
    </div>
  );
}

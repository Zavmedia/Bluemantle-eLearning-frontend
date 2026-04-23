"use client";

import UnicornScene from "unicornstudio-react";

export function UnicornBackground() {
  return (
    <div className="fixed inset-0 w-[100vw] h-[100vh] z-[-1] opacity-20 dark:opacity-50 invert dark:invert-0 pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-lighten transition-all duration-700">
      <UnicornScene
        projectId="wDDGyIeqijIUbi67C9dB"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.9/dist/unicornStudio.umd.js"
      />
    </div>
  );
}

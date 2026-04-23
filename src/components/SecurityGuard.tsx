"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function SecurityGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only apply to student routes, exclude the suspension page itself
    if (pathname === "/suspended") {
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/institutional");
        const data = await res.ok ? await res.json() : null;
        
        if (data) {
          // Hardcoding the current demo user status check
          const currentUser = data.students.find((s: any) => s.id === "STU-8821");
          if (currentUser?.status === "suspended") {
            router.push("/suspended");
          }
        }
      } catch (error) {
        console.error("Security check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [pathname, router]);

  if (loading && pathname !== "/suspended") {
    return (
      <div className="fixed inset-0 bg-background z-[9999] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

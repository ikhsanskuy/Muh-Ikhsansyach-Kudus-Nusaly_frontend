"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-[91px] flex-col items-center gap-4 pt-[108px]"
      style={{ borderRight: "1px solid #f7f7f7", background: "#fff", minHeight: "calc(100vh - 79px)" }}
    >
      <Link
        href="/"
        className="flex h-[49px] w-[49px] items-center justify-center rounded-[5px]"
        style={{
          background: pathname === "/" ? "#4a8394" : "transparent",
          boxShadow: pathname === "/" ? "0 2px 4.025px rgba(59,59,59,0.25)" : "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 19.64856l-14 0c-0.55228 0-1-0.4477-1-1l0-9-3 0 10.3273-9.3885c0.3814-0.34675 0.964-0.34675 1.3454 0l10.3273 9.3885-3 0 0 9c0 0.5523-0.4477 1-1 1z m-6-2l5 0 0-9.84255-6-5.45455-6 5.45455 0 9.84255 5 0 0-6 2 0 0 6z"
            fill={pathname === "/" ? "white" : "#4a8394"}
          />
        </svg>
      </Link>

      <Link
        href="/booking"
        className="flex h-[49px] w-[49px] items-center justify-center rounded-[5px]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M0 21c0-4.4183 3.58172-8 8-8 4.4183 0 8 3.5817 8 8l-2 0c0-3.3137-2.6863-6-6-6-3.31371 0-6 2.6863-6 6l-2 0z m8-9c-3.315 0-6-2.685-6-6 0-3.315 2.685-6 6-6 3.315 0 6 2.685 6 6 0 3.315-2.685 6-6 6z m0-2c2.21 0 4-1.79 4-4 0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4z"
            fill={pathname === "/booking" ? "white" : "#4a8394"}
          />
        </svg>
      </Link>
    </aside>
  );
}

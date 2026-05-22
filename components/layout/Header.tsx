import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="relative z-10 flex h-[79px] w-full items-center px-[120px]"
      style={{
        background: "linear-gradient(225deg, #11191a, #296377)",
        boxShadow: "0 4px 13.475px rgba(0,0,0,0.25)",
      }}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/Logo-FTL-no-tagline 1.png"
          alt="FTL"
          width={88}
          height={31}
          className="object-contain"
        />
        <span className="text-[20px] font-semibold text-white">FTL</span>
      </Link>

      <div className="ml-auto flex items-center gap-6">
        <button type="button" className="relative" aria-label="Notifications">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15l2 0 0 2-20 0 0-2 2 0 0-7c0-4.41828 3.58172-8 8-8 4.4183 0 8 3.58172 8 8l0 7z m-11 4l6 0 0 2-6 0 0-2z"
              fill="white"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/Ellipse 1.png"
              alt="User avatar"
              width={45}
              height={45}
              className="rounded-full object-cover"
            />
            <span className="text-[20px] font-medium text-white">John Doe</span>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.24268 5.65685l-4.24268-4.2426 1.41422-1.41425 2.82846 2.82845 2.8284-2.82845 1.4142 1.41425-4.2426 4.2426z"
              fill="white"
              transform="translate(7.757, 9.344)"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

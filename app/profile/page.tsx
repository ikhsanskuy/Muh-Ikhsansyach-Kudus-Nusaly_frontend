import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-[28px] flex items-center gap-[22px]">
        <Link
          href="/"
          className="flex h-[49px] w-[49px] items-center justify-center rounded-[5px]"
          style={{
            background: "#4a8394",
            boxShadow: "0 2px 4.025px rgba(59,59,59,0.25)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M2.8284 6.36398l4.9498 4.9497-1.4142 1.4142-6.364-6.3639 6.364-6.36398 1.4142 1.41421-4.9498 4.94977z"
              fill="white"
              transform="translate(8, 5.637)"
            />
          </svg>
        </Link>
        <h1 className="text-[20px] font-semibold text-[#000]">Profil Saya</h1>
      </div>

      <div
        className="rounded-[12px] border p-[28px]"
        style={{
          borderColor: "#e1e1e1",
          background: "#fff",
          boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
        }}
      >
        <div className="flex items-center gap-6">
          <Image
            src="/Ellipse 1.png"
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-[24px] font-semibold text-[#232323]">John Doe</h2>
            <p className="text-[16px] font-normal text-[#868686]">Staff</p>
          </div>
        </div>

        <div className="my-[28px] h-px w-full bg-[#ebebeb]" />

        <div className="grid grid-cols-2 gap-8">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#868686]">
              Nama Lengkap
            </span>
            <p className="mt-1 text-[16px] font-medium text-[#232323]">John Doe</p>
          </div>
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#868686]">
              Unit
            </span>
            <p className="mt-1 text-[16px] font-medium text-[#232323]">UNIT KEUANGAN</p>
          </div>
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#868686]">
              Email
            </span>
            <p className="mt-1 text-[16px] font-medium text-[#232323]">john.doe@ftl.com</p>
          </div>
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[#868686]">
              Role
            </span>
            <p className="mt-1 text-[16px] font-medium text-[#232323]">Staff</p>
          </div>
        </div>
      </div>
    </div>
  );
}

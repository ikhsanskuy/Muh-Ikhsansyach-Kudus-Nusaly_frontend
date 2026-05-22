"use client";

import { useState } from "react";
import Link from "next/link";

const UNIT_OPTIONS = ["Pilih Unit", "UNIT KEUANGAN", "UNIT SDM", "UNIT UMUM"];
const ROOM_OPTIONS = ["Pilih Ruangan Meeting", "Ruang Prambanan", "Ruang Borobudur", "Ruang Komodo"];

const CONSUMPTION_TYPES = ["Snack Siang", "Makan Siang", "Snack Sore"];

export default function BookingPage() {
  const [unit, setUnit] = useState("");
  const [room, setRoom] = useState("");
  const [capacity] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [consumption, setConsumption] = useState<string[]>([]);
  const [nominal, setNominal] = useState("");

  const toggleConsumption = (item: string) => {
    setConsumption((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  return (
    <div className="pb-[60px]">
      <div className="mb-[24px] flex items-center gap-[4px]">
        <Link href="/" className="text-[16px] font-normal text-[#868686]">
          Ruang Meeting
        </Link>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M12.1716 6.36398L7.2218 11.3137L8.636 12.7279L15 6.36398L8.636 0L7.2218 1.41421L12.1716 6.36398Z"
            fill="#4a8394"
            transform="translate(8, 5.637)"
          />
        </svg>
        <span className="text-[16px] font-normal text-[#868686]">
          Pesan Ruangan
        </span>
      </div>

      <div className="flex items-center gap-[22px]">
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
              d="M12.1716 6.36398L7.2218 11.3137L8.636 12.7279L15 6.36398L8.636 0L7.2218 1.41421L12.1716 6.36398Z"
              fill="white"
              transform="translate(8, 5.637)"
            />
          </svg>
        </Link>
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[20px] font-semibold text-[#000]">
            Ruang Meeting
          </h1>
          <span className="text-[16px] font-normal text-[#868686]">
            Ruang Meeting
          </span>
        </div>
      </div>

      <div
        className="mt-[24px] rounded-[12px] border p-[28px]"
        style={{
          borderColor: "#e1e1e1",
          background: "#fff",
          boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
        }}
      >
        <h2 className="text-[20px] font-semibold text-[#000]">
          Informasi Ruang Meeting
        </h2>
        <div className="my-[24px] h-px w-full bg-[#ebebeb]" />

        <div className="flex flex-wrap gap-[35px]">
          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Unit
            </label>
            <div
              className="flex h-[54px] w-full cursor-pointer items-center justify-between rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
            >
              <span className="text-[16px] font-normal text-[#868686]">
                {unit || "Pilih Unit"}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4l-4-4 8 0-4 4z"
                  fill="#000"
                  transform="translate(5.333, 6.667)"
                />
              </svg>
            </div>
          </div>

          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Pilihan Ruangan Meeting
            </label>
            <div
              className="flex h-[54px] w-full cursor-pointer items-center justify-between rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
            >
              <span className="text-[16px] font-normal text-[#868686]">
                {room || "Pilih Ruangan Meeting"}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4l-4-4 8 0-4 4z"
                  fill="#000"
                  transform="translate(5.333, 6.667)"
                />
              </svg>
            </div>
          </div>

          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Kapasitas Ruangan
            </label>
            <div
              className="flex h-[54px] w-full items-center rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#f4f4f4" }}
            >
              <span className="text-[16px] font-normal text-[#868686]">
                {capacity || "Kapasitas Ruangan"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-[24px] rounded-[12px] border p-[28px]"
        style={{
          borderColor: "#e1e1e1",
          background: "#fff",
          boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
        }}
      >
        <h2 className="text-[20px] font-semibold text-[#000]">
          Informasi Rapat
        </h2>
        <div className="my-[24px] h-px w-full bg-[#ebebeb]" />

        <div className="flex flex-wrap gap-[35px]">
          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Tanggal Rapat *
            </label>
            <div
              className="flex h-[54px] w-full cursor-pointer items-center gap-2 rounded-[4px] border px-[10px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 0l0 2 6 0 0-2 2 0 0 2 4 0c0.5523 0 1 0.44772 1 1l0 16c0 0.5523-0.4477 1-1 1l-18 0c-0.55228 0-1-0.4477-1-1l0-16c0-0.55228 0.44772-1 1-1l4 0 0-2 2 0z m11 10l-16 0 0 8 16 0 0-8z m-13-6l-3 0 0 4 16 0 0-4-3 0 0 2-2 0 0-2-6 0 0 2-2 0 0-2z"
                  fill="#4a8394"
                  transform="translate(2, 1)"
                />
              </svg>
              <span className="text-[16px] font-normal text-[#868686]">
                {date || "Pilih Tanggal"}
              </span>
            </div>
          </div>

          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Pilihan Waktu Mulai
            </label>
            <div
              className="flex h-[54px] w-full cursor-pointer items-center justify-between rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
            >
              <span className="text-[16px] font-normal text-[#868686]">
                {startTime || "Pilih Waktu Mulai"}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4l-4-4 8 0-4 4z"
                  fill="#000"
                  transform="translate(5.333, 6.667)"
                />
              </svg>
            </div>
          </div>

          <div className="flex w-[277px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Waktu Selesai
            </label>
            <div
              className="flex h-[54px] w-full cursor-pointer items-center justify-between rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
            >
              <span className="text-[16px] font-normal text-[#868686]">
                {endTime || "Pilih Waktu Selesai"}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 4l-4-4 8 0-4 4z"
                  fill="#000"
                  transform="translate(5.333, 6.667)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-[35px] flex w-[384px] flex-col gap-2">
          <label className="text-[16px] font-semibold text-[#232323]">
            Jumlah Peserta
          </label>
          <div
            className="flex h-[54px] w-full items-center rounded-[4px] border px-[14px]"
            style={{ borderColor: "#ebebeb", background: "#fff" }}
          >
            <input
              type="number"
              placeholder="Masukan Jumlah Peserta"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="w-full text-[16px] font-normal text-[#868686] outline-none placeholder:text-[#868686]"
            />
          </div>
        </div>

        <div className="mt-[35px] flex w-[343px] flex-col gap-[14px]">
          <label className="text-[16px] font-semibold text-[#232323]">
            Jenis Konsumsi
          </label>
          {CONSUMPTION_TYPES.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-4"
            >
              <input
                type="checkbox"
                checked={consumption.includes(item)}
                onChange={() => toggleConsumption(item)}
                className="h-6 w-6 rounded-[1.78px] border"
                style={{ borderColor: "#ebebeb" }}
              />
              <span className="text-[16px] font-normal text-[#868686]">
                {item}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-[35px] flex w-[384px] flex-col gap-2">
          <label className="text-[16px] font-semibold text-[#232323]">
            Nominal Konsumsi
          </label>
          <div className="flex h-[54px] w-full rounded-[4px] border overflow-hidden"
            style={{ borderColor: "#ebebeb" }}
          >
            <div className="flex w-[50px] items-center justify-center bg-[#4a8394]">
              <span className="text-[16px] font-normal text-white">Rp</span>
            </div>
            <input
              type="number"
              placeholder="Masukan Nominal"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              className="flex-1 px-[14px] text-[16px] font-normal text-[#868686] outline-none placeholder:text-[#868686]"
            />
          </div>
        </div>
      </div>

      <div className="mt-[24px] flex justify-end gap-[24px]">
        <Link
          href="/"
          className="flex h-[49px] w-[140px] items-center justify-center rounded-[8px] text-[16px] font-semibold"
          style={{
            background: "#ffdcdc",
            color: "#ff0505",
            boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
          }}
        >
          Batal
        </Link>
        <button
          type="button"
          className="flex h-[49px] w-[140px] items-center justify-center rounded-[8px] text-[16px] font-semibold text-white"
          style={{
            background: "#4a8394",
            boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
          }}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}

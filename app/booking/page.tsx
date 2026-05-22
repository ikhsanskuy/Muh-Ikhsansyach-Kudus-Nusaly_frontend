"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SelectDropdown from "@/components/ui/SelectDropdown";

const TIME_SLOTS = Array.from({ length: 23 }, (_, i) => {
  const h = Math.floor(i / 2) + 7;
  const m = i % 2 === 0 ? "00" : "30";
  const label = `${String(h).padStart(2, "0")}:${m}`;
  return { value: label, label };
});

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatDateID(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

const CONSUMPTION_TYPES = ["Snack Siang", "Makan Siang", "Snack Sore"];

const API = "http://localhost:3001/api";

export default function BookingPage() {
  const [unit, setUnit] = useState("");
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState<number | "">("");
  const [consumption, setConsumption] = useState<string[]>([]);
  const [nominal, setNominal] = useState<number | "">("");

  const [timeError, setTimeError] = useState("");
  const [participantError, setParticipantError] = useState("");
  const [unitError, setUnitError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [dateError, setDateError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [participantCountError, setParticipantCountError] = useState("");

  const [unitOptions, setUnitOptions] = useState<{ value: string; label: string }[]>([]);
  const [roomOptions, setRoomOptions] = useState<{ value: string; label: string; capacity: number }[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API}/units`)
      .then((res) => res.json())
      .then((data: { id: string; name: string }[]) =>
        setUnitOptions(data.map((u) => ({ value: u.id, label: u.name })))
      )
      .catch(() => alert("Gagal memuat data unit"))
      .finally(() => setLoadingUnits(false));
  }, []);

  useEffect(() => {
    if (!unit) {
      setRoomOptions([]);
      return;
    }
    setLoadingRooms(true);
    setRoom("");
    setCapacity(null);
    fetch(`${API}/rooms?unitId=${unit}`)
      .then((res) => res.json())
      .then((data: { id: string; name: string; capacity: number }[]) =>
        setRoomOptions(data.map((r) => ({ value: r.id, label: r.name, capacity: r.capacity })))
      )
      .catch(() => alert("Gagal memuat data ruangan"))
      .finally(() => setLoadingRooms(false));
  }, [unit]);

  useEffect(() => {
    if (startTime && endTime) {
      if (endTime <= startTime) {
        setTimeError("Waktu selesai harus di atas waktu mulai");
      } else {
        setTimeError("");
      }
    } else {
      setTimeError("");
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (capacity !== null && typeof participants === "number" && participants > capacity) {
      setParticipantError("Jumlah peserta tidak boleh melebihi kapasitas ruangan");
    } else {
      setParticipantError("");
    }
  }, [participants, capacity]);

  const handleUnitChange = (val: string) => {
    setUnit(val);
    setUnitError("");
  };

  const handleRoomChange = (val: string) => {
    setRoom(val);
    setRoomError("");
    const found = roomOptions.find((r) => r.value === val);
    setCapacity(found ? found.capacity : null);
  };

  const handleSubmit = async () => {
    const err = (fn: (v: string) => void, msg: string, cond: boolean) => {
      fn(cond ? msg : "");
      return cond;
    };

    const hasUnitError = err(setUnitError, "Silakan pilih unit", !unit);
    const hasRoomError = err(setRoomError, "Silakan pilih ruangan meeting", !room);
    const hasDateError = err(setDateError, "Silakan pilih tanggal rapat", !date);
    const hasStartTimeError = err(setStartTimeError, "Silakan pilih waktu mulai", !startTime);
    const hasEndTimeError = err(setEndTimeError, "Silakan pilih waktu selesai", !endTime);
    const hasParticipantError = err(setParticipantCountError, "Silakan masukan jumlah peserta", !participants || participants < 1);

    if (hasUnitError || hasRoomError || hasDateError || hasStartTimeError || hasEndTimeError || hasParticipantError) return;
    if (timeError || participantError) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${API}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room,
          meetingDate: date,
          startTime,
          endTime,
          participantCount: participants,
          consumptionType: consumption.join(", "),
          consumptionNominal: nominal || 0,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      router.push("/");
    } catch {
      alert("Gagal menyimpan. Pastikan server backend berjalan");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleConsumption = (item: string) => {
    setConsumption((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  if (!mounted) return null;

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
            d="M2.8284 6.36398l4.9498 4.9497-1.4142 1.4142-6.364-6.3639 6.364-6.36398 1.4142 1.41421-4.9498 4.94977z"
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
              d="M2.8284 6.36398l4.9498 4.9497-1.4142 1.4142-6.364-6.3639 6.364-6.36398 1.4142 1.41421-4.9498 4.94977z"
              fill="white"
              transform="translate(8, 5.637)"
            />
          </svg>
        </Link>
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[20px] font-semibold text-[#000]">Ruang Meeting</h1>
          <span className="text-[16px] font-normal text-[#868686]">Ruang Meeting</span>
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
        <h2 className="text-[20px] font-semibold text-[#000]">Informasi Ruang Meeting</h2>
        <div className="my-[24px] h-px w-full bg-[#ebebeb]" />

        <div className="flex flex-wrap gap-[35px]">
          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Unit</label>
            <SelectDropdown
              options={unitOptions}
              value={unit}
              onChange={handleUnitChange}
              placeholder={loadingUnits ? "Memuat..." : "Pilih Unit"}
            />
            {unitError && (
              <span className="text-[13px] font-normal leading-tight" style={{ color: "#ff0505" }}>
                {unitError}
              </span>
            )}
          </div>

          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">
              Pilihan Ruangan Meeting
            </label>
            <SelectDropdown
              options={roomOptions}
              value={room}
              onChange={handleRoomChange}
              placeholder={loadingRooms ? "Memuat..." : "Pilih Ruangan Meeting"}
              disabled={!unit || loadingRooms}
            />
            {roomError && (
              <span className="text-[13px] font-normal leading-tight" style={{ color: "#ff0505" }}>
                {roomError}
              </span>
            )}
          </div>

          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Kapasitas Ruangan</label>
            <div
              className="flex h-[54px] w-full items-center gap-2 rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#f4f4f4" }}
            >
              <input
                type="number"
                value={capacity ?? ""}
                readOnly
                disabled
                placeholder="Kapasitas Ruangan"
                className="w-full bg-transparent text-[16px] font-normal text-[#868686] outline-none placeholder:text-[#868686] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              {capacity !== null && (
                <span className="shrink-0 text-[16px] font-normal text-[#868686]">Orang</span>
              )}
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
        <h2 className="text-[20px] font-semibold text-[#000]">Informasi Rapat</h2>
        <div className="my-[24px] h-px w-full bg-[#ebebeb]" />

        <div className="flex flex-wrap gap-[35px]">
          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Tanggal Rapat *</label>
            <div
              className="flex h-[54px] w-full cursor-pointer items-center gap-2 rounded-[4px] border px-[10px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
              onClick={() => dateInputRef.current?.showPicker()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 0l0 2 6 0 0-2 2 0 0 2 4 0c0.5523 0 1 0.44772 1 1l0 16c0 0.5523-0.4477 1-1 1l-18 0c-0.55228 0-1-0.4477-1-1l0-16c0-0.55228 0.44772-1 1-1l4 0 0-2 2 0z m11 10l-16 0 0 8 16 0 0-8z m-13-6l-3 0 0 4 16 0 0-4-3 0 0 2-2 0 0-2-6 0 0 2-2 0 0-2z"
                  fill="#4a8394"
                  transform="translate(2, 1)"
                />
              </svg>
              <span className="text-[16px] font-normal" style={{ color: date ? "#232323" : "#868686" }}>
                {date ? formatDateID(date) : "Pilih Tanggal"}
              </span>
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => { setDate(e.target.value); setDateError(""); }}
                className="sr-only"
              />
            </div>
            {dateError && (
              <span className="text-[13px] font-normal leading-tight" style={{ color: "#ff0505" }}>
                {dateError}
              </span>
            )}
          </div>

          <div className="flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Pilihan Waktu Mulai</label>
            <SelectDropdown
              options={TIME_SLOTS}
              value={startTime}
              onChange={(v) => { setStartTime(v); setStartTimeError(""); }}
              placeholder="Pilih Waktu Mulai"
            />
            {startTimeError && (
              <span className="text-[13px] font-normal leading-tight" style={{ color: "#ff0505" }}>
                {startTimeError}
              </span>
            )}
          </div>

          <div className="flex w-[277px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Waktu Selesai</label>
            <SelectDropdown
              options={TIME_SLOTS}
              value={endTime}
              onChange={(v) => { setEndTime(v); setEndTimeError(""); }}
              placeholder="Pilih Waktu Selesai"
            />
            {(timeError || endTimeError) && (
              <span className="text-[13px] font-normal leading-tight" style={{ color: "#ff0505" }}>
                {endTimeError || timeError}
              </span>
            )}
          </div>
        </div>

          <div className="mt-[35px] flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Jumlah Peserta</label>
            <div
              className="flex h-[54px] w-full items-center rounded-[4px] border px-[14px]"
              style={{ borderColor: "#ebebeb", background: "#fff" }}
            >
              <input
                type="number"
                placeholder="Masukan Jumlah Peserta"
                value={participants}
                onChange={(e) => {
                  setParticipants(e.target.value === "" ? "" : Number(e.target.value));
                  setParticipantCountError("");
                }}
                min={1}
                className="w-full text-[16px] font-normal text-[#868686] outline-none placeholder:text-[#868686] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            {(participantError || participantCountError) && (
              <span className="text-[13px] font-normal leading-tight" style={{ color: "#ff0505" }}>
                {participantCountError || participantError}
              </span>
            )}
          </div>

        <div className="mt-[35px] flex w-[343px] flex-col gap-[14px]">
          <label className="text-[16px] font-semibold text-[#232323]">Jenis Konsumsi</label>
          {CONSUMPTION_TYPES.map((item) => (
            <label key={item} className="flex cursor-pointer items-center gap-4">
              <input
                type="checkbox"
                checked={consumption.includes(item)}
                onChange={() => toggleConsumption(item)}
                className="h-6 w-6 rounded-[1.78px] border"
                style={{ borderColor: "#ebebeb" }}
              />
              <span className="text-[16px] font-normal text-[#868686]">{item}</span>
            </label>
          ))}
        </div>

          <div className="mt-[35px] flex w-[384px] flex-col gap-2">
            <label className="text-[16px] font-semibold text-[#232323]">Nominal Konsumsi</label>
            <div
              className="flex h-[54px] w-full overflow-hidden rounded-[4px] border"
              style={{ borderColor: "#ebebeb" }}
            >
              <div className="flex w-[50px] shrink-0 items-center justify-center bg-[#4a8394]">
                <span className="text-[16px] font-normal text-white">Rp</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Masukan Nominal"
                value={nominal === "" ? "" : Number(nominal).toLocaleString("id-ID")}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setNominal(raw === "" ? "" : Number(raw));
                }}
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
          onClick={handleSubmit}
          disabled={submitting}
          className="flex h-[49px] w-[140px] items-center justify-center rounded-[8px] text-[16px] font-semibold text-white disabled:opacity-60"
          style={{
            background: "#4a8394",
            boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
          }}
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
}

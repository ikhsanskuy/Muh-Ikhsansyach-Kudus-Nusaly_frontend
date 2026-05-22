"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API = "http://localhost:3001/api";
const LIMIT = 10;

interface ApiBooking {
  id: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  participantCount: number;
  consumptionType: string;
  consumptionNominal: string;
  room: {
    id: string;
    name: string;
    capacity: number;
    unit: { id: string; name: string };
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const COLUMNS = [
  { key: "unit", label: "UNIT" },
  { key: "room", label: "RUANG MEETING" },
  { key: "capacity", label: "KAPASITAS" },
  { key: "date", label: "TANGGAL RAPAT" },
  { key: "time", label: "WAKTU" },
  { key: "participants", label: "JUMLAH\nPESERTA" },
  { key: "consumption", label: "JENIS KONSUMSI" },
] as const;

const MONTHS_ID = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatDateID(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
}

type Row = Record<string, string>;

function toRow(b: ApiBooking): Row {
  return {
    unit: b.room.unit.name,
    room: b.room.name,
    capacity: `${b.room.capacity} Orang`,
    date: formatDateID(b.meetingDate),
    time: `${b.startTime} s/d ${b.endTime}`,
    participants: `${b.participantCount} Orang`,
    consumption: b.consumptionType,
  };
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Row[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/bookings?page=${page}&limit=${LIMIT}`)
      .then((res) => res.json())
      .then((data: { data: ApiBooking[]; pagination: Pagination }) => {
        setBookings(data.data.map(toRow));
        setPagination(data.pagination);
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <div className="mb-[28px] flex items-center justify-between">
        <div className="flex items-center gap-[22px]">
          <Link
            href="#"
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
            <h1 className="text-[20px] font-semibold text-[#000]">Ruang Meeting</h1>
            <span className="text-[16px] font-normal text-[#868686]">Ruang Meeting</span>
          </div>
        </div>

        <Link
          href="/booking"
          className="flex h-[49px] w-[174px] items-center justify-center gap-2 rounded-[8px]"
          style={{
            background: "#4a8394",
            boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
              fill="white"
              transform="translate(5, 5)"
            />
          </svg>
          <span className="text-[16px] font-semibold text-white">Pesan Ruangan</span>
        </Link>
      </div>

      <div
        className="overflow-hidden rounded-[12px] border"
        style={{
          background: "#f9fafb",
          borderColor: "#e1e1e1",
          boxShadow: "0 4px 9.013px rgba(204,204,204,0.25)",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-[80px] text-[16px] font-semibold text-[#868686]">
            Memuat data...
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex items-center justify-center py-[80px] text-[16px] font-semibold text-[#868686]">
            Belum ada data pemesanan
          </div>
        ) : (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="px-[31px] py-[38px] text-left text-[16px] font-semibold text-[#000]"
                      style={col.key === "participants" ? { whiteSpace: "pre-line" } : {}}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, idx) => (
                  <tr key={idx} className="border-t" style={{ borderColor: "#e1e1e1", background: "#fff" }}>
                    {COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className="px-[31px] py-[40px] text-[16px] font-semibold"
                        style={{
                          color: ["room", "time", "date", "capacity", "consumption"].includes(col.key)
                            ? "#868686"
                            : "#000",
                          whiteSpace: col.key === "participants" ? "pre-line" : undefined,
                        }}
                      >
                        {booking[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="flex items-center justify-between px-[31px] py-[24px]"
              style={{ background: "#f9fafb" }}
            >
              <span className="text-[16px] font-semibold text-[#000]">
                Showing 1-{bookings.length} of {pagination?.total ?? 0}
              </span>

              <div className="flex items-center gap-[6px]">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex h-[36px] items-center gap-1 rounded-[4px] border px-3 py-2 disabled:opacity-40"
                  style={{ borderColor: "#e9e9e9", background: "#fff" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ transform: "rotate(90deg)" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.23017 0.20938c0.29858-0.2871 0.77336-0.27779 1.06046 0.02079l3.70937 3.93775 3.70938-3.93775c0.2871-0.29858 0.76188-0.30789 1.06045-0.02079 0.29858 0.2871 0.30789 0.76188 0.0208 1.06045l-4.25 4.5c-0.1414 0.14706-0.33661 0.23017-0.54063 0.23017-0.20401 0-0.39922-0.08311-0.54062-0.23017l-4.25-4.5c-0.2871-0.29858-0.27779-0.77336 0.02079-1.06045z"
                      fill="#626262"
                    />
                  </svg>
                  <span className="text-[16px] font-normal text-[#313131]">Back</span>
                </button>

                {pagination &&
                  Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className="flex h-[36px] items-center justify-center rounded-[4px] border px-3 py-2 text-[16px]"
                        style={{
                          background: p === page ? "#ebf5ff" : "#fff",
                          borderColor: p === page ? "#1f65f2" : "#e9e9e9",
                          color: p === page ? "#1f65f2" : "#313131",
                          fontWeight: p === page ? 700 : 400,
                        }}
                      >
                        {p}
                      </button>
                    )
                  )}

                <button
                  type="button"
                  disabled={!pagination || page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-[36px] items-center gap-1 rounded-[4px] border px-3 py-2 disabled:opacity-40"
                  style={{ borderColor: "#e9e9e9", background: "#fff" }}
                >
                  <span className="text-[16px] font-normal text-[#313131]">Next</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.23017 0.20938c0.29858-0.2871 0.77336-0.27779 1.06046 0.02079l3.70937 3.93775 3.70938-3.93775c0.2871-0.29858 0.76188-0.30789 1.06045-0.02079 0.29858 0.2871 0.30789 0.76188 0.0208 1.06045l-4.25 4.5c-0.1414 0.14706-0.33661 0.23017-0.54063 0.23017-0.20401 0-0.39922-0.08311-0.54062-0.23017l-4.25-4.5c-0.2871-0.29858-0.27779-0.77336 0.02079-1.06045z"
                      fill="#626262"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

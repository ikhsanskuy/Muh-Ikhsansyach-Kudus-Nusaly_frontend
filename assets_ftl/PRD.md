# PRD: FTL — Room Booking Management System

## 1. Project Overview

**FTL** is a web-based meeting room booking management system. Users can view existing bookings and create new room reservations through a simple, clean interface based on the `slicing.pen` design file.

## 2. Repository Structure

| Repo | Name |
|------|------|
| Frontend | `ikhsan_nusaly_frontend` |
| Backend | `ikhsan_nusaly_backend` |

Both repos will be pushed to public GitHub.

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Express.js + TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| API Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Auth | None (session-less) |

## 4. Screens

### Screen 1: Room Management Dashboard (`/`)

- **Header**: Gradient navbar (#11191a → #296377) with FTL logo (`assets_ftl/Logo-FTL-no-tagline 1.png`), "FTL" title, notification bell icon, user info (John Doe + avatar `assets_ftl/Ellipse 1.png` + chevron)
- **Sidebar** (left): Home icon (active/highlighted with #4a8394), User/Profile icon (inactive)
- **Page Header**: "Ruang Meeting" title + subtitle, "Pesan Ruangan" (Book Room) CTA button (#4a8394)
- **Data Table**: Lists all bookings with columns:
  - UNIT (organizational unit)
  - RUANG MEETING (room name)
  - KAPASITAS (room capacity)
  - TANGGAL RAPAT (meeting date)
  - WAKTU (time: `start s/d end`)
  - JUMLAH PESERTA (participant count)
  - JENIS KONSUMSI (consumption type)
- **Pagination**: Bottom bar with "Showing 1-10 of 1000", Back/Next buttons, numbered pages (1-5)

### Screen 2: Book Room Form (`/booking`)

- **Header & Sidebar**: Same as Dashboard
- **Breadcrumb**: Ruang Meeting → Pesan Ruangan
- **Section 1 — Informasi Ruang Meeting**:
  - Unit (dropdown: "Pilih Unit")
  - Pilihan Ruangan Meeting (dropdown: "Pilih Ruangan Meeting", filtered by unit)
  - Kapasitas Ruangan (read-only, auto-populated based on room selection)
- **Section 2 — Informasi Rapat**:
  - Tanggal Rapat \* (date picker, required)
  - Pilihan Waktu Mulai (dropdown/time picker)
  - Waktu Selesai (dropdown/time picker)
  - Jumlah Peserta (number input)
  - Jenis Konsumsi (checkboxes: Snack Siang, Makan Siang, Snack Sore)
  - Nominal Konsumsi (number input with "Rp" prefix)
- **Form Actions**:
  - "Batal" (Cancel) — red theme (#ffdcdc bg, #ff0505 text)
  - "Simpan" (Save) — teal button (#4a8394)

## 5. Data Model / ERD

```
Unit
  id            UUID    PK
  name          String
  created_at    DateTime
  updated_at    DateTime

Room
  id            UUID    PK
  name          String
  capacity      Int
  unit_id       UUID    FK → Unit
  created_at    DateTime
  updated_at    DateTime

Booking
  id                UUID    PK
  room_id           UUID    FK → Room
  meeting_date      Date
  start_time        Time
  end_time          Time
  participant_count Int
  consumption_type  String    (comma-separated or JSON)
  consumption_nominal Decimal
  created_at        DateTime
  updated_at        DateTime
```

## 6. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/units` | List all units |
| GET | `/api/rooms?unitId=` | List rooms (filterable by unit) |
| GET | `/api/rooms/:id` | Get room detail (for capacity) |
| GET | `/api/bookings?page=&limit=` | List bookings (paginated) |
| POST | `/api/bookings` | Create new booking |
| PUT | `/api/bookings/:id` | Update a booking |
| DELETE | `/api/bookings/:id` | Delete a booking |

Swagger documentation available at `/api-docs`.

## 7. Design Tokens

| Token | Value |
|-------|-------|
| Primary | `#4a8394` (teal) |
| Primary Dark | `#11191a` |
| Background | `#faf7f7` |
| Surface | `#ffffff` / `#f9fafb` |
| Border | `#e1e1e1` / `#ebebeb` |
| Text Primary | `#000000` / `#232323` |
| Text Secondary | `#868686` |
| Font | Inter |
| Corner Radius | 5px (icons), 8px (buttons), 12px (cards/tables) |
| Table Row Height | 105px |
| Sidebar Width | 91px |
| Page Max Width | 1440px |

## 8. Acceptance Criteria

1. Dashboard page (`/`) displays a paginated table of all room bookings
2. Clicking "Pesan Ruangan" navigates to the booking form (`/booking`)
3. Clicking the back arrow on the booking form navigates back to the dashboard
4. Selecting a Unit filters the Room dropdown (rooms belonging to that unit)
5. Selecting a Room auto-fills the Kapasitas (capacity) field as read-only
6. Tanggal Rapat uses a date picker
7. Waktu fields use dropdowns or time pickers
8. Jenis Konsumsi uses checkboxes (Snack Siang, Makan Siang, Snack Sore)
9. "Simpan" validates all required fields, persists to DB, and redirects to Dashboard
10. "Batal" redirects to Dashboard without persisting
11. API returns paginated results (`/api/bookings?page=1&limit=10`)
12. Swagger UI is accessible at `/api-docs`
13. Backend includes seed data with sample Units and Rooms

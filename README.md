<div align="center">

<!-- ANIMATED HEADER BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0088ff,100:00d2ff&height=200&section=header&text=🚆%20RailJet%20Pro&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Premium%20Railway%20Management%20System&descAlignY=58&descSize=20&animation=fadeIn" width="100%"/>

<!-- BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20%26%20Active-00d2ff?style=for-the-badge&logo=statuspal&logoColor=white" />
  <img src="https://img.shields.io/badge/Version-1.0.0-0088ff?style=for-the-badge&logo=semver&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Made%20With-HTML%20%7C%20CSS%20%7C%20JS-orange?style=for-the-badge&logo=javascript&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Storage-LocalStorage-green?style=flat-square&logo=databricks&logoColor=white" />
  <img src="https://img.shields.io/badge/UI-Glassmorphism-9b59b6?style=flat-square" />
  <img src="https://img.shields.io/badge/Responsive-Yes-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Students-College%20Project-red?style=flat-square" />
</p>

<br/>

> ### **"The smarter way to manage, book, and track train journeys — all in your browser."**

<br/>

</div>

---

## 🌐 Live Demo

> 🚀 **[Open the App → localhost:8000](http://localhost:8000)**  
> Run via any local server (Live Server / Python HTTP).

---

## 📸 App Preview

| Home Page | Login / Sign Up | Dashboard |
|:---------:|:---------------:|:---------:|
| 🏠 Landing Screen | 🔐 Auth Page | 📊 Control Center |
| Hero Banner + Features | Login & Register Tabs | Stats, Bookings, Admin |

---

## ✨ What is RailJet Pro?

**RailJet Pro** is a **fully functional, frontend-only Railway Management System** built using pure HTML, CSS, and JavaScript — with `LocalStorage` serving as the database. No backend required. No frameworks. Just clean, modern, performant code.

It includes a premium UI with glassmorphism components, smooth animations, and a complete end-to-end flow for train search, ticket booking, PNR tracking, and admin management.

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🗂️ Project Structure](#%EF%B8%8F-project-structure)
- [🔄 App Flow](#-app-flow)
- [📦 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📖 Module Details](#-module-details)
- [🛣️ Routes / Pages](#%EF%B8%8F-routes--pages)
- [🗃️ Data Storage Schema](#%EF%B8%8F-data-storage-schema)
- [🐛 Known Bugs Fixed](#-known-bugs-fixed)
- [🤝 Contributing](#-contributing)

---

## 🌟 Features

<table>
  <tr>
    <td>⚡</td>
    <td><strong>Instant Ticket Booking</strong></td>
    <td>Book train tickets in seconds with a streamlined form flow.</td>
  </tr>
  <tr>
    <td>📍</td>
    <td><strong>Real-Time PNR Status</strong></td>
    <td>Track any booking instantly using a PNR number lookup.</td>
  </tr>
  <tr>
    <td>🚄</td>
    <td><strong>Train Search</strong></td>
    <td>Find trains between any two stations with route and schedule info.</td>
  </tr>
  <tr>
    <td>🛡️</td>
    <td><strong>Admin Portal</strong></td>
    <td>Manage all trains — view, add, and delete rail data.</td>
  </tr>
  <tr>
    <td>📊</td>
    <td><strong>Live Dashboard</strong></td>
    <td>See real-time stats: total trains, confirmed bookings, upcoming trips.</td>
  </tr>
  <tr>
    <td>🔐</td>
    <td><strong>Login & Sign Up UI</strong></td>
    <td>Split-screen, glassmorphic auth page with tabbed form switching.</td>
  </tr>
  <tr>
    <td>🎨</td>
    <td><strong>Premium UI Design</strong></td>
    <td>Glassmorphism cards, gradient buttons, smooth hover animations.</td>
  </tr>
  <tr>
    <td>💾</td>
    <td><strong>No Backend Needed</strong></td>
    <td>All data persists using the browser's built-in LocalStorage API.</td>
  </tr>
</table>

---

## 🗂️ Project Structure

```
📦 Railway Management System/
├── 📄 index.html            ← 🏠 Landing & Home Page
├── 📄 auth.html             ← 🔐 Login / Sign Up Page
├── 📄 dashboard.html        ← 📊 Main App Dashboard (SPA)
│
├── 📁 css/
│   ├── 🎨 landing.css       ← Styles for Home Page
│   ├── 🎨 auth.css          ← Styles for Auth Page
│   └── 🎨 style.css         ← Styles for Dashboard
│
└── 📁 js/
    ├── ⚙️ app.js            ← Core SPA Logic (Views + Routing)
    └── 💾 storage.js        ← LocalStorage Data Layer
```

---

## 🔄 App Flow

```
🌐 User Opens Browser
        │
        ▼
┌───────────────────┐
│   index.html      │  ← 🏠 Home / Landing Page
│  (Hero + Features)│
└────────┬──────────┘
         │ Clicks "Get Started" / "Login"
         ▼
┌───────────────────┐
│    auth.html      │  ← 🔐 Login or Sign Up
│  (Tabbed Form UI) │
└────────┬──────────┘
         │ Submits Form → Redirect
         ▼
┌────────────────────────────────────────────────┐
│              dashboard.html                    │  ← 📊 Main App (SPA)
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │            Sidebar Navigation            │  │
│  │  [Dashboard] [Search] [Bookings]         │  │
│  │  [PNR Status] [Admin Portal]             │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ┌─────────────────────────────────────────┐   │
│  │           Content Area (Dynamic)        │   │
│  │                                         │   │
│  │  📊 Dashboard → Stats + Recent Bookings │   │
│  │  🔍 Search  → Train Results → Book Now  │   │
│  │  🎫 Bookings → My Tickets + Cancel      │   │
│  │  📍 PNR     → PNR Lookup                │   │
│  │  🛡️ Admin   → Manage Trains             │   │
│  └─────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
         │
         ▼
   📦 All Data → LocalStorage (Browser)
```

---

## 📦 Tech Stack

| Technology | Purpose | 
|:----------:|:-------:|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Page Structure & Semantic Layout |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Glassmorphism UI, Animations, Layout |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | SPA Logic, DOM Manipulation, Events |
| ![LocalStorage](https://img.shields.io/badge/LocalStorage-API-brightgreen?style=flat) | Persistent Browser-Side Data Storage |
| ![Font Awesome](https://img.shields.io/badge/FontAwesome-6.5-528DD7?style=flat&logo=font-awesome&logoColor=white) | Icons |
| ![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Outfit%20%7C%20Jakarta-4285F4?style=flat&logo=google&logoColor=white) | Premium Typography |

---

## 🚀 Getting Started

### ✅ Prerequisites
- Any modern browser (Chrome, Edge, Firefox)
- Python installed (for simple local server) **OR** VS Code + Live Server extension

### Method 1: Python Server (Recommended)
```bash
# Navigate to project folder
cd "Railway Management System"

# Start server
python -m http.server 8000

# Open in browser
# → http://localhost:8000
```

### Method 2: VS Code Live Server
1. Open project folder in VS Code
2. Right-click `index.html`
3. Click `Open with Live Server`

### Method 3: Direct Open
```bash
# Simply double-click index.html
# ⚠️ Note: LocalStorage may behave differently on file:// protocol
```

---

## 📖 Module Details

### 🏠 Home Page (`index.html`)
- Full-screen hero section with animated gradient background
- Sticky glassmorphic navbar with smooth scroll
- Feature cards with hover micro-animations
- CTA buttons linking to auth flow
- Responsive footer with links

### 🔐 Auth Page (`auth.html`)
- Split-screen layout (image banner left, form right)
- **Login Tab:** Email + Password fields
- **Sign Up Tab:** Name + Email + Password fields
- Tab switching via JavaScript (no reload)
- Form submission redirects to `dashboard.html`

### 📊 Dashboard (`dashboard.html` + `app.js`)
Single Page Application with 5 views, rendered via `renderView()`:

| View | Route Key | Description |
|------|-----------|-------------|
| 📊 Dashboard | `dashboard` | Stats cards + Recent Bookings table |
| 🔍 Search Trains | `search` | Search form + Train result cards |
| 🎫 My Bookings | `bookings` | All bookings with status & cancel option |
| 📍 PNR Status | `pnr-status` | PNR lookup form + detailed result |
| 🛡️ Admin Portal | `admin` | Train management table with delete |

### 💾 Storage Module (`storage.js`)
All data is stored and retrieved from `localStorage`:

| Key | Data | Methods |
|-----|------|---------|
| `railjet_trains` | Train records | `getTrains()`, `saveTrain()`, `deleteTrain()` |
| `railjet_bookings` | Booking records | `getBookings()`, `addBooking()`, `cancelBooking()` |
| `railjet_stations` | Station list | `getStations()` |

---

## 🛣️ Routes / Pages

| File | URL Path | Purpose |
|------|----------|---------|
| `index.html` | `/` | Landing Home Page |
| `auth.html` | `/auth.html` | Login & Sign Up |
| `dashboard.html` | `/dashboard.html` | Main App |

---

## 🗃️ Data Storage Schema

### 🚄 Train Object
```json
{
  "id": "T001",
  "name": "Rajdhani Express",
  "from": "Mumbai",
  "to": "Delhi",
  "departure": "16:00",
  "arrival": "08:30",
  "price": 2400,
  "seats": {
    "total": 100,
    "available": 45
  },
  "days": ["Mon", "Wed", "Fri"]
}
```

### 🎫 Booking Object
```json
{
  "pnr": "RJ84739201",
  "trainId": "T001",
  "trainName": "Rajdhani Express",
  "from": "Mumbai",
  "to": "Delhi",
  "passengerName": "John Doe",
  "seatClass": "3A",
  "price": 2400,
  "date": "2026-05-10",
  "status": "Confirmed"
}
```

---

## 🐛 Known Bugs Fixed

| # | Bug | Status |
|---|-----|--------|
| 1 | Modal overlay blocking dashboard on load (CSS specificity issue) | ✅ Fixed |
| 2 | `name`, `sCls` undefined in booking form (`ReferenceError`) | ✅ Fixed |
| 3 | Missing `travelDate` input field in booking modal | ✅ Fixed |
| 4 | `.hidden` class overridden by `display: flex` on modal | ✅ Fixed with `!important` |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00d2ff,100:0088ff&height=120&section=footer&animation=fadeIn" width="100%"/>

**Built with ❤️ for the 2026 College Project**

⭐ **Star this repo if you found it helpful!** ⭐

</div>

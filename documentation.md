<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0088ff,100:00d2ff&height=180&section=header&text=📘%20Project%20Documentation&fontSize=45&fontColor=ffffff&fontAlignY=38&desc=RailJet%20Pro%20-%20Railway%20Management%20System&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<img src="https://img.shields.io/badge/Document-Technical%20Report-0088ff?style=for-the-badge" />
<img src="https://img.shields.io/badge/Version-1.0.0-00d2ff?style=for-the-badge" />
<img src="https://img.shields.io/badge/Year-2025--2026-blueviolet?style=for-the-badge" />

</div>

---

# 📑 Table of Contents

| # | Section |
|:-:|---------|
| 1 | [Use Case Diagram](#1--use-case-diagram) |
| 2 | [Class Diagram](#2--class-diagram) |
| 3 | [Sequence Diagram](#3--sequence-diagram-book-ticket-flow) |
| 4 | [Activity Diagram](#4--activity-diagram-user-journey) |
| 5 | [Data Flow Diagram (DFD)](#5--data-flow-diagram-dfd) |
| 6 | [ER Diagram](#6--er-diagram) |
| 7 | [System Architecture](#7--system-architecture) |
| 8 | [Module Description](#8--module-description) |
| 9 | [Technology Stack](#9--technology-stack) |
| 10 | [Data Storage Schema](#10--data-storage-schema) |
| 11 | [Test Cases](#11--test-cases) |
| 12 | [Future Scope](#12--future-scope) |

---

# 1. 📐 Use Case Diagram

```
                    ╔══════════════════════════════════════════╗
                    ║        RAILWAY MANAGEMENT SYSTEM         ║
                    ╠══════════════════════════════════════════╣
                    ║                                          ║
   ┌──────────┐     ║   ┌─────────────────────────────┐        ║     ┌──────────┐
   │          │     ║   │      Search Trains           │        ║     │          │
   │          │────>║   │      (Src → Dest)            │        ║     │          │
   │          │     ║   └─────────────────────────────┘        ║     │          │
   │          │     ║                 │                         ║     │          │
   │          │     ║                 ▼                         ║     │          │
   │          │     ║   ┌─────────────────────────────┐        ║     │          │
   │          │────>║   │      Book Ticket             │        ║     │          │
   │          │     ║   │      (Generate PNR)          │        ║     │          │
   │ PASSENGER│     ║   └─────────────────────────────┘        ║     │  ADMIN   │
   │  👤      │     ║                 │                         ║     │  🛡️      │
   │          │     ║                 ▼                         ║     │          │
   │          │     ║   ┌─────────────────────────────┐        ║     │          │
   │          │────>║   │      Check PNR Status        │        ║     │          │
   │          │     ║   └─────────────────────────────┘        ║     │          │
   │          │     ║                 │                         ║     │          │
   │          │     ║                 ▼                         ║     │          │
   │          │     ║   ┌─────────────────────────────┐        ║     │          │
   │          │────>║   │      View Bookings           │        ║<────│          │
   │          │     ║   └─────────────────────────────┘        ║     │          │
   │          │     ║                 │                         ║     │          │
   │          │     ║                 ▼                         ║     │          │
   │          │     ║   ┌─────────────────────────────┐        ║     │          │
   │          │────>║   │      Cancel Booking          │        ║     │          │
   │          │     ║   └─────────────────────────────┘        ║     │          │
   │          │     ║                                          ║     │          │
   └──────────┘     ║   ┌─────────────────────────────┐        ║     │          │
                    ║   │      View All Trains         │<───────║─────│          │
                    ║   └─────────────────────────────┘        ║     │          │
                    ║                 │                         ║     │          │
                    ║                 ▼                         ║     │          │
                    ║   ┌─────────────────────────────┐        ║     │          │
                    ║   │      Delete Train            │<───────║─────│          │
                    ║   └─────────────────────────────┘        ║     └──────────┘
                    ║                                          ║
                    ╚══════════════════════════════════════════╝
```

### Actors & Use Cases Summary

| Actor | Use Cases |
|-------|-----------|
| 👤 **Passenger** | Search Trains, Book Ticket, Check PNR, View Bookings, Cancel Booking |
| 🛡️ **Admin** | View All Trains, Delete Train, View Bookings |

---

# 2. 📦 Class Diagram

```
┌──────────────────────────────────┐
│            Train                 │
├──────────────────────────────────┤
│  - trainId       : String        │
│  - trainName     : String        │
│  - source        : String        │
│  - destination   : String        │
│  - departure     : String        │
│  - arrival       : String        │
│  - price         : Number        │
│  - seatsAvailable: Number        │
│  - seatsTotal    : Number        │
│  - days          : Array         │
├──────────────────────────────────┤
│  + getTrainDetails() : Object    │
│  + updateSeats(delta): void      │
└──────────────┬───────────────────┘
               │
               │ 1 : Many
               │
┌──────────────▼───────────────────┐
│           Booking                │
├──────────────────────────────────┤
│  - pnr           : String        │
│  - passengerName : String        │
│  - trainId       : String        │
│  - trainName     : String        │
│  - from          : String        │
│  - to            : String        │
│  - seatClass     : String        │
│  - price         : Number        │
│  - date          : String        │
│  - status        : String        │
├──────────────────────────────────┤
│  + generatePNR()    : String     │
│  + cancelBooking()  : Boolean    │
│  + getStatus()      : String     │
└──────────────────────────────────┘


┌──────────────────────────────────┐
│           Station                │
├──────────────────────────────────┤
│  - stationId     : String        │
│  - stationName   : String        │
├──────────────────────────────────┤
│  + getStationDetails(): Object   │
└──────────────┬───────────────────┘
               │
               │ 1 : Many
               │
               ▼
           [ Train ]


┌──────────────────────────────────────────┐
│           RailStorage                    │
│        《 Singleton / Service 》          │
├──────────────────────────────────────────┤
│  - KEYS.TRAINS    : String               │
│  - KEYS.BOOKINGS  : String               │
│  - KEYS.STATIONS  : String               │
├──────────────────────────────────────────┤
│  + init()                    : void      │
│  + getTrains()               : Array     │
│  + saveTrain(train)          : void      │
│  + deleteTrain(trainId)      : void      │
│  + getBookings()             : Array     │
│  + addBooking(booking)       : Object    │
│  + cancelBooking(pnr)        : Boolean   │
│  + updateTrainSeats(id,delta): void      │
│  + getStations()             : Array     │
└──────────────────────────────────────────┘
```

### Relationships

```
  Station ──── 1:M ────> Train
  Train   ──── 1:M ────> Booking
  RailStorage ─── manages ──> Train, Booking, Station
```

| Relationship | Type | Description |
|:------------:|:----:|-------------|
| Station → Train | 1 : Many | One station can serve many trains |
| Train → Booking | 1 : Many | One train can have many bookings |
| RailStorage → All | Manages | Central data access layer for all entities |

---

# 3. 🔄 Sequence Diagram (Book Ticket Flow)

```
  ┌──────┐      ┌────────────┐      ┌─────────────┐      ┌──────────────┐      ┌──────────────┐
  │ User │      │ SearchPage │      │ RailStorage  │      │ BookingModal │      │ Confirmation │
  └──┬───┘      └─────┬──────┘      └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
     │                │                     │                     │                     │
     │  Open Search   │                     │                     │                     │
     │───────────────>│                     │                     │                     │
     │                │                     │                     │                     │
     │                │   searchTrains()    │                     │                     │
     │                │────────────────────>│                     │                     │
     │                │                     │                     │                     │
     │                │   trainList[]       │                     │                     │
     │                │<────────────────────│                     │                     │
     │                │                     │                     │                     │
     │  Show Results  │                     │                     │                     │
     │<───────────────│                     │                     │                     │
     │                │                     │                     │                     │
     │  Click "Book"  │                     │                     │                     │
     │───────────────────────────────────────────────────────────>│                     │
     │                │                     │                     │                     │
     │                │                     │                     │  Show Form          │
     │<──────────────────────────────────────────────────────────│                     │
     │                │                     │                     │                     │
     │  Fill Details  │                     │                     │                     │
     │  & Submit      │                     │                     │                     │
     │───────────────────────────────────────────────────────────>│                     │
     │                │                     │                     │                     │
     │                │                     │   addBooking()      │                     │
     │                │                     │<────────────────────│                     │
     │                │                     │                     │                     │
     │                │                     │   generatePNR()     │                     │
     │                │                     │──┐                  │                     │
     │                │                     │  │ Save to          │                     │
     │                │                     │  │ LocalStorage     │                     │
     │                │                     │<─┘                  │                     │
     │                │                     │                     │                     │
     │                │                     │   booking + PNR     │                     │
     │                │                     │────────────────────>│                     │
     │                │                     │                     │                     │
     │                │                     │                     │  Show E-Ticket      │
     │                │                     │                     │────────────────────>│
     │                │                     │                     │                     │
     │  Display PNR & Ticket               │                     │                     │
     │<───────────────────────────────────────────────────────────────────────────────│
     │                │                     │                     │                     │
  ┌──┴───┐      ┌─────┴──────┐      ┌──────┴───────┐      ┌──────┴───────┐      ┌──────┴───────┐
  │ User │      │ SearchPage │      │ RailStorage  │      │ BookingModal │      │ Confirmation │
  └──────┘      └────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
```

---

# 4. 🚶 Activity Diagram (User Journey)

```
                        ┌─────────┐
                        │  START  │
                        └────┬────┘
                             │
                             ▼
                   ┌─────────────────┐
                   │   Open App      │
                   │   (Browser)     │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │   Home Page     │
                   │   (index.html)  │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  Click Login /  │
                   │  Get Started    │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  Auth Page      │
                   │  (auth.html)    │
                   └────────┬────────┘
                            │
                    ┌───────┴───────┐
                    │               │
                    ▼               ▼
             ┌──────────┐    ┌──────────┐
             │  Login   │    │  Sign Up │
             │  Form    │    │  Form    │
             └────┬─────┘    └────┬─────┘
                  │               │
                  └───────┬───────┘
                          │  Submit
                          ▼
                 ┌─────────────────┐
                 │   Dashboard     │
                 │ (dashboard.html)│
                 └────────┬────────┘
                          │
          ┌───────┬───────┼───────┬────────┐
          │       │       │       │        │
          ▼       ▼       ▼       ▼        ▼
     ┌────────┐┌───────┐┌──────┐┌─────┐┌───────┐
     │Dashboard││Search ││Booki-││ PNR ││ Admin │
     │  View  ││Trains ││ ngs  ││Check││Portal │
     └────────┘└───┬───┘└──────┘└─────┘└───────┘
                   │
                   ▼
           ┌───────────────┐
           │ Select Train  │
           └───────┬───────┘
                   │
                   ▼
           ┌───────────────┐
           │ Fill Passenger │
           │   Details     │
           └───────┬───────┘
                   │
                   ▼
           ┌───────────────┐
           │ Confirm       │
           │ Booking       │
           └───────┬───────┘
                   │
                   ▼
           ┌───────────────┐
           │ Generate PNR  │
           │ (Auto)        │
           └───────┬───────┘
                   │
                   ▼
           ┌───────────────┐
           │ View E-Ticket │
           │ Confirmation  │
           └───────┬───────┘
                   │
                   ▼
              ┌─────────┐
              │   END   │
              └─────────┘
```

---

# 5. 📊 Data Flow Diagram (DFD)

## Level 0 — Context Diagram

```
                  ┌──────────────────┐
                  │    PASSENGER     │
                  │       👤         │
                  └────────┬─────────┘
                           │
            Search Request │ │ Train Results
           Booking Details │ │ PNR / Confirmation
             PNR Query     │ │ Booking Status
            Cancel Request │ │ Cancellation Confirmation
                           │ │
                           ▼ │
              ┌────────────────────────────┐
              │                            │
              │     RAILWAY MANAGEMENT     │
              │         SYSTEM             │
              │       (RailJet Pro)        │
              │                            │
              └────────────┬───────────────┘
                           │ │
            Train Mgmt     │ │ Updated Train List
            Delete Request │ │ Confirmation
                           │ │
                           ▼ │
                  ┌──────────────────┐
                  │      ADMIN       │
                  │       🛡️         │
                  └──────────────────┘

                           │
                           ▼
                ┌──────────────────────┐
                │    DATA STORE        │
                │   [LocalStorage]     │
                │   💾                 │
                └──────────────────────┘
```

## Level 1 — Detailed DFD

```
┌───────────┐                                                          ┌───────────┐
│ PASSENGER │                                                          │   ADMIN   │
│    👤      │                                                          │    🛡️      │
└─────┬─────┘                                                          └─────┬─────┘
      │                                                                      │
      │ Search Input                                          Train Mgmt Req │
      │ (From, To)                                                           │
      ▼                                                                      ▼
┌─────────────┐     Fetch Trains     ┌──────────────────┐     View/Delete  ┌──────────────┐
│             │─────────────────────>│                  │<────────────────│              │
│  P1: Search │                      │                  │                  │  P4: Admin   │
│    Train    │<─────────────────────│   D1: LOCAL      │────────────────>│  Manage      │
│             │     Train List       │     STORAGE      │  Updated List   │  Trains      │
└──────┬──────┘                      │                  │                  └──────────────┘
       │                             │   💾              │
       │ Selected Train              │                  │
       ▼                             │  ┌────────────┐  │
┌─────────────┐   Save Booking       │  │railjet_    │  │
│             │─────────────────────>│  │trains      │  │
│  P2: Book   │                      │  ├────────────┤  │
│   Ticket    │<─────────────────────│  │railjet_    │  │
│             │   PNR Generated      │  │bookings    │  │
└──────┬──────┘                      │  ├────────────┤  │
       │                             │  │railjet_    │  │
       │ PNR / Cancel Req            │  │stations    │  │
       ▼                             │  └────────────┘  │
┌─────────────┐  Fetch/Delete        │                  │
│             │─────────────────────>│                  │
│  P3: Manage │                      │                  │
│  Booking    │<─────────────────────│                  │
│             │  Booking Status      │                  │
└─────────────┘                      └──────────────────┘
       │
       │ Status / Confirmation
       ▼
┌───────────┐
│ PASSENGER │
│    👤      │
└───────────┘
```

### Process Summary

| Process | Name | Description |
|:-------:|------|-------------|
| **P1** | Search Train | Takes source & destination, returns matching trains |
| **P2** | Book Ticket | Takes passenger details, saves booking, generates PNR |
| **P3** | Manage Booking | PNR lookup, view bookings, cancel booking |
| **P4** | Admin Manage Trains | View all trains, delete train records |

---

# 6. 🔗 ER Diagram

```
┌─────────────────┐          ┌─────────────────────┐          ┌─────────────────────┐
│                 │          │                     │          │                     │
│    STATION      │          │      TRAIN          │          │     BOOKING         │
│                 │          │                     │          │                     │
├─────────────────┤          ├─────────────────────┤          ├─────────────────────┤
│ 🔑 stationId   │          │ 🔑 trainId          │          │ 🔑 pnr              │
│    name         │          │    name              │          │    passengerName    │
│                 │          │    source (FK)       │          │    trainId (FK)     │
│                 │          │    destination (FK)  │          │    trainName        │
│                 │          │    departure         │          │    from             │
│                 │          │    arrival           │          │    to               │
│                 │          │    price             │          │    seatClass        │
│                 │          │    seatsTotal        │          │    price            │
│                 │          │    seatsAvailable    │          │    date             │
│                 │          │    days[]            │          │    status           │
└────────┬────────┘          └──────────┬──────────┘          └─────────────────────┘
         │                              │                              ▲
         │                              │                              │
         │          ┌───────┐           │          ┌────────┐          │
         └──────────│SERVES │───────────┘          │ BOOKED │──────────┘
            1:M     └───────┘                      └────────┘    1:M
```

### Entity Relationships

| Relationship | Entity A | Entity B | Cardinality | Description |
|:------------:|:--------:|:--------:|:-----------:|-------------|
| **SERVES** | Station | Train | 1 : Many | One station can serve multiple trains |
| **BOOKED** | Train | Booking | 1 : Many | One train can have multiple bookings |

### Entity Attributes

<table>
  <tr>
    <th>🏢 Station</th>
    <th>🚄 Train</th>
    <th>🎫 Booking</th>
  </tr>
  <tr>
    <td>
      🔑 stationId (PK)<br/>
      name
    </td>
    <td>
      🔑 trainId (PK)<br/>
      name<br/>
      source (FK)<br/>
      destination (FK)<br/>
      departure<br/>
      arrival<br/>
      price<br/>
      seatsTotal<br/>
      seatsAvailable<br/>
      days[]
    </td>
    <td>
      🔑 pnr (PK)<br/>
      passengerName<br/>
      trainId (FK)<br/>
      trainName<br/>
      from<br/>
      to<br/>
      seatClass<br/>
      price<br/>
      date<br/>
      status
    </td>
  </tr>
</table>

---

# 7. 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                               │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    PRESENTATION LAYER                         │  │
│  │                                                               │  │
│  │   ┌──────────┐    ┌──────────┐    ┌──────────────────┐       │  │
│  │   │index.html│    │auth.html │    │ dashboard.html   │       │  │
│  │   │(Landing) │    │(Login/   │    │ (Main App SPA)   │       │  │
│  │   │          │    │ Signup)  │    │                  │       │  │
│  │   └──────────┘    └──────────┘    └──────────────────┘       │  │
│  │                                                               │  │
│  │   ┌──────────┐    ┌──────────┐    ┌──────────────────┐       │  │
│  │   │landing   │    │auth.css  │    │ style.css        │       │  │
│  │   │.css      │    │          │    │ (Dashboard)      │       │  │
│  │   └──────────┘    └──────────┘    └──────────────────┘       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                   APPLICATION LAYER                           │  │
│  │                                                               │  │
│  │   ┌──────────────────────────────────────────────────────┐   │  │
│  │   │                    app.js                             │   │  │
│  │   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │   │  │
│  │   │  │Dashboard │ │ Search & │ │ Bookings │ │  PNR   │  │   │  │
│  │   │  │  View    │ │  Book    │ │  View    │ │ Status │  │   │  │
│  │   │  └──────────┘ └──────────┘ └──────────┘ └────────┘  │   │  │
│  │   │  ┌──────────┐                                        │   │  │
│  │   │  │  Admin   │   renderView() → SPA Router            │   │  │
│  │   │  │  Portal  │                                        │   │  │
│  │   │  └──────────┘                                        │   │  │
│  │   └──────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                     DATA LAYER                                │  │
│  │                                                               │  │
│  │   ┌──────────────────────────────────────────────────────┐   │  │
│  │   │                  storage.js                           │   │  │
│  │   │                                                       │   │  │
│  │   │  RailStorage.getTrains()    RailStorage.addBooking()  │   │  │
│  │   │  RailStorage.deleteTrain()  RailStorage.cancelBooking │   │  │
│  │   │  RailStorage.getBookings()  RailStorage.getStations() │   │  │
│  │   └──────────────────────────────────────────────────────┘   │  │
│  │                              │                                │  │
│  │                              ▼                                │  │
│  │              ┌───────────────────────────────┐                │  │
│  │              │      💾 LocalStorage          │                │  │
│  │              │  ┌───────────────────────┐    │                │  │
│  │              │  │ railjet_trains        │    │                │  │
│  │              │  │ railjet_bookings      │    │                │  │
│  │              │  │ railjet_stations      │    │                │  │
│  │              │  └───────────────────────┘    │                │  │
│  │              └───────────────────────────────┘                │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 8. 📚 Module Description

### Module 1: 🏠 Home Page (`index.html`)
| Feature | Detail |
|---------|--------|
| Hero Section | Full-screen with gradient overlay, animated badge, CTA buttons |
| Navigation | Fixed navbar with glassmorphic scroll effect |
| Features | 3 feature cards with icon wraps and hover animations |
| Footer | Brand section + quick links + copyright |

### Module 2: 🔐 Authentication (`auth.html`)
| Feature | Detail |
|---------|--------|
| Layout | Split-screen: image banner (left) + form (right) |
| Login | Email + Password fields with icons |
| Sign Up | Name + Email + Password fields |
| Tab Switch | JavaScript toggle between Login ↔ Sign Up (no reload) |
| Redirect | Form submit → `dashboard.html` |

### Module 3: 📊 Dashboard View
| Feature | Detail |
|---------|--------|
| Stats Cards | Active Trains, Total Bookings, Upcoming Trips |
| Recent Bookings | Table with PNR, Train, Route, Date, Status |
| Refresh | Reload button to refresh data |

### Module 4: 🔍 Search & Book
| Feature | Detail |
|---------|--------|
| Search Form | From/To station selects + Date picker |
| Results | Train cards with schedule, route, price |
| Book Now | Opens modal → Passenger name, Date, Seat class |
| Confirmation | E-Ticket with PNR, QR code icon, full details |

### Module 5: 🎫 Bookings & PNR
| Feature | Detail |
|---------|--------|
| My Bookings | Full table with cancel button for confirmed tickets |
| PNR Lookup | Input PNR → Shows full booking details with status |
| Cancel | Confirms cancellation → Updates status + restores seat |

### Module 6: 🛡️ Admin Portal
| Feature | Detail |
|---------|--------|
| Train Table | ID, Name, From, To, Available/Total Seats |
| Delete | Remove train from system with confirmation |

---

# 9. 💻 Technology Stack

| Technology | Logo | Purpose |
|:----------:|:----:|---------|
| **HTML5** | ![HTML5](https://img.shields.io/badge/-E34F26?style=flat&logo=html5&logoColor=white) | Page structure & semantic markup |
| **CSS3** | ![CSS3](https://img.shields.io/badge/-1572B6?style=flat&logo=css3&logoColor=white) | Glassmorphism UI, animations, responsive layout |
| **JavaScript** | ![JS](https://img.shields.io/badge/-F7DF1E?style=flat&logo=javascript&logoColor=black) | SPA logic, DOM manipulation, event handling |
| **LocalStorage** | 💾 | Persistent client-side data storage |
| **Font Awesome** | ![FA](https://img.shields.io/badge/-528DD7?style=flat&logo=font-awesome&logoColor=white) | Icon library (v6.5) |
| **Google Fonts** | ![GF](https://img.shields.io/badge/-4285F4?style=flat&logo=google&logoColor=white) | Outfit + Plus Jakarta Sans typography |

---

# 10. 🗃️ Data Storage Schema

### 🚄 Train Object (`railjet_trains`)
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

### 🎫 Booking Object (`railjet_bookings`)
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

### 🏢 Station Array (`railjet_stations`)
```json
["Mumbai", "Delhi", "Pune", "Ahmedabad", "Kolkata", "Bangalore", "Chennai", "Agra", "Hyderabad", "Lucknow"]
```

---

# 11. ✅ Test Cases

| # | Test Case | Input | Expected Output | Actual Output | Status |
|:-:|-----------|-------|-----------------|---------------|:------:|
| 1 | Open Home Page | Navigate to `/` | Landing page loads with hero section | Landing page loaded | ✅ Pass |
| 2 | Navigate to Login | Click "Login" button | Auth page opens with Login form | Auth page opened | ✅ Pass |
| 3 | Switch to Sign Up | Click "Sign Up" tab | Sign Up form appears | Sign Up form displayed | ✅ Pass |
| 4 | Login Redirect | Submit login form | Redirects to dashboard | Redirected to dashboard | ✅ Pass |
| 5 | Dashboard Stats | Open Dashboard view | Shows train count, booking count | Stats displayed correctly | ✅ Pass |
| 6 | Search Trains | From: Mumbai, To: Delhi | Shows Rajdhani Express result | Train result shown | ✅ Pass |
| 7 | Book Ticket | Fill name, date, class → Submit | PNR generated, E-Ticket shown | Booking confirmed with PNR | ✅ Pass |
| 8 | Check PNR | Enter valid PNR number | Booking details displayed | Details shown correctly | ✅ Pass |
| 9 | Cancel Booking | Click cancel on confirmed ticket | Status changes to "Cancelled" | Status updated | ✅ Pass |
| 10 | Admin Delete Train | Click delete on train record | Train removed from list | Train deleted | ✅ Pass |
| 11 | Invalid PNR | Enter random PNR "XYZ123" | Error: "Booking not found" | Error message shown | ✅ Pass |
| 12 | Empty Search | Submit search without selecting stations | Alert: "Select both stations" | Alert displayed | ✅ Pass |

---

# 12. 🔮 Future Scope

| # | Enhancement | Description |
|:-:|-------------|-------------|
| 1 | **Backend Integration** | Add Node.js / Express server with MongoDB or PostgreSQL |
| 2 | **Payment Gateway** | Integrate Razorpay / Stripe for real ticket payments |
| 3 | **User Authentication** | JWT-based secure login with bcrypt password hashing |
| 4 | **Real-Time Tracking** | Live GPS-based train tracking on a map |
| 5 | **Mobile App** | React Native / Flutter app for iOS and Android |
| 6 | **Push Notifications** | SMS/Email alerts for booking confirmations and delays |
| 7 | **Seat Selection** | Visual seat map for choosing specific seats |
| 8 | **Multi-Language** | Hindi, Marathi, English language support |
| 9 | **AI Chatbot** | Smart assistant for booking help and FAQs |
| 10 | **Analytics Dashboard** | Revenue, occupancy, and route performance charts |

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00d2ff,100:0088ff&height=120&section=footer&animation=fadeIn" width="100%"/>

**📘 End of Documentation**

**RailJet Pro — Railway Management System © 2026**

</div>

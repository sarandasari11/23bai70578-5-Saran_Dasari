# Experiment 5: Scalable React Application with Redux Toolkit, Context, and Analytics

## 📋 Project Overview

**Experiment 5 (Exp5)** is an extension of Experiment 4, built with **React 19 + Vite**, that upgrades state architecture and app scalability using:

- **Redux Toolkit** (replaces `useReducer` for business state)
- **Context API** (global app concerns like theme + user)
- **useMemo** (derived-performance optimization)
- **React Router multi-page flow** with a **new Reports page**

This project demonstrates modern frontend patterns for maintainable state management, reusable design systems, and interactive analytics UI.

### Student ID: 23BAI70578
### Updated: February 27, 2026

---

> 📌 **Highlight:** Project screenshots are available in `public/Screenshots/` under the `public` folder.

## 🎯 Objective Coverage

This project fulfills the Experiment 5 goals:

- Structured state management with **Redux Toolkit**
- App-wide concerns handled through **Context API**
- Derived computations optimized using **useMemo**
- Multi-page app extended with a **new Experiment 5 page (`/reports`)**
- Consistent and responsive UI/UX maintained across pages

---

## ✨ New Features in Experiment 5

### 1) Redux Toolkit (Replaces `useReducer`)
- **Files:**
	- `src/redux/store.js`
	- `src/redux/cartSlice.js`
- Implemented with:
	- `configureStore`
	- `createSlice`
- Cart slice actions:
	- `addItem`
	- `removeItem`
	- `updateQty`
	- `clearCart`
- Used directly in UI with:
	- `useDispatch` (dispatch actions)
	- `useSelector` (read store state)

### 2) Context API for Global State
- **File:** `src/context/AppContext.jsx`
- Context now manages app-wide concerns:
	- 🌙 Theme mode (`light` / `dark`)
	- 👤 User profile (`name`, `email`, `isLoggedIn`)
	- Actions: `toggleTheme`, `loginUser`, `logoutUser`
- Provider wraps the full app in `App.jsx`.

### 3) useMemo Optimization
- Used for derived data in multiple places:
	- **HomePage:** memoized product search + filter
	- **CartPage:** memoized cart summary (total, average, counts)
	- **ReportsPage:** memoized analytics metrics, distribution, trend data
	- **App.jsx:** memoized MUI theme object from Context theme

### 4) New Experiment 5 Page: Reports
- **Route:** `/reports`
- **Files:**
	- `src/pages/ReportsPage.jsx`
	- `src/pages/ReportsPage.css`
- Demonstrates all required concepts together:
	- Redux state read + dispatch
	- useMemo-driven analytics and derived visuals
	- Context-driven theme/user usage
- Includes interactive dashboard controls:
	- Analysis mode toggle
	- High-value threshold slider
	- Sort selector
	- KPI cards + progress + visualization blocks

### 5) Unified Navigation + Design System
- **Reusable Top Navigation:** `src/components/TopNav.jsx`
- Live cart badge + route highlighting + theme toggle + user chip
- Centralized design tokens in `index.css` / `DarkTheme.css`
- MUI `ThemeProvider` + custom theme factory in `src/theme/muiTheme.js`

### 6) Screenshots Availability
- Project screenshots are available under the **public folder**.
- Path: `public/Screenshots/`

---

## 🧩 Functional Requirements Mapping

### ✅ React Router
- 4 pages with working links:
	- `/` → Home
	- `/login` → Login
	- `/cart` → Cart
	- `/reports` → New Exp5 page

### ✅ useContext
- Global provider created and app wrapped
- Used in multiple components/pages (`TopNav`, `HomePage`, `LoginPage`, `CartPage`, `ReportsPage`)

### ✅ Redux Toolkit
- Store configured via `configureStore`
- Slice created via `createSlice`
- Minimum 3 actions satisfied (4 implemented)
- Redux used in UI across 2+ components (Home, Cart, Reports, TopNav)

### ✅ useMemo
- Derived values memoized with explicit dependencies
- Applied to search/filter, cart totals, and analytics summaries

### ✅ New Exp5 Page
- `ReportsPage` fully connected with Router
- Uses Redux + Context + useMemo together

---

## 🏗️ Project Structure (Exp5)

```text
exp5/
├── public/
│   └── Screenshots/
├── src/
│   ├── components/
│   │   ├── TopNav.jsx
│   │   ├── TopNav.css
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HomePage.css
│   │   ├── LoginPage.jsx
│   │   ├── LoginPage.css
│   │   ├── CartPage.jsx
│   │   ├── CartPage.css
│   │   ├── ReportsPage.jsx      # ✅ New in Exp5
│   │   └── ReportsPage.css      # ✅ New in Exp5
│   ├── redux/
│   │   ├── store.js
│   │   └── cartSlice.js
│   ├── theme/
│   │   └── muiTheme.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── DarkTheme.css
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🔧 Technology Stack

### Core
- React 19.2.0
- Vite 7.3.1
- React Router DOM 7.13.1
- React Redux 9.2.0
- Redux Toolkit 2.11.2

### UI
- MUI Core 7.3.8
- MUI Icons 7.3.8
- Emotion (`@emotion/react`, `@emotion/styled`)
- Custom CSS tokens + dark theme overrides

---

## 🚀 Setup & Run

1. Go to project:
	 ```bash
	 cd exp5
	 ```
2. Install dependencies:
	 ```bash
	 npm install
	 ```
3. Start dev server:
	 ```bash
	 npm run dev
	 ```
4. Build production:
	 ```bash
	 npm run build
	 ```
5. Preview production build:
	 ```bash
	 npm run preview
	 ```

---

## 📱 Pages Overview

### 🏠 HomePage (`/`)
- Product grid with add-to-cart actions
- Search + price segment filters (memoized)
- Experiment 5 features section
- Advanced contact form

### 🔐 LoginPage (`/login`)
- Mock authentication UI
- Context-based user login update
- Theme support preserved

### 🛒 CartPage (`/cart`)
- Redux-backed cart operations
- Quantity controls, remove, clear cart
- useMemo summary cards and totals

### 📊 ReportsPage (`/reports`) — New in Exp5
- Interactive analytics dashboard
- Redux + Context + useMemo combined
- KPI cards, distribution/trend visual sections

---

## 🔄 State Architecture Summary

### Context Layer (Global App Concerns)
- `theme`
- `user`
- `toggleTheme`, `loginUser`, `logoutUser`

### Redux Layer (Business/Data State)
- `cart.items`
- `addItem`, `removeItem`, `updateQty`, `clearCart`

### Derived Layer (useMemo)
- Home filters/search results
- Cart summaries
- Reports analytics + chart-ready values

---

## ✅ Assignment Checklist Status

- Redux Toolkit replaces `useReducer` → **Done**
- useContext global provider + multi-component usage → **Done**
- useMemo optimization with dependencies → **Done**
- Add one new routed page → **Done** (`/reports`)
- Minimum 3 pages + working nav routes → **Done**
- Clean modern responsive UI → **Done**

---

## 🧠 Key Learnings

- Separation of concerns between Context and Redux improves scalability
- useMemo prevents unnecessary recomputation of expensive derived data
- Route-based modular pages make feature extension easier
- Reusable nav/theme system improves consistency and maintainability

---

## 📌 Notes

- This is an extension of Experiment 4 and retains prior features while upgrading architecture.
- README content is aligned to the current Exp5 implementation.


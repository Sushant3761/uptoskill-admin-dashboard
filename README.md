# UpToSkill Admin Dashboard

A premium, modern React + Vite administrative console shell designed for enterprise-grade developer ergonomics and seamless user experiences. Built with a high-fidelity custom CSS Design Token System, robust form validation schemas, responsive grid adaptations, and under-the-hood digital accessibility compliance.

[![React](https://img.shields.io/badge/React-19.0-blue.svg?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev)
[![ESLint](https://img.shields.io/badge/ESLint-10.0-4B32C3.svg?style=flat&logo=eslint)](https://eslint.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

The **UpToSkill Admin Dashboard** is a high-performance, single-page application (SPA) built to serve as a showcase of a fully optimized front-end layout shell. The project features reusable React layouts, custom design tokens, accessible dialog forms, stacking toast notifications, and dynamic UI state fallbacks (loading shimmer placeholders, semantic empty states, and connection failure overlays).

With a clean separation of concerns between hooks, layouts, views, utilities, and components, this dashboard provides a production-ready codebase suited for recruitments, technical reviews, and audits.

---

## Features

### 🎨 Design System & Custom Tokens
- **Centralized variables** mapped in `tokens.css` for a single source of truth.
- **HSL Theme Colors** (Indigo, Purple, Slate, and semantic success/warning/danger alert swatches).
- **Light & Dark Theme Adaptivity** with persistent context states synced to local browser storage.
- **Elevation and Curvature** tokens representing organic layered drop shadows (`--shadow-card`, `--shadow-modal`) and corner radius values.
- **Interactive motions** powered by fluid transition variables (`--transition-fast`, `--transition-normal`).

### 📊 Dashboard Metrics
- **Dynamic Metrics Grid**: Real-time stats display (Total Users, Courses, Enrollments, Pending Approvals, Active Sessions).
- **Visual Analytics**: Interactive cards showcasing positive/negative trend values and directional metrics trend icons.
- **Shimmer Skeletons**: Interactive loading shimmers displaying skeleton placeholders during database synchronization cycles.

### ⚡ Quick Actions
- **Ergonomic Control Bar**: Streamlined access to major admin workflows (Create Course, Add Intern, Manage Approvals, Generate Reports, etc.).
- **Interactive Pipeline Console**: A simulated real-time terminal console displaying transition timings and details of the action dispatch pipeline.

### 🛡️ Form Validation & Ergonomic Inputs
- **Granular Schemas**: Strict fields checkups (email regex matching, name constraints, password complexity checkups, non-empty limits, duplicate registry prevention).
- **Premium Input Elements**: Accessible visual checkmarks/error icons, password visibility eye toggles, and real-time password strength meter bars with descriptive helper hints.
- **Interactive Success States**: Smooth inline banners and stacking toast messages that fade out automatically or support manual dismissal.

### ⏳ UX/UI State Fallbacks
- **Skeleton Cards & Tables**: Shimmering mock nodes representing empty or asynchronously loading data matrices.
- **Semantic Empty State**: Elegant visual fallbacks featuring vector icons and contextual calls to action.
- **Error Banners**: Informative connection error canvases equipped with active "Retry Connection" recovery dispatches.

### 📱 Responsive Optimization
- **Desktop Grid (width >= 1024px)**: Full multi-column view with static sidebar layout.
- **Tablet Drawer (640px <= width <= 1023px)**: Responsive multi-column metrics grids and collapsible menu drawers.
- **Mobile Collision Collapser (width <= 639px)**: Full screen stretching layout equipped with reactive overlays and tap-to-dismiss side sheets.

### ♿ Accessibility Support (A11y)
- **Focus Trapping**: Reusable Modal components trapping active keyboard tabs inside the viewport frame via ref cycles.
- **Aria Annotations**: Complete implementation of screen-reader landmarks (`role="dialog"`, `role="alert"`, `aria-busy`, `aria-invalid`, `aria-describedby`).
- **Keyboard Triggers**: Global Escape-key binding allowing seamless dismissal of layouts, modans, and alerts.

---

## Technologies Used

*   **React (v19.2+)** — Modern component-based view rendering layer utilizing state hooks (`useState`, `useEffect`, `useRef`, `useCallback`).
*   **Vite (v8.0+)** — Lightning-fast build toolchain delivering Hot Module Replacement (HMR).
*   **JavaScript (ES6+)** — Clean, modern JS modules incorporating structural destructuring, array mappings, and asynchronous timers.
*   **Vanilla CSS Design System** — Custom utility classes mapping layout spacings directly to the custom variables pipeline.
*   **Font Awesome (v6.4)** — Beautiful, vector-based glyph configurations and iconography.

---

## Project Structure

A clean, modular folder layout separating features and layers:

```bash
c:/Users/singh/Downloads/UptoSkill Intern Task/
├── dist/                     # Production build artifacts
├── public/                   # Static assets (Favicons, images)
├── src/
│   ├── assets/               # CSS styles & static graphics
│   │   ├── css/
│   │   │   ├── tokens.css    # Centralized CSS Custom Variables
│   │   │   ├── global.css    # Basic reset, layouts & utilities
│   │   │   ├── components.css# Card, button, modal & form styles
│   │   │   └── dashboard.css # Layout structures & media breakpoints
│   │   └── react.svg
│   ├── components/           # Reusable atomic UI elements
│   │   ├── AdminForms.jsx    # Forms and validation logic
│   │   ├── Button.jsx        # Customizable button hierarchy
│   │   ├── Card.jsx          # Modular box card container
│   │   ├── EmptyState.jsx    # Semantic data fallback
│   │   ├── ErrorState.jsx    # Actionable failure overlay
│   │   ├── FormInput.jsx     # Accessible field container
│   │   ├── Header.jsx        # Sidebar navigation header
│   │   ├── LoadingOverlay.jsx# Glassmorphism progress backdrop
│   │   ├── MetricCard.jsx    # Data metrics dashboard card
│   │   ├── Modal.jsx         # Accessible keyboard focus trap
│   │   ├── QuickActions.jsx  # Admin quick actions control
│   │   ├── Sidebar.jsx       # Brand navigation side sheet
│   │   ├── SkeletonCard.jsx  # Metric shimmer placeholder
│   │   ├── SkeletonTable.jsx # Tabular grid shimmer loader
│   │   ├── SpacingPlayground.jsx# Sandbox visual design slider
│   │   ├── TerminalConsole.jsx# Pipeline log console
│   │   ├── Toast.jsx         # Auto dismiss status alert
│   │   └── TokenShowcase.jsx # Interactive Design Token showcase
│   ├── hooks/
│   │   └── useForm.js        # Custom utility form wrapper
│   ├── layouts/
│   │   └── DashboardLayout.jsx# Global layout wrapper shell
│   ├── pages/
│   │   ├── DesignTokensPage.jsx# Metrics grid & design token sandbox
│   │   └── ComponentCatalogPage.jsx# Components, form suites & directories
│   ├── utils/
│   │   └── validation.js     # Form schemas & MOCK database
│   ├── index.css             # Main stylesheet imports
│   ├── App.jsx               # App entrypoint, state management
│   └── main.jsx              # DOM rendering
├── index.html                # HTML entry document
├── package.json              # Project scripts & dependencies
├── eslint.config.js          # ESLint rules configuration
└── vite.config.js            # Vite configurations
```

---

## Installation

Verify that you have [Node.js](https://nodejs.org) (v18+) installed. Clone the repository and install dependencies:

```bash
# Install NPM dependencies
npm install
```

## Running the Application (Development)

To launch the local developer build with Hot Module Replacement (HMR):

```bash
# Start development server
npm run dev
```

The application will be accessible at: `http://localhost:5173`

---

## Production Build

To compile a highly optimized production bundle:

```bash
# Build production bundle
npm run build
```

This compiles a warning-free deployment package into the `dist/` directory:
- `dist/index.html` (Optimized entrypoint)
- `dist/assets/*.css` (Minified custom stylesheets)
- `dist/assets/*.js` (Bundled React logic)

To preview the compiled bundle locally:

```bash
# Run local preview server
npm run preview
```

---

## Screenshots

Below are placeholders representing key dashboard layouts:

```markdown
![Design System Sandbox Dashboard Mockup](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=600&q=80)
*Design System Sandbox featuring live token queries, theme toggle shifts, and linear spacing playground utilities.*

![Administrative Components Showcase](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=600&q=80)
*Administrative component catalogs illustrating buttons hierarchy, real-time input password meters, connection retry states, and accessible modans.*
```

---

## Live Demo

Explore the fully operational deployment here:

🔗 **[UpToSkill Admin Dashboard — Live Preview](https://uptoskill-admin-dashboard.vercel.app)**

---

## GitHub Repository

Source files, audit reviews, and modular layouts are accessible at:

🔗 **[GitHub Repository — uptoskill-admin-dashboard](https://github.com/sushantsingh/uptoskill-admin-dashboard.git)**

---

## Key Learnings

1.  **State Synchronization**: Developed robust caching mechanisms by syncing light/dark styling properties to browser local storage, providing zero layout shifts upon page reload.
2.  **Accessible Components**: Mastered focus trapping inside React portal/refs modal frames. Standardizing keyboard navigation cycles ensures that the application is fully usable by keyboard-only users.
3.  **Strict Variable Architectures**: Gained expert experience building high-fidelity CSS variable registries, enabling seamless global swappability of values across both dark and light modes with zero layout duplication.
4.  **UX State Ergonomics**: Implemented clean, non-blocking visual feedback states, shifting from skeleton shimmers to connection error banners to create a high-fidelity mock experience.

---

## Author

**Sushant Singh**
*Frontend Software Engineer*
- **Portfolio**: [Sushant Singh Portfolios](https://github.com/sushantsingh)
- **LinkedIn**: [Sushant Singh LinkedIn](https://www.linkedin.com)

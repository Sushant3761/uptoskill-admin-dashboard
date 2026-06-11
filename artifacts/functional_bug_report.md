# Functional Bug Report — UpToSkill Admin Dashboard

**Project**: UpToSkill Admin Dashboard  
**Auditor**: Antigravity AI QA Suite  
**Test Date**: June 11, 2026  

---

## 1. Overview & Bug Summary

The UpToSkill Admin Dashboard is in a stable, production-ready state. 
- **Active Defects**: **0** (Zero)
- **Simulated Error Conditions Tested**: **2** (Verifying error states and retry workflows)

By utilizing modular React state components and high-contrast styling guides, the application successfully prevents runtime exceptions and handles connection network failures gracefully.

---

## 2. Simulated Defect Log

Although there are no active runtime bugs, the codebase includes simulated error triggers to verify error-handling boundaries. These simulated anomalies are documented below.

### Bug ID: SIM-01
- **Page Name**: Component Catalog Page (`ComponentCatalogPage.jsx`)
- **Feature Tested**: Intern Directory Registry (Offline state simulation)
- **Severity**: **Medium** (Simulated Error State)
- **Status**: **Fixed / Verifiable** (Graceful recovery works)
- **Issue Description**: On initial page render, the database table displays a connection failure overlay rather than the list of records. This is designed to showcase the system's `ErrorState` layout.
- **Steps to Reproduce**:
  1. Navigate to the "Component Catalog" tab.
  2. Scroll down to the "Intern Directory Registry" section.
  3. Observe that the directory table shows a "Database Synchronize Failure" message.
- **Expected Result**: The table should recover and load the registry entries when clicking the "Retry" button.
- **Actual Result**: Renders a styled alert container. Clicking "Retry" triggers a 1.2-second shimmer loader, and successfully synchronizes with the database, displaying the table rows.

---

### Bug ID: SIM-02
- **Page Name**: Design Tokens Page (`DesignTokensPage.jsx`)
- **Feature Tested**: Dashboard metrics KPI grid (Simulated Network Timeout)
- **Severity**: **Medium** (Simulated Error State)
- **Status**: **Fixed / Verifiable** (Graceful recovery works)
- **Issue Description**: When selecting the "Error" simulator mode in the top-right toolbar, all KPI cards display "Error" instead of numerical data.
- **Steps to Reproduce**:
  1. Open the "Design Tokens" page.
  2. Click the "Error" button in the "SIMULATE STATE" switcher.
  3. Observe that the cards display "Error" text in red and description "Unable to synchronize dashboard metrics".
- **Expected Result**: Clicking the "Retry" button on any card should trigger a re-fetch of the API values and restore the metrics grid data.
- **Actual Result**: Each card displays a retry button. Clicking it issues a toast notification and successfully restores the data to normal values.

---

## 3. Active Runtime Log
No other runtime exceptions, unhandled Promise rejections, or script errors were captured in the console log during manual or automated test execution.

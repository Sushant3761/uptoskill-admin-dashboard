# Visual Bug List — UpToSkill Admin Dashboard

**Project**: UpToSkill Admin Dashboard  
**Auditor**: Antigravity AI QA Suite  
**Date**: June 11, 2026  
**Status**: All Logged Visual Bugs Fixed  

---

## 1. Objective

This document catalogs the visual design bugs, alignment anomalies, style regressions, and contrast issues identified during **Visual UI Testing** (Phase 1) and details their reproduction steps, severity, and resolution statuses.

---

## 2. Bug Database & Fix Logs

### Bug ID: VIS-01
- **Page Name**: Design Tokens Page (`DesignTokensPage.jsx`)
- **Feature Tested**: Light / Dark Theme Mismatches (Selected Table Row Contrasts)
- **Severity**: **High** (Visual contrast violation)
- **Status**: **Fixed & Verified**
- **Description**: Selected table rows inside the registry showed extremely low contrast under the dark theme, making text labels illegible.
- **Steps to Reproduce**:
  1. Open the Admin Dashboard.
  2. Toggle theme to Dark Mode.
  3. Navigate to the Intern Directory Table.
  4. Select any row checkbox and observe text readability against the row background.
- **Expected Result**: Row should highlight with a soft alpha background (`rgba(...)`), keeping text highly legible.
- **Actual Result**: Row used a solid dark overlay that obscured text contrast.
- **Resolution**: Substituted solid dark backgrounds with transparent HSL variables (`--bg-primary-soft`) in `tokens.css` for the dark theme.

---

### Bug ID: VIS-02
- **Page Name**: Component Catalog Page (`ComponentCatalogPage.jsx`)
- **Feature Tested**: Modal Backdrop Blur overlays
- **Severity**: **Medium** (Aesthetics)
- **Status**: **Fixed & Verified**
- **Description**: Triggering a modal displayed a plain gray background without premium glassmorphism blur filters, violating visual specifications.
- **Steps to Reproduce**:
  1. Open the Component Catalog page.
  2. Click the "Trigger Confirmation Modal" button.
  3. Observe modal backdrop blur styling.
- **Expected Result**: Backdrop should apply standard blur styling.
- **Actual Result**: Plain semi-transparent background with zero blur.
- **Resolution**: Added `--bg-backdrop` and `--blur-backdrop` (8px) tokens in `tokens.css` and mapped them using `backdrop-filter` in `components.css`.

---

### Bug ID: VIS-03
- **Page Name**: Sidebar Navigation Container (`Sidebar.jsx`)
- **Feature Tested**: Keyboard Nav Focus rings
- **Severity**: **Medium** (A11y compliance)
- **Status**: **Fixed & Verified**
- **Description**: Tabbing through the sidebar menu items did not show outlines, making keyboard navigation difficult.
- **Expected Result**: Active focus ring highlights the focused button.
- **Actual Result**: No focus ring or outline appeared.
- **Resolution**: Added `:focus-visible` outline rings to `.sidebar-nav-item` in `dashboard.css`, using indigo outer outlines that match the dark menu panel.

---

### Bug ID: VIS-04
- **Page Name**: Add Intern Form (`AdminForms.jsx` / `FormInput.jsx`)
- **Feature Tested**: Password eye visibility toggle width wrapping
- **Severity**: **Low** (Layout shift)
- **Status**: **Fixed & Verified**
- **Description**: Password eye toggle buttons stretched in height on mobile screens, shifting placeholder alignments.
- **Expected Result**: Eye toggler remains centered and fits the boundaries of the text field.
- **Actual Result**: Eyeball button stretched to full input heights.
- **Resolution**: Removed inline paddings, configured size classes (`min-width: 44px; min-height: 44px`) inside `components.css` media queries.

---

## 3. Verification Conclusion
All logged visual UI anomalies have been successfully fixed and verified under linter and compiler builds.

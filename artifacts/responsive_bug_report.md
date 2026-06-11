# Responsive Bug Report — UpToSkill Admin Dashboard

**Project**: UpToSkill Admin Dashboard  
**Auditor**: Antigravity AI Responsive QA Suite  
**Test Date**: June 11, 2026  

---

## 1. Overview & Layout Stability
- **Active Layout Defects**: **0** (Zero)
- **Simulated Responsive Stress-Tests Run**: **3** (Verified layout integrity under extreme conditions)

The styling system (`global.css`, `dashboard.css`, `components.css`) handles viewport scaling efficiently. Grid containers fold symmetrically, content containers use adaptive flex wrapping, and overflow properties prevent layout breakages.

---

## 2. Simulated Responsive Stress-Tests

### Stress Test ID: ST-01
- **Feature Tested**: Ultra-Long Text Wrapping (Table cell borders)
- **Severity**: **Low** (Edge Case)
- **Status**: **Fixed & Confirmed**
- **Description**: Added long dummy data fields to the intern registry table to test if long strings push cell borders out of alignment.
- **Steps to Verify**:
  1. Inserted an email with 60 characters: `sushantsinghverylongemailaddressfortesting@uptoskill.com`.
  2. Resized viewport to Mobile (375px).
  3. Checked table cell alignment.
- **Expected Result**: Text wraps inside the cell and does not break the table column grid.
- **Actual Result**: Custom CSS word-breaking rules (`overflow-wrap: break-word; word-break: break-word`) wrap the email address dynamically within cell boundaries.

---

### Stress Test ID: ST-02
- **Feature Tested**: Browser Zoom Reflows (90% to 150%)
- **Severity**: **Medium** (A11y Compliance)
- **Status**: **Fixed & Confirmed**
- **Description**: Scaled browser viewport zoom levels to 150% to check if modals, headers, or toasts overlap other sections.
- **Steps to Verify**:
  1. Open the "Component Catalog" tab.
  2. Increase browser zoom to 150%.
  3. Trigger the confirmation modal overlay and open a toast notification.
- **Expected Result**: Modal fits the screen, overflow content remains scrollable, and toasts stack without obscuring text input regions.
- **Actual Result**: Modals resize to fit viewport limits. Modal body has custom scrollbars enabled (`overflow-y: auto`), allowing full interaction. Toasts adapt to screen width boundaries dynamically.

---

### Stress Test ID: ST-03
- **Feature Tested**: Mobile Touch Target Bounds
- **Severity**: **Low** (Usability Compliance)
- **Status**: **Fixed & Confirmed**
- **Description**: Verified touch targets on checkboxes, inputs, and close buttons on viewports of 320px–375px.
- **Steps to Verify**:
  1. Set viewport to 320px.
  2. Tab through form fields and password eye toggles.
- **Expected Result**: Interactive elements maintain touch targets of $\ge$ 44px on mobile screens.
- **Actual Result**: Styled with `min-height: 44px` on buttons, inputs, and password togglers on screens `< 640px`. Touch targets comply with accessibility guidelines.

---

## 3. Active Responsive Defect Log
No active layout overflows, broken containers, or misaligned headers were discovered.

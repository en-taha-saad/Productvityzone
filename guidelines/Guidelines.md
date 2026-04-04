# Productivity Zone — Design System Guidelines

# General guidelines

* The app is called **Productivity Zone** — a focused, minimal productivity tool (not a social app)
* Design language is Material 3, custom-themed with flat elevation and border-based depth
* Always use the Inter font family
* Use a base font size of 14px (`bodyMedium`)
* Never use elevation shadows on cards or app bars — use 1px borders for depth instead
* Only use absolute positioning when truly necessary; prefer flexbox and grid layouts
* Always design for both light and dark mode using the token pairs defined below
* Date formats should always be in the format "Jun 10" or "Jun 10, 2026" — never numeric-only (e.g. 04/10)
* Icons must always be from the Material Rounded set (e.g. `search_rounded`, `add_rounded`)
* Chips must always come in sets — never display a single isolated chip
* Never use a dropdown if there are 2 or fewer options — use a segmented control or toggle instead
* The bottom navigation bar must have exactly 5 tabs: Dashboard, Tasks, Notes, Planner, More
* Never use a floating action button (FAB) alongside a bottom navigation bar on desktop — FABs are mobile-only
* Chips in selectors (priority, status) always appear in full sets of 4

---

# Design system guidelines

## Colors

### Brand
* Primary: `#6366F1` (Indigo) — use for main CTAs, active nav item, links, focus rings
* Primary Light: `#818CF8` — use for hover states and tinted containers
* Primary Dark: `#4F46E5` — use for pressed states
* Secondary: `#10B981` (Emerald) — use for success tint and secondary actions

### Semantic
* Error: `#EF4444` — destructive actions, form validation errors, overdue indicators
* Warning: `#F59E0B` — high priority badge, caution states
* Success: `#10B981` — done status, completed tasks, positive feedback
* Info: `#3B82F6` — in-progress status, informational callouts

### Neutrals — Light mode
* Page background: `#F8FAFC`
* Surface (cards, nav bar, sheets): `#FFFFFF`
* Surface variant (inputs, chips): `#F1F5F9`
* Text primary: `#0F172A`
* Text secondary: `#64748B`
* Text tertiary / placeholder: `#94A3B8`
* Dividers: `#E2E8F0`
* Borders: `#CBD5E1`

### Neutrals — Dark mode
* Page background: `#0F172A`
* Surface (cards, nav bar, sheets): `#1E293B`
* Surface variant (inputs, chips): `#334155`
* Text primary: `#F1F5F9`
* Text secondary: `#94A3B8`
* Text tertiary / placeholder: `#64748B`
* Dividers: `#334155`
* Borders: `#475569`
* Dashboard-specific deep background: `#020617` with a top-left ambient indigo radial glow (`#6366F1` at 15% opacity)

### Feature accent colors
Each section of the app has its own accent color used on FABs, section icons, and active states:
* Tasks: `#6366F1`
* Notes: `#F59E0B`
* Planner: `#10B981`
* Habits: `#EC4899`
* Focus: `#8B5CF6`

### Task priority colors
* Low: `#10B981`
* Medium: `#3B82F6`
* High: `#F59E0B`
* Urgent: `#EF4444`

### Task status colors
* To Do: `#94A3B8`
* In Progress: `#3B82F6`
* Done: `#10B981`
* Archived: `#64748B`

---

## Typography

Font family is **Inter** throughout. All weights and sizes below are exact — do not round or substitute.

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Display Large | 32px | 700 | 1.2 | -0.5px |
| Display Medium | 28px | 700 | 1.25 | -0.25px |
| Headline Large | 24px | 700 | 1.3 | -0.25px |
| Headline Medium | 20px | 600 | 1.35 | 0 |
| Headline Small | 18px | 600 | 1.4 | 0 |
| Title Large | 16px | 600 | 1.4 | 0 |
| Title Medium | 15px | 500 | 1.45 | 0 |
| Title Small | 14px | 500 | 1.5 | 0 |
| Body Large | 16px | 400 | 1.5 | 0 |
| Body Medium | 14px | 400 | 1.5 | 0 |
| Body Small | 13px | 400 | 1.5 | 0 |
| Label Large | 14px | 500 | 1.4 | 0.1px |
| Label Medium | 12px | 500 | 1.4 | 0.1px |
| Label Small | 11px | 500 | 1.4 | 0.5px |

* App bar titles use Headline Small (18/600)
* Button labels use Label Large (14/500)
* Bottom nav labels use Label Small (11/500)
* Chip labels use 11.5px / 600 (custom, not from the scale)

---

## Spacing

Always use steps from this scale — do not use arbitrary pixel values:
* xs: 4px — icon-to-text gap, tight internal padding
* sm: 8px — between related elements
* md: 16px — standard card padding, button padding, input padding
* lg: 24px — section gaps, sheet padding
* xl: 32px — large section gaps
* xxl: 48px — hero / full-page vertical padding

---

## Border radius

* sm: 8px — small elements
* md: 12px — buttons, inputs, cards (default)
* lg: 16px — modals, bottom sheets, large cards
* xl: 24px — dashboard cards, banners
* full: 999px — pill chips, FAB, circular avatars

---

## Layout & Breakpoints

* Mobile: < 600px — single column, bottom navigation bar
* Tablet: 600–1023px — single column, bottom navigation bar (treated as mobile-web)
* Desktop: ≥ 1024px (or any native desktop OS) — sidebar navigation (220px wide), multi-column grid

Rules:
* On mobile, use a bottom navigation bar with exactly 5 tabs
* On desktop, use a left sidebar (220px) — never show a bottom nav bar
* Auth forms are full-screen scroll on mobile; centered card (max 440px, radius 16px, with border) on tablet/desktop
* Desktop task and note screens use a master-detail split panel layout

---

## Button

Buttons communicate actions. Always use action-oriented labels (verbs). One primary button per section.

### Variants

* **Primary Button**
  * Purpose: The main action on a screen or form (e.g. "Save", "Create Task", "Sign In")
  * Visual style: Filled `#6366F1`, white text, height 52px, full width, radius 12px, elevation 0
  * Usage: One per section. Shows a white spinner (20×20, stroke 2) while loading. Optional 18px leading icon
* **Outlined Button**
  * Purpose: A supporting or alternative action alongside a primary button
  * Visual style: Transparent fill, 1.5px `#6366F1` border, `#6366F1` text, height 52px, radius 12px
  * Usage: Pair with a primary button — never use alone as the sole CTA
* **Text Button**
  * Purpose: The least important actions that should be available but not emphasized
  * Visual style: No border, no background, `#6366F1` text, Label Large
  * Usage: Inline secondary actions — "Forgot password?", "Skip", "Cancel"
* **Icon Button**
  * Purpose: Compact actions in tight spaces (app bar actions, list item actions)
  * Visual style: Circular tap target (40px), no background, circular ink splash, icon at 50% of button size
  * Usage: Include a tooltip label for accessibility
* **FAB (Mobile Accent)**
  * Purpose: Primary create action; mobile-only
  * Visual style: Circle 52px, white 26px icon, linear gradient (feature accent lightened 10% → feature accent, top-left to bottom-right), 1px white 10% border
  * Usage: One per screen, always uses the feature's accent color. Never use alongside desktop sidebar navigation

---

## Text Field

Text fields are the primary input method for forms and search.

### Usage
Use for all single-line and multiline text capture. Always show a visible label or placeholder. Never leave an input without hint text.

### Variants

* **Default**
  * Visual style: Filled surface variant background, 1px border (`#CBD5E1` light / `#475569` dark), radius 12px, 16px padding all sides
  * Placeholder: Text tertiary color, Body Medium
* **Focused**
  * Visual style: Same fill, border becomes 1.5px `#6366F1`
* **Error**
  * Visual style: Border becomes 1px `#EF4444`; error message below in Label Small `#EF4444`
  * Error text is always shown inline below the field — never in a toast or modal
* **Inline Search**
  * Purpose: Search within a list screen, lives in the app bar title slot
  * Visual style: No fill, no border — inherits app bar background; auto-focuses on open
  * Toggle: search icon button → close icon button

---

## Chip

Chips are compact, pill-shaped labels that represent metadata. Always appear in groups of 3 or more.

### Usage
Use to display task priority, task status, labels, and tags. Never use a chip as a standalone element.

### Variants

* **Meta Chip (base)**
  * Visual style: Pill (radius 999px), min-height 28px, 12px horizontal padding, 6px vertical; background is chip color at 12% opacity; border 0.9px chip color at 34% opacity; label 11.5px weight 600
  * Optional: 14px leading icon on the left; 14px close icon on the right (increases left padding to 10px when removable)
* **Priority Badge**
  * Purpose: Shows task urgency
  * Visual style: Meta Chip with priority color, flag icon, UPPERCASE label
  * Colors: Low `#10B981`, Medium `#3B82F6`, High `#F59E0B`, Urgent `#EF4444`
* **Status Chip**
  * Purpose: Shows task workflow state
  * Visual style: Meta Chip with status color and status icon; border visible when selected, transparent when unselected
  * Colors: To Do `#94A3B8`, In Progress `#3B82F6`, Done `#10B981`, Archived `#64748B`
* **Label Chip**
  * Purpose: User-defined tags/categories
  * Visual style: Meta Chip using the label's custom color
* **Due Date Chip**
  * Purpose: Shows the task due date
  * Visual style: Meta Chip with calendar icon; color shifts to `#EF4444` when the date is overdue

---

## Card

Cards group related content. All cards are flat — do not use elevation shadows except on task cards.

### Usage
Use for list items, dashboard sections, and content containers. Never mix multiple card styles in one list.

### Variants

* **Standard Card**
  * Purpose: Generic content container
  * Visual style: White / `#1E293B` fill, 1px border, radius 12px, elevation 0
  * Usage: Default card for lists and content groups
* **Task Card**
  * Purpose: Represents a single task in a list
  * Visual style: Standard card base + 3px left accent border in priority color + subtle shadow (`rgba(0,0,0,0.06)` blur 6 offset 0 2); circular animated checkbox (22×22px); title in Title Small; chip row below title (status, priority, due date, labels)
  * Usage: Shown in the Tasks list and Dashboard. Long-press opens an inline status picker
* **Dashboard Card**
  * Purpose: Wraps a section on the Dashboard screen (tasks, notes, planner items)
  * Visual style: Radius 20px; header strip (icon + title + optional "View all" link) separated by 1px divider from content
  * Usage: On desktop, arranged in a 2-column grid
* **Focus Banner**
  * Purpose: Prominent CTA to start a focus session, shown on the Dashboard
  * Visual style: Full-width strip, linear gradient `#8B5CF6` → `rgba(#8B5CF6, 0.7)`, radius 16px, padding 24px; headline and body text on left, white "Start" button on right

---

## Navigation

### Variants

* **Bottom Navigation Bar (mobile)**
  * Purpose: Primary navigation on mobile
  * Visual style: 5 tabs (Dashboard, Tasks, Notes, Planner, More); active item uses `#6366F1`; inactive uses text secondary color; Label Small labels; background is surface color; elevation 0
  * Usage: Always show exactly 5 tabs — never add or remove items. Never show on desktop
* **Sidebar (desktop)**
  * Purpose: Primary navigation on desktop
  * Visual style: 220px fixed width; icon + label vertical list; active item has primary accent background tile; app name/logo in header area
  * Usage: Always visible on desktop. Replaces the bottom nav bar entirely
* **App Bar**
  * Purpose: Screen title, back/close actions, contextual actions
  * Visual style: Surface background; Headline Small title, left-aligned; elevation 0; no shadow; no surface tint
  * Usage: Title switches to an inline search field when search mode is active (toggle via search/close icon button)

---

## Dialog & Sheet

### Variants

* **Confirm Dialog**
  * Purpose: Confirm a destructive or irreversible action before proceeding
  * Visual style: Material 3 AlertDialog; Headline Medium title; Body Medium message; two text buttons: Cancel (neutral) + action label (colored — default `#EF4444` for destructive)
  * Usage: Always required before delete operations. Never auto-dismiss
* **Bottom Sheet**
  * Purpose: Contextual pickers and filter panels that don't require full navigation
  * Visual style: Rounded top corners (radius 16px); drag handle bar at top; drag-to-dismiss enabled
  * Usage: Used for task filters, label picker, date picker, note picker
* **Search Dialog**
  * Purpose: Global or scoped search across content
  * Visual style: Full-screen route push on mobile; constrained-width overlay dialog on desktop
  * Usage: Triggered from dashboard or app bar search toggle

---

## State Widgets

### Variants

* **Empty State**
  * Purpose: Shown when a list or section has no content
  * Visual style: Centered column; 64px icon at 40% opacity (`onSurfaceVariant`); Headline Small title; Body Medium subtitle in `onSurfaceVariant`; optional FilledButton with "+" icon
  * Usage: Always provide an action button when the user can fix the empty state themselves (e.g. "Create Task")
* **Loading State**
  * Purpose: Shown while content is being fetched
  * Visual style: Centered `CircularProgressIndicator`; optional Body Medium message in `onSurfaceVariant`
* **Error State**
  * Purpose: Shown when a fetch or action fails
  * Visual style: Centered column; 48px error icon in `#EF4444`; "Something went wrong" title; message body; optional "Try again" FilledButton

---

## Snack Bar

Snack bars deliver brief, non-blocking feedback after an action.

### Usage
* Always use floating behavior
* Use for success confirmations, error notifications, and undo prompts
* Keep messages to a single short sentence

### Visual style
* Radius: 12px
* Background: near-black (`#0F172A`) on light mode; `#334155` on dark mode
* Text: white, Body Medium

---

## Screen patterns

### Auth screens
* Splash: logo centered, loading indicator, then redirects
* Onboarding: 3-page PageView with feature icon, Headline Medium title, Body Medium subtitle, dot page indicators, primary CTA button, skip text button
* Login / Sign Up / Forgot Password: single-column form wrapped in `AuthCardLayout` — full-screen scroll on mobile, centred card (440px max, radius 16px, 1px border, 40px padding) on desktop

### Dashboard
* Opens with a personalized greeting using the user's first name
* Sections: Today's Tasks, Recent Notes, Upcoming Planner Items, Focus Banner
* Mobile: single-column scroll with a speed-dial FAB
* Desktop: 2-column card grid with inline CTAs (no FAB)

### Tasks screen
* Horizontal scrollable filter bar at the top (status + priority chips)
* Task list below; FAB uses the Tasks accent `#6366F1`
* Desktop: master-detail split — list on left, detail panel on right
* Long-press a task card to open an inline status chip picker

### Task create / edit screen
* Large title input (Headline Medium)
* Multiline description input
* Priority selector: 4-chip row, full set always visible
* Status selector: 4-chip row, full set always visible
* Due date picker, label picker (bottom sheet), linked notes section, subtasks section
* Delete action at bottom — always requires a confirm dialog

### Notes screen
* Pinned notes in a horizontal or grid section at the top
* All other notes in a grid/list below
* FAB uses Notes accent `#F59E0B`
* Editor uses rich text (Quill)

### Focus screen
* Circular timer display: 160×160px circle, border `#8B5CF6` at 30% opacity
* `timer_rounded` icon inside at 50% opacity
* Primary CTA: FilledButton "Start 25 min" with `#8B5CF6` fill, min-size 180×52px

---

## Motion

* All transitions: 200–300ms duration
* Task checkbox fill: 200ms `AnimatedContainer`
* Status chip swap: 150ms `AnimatedSwitcher`
* Bottom sheets: slide up with spring curve
* Page transitions: slide from right (Android default)
* FABs: no custom animation — gradient provides visual affordance

---

## Accessibility

* All interactive elements must have semantic labels
* Icon-only buttons must include a tooltip
* Error messages must always be shown inline below the relevant field
* Tooltips are supplementary — do not rely on them for critical information
* Ensure primary `#6366F1` on white background meets WCAG AA for all text sizes in the redesign

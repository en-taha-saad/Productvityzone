# Windows Fluent UI Integration Plan with Clean Architecture

## Summary
- Migrate the Windows app to `fluent_ui` end-to-end, including auth and post-login screens, while keeping Android, iOS, web, macOS, and Linux on the current Material UI.
- Treat Fluent as a Windows presentation concern only. Domain, data, sync, routing, and Riverpod state stay shared and platform-agnostic.
- Do the migration in phases so the app remains shippable after each phase, with architecture cleanup happening alongside the UI work instead of as a separate broad refactor.

## Architecture Rules and Interfaces
- Introduce a small platform layer in `lib/core/platform/` with an `AppPlatformInfo` provider or helper that exposes `isWindowsFluentUi`, `isNonWindowsDesktop`, and `isMaterialPlatform`. This replaces the current shared desktop bucket so Windows can diverge cleanly without changing macOS/Linux behavior.
- Introduce a UI adapter layer in `lib/core/platform_ui/` that owns all platform-specific UI decisions. This layer is the only shared place allowed to know about both Material and Fluent.
- Add explicit interfaces/helpers for cross-cutting UI concerns:
  - `AppDialogService`
  - `AppFeedbackService`
  - `AppDateTimePickerService`
  - `AppMenuPresenter`
  - `AdaptiveAppRoot`
  - `AdaptivePageScaffold`
- Keep `fluent_ui` imports out of `domain/`, `application/`, `data/`, and shared business-state providers. Fluent imports are allowed only in Windows presentation files and in `core/platform_ui/`.
- Keep `material.dart` out of Windows-only Fluent files except where Flutter framework interop is unavoidable.
- Keep route names, route parameters, provider APIs, entity models, repository interfaces, and use-case signatures unchanged.
- Convert current route screens into thin composition entries. Each route widget should choose the correct platform page and delegate to smaller page widgets rather than containing large platform-specific branches inline.
- For oversized screens such as notes, task editor, and note editor, split implementation into page shell, toolbar/header, content panel, dialogs/flyouts, and feedback handlers so Windows migration does not add more logic to already large files.
- Add one short architecture doc at `docs/windows-fluent-architecture.md` that records the allowed layer boundaries, folder layout, and import rules for future contributors.

## Public API and Type Changes
- Add `fluent_ui: ^4.15.1` to dependencies.
- Add `AppPlatformInfo` and adaptive UI service types under `lib/core/platform/` and `lib/core/platform_ui/`.
- Change the app root so Windows uses `FluentApp.router` and all other platforms keep `MaterialApp.router`.
- Keep `GoRouter` config unchanged so URLs and navigation behavior remain stable across platforms.
- Replace direct calls to raw Material dialogs, snackbars, menus, and pickers in shared code with the new adapter services. Call sites keep the same app-level intent but stop depending on Material widgets directly.

## Implementation Changes
- Phase 1: foundation and architecture hardening.
  - Add `fluent_ui` and a Windows-only app root branch.
  - Split platform detection so Windows is no longer grouped with macOS/Linux.
  - Build Fluent and Material theme factories from shared app tokens so colors, spacing, and typography stay consistent across platforms.
  - Refactor `app_button`, confirm dialog, date/time picker, and context feedback helpers to route through the adaptive UI layer first. This creates the seam needed for the rest of the migration.
- Phase 2: shell and low-risk screens.
  - Replace the current Windows shell with Fluent `NavigationView` and `NavigationPane`, while keeping the existing Material shell for other platforms.
  - Migrate settings, profile, splash, onboarding, login, signup, and forgot-password screens to Windows-specific Fluent pages.
  - Move Windows forms to Fluent inputs and buttons, Windows dialogs to `ContentDialog`, and Windows transient feedback to an `InfoBar`-based pattern instead of `SnackBar`.
- Phase 3: main feature surfaces.
  - Migrate dashboard, tasks, notes list, and planner list screens to Windows Fluent page scaffolds.
  - Keep the existing Riverpod providers and use-cases; only presentation widgets change.
  - Replace Windows-only filter sheets, menus, quick actions, and desktop headers with Fluent flyouts, pane actions, command bars, and page headers.
- Phase 4: high-complexity editors and detail views.
  - Migrate task create/edit, task detail, note editor, notes desktop detail panel, planner item create/edit, labels management, and note folders management.
  - Split these large files during migration so each Windows page has dedicated subwidgets and overlay coordinators instead of one large stateful widget.
  - Remove any remaining direct Material primitives from Windows code paths.
- Phase 5: cleanup and enforcement.
  - Remove dead Windows Material branches that are no longer used.
  - Normalize naming so platform-specific files are obvious, for example `*_windows_page.dart` and `*_material_page.dart` or equivalent.
  - Run a final pass to ensure no Windows route still depends on `Scaffold`, `AppBar`, `AlertDialog`, `PopupMenuButton`, `showModalBottomSheet`, `showDatePicker`, `showTimePicker`, or `SnackBar`.

## Clean Code Conventions During Migration
- Each route entry file should stay thin and only decide platform composition.
- Each Windows screen should be built from small widgets with one responsibility: shell, header, actions, list, editor panel, or dialog.
- Side effects such as save, delete, picker opening, and feedback should live in small coordinator/helper methods or presentation services, not inline inside long widget trees.
- Shared presentation models remain shared. Do not create separate Windows domain models or duplicate provider logic.
- Prefer extracting reusable Windows UI primitives once in `core/platform_ui/` instead of rewriting the same Fluent patterns in every feature.
- Do not perform a broad data/domain refactor as part of this work. Architecture cleanup is limited to presentation boundaries and shared UI abstractions needed to support Windows Fluent cleanly.

## Test Plan
- Add widget tests proving Windows uses `FluentApp.router` and non-Windows platforms still use `MaterialApp.router`.
- Add widget tests for adaptive services so dialogs, feedback, pickers, and page scaffolds resolve to the correct platform implementation.
- Add shell tests for Windows navigation selection, route changes, keyboard traversal, and theme mode switching.
- Add smoke tests for Windows auth, dashboard, tasks, notes, planner, settings, and profile flows.
- Add regression tests for Android/web/non-Windows desktop to confirm routing and current Material rendering remain unchanged.
- Add an architecture review check in CI or review scripts to flag forbidden imports such as `fluent_ui` in non-presentation layers and raw Material overlay primitives in Windows-only pages.
- Manually validate Windows behavior for focus states, keyboard navigation, flyouts, dialogs, DPI scaling, resize behavior, and theme switching.

## Assumptions and Defaults
- Scope includes all Windows screens, including pre-login flows.
- Scope excludes custom native title bar and runner window chrome for now; this plan covers in-app Fluent UI only.
- Existing business logic, providers, repositories, and route contracts remain the source of truth and are not re-designed.
- Clean architecture here means stronger layer boundaries, adaptive UI abstraction, and smaller presentation units, not a full repo-wide rewrite.
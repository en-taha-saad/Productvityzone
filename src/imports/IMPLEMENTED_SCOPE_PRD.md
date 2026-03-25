# Productivity Zone - Implemented Scope PRD

Document status: Current-state PRD derived from the codebase on 2026-03-25
Product stage: Alpha / implemented scope
Source of truth: `productivity-zone-app` Flutter client and `productivity-zone-backend` NestJS API

## 1. Executive Summary

Productivity Zone is currently a single-user productivity application centered on:

- authentication and session persistence
- a responsive navigation shell
- a dashboard
- task management
- note management
- shared labels and note folders
- basic profile and settings surfaces

The product is not yet the full multi-module productivity suite implied by the broader vision. Planner, Habits, and Focus are present as navigable screens, but they are placeholders rather than complete product modules.

The implemented product already supports meaningful daily use for capturing, organizing, and linking tasks and notes inside one authenticated workspace.

## 2. Product Definition

### 2.1 Product Statement

Productivity Zone is a responsive personal productivity app that lets an authenticated user:

- sign up, sign in, and restore sessions
- review a dashboard with task and note previews
- create, edit, filter, and manage tasks
- create, edit, filter, pin, and organize notes
- link notes and tasks together
- search tasks and notes from one place

### 2.2 Product Positioning

Current positioning is closer to:

- a task + notes productivity core
- wrapped in a responsive shell
- prepared for future planner, habits, and focus modules

Current positioning is not yet:

- a complete planning suite
- a habits tracker
- a working focus timer product
- a collaboration platform

## 3. Current Release Scope

### 3.1 Included in Current Product

- onboarding flow
- account registration
- login and logout
- JWT-based session restore with refresh-token rotation
- authenticated routing and redirect logic
- responsive shell for mobile, tablet, and desktop
- persisted light/dark/system theme selection
- dashboard summary
- dashboard search across tasks and notes
- task CRUD
- task filtering, search, pagination, and subtasks
- note CRUD
- note pinning, folder assignment, shared label/tag assignment, pagination, and search
- note-to-task linking
- note-to-task conversion
- shared label CRUD
- note folder create/delete and sync behavior
- read-only profile screen
- basic settings screen

### 3.2 Explicitly Out of Scope for Current Product

- planner workflows and calendar management
- habits tracking workflows
- functioning focus timer/session tracking
- real password reset fulfillment
- push notifications or reminder delivery
- rich text note editing
- file attachments
- collaboration or shared workspaces
- offline-first sync
- user profile editing

## 4. Target User

### 4.1 Primary User

A single authenticated end user who wants one place to manage personal tasks and notes.

### 4.2 User Characteristics Implied by the Product

- works alone inside a private account
- values quick capture and simple organization
- wants notes and tasks to be linkable
- may use mobile or desktop layouts interchangeably

There is no implemented support for:

- teams
- shared projects
- multi-user collaboration
- admin roles

## 5. Core User Jobs

The current implementation supports these jobs well:

- "I want to register and log in securely."
- "I want the app to remember my session."
- "I want to see what needs attention today."
- "I want to capture tasks with priority, status, due date, and labels."
- "I want to break work into subtasks."
- "I want to capture plain-text notes quickly."
- "I want to organize notes into folders and shared labels."
- "I want to pin a few important notes."
- "I want to turn a note into a task."
- "I want to link an existing note to a task."
- "I want to search tasks and notes from one dialog."

## 6. Product Experience

### 6.1 Onboarding and Access

The product opens with a three-page onboarding flow for first-time users. Completion is stored locally with shared preferences. Users can skip onboarding or finish it and continue to login.

Available entry flows:

- Sign up with display name, email, and password
- Log in with email and password
- Forgot password request form

Implemented access behavior:

- authenticated users are redirected away from onboarding and auth screens
- unauthenticated users are redirected to onboarding or login depending on onboarding completion
- sessions are restored automatically on app startup

### 6.2 Forgot Password

Forgot password is implemented as a request-and-acknowledge flow only. The backend intentionally returns a generic success message and does not implement reset token issuance or email delivery.

### 6.3 Navigation and Shell

The app uses a responsive shell:

- mobile: bottom navigation
- tablet: navigation rail
- desktop: collapsible and resizable sidebar

Top-level navigable destinations:

- Home / Dashboard
- Tasks
- Notes
- Planner
- Habits
- Focus
- Profile
- Settings

Planner, Habits, and Focus are accessible in navigation but do not provide complete product functionality.
Profile and Settings routes exist, but they are not primary items in the main shell navigation.

## 7. Functional Requirements by Area

### 7.1 Authentication and Session Management

The product shall allow users to:

- register an account with validated email, display name, and password
- log in with validated credentials
- fetch the current authenticated profile via `/auth/me`
- log out and clear local tokens
- continue using a restored session after app relaunch
- automatically refresh access tokens when API requests return `401`

Implemented technical behavior:

- access and refresh tokens are stored in secure storage
- refresh tokens are rotated on login, register, and refresh
- refresh requests are serialized so concurrent `401` failures wait for one refresh attempt
- logout clears stored tokens even if the remote call fails

### 7.2 Dashboard

The dashboard is a real implemented module, not just a placeholder.

The dashboard currently provides:

- greeting based on current local time
- "Today's Tasks" preview
- "Recent Notes" preview
- search entry point
- refresh behavior
- quick-create actions
- placeholder cards for future modules
- focus CTA

#### 7.2.1 Today's Tasks Preview

The dashboard fetches up to 3 tasks due on the current day and excludes:

- archived tasks
- done tasks
- subtasks

Ordering prioritizes higher-priority tasks first.

#### 7.2.2 Recent Notes Preview

The dashboard fetches up to 3 recent notes for the user, ordered by:

- latest `updatedAt`
- latest `createdAt` as tie-breaker

This preview is independent from the main notes list ordering.

#### 7.2.3 Dashboard Search

Dashboard search is implemented as a dialog-based cross-entity search.

Users can:

- type to search
- view grouped task and note results
- filter results between All, Tasks, and Notes
- navigate directly to a result

Search matching rules:

- tasks: title, description, label names
- notes: title, folder, note content text, tags

User-facing query behavior:

- debounced input in the client
- default limit of 8 visible results per entity request

### 7.3 Tasks

Tasks are a fully functional module in the current product.

#### 7.3.1 Task Data Supported

Each task currently supports:

- title
- description
- priority
- status
- due date
- label assignments
- parent task reference
- subtasks
- completion timestamp
- reminder timestamp in the data model

Reminder timestamps exist in the backend and task model, but there is no current end-user reminder scheduling or notification workflow in the UI.

#### 7.3.2 Task List

The task list supports:

- initial loading
- pull-to-refresh on mobile
- infinite scroll / load more
- empty state
- search by title and description
- filtering by status
- filtering by priority
- client-side date filters for Today and custom date
- exclusion of archived tasks from the default visible set

When default filters are active, tasks are grouped visually into:

- Overdue
- Today
- This Week
- Later
- No Date

Desktop tasks use a master-detail experience with:

- searchable list pane
- filter popup
- inline detail panel
- fullscreen detail panel mode
- resizable list pane

#### 7.3.3 Task Create / Edit

Users can create and edit tasks with:

- required title
- optional description
- priority selection
- status selection
- due date selection and clearing
- shared label selection
- linked note selection
- optional parent task when creating a subtask

The task creation/edit experience eagerly loads notes and labels to support linking and tagging.

#### 7.3.4 Task Detail

Task detail supports:

- mark complete / incomplete
- edit task
- archive task
- delete task
- view due date
- view description
- view labels
- view subtasks
- add subtask
- view linked notes
- link additional notes
- unlink notes

### 7.4 Notes

Notes are a fully functional module in the current product.

#### 7.4.1 Note Data Supported

Each note currently supports:

- title
- plain text content
- pinned state
- folder
- shared tags/labels
- linked task reference
- created and updated timestamps

Important implementation detail:

- note content is plain text stored as `content.text`
- rich text editing is not implemented in the user experience

#### 7.4.2 Notes List

The notes list supports:

- initial loading
- pull-to-refresh on mobile
- infinite scroll / load more
- search by title and content
- folder filter
- tag filter
- split display for pinned and unpinned notes
- note creation entry points
- desktop master-detail editing

Main notes list ordering is:

- pinned notes first
- then most recently updated notes

#### 7.4.3 Note Editor

The note editor supports:

- creating a note from scratch
- editing an existing note
- title editing
- plain-text content editing
- folder selection
- shared label/tag selection
- pin/unpin
- delete note
- convert note to task
- link note to task
- unlink note from task
- linked-task preview
- auto-save

Auto-save behavior:

- mobile note editor saves after 1 second of inactivity
- desktop inline editor saves after 800 milliseconds of inactivity

Note creation behavior:

- completely empty notes are not created
- new notes are persisted automatically once title or content has text
- blank titles become `Untitled`

#### 7.4.4 Notes on Desktop

Desktop notes use a master-detail flow with:

- left-side searchable list
- folder/tag filtering
- selectable note rows
- inline editor panel
- pin toggle from the list or editor
- fullscreen editor panel toggle

#### 7.4.5 Note-Task Relationships

Users can:

- link a note to an existing task
- unlink a linked note
- see linked notes from task detail
- see linked task from note detail/editor
- convert a note into a brand-new task and automatically link the note to it

Linking is one-task-per-note through `linkedTaskId`, while a task may have multiple linked notes.

### 7.5 Shared Labels and Tags

The implemented product uses a shared label/tag system across tasks and notes.

Current user-facing behavior:

- labels can be created from the task/note label selector
- labels can be deleted from the selector
- labels have a user-selected color
- selecting labels on a note turns those labels into the note's tags
- deleting a label removes that label/tag from notes and tasks

Case-insensitive canonicalization is implemented so duplicate labels/tags are avoided across naming variants.

Important scope note:

- backend update endpoints exist for labels
- there is no dedicated rename/edit-label management screen in the current app UX

### 7.6 Note Folders

Note folders are implemented as a lightweight organization system for notes.

Current user-facing behavior:

- create folder from the note editor
- choose folder color at creation time
- assign a note to one folder
- delete folder from the note editor or folder selector
- deleting a folder removes the folder assignment from all notes that used it
- folder names are matched case-insensitively

Important scope note:

- backend update endpoints exist for folders
- there is no dedicated rename/edit-folder management screen in the current app UX

### 7.7 Profile

The profile screen is implemented as read-only account access.

Users can:

- view avatar initial
- view display name
- view email
- navigate to settings
- log out

Users cannot currently:

- edit profile details
- upload an avatar
- change password

### 7.8 Settings

Settings currently support:

- theme mode selection: system, light, dark
- local persistence of the theme preference
- app version display

### 7.9 Planner, Habits, and Focus

These routes exist but are not complete product modules.

Current behavior:

- Planner screen: empty state plus inactive add button
- Habits screen: empty state plus inactive add button
- Focus screen: static start button, no running timer/session logic

Dashboard also contains placeholder surfaces for these future modules.

## 8. Business Rules and Limits

The following rules are implemented in code:

- maximum pinned notes per user: 5
- maximum shared tags/labels per user: 10
- maximum note folders per user: 10
- task titles are required
- note titles default to `Untitled` when omitted
- notes and tasks are soft-deleted in main CRUD flows
- note folders and labels are canonicalized case-insensitively
- pinned-note limit is enforced in both frontend guardrails and backend validation

## 9. API Scope

### 9.1 Base API

- global prefix: `/api/v1`
- validation: whitelist + forbid non-whitelisted + transform
- CORS enabled for local browser development origins

### 9.2 Auth Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `GET /auth/me`

### 9.3 Dashboard Endpoints

- `GET /dashboard`
- `GET /dashboard/search`

### 9.4 Task Endpoints

- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

### 9.5 Note Endpoints

- `GET /notes`
- `POST /notes`
- `GET /notes/:id`
- `PATCH /notes/:id`
- `DELETE /notes/:id`
- `PATCH /notes/:id/pin`
- `PATCH /notes/:id/link-task`
- `DELETE /notes/:id/link-task`
- `POST /notes/:id/convert-to-task`
- `DELETE /notes/folders/:folderName`
- `DELETE /notes/tags/:tagName`

### 9.6 Label Endpoints

- `GET /labels`
- `POST /labels`
- `PATCH /labels/:id`
- `DELETE /labels/:id`

### 9.7 Note Folder Endpoints

- `GET /note-folders`
- `POST /note-folders`
- `PATCH /note-folders/:id`
- `DELETE /note-folders/:id`

## 10. Data Model in Active Use

The currently active product surface uses these entities as real application data:

- User
- Task
- TaskLabel
- Label
- Note
- NoteFolder

These entities also exist in the backend codebase but are not exposed as active product modules:

- CalendarEvent
- Habit
- HabitLog
- FocusSession

Their presence in the ORM does not make them part of the currently implemented product scope.

## 11. Non-Functional Characteristics

### 11.1 Platform and UX

- Flutter client with responsive layouts for mobile, tablet, and desktop
- local dev API base URL points to `localhost`, with Android emulator support through `10.0.2.2`
- pull-to-refresh and incremental loading are implemented in task and note lists
- app-wide light and dark themes are available

### 11.2 Security

- JWT access tokens in Authorization header
- refresh-token flow implemented
- local token persistence uses secure storage
- no cookie-based auth

### 11.3 Validation and Error Handling

- backend request DTO validation is active
- frontend maps transport errors into user-facing messages
- major list and editor surfaces show loading, empty, and error states

## 12. Known Gaps and Partial Implementations

The following items exist in some form in code but should not be treated as complete product capabilities:

- forgot password is acknowledgement-only, not a full reset pipeline
- reminder timestamps exist for tasks, but reminders are not surfaced as a working feature
- label update and folder update APIs exist, but no dedicated edit flows are exposed in the main UI
- note tags are technically stored as strings, but the primary UI manages them through the shared label system rather than a free-form tagging composer
- `flutter_quill` and calendar-related dependencies/entities are present, but no rich text or planner workflow is implemented

## 13. Release Framing

The correct way to describe the current product is:

Productivity Zone is an implemented responsive productivity core with production-oriented authentication, a live dashboard, a complete task module, a complete note module, and shared organization primitives, while Planner, Habits, and Focus remain scaffolded for later milestones.

## 14. Next Milestones After Current Scope

The codebase is best prepared for future milestones in this order:

1. Planner module with actual calendar/event workflows
2. Habits module with streaks and logging
3. Focus module with timer/session execution
4. Real reminder and notification delivery
5. Profile editing and account management
6. Rich note editing and richer content models

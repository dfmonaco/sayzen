# Task List: Landing Page with Authentication Modals (BEM Edition)

*Generated from: `prd-landing-page.md`*
*CSS Strategy: Adheres to `docs/ai-context/directives/css-directives.md`*

## Git Workflow

**Create a new branch** before starting:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/landing-page
```

## Overview

This task list outlines the steps to create a new landing page following a strict BEM methodology. All styles will be defined in component-specific CSS files, using Tailwind's `theme()` function for design tokens, and all client-side interactivity will be managed by StimulusJS.

## Relevant Files

### Files to Create
- `app/views/home/index.html.erb`: The main view file for the landing page.
- `app/javascript/controllers/modal_controller.js`: Stimulus controller for modals.
- `app/views/shared/_login_modal.html.erb`: Partial for the login modal.
- `app/views/shared/_signup_modal.html.erb`: Partial for the sign-up modal.
- `app/assets/stylesheets/components/`: Directory for all component CSS.
- `app/assets/stylesheets/components/layout.css`: Styles for the main page layout.
- `app/assets/stylesheets/components/navigation.css`: Styles for the header and footer navigation.
- `app/assets/stylesheets/components/hero.css`: Styles for the main hero section.
- `app/assets/stylesheets/components/button.css`: Styles for all button variants.
- `app/assets/stylesheets/components/card.css`: Styles for feature and testimonial cards.
- `app/assets/stylesheets/components/modal.css`: Styles for the sign-up/sign-in modals.
- `app/assets/stylesheets/components/form.css`: Styles for form elements within modals.
- `test/system/landing_page_test.rb`: System test to validate user flows.

### Files to Modify
- `config/routes.rb`: To set the root path to `home#index`.
- `app/controllers/home_controller.rb`: To render the landing page.
- `app/assets/stylesheets/application.tailwind.css`: To import the new component CSS files.
- `app/controllers/application_controller.rb`: To configure Devise redirects.

## Tasks

- [x] **1.0 Project Setup & Routing**
  - [x] 1.1 Create the feature branch `feature/landing-page`.
  - [x] 1.2 In `config/routes.rb`, set `root "home#index"`.
  - [x] 1.3 Create `app/controllers/home_controller.rb` with an `index` action.
  - [x] 1.4 Create a placeholder file at `app/views/home/index.html.erb`.
  - [x] 1.5 **Test:** Run `rails test` to ensure the setup works.
  - [x] 1.6 **Acceptance:** Commit initial setup (`feat(setup): initialize landing page route`).

- [x] **2.0 BEM Scaffolding & CSS Implementation**
  - [x] 2.1 Create the directory `app/assets/stylesheets/components`.
  - [x] 2.2 Create the CSS files listed above (`layout.css`, `navigation.css`, etc.).
  - [x] 2.3 In `application.tailwind.css`, add `@import "components/*";` to load the new files.
  - [x] 2.4 Systematically translate the utility classes from `landing-page-source.html` into BEM-structured CSS in the corresponding component files. Use `theme()` for all values.
  - [x] 2.5 **Test:** Manually inspect the compiled `application.css` to ensure the new BEM classes are present.
  - [x] 2.6 **Acceptance:** Commit the CSS structure (`feat(css): implement BEM structure and styles for landing page`).

- [x] **3.0 UI Implementation with BEM**
  - [x] 3.1 Copy the HTML structure from `landing-page-source.html` into `app/views/home/index.html.erb`.
  - [x] 3.2 Replace all Tailwind utility classes in the HTML with the corresponding BEM classes defined in the previous step.
  - [x] 3.3 Extract the login and signup modals into `_login_modal.html.erb` and `_signup_modal.html.erb` respectively.
  - [x] 3.4 Render the partials in `index.html.erb`.
  - [x] 3.5 **Test:** Start the server and visually confirm the page renders correctly using the new BEM classes.
  - [x] 3.6 **Acceptance:** Commit the UI structure (`feat(ui): implement landing page UI with BEM classes`).

- [x] **4.0 StimulusJS Modal Implementation**
  - [x] 4.1 Create `app/javascript/controllers/modal_controller.js`.
  - [x] 4.2 Add `data-controller="modal"` to the wrapper in `index.html.erb`.
  - [x] 4.3 Add Stimulus targets and actions to the modals and buttons.
  - [x] 4.4 Implement `open()`, `close()`, and `switch()` actions in the controller.
  - [x] 4.5 **Test:** Create `test/system/landing_page_test.rb` and write a test to verify modals open and close correctly.
  - [x] 4.6 **Acceptance:** Commit the Stimulus implementation (`feat(ui): implement modal interactions with Stimulus`).

- [x] **5.0 Devise Integration**
  - [x] 5.1 In the modal partials, replace `<form>` tags with `form_with` helpers for Devise.
  - [x] 5.2 Configure `after_sign_in_path_for` and `after_sign_up_path_for` in `application_controller.rb` to redirect to `root_path`.
  - [x] 5.3 Ensure Devise error messages are displayed in the modals.
  - [x] 5.4 **Test:** Extend the system test to cover successful and unsuccessful sign-up and sign-in attempts.
  - [x] 5.5 **Acceptance:** Commit Devise integration (`feat(auth): integrate Devise with BEM modals`).

- [x] **6.0 Dynamic Logged-In State**
  - [x] 6.1 In the header, use `if user_signed_in?` to conditionally show "Dashboard"/"Log Out" or "Log In"/"Get Started" buttons.
  - [x] 6.2 **Test:** Add assertions to the system test to verify the header changes after login.
  - [x] 6.3 **Acceptance:** Commit the dynamic view logic (`feat(ui): implement dynamic logged-in state`).

- [x] **7.0 Final Testing & Polish**
  - [x] 7.1 Run the full test suite (`rails test`).
  - [x] 7.2 Manually test all user stories from the PRD.
  - [x] 7.3 Test responsiveness on desktop, tablet, and mobile.
  - [x] 7.4 **Acceptance:** Final commit and prepare for code review (`feat(final): complete landing page implementation`).
# PRD: Landing Page with Authentication Modals

## 1. Feature Overview

- **Feature Name:** Landing Page with Authentication Modals
- **Problem Statement:** The project currently lacks a public-facing landing page to attract new users and provide a clear entry point for signing up or logging in.
- **Solution Summary:** This feature will introduce a visually appealing and responsive landing page based on the provided `landing-page-source.html`. It will include functional sign-up and sign-in modals integrated with the existing Devise authentication system, all managed via StimulusJS controllers.

## 2. Goals & Success Metrics

- **Primary Goals:**
  - Create a compelling and informative landing page that serves as the application's root.
  - Provide a seamless and intuitive sign-up and sign-in experience for users without leaving the landing page.
  - Ensure the landing page is fully responsive and accessible on all major devices.
  - Adhere strictly to Rails conventions and leverage StimulusJS for all client-side interactions.
- **Success Metrics:**
  - The new landing page successfully replaces the default Rails welcome page.
  - Users can successfully register and log in through the modals.
  - The page displays correctly on desktop, tablet, and mobile screen sizes.
- **Business Impact:** A professional landing page will increase user trust and conversions, providing a solid foundation for user growth.

## 3. User Stories

- **As a new user,** I want to see a beautiful and informative landing page so that I can understand what the application does and am encouraged to sign up.
- **As a new user,** I want to be able to sign up for an account easily through a modal window without navigating away from the landing page.
- **As an existing user,** I want to be able to log in to my account easily through a modal window without navigating away from the landing page.
- **As a logged-in user,** I want to see a personalized version of the landing page (e.g., "Go to Dashboard" instead of "Log In").

## 4. Functional Requirements

- **FR-1:** The application's root path (`/`) must render the new landing page.
- **FR-2:** The landing page content and styling must match the provided `landing-page-source.html`.
- **FR-3:** Clicking the "Log In" button shall open a sign-in modal.
- **FR-4:** Clicking any "Get Started" or "Sign Up" button shall open a sign-up modal.
- **FR-5:** The sign-up and sign-in modals' HTML will be present on the initial page load and toggled by StimulusJS controllers.
- **FR-6:** The sign-up form within the modal will submit to the Devise registration path.
- **FR-7:** The sign-in form within the modal will submit to the Devise session path.
- **FR-8:** After a successful sign-up or sign-in, the user will be redirected back to the landing page.
- **FR-9:** The landing page will display a "logged-in" state for authenticated users, hiding the "Log In" and "Sign Up" buttons and showing a link to a user dashboard or a "Log Out" button.
- **FR-10:** All JavaScript functionality for the modals (opening, closing, switching) will be handled by a StimulusJS controller.

## 5. Non-Functional Requirements

- **Performance:** The landing page should load quickly. All assets should be optimized.
- **Security:** All authentication forms must be secure and follow Devise best practices.
- **Compatibility:** The page must be compatible with the latest versions of Chrome, Firefox, Safari, and Edge.

## 6. Non-Goals (Out of Scope)

- A fully functional user dashboard. A placeholder page or link is sufficient for now.
- Social login (e.g., Google, Facebook).
- "Forgot Password" functionality within the modal (this will be handled by the default Devise pages for now).

## 7. User Interface Requirements

- The UI will be implemented as a direct translation of the `landing-page-source.html` file.
- All CSS will be handled by Tailwind CSS, configured within the Rails asset pipeline.
- The modals will appear as overlays on the current page.
- The page must be responsive, adapting to mobile, tablet, and desktop views.

## 8. Technical Considerations

- **Backend:** Ruby on Rails, Devise for authentication.
- **Frontend:** ERB for templating, Tailwind CSS for styling, StimulusJS for JavaScript interactivity.
- **Integration:** The modals will post to the standard Devise controllers. The page will need to handle Devise's success and error responses, potentially by re-rendering the page with appropriate messages.

## 9. Edge Cases & Error Handling

- **Invalid Sign-Up/Sign-In:** If a user submits the form with invalid data (e.g., incorrect password, email already taken), the page should re-render with the appropriate modal open and display the error messages from Devise.
- **Closing Modals:** Users can close modals by clicking the 'X' button, pressing the Escape key, or clicking the modal backdrop.

## 10. Open Questions

- None at this time.

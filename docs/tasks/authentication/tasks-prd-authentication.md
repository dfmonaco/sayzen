## Relevant Files

- `Gemfile` - To add the `devise` gem dependency.
- `config/initializers/devise.rb` - For configuring Devise settings.
- `config/routes.rb` - To define authentication-related routes.
- `app/models/user.rb` - The model representing the User.
- `db/migrate/YYYYMMDDHHMMSS_create_users.rb` - The database migration for the
  users table.
- `app/controllers/application_controller.rb` - To permit additional user
  parameters.
- `app/views/devise/registrations/new.html.erb` - The view for the user
  sign-up form.
- `app/views/devise/sessions/new.html.erb` - The view for the user sign-in
  form.
- `app/views/layouts/application.html.erb` - To add sign-in/sign-out links
  and user-facing messages.
- `test/models/user_test.rb` - Tests for the User model validations and
  logic.
- `test/integration/user_flows_test.rb` - Integration tests for the complete
  sign-up and sign-in flows.

### Notes

- Use `bin/rails test` to run all tests. You can also run a specific test file
  with `bin/rails test path/to/test_file.rb`.
- After completing the tests for each major task, commit the changes. This
  ensures each step is a stable, verified checkpoint.

## Tasks

- [x] 1.0 Set Up and Configure Devise Gem
  - [x] 1.1 Add the `devise` gem to the `Gemfile`.
  - [x] 1.2 Run `bundle install` to install the gem.
  - [x] 1.3 Run the Devise installer: `rails generate devise:install`.
  - [x] 1.4 Configure `config/environments/development.rb` with the default
    URL options for the mailer.
  - [x] 1.5 **Acceptance:** Commit the initial Devise setup.

- [x] 2.0 Create User Model and Add Custom Fields
  - [x] 2.1 Run `rails generate devise User` to create the User model.
  - [x] 2.2 Create a migration to add `first_name` (string), `last_name`
    (string), and `role` (integer) to the `users` table. (Default 'user' will be set in application code using an enum)
  - [x] 2.3 Run `rails db:migrate` to apply the migration.
  - [x] 2.4 **Test:** Write model tests in `test/models/user_test.rb` to
    validate the presence of `first_name`, `last_name`, and `role`.
  - [x] 2.5 **Acceptance:** Commit the User model changes once all model tests
    are passing.

- [ ] 3.0 Implement User Registration (Sign Up)
  - [x] 3.1 Generate Devise views: `rails generate devise:views`.
  - [x] 3.2 Modify `app/views/devise/registrations/new.html.erb` to include
    the `first_name` and `last_name` fields.
  - [x] 3.3 Update `application_controller.rb` to permit the `first_name` and
    `last_name` parameters for the `:sign_up` action.
  - [x] 3.4 **Test:** Write an integration test in
    `test/integration/user_flows_test.rb` to cover the user sign-up
    process from start to finish.
  - [x] 3.5 **Acceptance:** Commit the registration feature once the
    integration test is passing.

- [x] 4.0 Implement User Sessions (Sign In/Sign Out)
  - [x] 4.1 Add sign-in and sign-out links to the main application layout
    (`app/views/layouts/application.html.erb`).
  - [x] 4.2 Ensure user-facing messages (e.g., "Signed in successfully.") are
    displayed in the layout.
  - [x] 4.3 **Test:** Write an integration test in
    `test/integration/user_flows_test.rb` that simulates a user signing in
    and then signing out.
  - [x] 4.4 **Acceptance:** Commit the session functionality once the
    integration test is passing.

- [x] 5.0 Implement Role-Based Access Control
  - [x] 5.1 Add a method in `ApplicationController` or a new concern to
    restrict access based on the `admin` role.
  - [x] 5.2 Create a simple admin-only page/dashboard to test the
    role-based access.
  - [x] 5.3 **Test:** Write an integration test to verify that admin-only pages
    are inaccessible to regular users but accessible to admins.
  - [x] 5.4 **Acceptance:** Commit the role-based access control feature once
    the tests are passing.

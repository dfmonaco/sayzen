require "application_system_test_case"

class LandingPageTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(first_name: "Test", last_name: "User", email: "test@example.com", password: "password", password_confirmation: "password")
  end

  teardown do
    User.destroy_all
  end

  test "visiting the landing page" do
    visit root_url
    assert_selector "h1", text: "Unlock Your World with SayZen"
  end

  test "opening and closing the login modal" do
    visit root_url
    click_on "Log In"
    assert_selector "#loginModal.modal--open"
    find("#closeLoginModal").click
    assert_no_selector "#loginModal.modal--open"
  end

  test "opening and closing the signup modal" do
    visit root_url
    click_on "Get Started"
    assert_selector "#signupModal.modal--open"
    find("#closeSignupModal").click
    assert_no_selector "#signupModal.modal--open"
  end

  test "switching from login to signup modal" do
    visit root_url
    click_on "Log In"
    assert_selector "#loginModal.modal--open"
    click_on "Sign up"
    assert_no_selector "#loginModal.modal--open"
    assert_selector "#signupModal.modal--open"
  end

  test "switching from signup to login modal" do
    visit root_url
    click_on "Get Started"
    assert_selector "#signupModal.modal--open"
    click_on "Log in"
    assert_no_selector "#signupModal.modal--open"
    assert_selector "#loginModal.modal--open"
  end

  test "closing modals with the Escape key" do
    visit root_url
    click_on "Log In"
    assert_selector "#loginModal.modal--open"
    find("body").send_keys(:escape)
    assert_no_selector "#loginModal.modal--open"

    click_on "Get Started"
    assert_selector "#signupModal.modal--open"
    find("body").send_keys(:escape)
    assert_no_selector "#signupModal.modal--open"
  end

  test "successful sign up" do
    visit root_url
    click_on "Get Started"

    within "#signupModal" do
      fill_in "First Name", with: "New"
      fill_in "Last Name", with: "User"
      fill_in "signup_user_email", with: "new@example.com"
      fill_in "signup_user_password", with: "password"
      fill_in "signup_user_password_confirmation", with: "password"
      click_on "Sign up"
    end

    assert_text "Welcome! You have signed up successfully."
    assert_current_path dashboard_index_path
  end

  test "unsuccessful sign up" do
    visit root_url
    click_on "Get Started"

    within "#signupModal" do
      fill_in "First Name", with: "Test"
      fill_in "Last Name", with: "User"
      fill_in "signup_user_email", with: "test@example.com"
      fill_in "signup_user_password", with: "password"
      fill_in "signup_user_password_confirmation", with: "wrong_password"
      click_on "Sign up"
    end

    assert_selector "#signupModal.modal--open"
    assert_text "Password confirmation doesn't match Password"
  end

  test "successful sign in" do
    visit root_url
    click_on "Log In"

    within "#loginModal" do
      fill_in "login_user_email", with: @user.email
      fill_in "login_user_password", with: "password"
      click_on "Log In"
    end

    assert_text "Signed in successfully."
    assert_current_path dashboard_index_path
  end

  test "unsuccessful sign in" do
    visit root_url
    click_on "Log In"

    within "#loginModal" do
      fill_in "login_user_email", with: @user.email
      fill_in "login_user_password", with: "wrong_password"
      click_on "Log In"
    end

    assert_selector "#loginModal.modal--open"
    assert_text "Invalid Email or password."
  end

  test "header changes after sign in" do
    visit root_url
    assert_text "Log In"
    assert_text "Get Started"
    assert_no_text "Dashboard"
    assert_no_text "Log Out"

    click_on "Log In"
    within "#loginModal" do
      fill_in "login_user_email", with: @user.email
      fill_in "login_user_password", with: "password"
      click_on "Log In"
    end

    assert_text "Signed in successfully."
    assert_current_path dashboard_index_path
    assert_no_text "Log In"
    assert_no_text "Get Started"
    assert_text "Dashboard"
    assert_text "Log Out"
  end
end
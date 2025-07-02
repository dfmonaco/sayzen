require "application_system_test_case"

class LandingPageTest < ApplicationSystemTestCase
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
end

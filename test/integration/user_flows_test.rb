require "test_helper"

class UserFlowsTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  test "user can sign up with valid details" do
    get new_user_registration_path
    assert_response :success

    assert_difference('User.count', 1) do
      post user_registration_path, params: { user: {
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        password: "password",
        password_confirmation: "password"
      } }
    end

    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_equal "Welcome! You have signed up successfully.", flash[:notice]
  end

  test "user can sign in and sign out" do
    user = users(:john) # Using the fixture user

    # Sign in
    get new_user_session_path
    assert_response :success

    post user_session_path, params: { user: { email: user.email, password: "password" } }
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_equal "Signed in successfully.", flash[:notice]

    # Sign out
    delete destroy_user_session_path
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_equal "Signed out successfully.", flash[:notice]
  end

  test "regular user cannot access admin page" do
    user = users(:john) # Regular user
    sign_in user
    get admin_index_path
    assert_redirected_to root_path
    follow_redirect!
    assert_equal "You are not authorized to access this page.", flash[:alert]
  end

  test "admin user can access admin page" do
    admin_user = users(:jane) # Admin user
    sign_in admin_user
    get admin_index_path
    assert_response :success
    assert_select "h1", "Admin Dashboard"
  end

  private

  def sign_in(user)
    post user_session_path, params: { user: { email: user.email, password: "password" } }
    follow_redirect!
  end
end
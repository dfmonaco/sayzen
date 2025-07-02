require "test_helper"

require "test_helper"

class AdminControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should get index as admin" do
    sign_in users(:jane) # Assuming 'jane' is an admin user from fixtures
    get admin_index_url
    assert_response :success
  end

  test "should not get index as non-admin" do
    sign_in users(:john) # Assuming 'john' is a regular user from fixtures
    get admin_index_url
    assert_redirected_to root_path
    assert_equal "You are not authorized to access this page.", flash[:alert]
  end

  test "should not get index if not signed in" do
    get admin_index_url
    assert_redirected_to new_user_session_path # Devise redirects to sign in page
  end
end

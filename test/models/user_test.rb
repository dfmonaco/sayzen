require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should validate presence of first_name" do
    user = User.new(last_name: "Doe", role: :user)
    assert_not user.valid?
    assert_includes user.errors[:first_name], "can't be blank"
  end

  test "should validate presence of last_name" do
    user = User.new(first_name: "John", role: :user)
    assert_not user.valid?
    assert_includes user.errors[:last_name], "can't be blank"
  end

  

  test "role should default to user" do
    user = User.new(first_name: "John", last_name: "Doe")
    user.save
    assert_equal "user", user.role
  end
end

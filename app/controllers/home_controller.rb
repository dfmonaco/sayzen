class HomeController < ApplicationController
  helper_method :resource_name, :resource, :devise_mapping, :resource_class

  def index
    if resource.errors.any?
      if params[:user] && params[:user][:password_confirmation].present?
        @modal_to_open = "signupModal"
      else
        @modal_to_open = "loginModal"
      end
    end
  end

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def resource_class
    User
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end

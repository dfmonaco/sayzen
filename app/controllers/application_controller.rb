class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  end

  def require_admin
    unless user_signed_in?
      redirect_to new_user_session_path, alert: "You need to sign in or sign up before continuing."
    else
      unless current_user && current_user.admin?
        redirect_to root_path, alert: "You are not authorized to access this page."
      end
    end
  end
end

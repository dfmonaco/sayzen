class Users::SessionsController < Devise::SessionsController
  def create
    self.resource = warden.authenticate(auth_options)
    if self.resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      respond_with resource, location: after_sign_in_path_for(resource)
    else
      self.resource = User.new(sign_in_params)
      self.resource.errors.add(:base, I18n.t('devise.failure.invalid', authentication_keys: 'Email'))
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("loginModal", partial: "shared/login_modal", locals: { resource: self.resource, open: true }) }
        format.html { super }
      end
    end
  end
end
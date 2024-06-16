class ApplicationController < ActionController::Base
  include ApplicationErrorHelper

  # Error handling in controllers
  rescue_from StandardError, with: :handle_standard_error
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
end

# setup to handle different exceptions
module ApplicationErrorHelper
  # Error types
  STANDARD_400 = [ActionDispatch::Http::Parameters::ParseError]
  STANDARD_404 = [ActiveRecord::RecordNotFound, ActionController::RoutingError]
  STANDARD_422 = [
    ActionController::InvalidAuthenticityToken,
    ActionController::ParameterMissing,
    ActionController::UnpermittedParameters,
    ActiveRecord::StatementInvalid,
    ActiveRecord::UnknownAttributeError,
    Mysql2::Error,
  ]

  # renders standard error response
  def handle_standard_error(error)
    case error
    when *STANDARD_404
      render_json(error, :not_found)
    when *STANDARD_422
      render_json(error, :unprocessable_entity)
    when *STANDARD_400
      render_json(error, :bad_request)
    else
      render_json(error, :internal_server_error)
    end
  end

  # renders validation error response
  def handle_validation_error(error)
    render_json(error, :unprocessable_entity)
  end

  # reusable function for rendering error response
  def render_json(error, status)
    render json: { Error: error.message }, status: status
  end
end

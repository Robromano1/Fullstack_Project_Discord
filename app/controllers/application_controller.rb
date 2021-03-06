class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end
 
    def login!(user)
        @user = user 
        session[:session_token] = user.reset_session_token!
    end

    def logout!
        current_user.reset_session_token!
        session[:session_token] = nil
    end

    def logged_in?
        !!current_user
    end

    private
   
    def ensure_logged_in
        unless current_user
            # render json: { base: ['invalid credentials'] }, status: 401
            redirect_to root_url unless logged_in?
        end
    end
end

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  mount ActionCable.server, at: '/cable'
  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:index, :create, :show, :update]
    resources :servers, only: [:index, :show, :create, :update, :destroy]
    resources :messages, only: [:index, :show, :create, :update]
    resources :channels, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:create, :destroy]
  end
end

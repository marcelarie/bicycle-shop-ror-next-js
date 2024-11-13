Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :products do
    resources :components, only: [ :index, :show, :create, :update, :destroy ]
    resources :variants, only: [ :index, :show, :update, :destroy ]
  end
end

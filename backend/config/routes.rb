Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :products do
    resources :components, only: [:index, :show, :create, :update, :destroy]
  end
end

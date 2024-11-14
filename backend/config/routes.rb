Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  get "validate/variant/:id", to: "validate#variant"
  post "validate/combination", to: "validate#combination"
  patch "products/:product_id/stock", to: "stock#update_product"
  patch "variants/:variant_id/stock", to: "stock#update_variant"

  resources :products do
    resources :components, only: [ :index, :show, :create, :update, :destroy ] do
      resources :variants, only: [ :index, :show, :create, :update, :destroy ]
    end
  end
end

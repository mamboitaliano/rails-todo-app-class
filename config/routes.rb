Rails.application.routes.draw do

  resources :task_lists do
    resources :tasks do
      member do
        get 'completed', as: :completed
      end
    end
  end

end

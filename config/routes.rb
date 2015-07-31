Rails.application.routes.draw do

  resources :task_lists do
    resources :tasks
  end

end

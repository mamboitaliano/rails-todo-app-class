Rails.application.routes.draw do

  scope :constraints => lambda{|request| request.accepts.include?(:json)} do
    resources :task_lists do
      resources :tasks do
        member do
          get 'completed', as: :completed
        end
      end
    end
  end

  get '*path', to: 'client_app#show'
  root         to: 'client_app#show'

end

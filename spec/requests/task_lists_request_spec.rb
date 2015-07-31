
describe "task_lists", :type => :request do
  it "creates a task_lists and redirects to the task_list's page" do
    get "/task_lists/new"
    expect(response).to render_template(:new)

    post "/task_lists", task_list: {name: "My List"}

    expect(response).to redirect_to(assigns(:task_list))
    follow_redirect!

    expect(response).to render_template(:show)
    expect(response.body).to include("My List")
  end


end

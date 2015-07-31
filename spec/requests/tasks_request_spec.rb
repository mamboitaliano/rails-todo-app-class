describe "tasks", :type => :request do
  before(:each) do
    TaskList.destroy_all
  end

  it "creates a task and redirects to the task_list's page" do

    task_list = TaskList.create(name: "Challah")
    task_list.id
    get "/task_lists/#{task_list.id}/tasks/new"
    expect(response).to render_template(:new)

    post "/task_lists/#{task_list.id}/tasks", task: {task_list_id: task_list.id, description: "Buy eggs"}
    p task_list.id
    expect(response).to redirect_to("/task_lists/#{task_list.id}")
    follow_redirect!

    expect(response).to render_template("task_lists/show")
    expect(response.body).to include("Challah")
    expect(response.body).to include("Buy eggs")
  end


end

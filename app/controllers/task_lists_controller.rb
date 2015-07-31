class TaskListsController < ApplicationController

  def index
    @task_lists = TaskList.all
  end

  def show
    @task_list = TaskList.find(params[:id])
    @tasks = Task.where(task_list_id: @task_list.id)
  end

  def new
    @task_list = TaskList.new()
  end

  def create
    @task_list = TaskList.new(task_list_params)
    if @task_list.save!
      redirect_to @task_list
    else
      render 'new'
    end
  end


  private

  def task_list_params
    params.require(:task_list).permit(:name)
  end

end

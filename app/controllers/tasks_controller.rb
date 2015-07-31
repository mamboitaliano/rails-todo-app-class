class TasksController < ApplicationController

  def new
    @task = Task.new
    @task_list = TaskList.find(params[:task_list_id])
  end

  def create
    @task = Task.new(task_params)
    @task.task_list_id = params[:task_list_id]
    if @task.save!
      redirect_to task_list_path(params[:task_list_id])
    else
      render 'new'
    end
  end

  def edit
    @task= Task.find(params[:id])
    @task_list = TaskList.find(params[:task_list_id])
  end

  def update
    @task= Task.find(params[:id])
    if @task.update(task_params)
      redirect_to task_list_path(params[:task_list_id])
    else
      render 'edit'
    end
  end

  def completed
    @task = Task.find(params[:id])
    @task.completed = true
    @task.save!
    redirect_to task_list_path(params[:task_list_id])
  end

  def destroy
    @task= Task.find(params[:id])
    @task.destroy
    redirect_to task_list_path(params[:task_list_id])
  end

  private
  def task_params
    params.require(:task).permit(:description)
  end


end

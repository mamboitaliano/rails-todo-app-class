class TasksController < ApplicationController

  def new
    task = Task.new
  end

  def create
    task = Task.new(task_params)
    task.task_list_id = params[:task_list_id]
    if task.save!
      render json: task, status: :created
    else
      render_errors(task)
    end
  end

  def edit
    task= Task.find(params[:id])
    task_list = TaskList.find(params[:task_list_id])
  end

  def update
    task= Task.find(params[:id])
    if task.update(task_params)
      render json: task
    else
      render_errors(task)
    end
  end

  def completed
    task = Task.find(params[:id])
    if task.completed == true
      task.update_attributes(completed: false)
    else
      task.update_attributes(completed: true)
    end
    render json: task
  end

  def destroy
    task= Task.find(params[:id])
    if task.destroy
      render json: task
  end

  private
    def task_params
      params.require(:task).permit(:description)
    end

    def render_errors(task)
      render :json{
        errors: task.errors.full_messages.join(', ')
      }, status: :bad_request
    end


end

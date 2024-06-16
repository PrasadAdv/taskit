class TasksController < ApplicationController
  protect_from_forgery
  before_action :fetch_task, only: %i[ show update destroy ]

  def display
  end
  # GET /tasks
  def index
    tasks = Task.all
    render json: tasks
  end

  # GET /tasks/1
  def show
    render json: @task, status: :ok
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)
    @task.save!
    render json: @task, status: :created, location: @task
  end

  # PATCH/PUT /tasks/1
  def update
    @task.update!(task_params)
    render json: @task, status: :ok, location: @task
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy!
    head :no_content, location: @task
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def fetch_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :status)
    end
end

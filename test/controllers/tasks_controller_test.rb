require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:one)
  end

  test "should get index" do
    get tasks_url
    assert_response :success
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { description: @task.description, status: @task.status, title: @task.title } }
    end

    assert_response :created
  end

  test "should show task" do
    get task_url(@task)
    assert_response :success
  end


  test "should update task" do
    patch task_url(@task), params: { task: { description: @task.description, status: @task.status, title: @task.title } }
    assert_response :success
  end

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task)
    end

    assert_response :no_content
  end
end

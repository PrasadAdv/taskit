class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :title, limit: 40, null: false
      t.text :description
      t.string :status, default: 'To do', null: false

      t.timestamps
    end
  end
end

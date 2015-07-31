class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :description
      t.integer :task_list_id
      t.timestamps null: false
    end
  end
end

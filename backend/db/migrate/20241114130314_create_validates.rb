class CreateValidates < ActiveRecord::Migration[7.2]
  def change
    create_table :validates do |t|
      t.timestamps
    end
  end
end

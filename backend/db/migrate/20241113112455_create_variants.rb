class CreateVariants < ActiveRecord::Migration[7.2]
  def change
    create_table :variants do |t|
      t.string :name
      t.decimal :price, precision: 10, scale: 2, null: false
      t.references :component, null: false, foreign_key: true

      t.timestamps
    end
  end
end

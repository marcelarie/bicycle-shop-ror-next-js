class AddStockToVariants < ActiveRecord::Migration[7.2]
  def change
    add_column :variants, :stock, :integer, null: false, default: 0
  end
end

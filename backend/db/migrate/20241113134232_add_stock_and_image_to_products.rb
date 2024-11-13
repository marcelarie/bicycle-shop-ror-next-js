class AddStockAndImageToProducts < ActiveRecord::Migration[7.2]
  def change
    add_column :products, :stock, :integer
    add_column :products, :image, :string
  end
end

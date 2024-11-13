class AddStockAndImageToComponents < ActiveRecord::Migration[7.2]
  def change
    add_column :components, :stock, :decimal
    add_column :components, :image, :string
  end
end

class RemoveStockFromComponents < ActiveRecord::Migration[7.2]
  def change
    remove_column :components, :stock, :integer
  end
end

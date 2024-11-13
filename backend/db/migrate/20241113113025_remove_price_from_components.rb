class RemovePriceFromComponents < ActiveRecord::Migration[7.2]
  def change
    remove_column :components, :price, :decimal
  end
end

class ChangeImageToOptional < ActiveRecord::Migration[7.2]
  def change
    change_column :products, :image, :string, null: true
  end
end

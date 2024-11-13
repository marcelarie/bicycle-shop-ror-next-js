class AddImageToVariants < ActiveRecord::Migration[7.2]
  def change
    add_column :variants, :image, :string
  end
end

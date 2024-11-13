class Product < ApplicationRecord
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :name, presence: true, uniqueness: true
  validates :stock, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :image, presence: true

  has_many :components, dependent: :destroy
end

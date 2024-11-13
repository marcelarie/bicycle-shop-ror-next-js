class Product < ApplicationRecord
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :name, presence: true, uniqueness: true

  has_many :components, dependent: :destroy
end

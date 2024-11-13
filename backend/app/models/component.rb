class Component < ApplicationRecord
  belongs_to :product

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than: 0 }
end

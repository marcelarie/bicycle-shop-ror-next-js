class Component < ApplicationRecord
  belongs_to :product
  has_many :variants, dependent: :destroy

  validates :name, presence: true
  validates :variants, length: { minimum: 1, message: "must have at least one variant" }
  validates :stock, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :image, presence: true

  accepts_nested_attributes_for :variants
end

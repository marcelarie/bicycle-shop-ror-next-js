class Component < ApplicationRecord
  belongs_to :product
  has_many :variants, dependent: :destroy

  validates :name, presence: true
  validates :variants, length: { minimum: 1, message: "must have at least one variant" }
  validates :image, presence: true

  accepts_nested_attributes_for :variants
end

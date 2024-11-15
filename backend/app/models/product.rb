class Product < ApplicationRecord
  validates :price, presence: true, numericality: { greater_than: 0 }
  validates :name, presence: true, uniqueness: true
  validates :stock, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :image,
            format: {
              with: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
              message: "must be a valid URL"
            },
            allow_blank: true

  has_many :components, dependent: :destroy

  accepts_nested_attributes_for :components
end

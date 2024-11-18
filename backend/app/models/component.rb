class Component < ApplicationRecord
  belongs_to :product
  has_many :variants, dependent: :destroy

  validates :name, presence: true
  validates :variants,
            length: { minimum: 1, message: "must have at least one variant" }
  validates :image,
            format: {
              with: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
              message: "must be a valid URL"
            },
            allow_blank: true

  accepts_nested_attributes_for :variants, allow_destroy: true
end

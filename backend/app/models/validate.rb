class Validate < ApplicationRecord
  # Hardcoded validation rules for now
  VARIANT_RULES = {
    # Mountain Bike Wheels
    1 => [
      22, # Full Suspension
      4  # Wide Tires
    ],
    # Big rim
    2 => [
      102, # 29" Rim
      33 # Carbon Fiber
    ]
  }

  # Validate individual variant combinations
  def self.validate_component(variant_id)
    VARIANT_RULES[variant_id] || []
  end
end

# Validates product variant combinations using a hash of incompatible pairs
# Format: variant_id_to_check => [incompatible_variant_ids]
class Validate < ApplicationRecord
  # Hardcoded validation rules for now
  VARIANT_RULES = {
    # Big wheel
    1 => [
      3  # Leather seat
    ],
    # Small wheel
    2 => [
      4 # Basic seat
    ]
  }

  # Validate individual variant combinations
  def self.validate_component(variant_id)
    VARIANT_RULES[variant_id] || []
  end
end

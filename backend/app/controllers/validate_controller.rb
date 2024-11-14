class ValidateController < ApplicationController
  def variant
    variant_id = params[:id].to_i
    invalid_variants = Validate.validate_component(variant_id)

    parsed_variants = Variant.where(id: invalid_variants).map do |variant|
      { id: variant.id, name: variant.name }
    end

    render json: {
             id: variant_id,
             has_invalid_variants: !invalid_variants.empty?,
             invalid_variants: parsed_variants
           }, status: :ok
  end
end

class ValidateController < ApplicationController
  def variant
    variant_id = params[:id].to_i
    conflicting_variantsants = Validate.validate_component(variant_id)

    parsed_variants = Variant.where(id: conflicting_variants).map do |variant|
      { id: variant.id, name: variant.name }
    end

    render json: {
             id: variant_id,
             has_invalid_variants: !conflicting_variants.empty?,
             invalid_variants: parsed_variants
           },
           status: :ok
  end

  def combination
    variant_ids = params[:ids]

    if variant_ids.blank? || !variant_ids.is_a?(Array)
      render json: { error: "Invalid or missing variant ids" },
             status: :bad_request and return
    end

    conflicting_variants = variant_ids.map do |variant_id|
      {
        variant_id: variant_id,
        conflicts: Validate.validate_component(variant_id).filter { |v|
          variant_ids.include?(v)
        }
      }
    end.reject { |v| v[:conflicts].empty? }

    render json: {
      valid: conflicting_variants.empty?,
      conflicting_variants: conflicting_variants
    }
  end
end

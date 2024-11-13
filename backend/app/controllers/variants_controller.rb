class VariantsController < ApplicationController
  before_action :set_component
  before_action :set_variant, only: [:show, :update, :destroy]

  def index
    @variants = @component.variants
    render json: @variants
  end

  def show
    render json: @variant
  end

  def create
    @variant = @component.variants.build(variant_params)

    if @variant.save
      render json: @variant, status: :created
    else
      render json: @variant.errors, status: :unprocessable_entity
    end
  end

  def update
    if @variant.update(variant_params)
      render json: @variant
    else
      render json: @variant.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @variant.destroy
    head :no_content
  end

  private

  def set_component
    @component = Component.find(params[:component_id])
  end

  def set_variant
    @variant = @component.variants.find(params[:id])
  end

  def variant_params
    params.require(:variant).permit(:name, :price, :stock)
  end
end

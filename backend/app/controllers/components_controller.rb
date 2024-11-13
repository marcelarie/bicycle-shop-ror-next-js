class ComponentsController < ApplicationController
  before_action :set_product
  before_action :set_component, only: [ :show, :update, :destroy ]

  def index
    @components = @product.components
    render json: @components
  end

  def show
    render json: @component
  end

  def create
    @component = @product.components.build(component_params)

    if @component.save
      render json: @component, status: :created
    else
      render json: @component.errors, status: :unprocessable
    end
  end

  def update
    if @component.update(component_params)
      render json: @component
    else
      render json: @component.errors, status: :unprocessable
    end
  end

  def destroy
    @component.destroy
    head :no_content
  end

  private

  def set_product
    @product = Product.find(params[:product_id])
  end

  def set_component
    @component = @product.components.find(params[:id])
  end

  def component_params
    params.require(:component).permit(:name, variants_attributes: [ :id, :name, :price, :_destroy ])
  end
end

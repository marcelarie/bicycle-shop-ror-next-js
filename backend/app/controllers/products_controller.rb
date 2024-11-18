class ProductsController < ApplicationController
  before_action :set_product, only: [ :show, :update, :destroy ]

  def index
    @products = Product.includes(components: :variants).all
    render json: @products.to_json(include: { components: { include: :variants } })
  end

  def show
    render json: @product.to_json(include: { components: { include: :variants } })
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    head :no_content
  end

  private

  def set_product
    @product = Product.includes(components: :variants).find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name,
                                    :description,
                                    :price,
                                    :stock,
                                    :image,
                                    components_attributes: [
                                      :id,
                                      :name,
                                      :image,
                                      :_destroy,
                                      variants_attributes: [
                                        :id,
                                        :name,
                                        :price,
                                        :stock,
                                        :image,
                                        :_destroy
                                      ]
                                    ])
  end
end

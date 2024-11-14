class StockController < ApplicationController
  def update_product
    product = Product.find_by(id: params[:product_id])
    new_stock = params[:stock].to_i

    validate_stock_amount(new_stock)
    validate_item_type(product, "product")

    if product.update(stock: new_stock)
      render json: {
               success: true,
               item: {
                       id: product.id,
                       type: "product",
                       stock: product.stock
                     }
             },
             status: :ok
    else
      render json: {
               success: false,
               message: "Update failed for product with id #{product.id}",
               validation_errors: product.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  def update_variant
    variant = Variant.find_by(id: params[:variant_id])
    new_stock = params[:stock].to_i

    validate_stock_amount(new_stock)
    validate_item_type(variant, "variant")

    if variant.update(stock: new_stock)
      render json: {
               success: true,
               item: {
                 id: variant.id,
                 type: "variant",
                 stock: variant.stock
               }
             },
             status: :ok
    else
      render json: {
               success: false,
               message: "Update failed for variant with id #{product.id}",
               validation_errors: variant.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  private

  def validate_stock_amount(new_stock)
    if new_stock < 0
      render json: { success: false, error: "Stock cannot be negative" },
             status: :bad_request and return
    end
  end

  def validate_item_type(item, type)
    if item.nil?
      render json: { success: false, error: "Invalid #{type}" },
             status: :not_found and return
    end
  end
end

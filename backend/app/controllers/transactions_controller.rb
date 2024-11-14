class TransactionsController < ApplicationController
  def purchase
    items = params.permit(
      items: [
        :product_id,
        :quantity,
        variant_ids: []
      ],
    )[:items]

    if items.blank?
      render json: {
               success: false, error: "No items provided for purchase"
             },
             status: :bad_request and return
    end

    result = Transaction.purchase(items)

    if result[:success]
      render json: {
               success: true,
               message: result[:message]
             },
             status: :ok
    else
      render json: {
               success: false,
               error: result[:error]
             },
             status: :unprocessable_entity
    end
  end
end

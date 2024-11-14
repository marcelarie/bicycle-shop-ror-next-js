class Transaction
  def self.purchase(items)
    ActiveRecord::Base.transaction do
      items.each do |item|
        product = Product.find_by(id: item[:product_id])
        raise "Invalid product ID #{item[:product_id]}" if product.nil?

        if product.stock < item[:quantity]
          raise "Not enough stock for product '#{product.name}'"
        end

        item[:variant_ids].each do |variant_id|
          variant = Variant.find_by(id: variant_id)
          raise "Invalid variant ID #{variant_id}" if variant.nil?

          if variant.stock < item[:quantity]
            raise "Not enough stock for variant '#{variant.name}' of product '#{product.name}'"
          end

          variant.update!(stock: variant.stock - item[:quantity])
        end

        product.update!(stock: product.stock - item[:quantity])
      end
    end
    { success: true, message: "Transaction successful!" }
  rescue => e
    { success: false, error: e.message }
  end
end

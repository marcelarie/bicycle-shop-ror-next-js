require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get products_url
    assert_response :success
  end

  test "should create product" do
    assert_difference("Product.count") do
      post products_url, params: { product: { name: "Bike", price: 100.0, stock: 10, image: "bike.jpg" } }
    end
    assert_response :created
  end

  test "should show product" do
    product = products(:one)
    get product_url(product)
    assert_response :success
  end

  test "should update product" do
    product = products(:one)
    patch product_url(product), params: { product: { price: 200.0, stock: 15, image: "new_bike.jpg" } }
    assert_response :success
    assert_equal 200.0, product.reload.price
    assert_equal 15, product.reload.stock
    assert_equal "new_bike.jpg", product.reload.image
  end

  test "should destroy product" do
    product = products(:one)
    assert_difference("Product.count", -1) do
      delete product_url(product)
    end
    assert_response :no_content
  end
end

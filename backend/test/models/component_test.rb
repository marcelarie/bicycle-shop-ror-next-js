require "test_helper"

class ComponentTest < ActiveSupport::TestCase
  test "should be valid with name and product" do
    product = products(:one)
    component = Component.new(name: "Wheel", price: 200, product: product)
    assert component.valid?
  end

  test "should be invalid without name" do
    product = products(:one)
    component = Component.new(price: 200.0, product: product)
    assert_not component.valid?
  end

  test "should be invalid without price" do
    product = products(:one)
    component = Component.new(name: "Frame", product: product)
    assert_not component.valid?
  end

  test "should be invalid with negative price" do
    product = products(:one)
    component = Component.new(name: "Frame", price: -10.0, product: product)
    assert_not component.valid?, "Component should be invalid with negative price"
  end
end

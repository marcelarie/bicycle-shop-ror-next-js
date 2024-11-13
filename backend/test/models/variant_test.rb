require "test_helper"

class VariantTest < ActiveSupport::TestCase
  test "should be valid with name and price" do
    component = components(:one)
    variant = Variant.new(name: "Small Frame", price: 200.0, component: component)

    assert variant.valid?
  end

  test "should be invalid without name" do
    component = components(:one)
    variant = Variant.new(price: 200.0, component: component)

    assert_not variant.valid?
  end

  test "should be invalid without price" do
    component = components(:one)
    variant = Variant.new(name: "Small Frame", component: component)

    assert_not variant.valid?
  end
end

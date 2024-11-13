require "test_helper"

class VariantTest < ActiveSupport::TestCase
  test "should be valid with name and price" do
    component = components(:one)
    variant = component.variants.build(
      name: "Small Frame",
      price: 200.0,
      stock: 10,
      image: "https://www.google.com/img.jpg",
    )

    assert variant.valid?
  end

  test "should be invalid without name" do
    component = components(:one)
    variant = component.variants.build(
      price: 200.0,
      stock: 10,
      image: "https://www.google.com/img.jpg",
    )

    assert_not variant.valid?
  end

  test "should be invalid without price" do
    component = components(:one)
    variant = Variant.new(name: "Small Frame", component: component)

    assert_not variant.valid?
  end

  test "should be invalid with empty stock" do
    component = components(:one)
    variant = component.variants.build(
      name: "Small Frame",
      price: 200.0,
      stock: "",
      image: "https://www.google.com/img.jpg",
    )

    assert_not variant.valid?
  end

  test "should be invalid with no stock" do
    component = components(:one)
    variant = component.variants.build(
      name: "Small Frame",
      price: 200.0,
      image: "https://www.google.com/img.jpg",
    )
    assert_not variant.valid?
  end
end

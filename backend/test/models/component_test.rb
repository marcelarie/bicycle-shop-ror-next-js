require "test_helper"

class ComponentTest < ActiveSupport::TestCase
  test "should be valid with at least one variant" do
    product = products(:one)
    component = Component.new(
      name: "Frame",
      product: product,
      image: "https://example.com/frame.jpg",
    )
    variant = component.variants.build(name: "Small Frame", price: 200.0)

    assert component.valid?
  end

  test "should be invalid without variants" do
    product = products(:one)
    component = Component.new(
      name: "Frame",
      product: product,
      image: "https://example.com/frame.jpg",
    )

    assert_not component.valid?
  end

  test "should be invalid with empty image" do
    product = products(:one)
    component = Component.new(
      name: "Frame",
      product: product,
      image: nil,
    )
    variant = component.variants.build(name: "Small Frame", price: 200.0)
    assert_not component.valid?
  end
end

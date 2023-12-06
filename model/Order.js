class Order {
  constructor(id, discount, price, finalAmount, cart) {
    this.id = id;
    this.discount = discount;
    this.price = price;
    this.finalAmount = finalAmount;
    this.cart = cart;
  }
}

export default Order;

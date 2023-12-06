import Item from "../model/Item.js";
import Promocode from "../model/Promocode.js";
import Order from "../model/Order.js";
import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";

//Using an in-memory store for cart
let cart = {};
let lastOrderNumber = 0;
let totalPurchaseAmount = 0;
let totalDiscountAmount = 0;
let orders = [];

//give discount every 5th order
let n = 5;

//set predetermined 3 items
let items = [
  new Item("1", "Shoes", 2000, 0),
  new Item("2", "Tshirt", 700, 0),
  new Item("3", "Watch", 1000, 0),
];

//set first predetermined promo code
let promocodes = [new Promocode("FIRST", "YES")];

//Exporting the service functions
export const addToCart = async (req, res, next) => {
  try {
    //cart object will be written to our in-memory cart
    cart = req.body;
    res.status(200).send({ status: "Successfully added to cart" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCart = async (req, res, next) => {
  try {
    //send cart object stored to frontend
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const checkout = async (req, res, next) => {
  try {
    //get Cart
    let cartToCheckout = cart;

    //calculate order value
    let orderPrice = 0;
    let quantity = 0;
    let itemDetails = {};
    let itemPrice = 0;
    let itemAmount;

    for (let item in cartToCheckout) {
      if (cartToCheckout.hasOwnProperty(item)) {
        //getting quantity of item from cart
        quantity = cartToCheckout[item];
        //fetching price for each item in cart from items array
        itemDetails = items.filter(function (itemInItems) {
          return itemInItems.id === item;
        })[0];
        //if item is valid from our 3 predetermined items
        if (itemDetails) {
          //get item price
          itemPrice = itemDetails.price;
          //calculate item amount by multiplying quantity and price
          itemAmount = itemPrice * quantity;
          //add item amount to the order price
          orderPrice += itemAmount;
        } else {
          delete cartToCheckout[item];
        }
      }
    }

    //validate promocode and calculate discount
    let promocode = req.body.promocode;
    let discount = 0;
    //check if current order is the nth order
    if ((lastOrderNumber + 1) % n == 0) {
      let promocodeDetails = promocodes.filter(function (promo) {
        return promo.code === promocode;
      })[0];
      // if nth order then, check if promocode is valid as it can be used ONCE.
      if (promocodeDetails) {
        if (promocodeDetails.valid === "YES") {
          //if valid, give 10% discount to user
          discount = 0.1 * orderPrice;
          //invalidate the promo code
          promocodeDetails.valid = "NO";
        }
      }
    }

    //generate order Id
    let orderId = uuidv4();

    //calculate final amount
    let fAmount = orderPrice - discount;

    //Update Total Purchase Amount
    totalPurchaseAmount += fAmount;

    //Update Total Discount Amount
    totalDiscountAmount += discount;

    //make Order object and push it to orders array
    let orderObj = new Order(
      orderId,
      discount,
      orderPrice,
      fAmount,
      cartToCheckout
    );
    orders.push(orderObj);

    //increase last Order Number
    lastOrderNumber += 1;

    //update quantitySold in items array
    for (let item in cartToCheckout) {
      if (cartToCheckout.hasOwnProperty(item)) {
        quantity = cartToCheckout[item];
        itemDetails = items.filter(function (itemInItems) {
          return itemInItems.id === item;
        })[0];
        if (itemDetails) {
          itemDetails.quantitySold = itemDetails.quantitySold + quantity;
        }
      }
    }

    //make cart empty
    cart = {};

    //send order response
    res.status(200).send(orderObj);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const generatePromoCode = async (req, res, next) => {
  try {
    //generate 5 letter random word as Promo code
    let randomWord = generate({ minLength: 5, maxLength: 5 })
      .toString()
      .toUpperCase();
    let promo = new Promocode(randomWord, "YES");
    promocodes.push(promo);
    res.status(200).send(promo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const countOfItemsPurchased = async (req, res, next) => {
  try {
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalPurchaseAmount = async (req, res, next) => {
  try {
    var totalPurchaseAmountObj = {
      totalPurchaseAmount: totalPurchaseAmount,
    };
    res.status(200).send(totalPurchaseAmountObj);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTotalDiscountAmount = async (req, res, next) => {
  try {
    var totalDiscountAmountObj = {
      totalDiscountAmount: totalDiscountAmount,
    };
    res.status(200).send(totalDiscountAmountObj);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const listDiscountCodes = async (req, res, next) => {
  try {
    res.status(200).send(promocodes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Using an in-memory store for cart
let cart = {};
export const addToCart = async (req, res, next) => {
  try {
    //cart object coming from frontend will be written to our in-memory cart
    cart = req.body;
    res.status(200).send("Successfully added to cart");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getCart = async (req, res, next) => {
  try {
    //send cart object stored to frontend
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const service = async (req, res, next) => {
  try {
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

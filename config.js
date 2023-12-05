import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const { ECOMM_PORT, ECOMM_HOST, ECOMM_HOST_URL } = process.env;

assert(ECOMM_PORT, "Port is required");
assert(ECOMM_HOST, "Host is required");

export default {
  port: ECOMM_PORT,
  host: ECOMM_HOST,
  hostUrl: ECOMM_HOST_URL,
};

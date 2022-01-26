// can use `process.env.SECRET_MNEMONIC` or `process.env.SECRET_PRIV_KEY`
// to populate secret in CI environment instead of hardcoding
require("dotenv").config();

module.exports = {
  "test-1": {
    // mnemonic:
    //   "satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn",
    mnemonic: process.env.SECRET_PRIV_KEY,
  },
};

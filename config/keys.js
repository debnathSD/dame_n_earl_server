const USER = "sweta",
  PWD = "donotmesswithadmin";

module.exports = {
  mongoURI: `mongodb+srv://${USER}:${PWD}@cluster0.etzji.mongodb.net/sample_analytics?retryWrites=true&w=majority`,
  secretOrKey: `encryptedtokenblabla`,
};

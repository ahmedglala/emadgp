const mongoose = require("mongoose");
const dpConnection = () => {
  mongoose
    .connect(
      "mongodb+srv://emadGp:0000@atlascluster.kds8rxf.mongodb.net/emadGp?retryWrites=true&w=majority"
    )
    .then(console.log("database connected"))
    .catch((e) => {
      console.log(e);
    });
};
module.exports=dpConnection;
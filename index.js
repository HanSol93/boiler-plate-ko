const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// application/x-www-form-urlencoded 데이터를 받아올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 데이터를 받아올 수 있게 해줌
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! 안농 ㅎㅎㅋ");
});

app.post("/register", (req, res) => {
  // 화원 가입 시 필요한 정보 client에서 가져오면 그 값들을 DB에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

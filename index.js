const express = require("express");
const app = express();

//Allow cors
const cors = require("cors");
//Loop of allowed origins
const allowedOrigins = ["https://sms-react2.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//Allow JSON
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const connectDB = require("./config/database");
connectDB();

app.get("/", (req, res) => {
  res.send("SMS API");
});

app.use("/api/v1/sms", require("./routes/sms"));
app.use("/api/v1/card", require("./routes/card"));
app.use("/api/v1/login", require("./routes/login"));
app.use("/api/v1/register", require("./routes/register"));
app.use("/api/v1/users", require("./routes/users"));
app.use("/api/v1/room", require("./routes/code"));

app.listen(4000, () => {
  console.log("Example app listening on port http://localhost:4000");
});

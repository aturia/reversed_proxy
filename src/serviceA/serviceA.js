const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/users", (req, res) => {
  console.log(`Header: ${JSON.stringify(req.headers)}`);

  // ******************************
  // DEBUG TẠI ĐÂY: Xem header tại Server Đích
  console.log("--- Headers Nhận được (Backend Side) ---");
  console.log(`Original Client IP: ${req.headers["x-forwarded-for"]}`);
  console.log(`Direct Connection IP (Proxy IP): ${req.ip}`);
  console.log("------------------------------------------");
  // ******************************

  res.json({ service: "A", message: "Users list" });
});

app.listen(PORT, () => console.log(`Service A running ${PORT}`));

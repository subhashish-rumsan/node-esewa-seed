const express = require("express");
const createSignature = require("./utility");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Create order api endpoint
app.post("/api/create/order", (req, res) => {
  console.log(req.body);
  try {
    var currentTime = new Date();
    var formattedTime =
      currentTime.toISOString().slice(2, 10).replace(/-/g, "") +
      "-" +
      currentTime.getHours() +
      currentTime.getMinutes() +
      currentTime.getSeconds();
    const signature = createSignature(
      `total_amount=${req.body.amount},transaction_uuid=${formattedTime},product_code=EPAYTEST`
    );
    const formData = {
      amount: req.body.amount,
      failure_url: "http://localhost:5173",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/api/esewa/success",
      tax_amount: "0",
      total_amount: req.body.amount,
      transaction_uuid: formattedTime,
    };
    res.json({
      message: "Order Created Successfully",
      Product: req.body,
      formData,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error Occured" });
  }
});

app.get("/api/esewa/success", (req, res) => {});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

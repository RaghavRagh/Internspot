import { instance } from "../razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

import {sendMail} from "../mailer.js";

// create order
export const checkout = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  const options = {
    amount: Number(amount) * 100,
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// verify payment
export const paymentVerification = async (req, res) => {
  // console.log(req.body)
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    planName,
    price,
  } = req.body;
  const secret = process.env.RAZORPAY_SECRET_KEY;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  // console.log("digest = ", digest)
  // console.log("razorpay_signature = ", razorpay_signature);

  if (digest === razorpay_signature) {
    // const userEmail = req.body.email;

    // const invoice = `
    //   <h1>Invoice</h1>
    //   <p>Plan: ${planName}</p>
    //   <p>Price: ₹${price}</p>
    //   <p>Payment ID: ${razorpay_payment_id}</p>
    //   <p>Order ID: ${razorpay_order_id}</p>
    // `;

    // sendMail(
    //   userEmail,
    //   "Your Payment Invoice",
    //   `Your plan ${planName} has been purchased successfully.`,
    //   invoice
    // );

    // res.json({ message: "Payment verified and email sent" });

    res.json({
      status: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } else {
    res
      .status(400)
      .json({ status: "failure", message: "Signature verification failed" });
  }
};

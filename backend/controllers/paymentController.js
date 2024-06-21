import { instance } from "../razorpay.js";

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

export const paymentVerification = async (req, res) => {
  console.log("Payment Verification Called");
  console.log("Request Body: ", req.body);
  res.status(200).json({ success: true, body: req.body });
};

// Import the necessary modules and models
import axios from "axios";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import dotenv from "dotenv";
dotenv.config();

// Create a new product
export const create = catchAsyncErrors(async (req, res) => {
  const payload = req.body;
  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    if (khaltiResponse) {
      res.json({ success: true, data: khaltiResponse?.data });
    } else {
      res.json({ success: false, messaage: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export const verify = catchAsyncErrors(async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/	",
      { pidx: "32zAHcVL4ijcFnFTNwgQD8" },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    console.log(khaltiResponse);
    if (khaltiResponse) {
      res.json({ success: true, data: khaltiResponse.data });
    } else {
      res.json({ success: false, messaage: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

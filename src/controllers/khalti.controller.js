// Import the necessary modules and models
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import dotenv from "dotenv";
dotenv.config();

// Create a new product
export const create = catchAsyncErrors(async (req, res) => {
  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    console.log(khaltiResponse);
    if (khaltiResponse) {
      res.json({ success: true, data: khaltiResponse?.data });
    } else {
      res.json({ success: false, messaage: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const SubscriptionInfo = ({
  planName,
  price,
  noOfInternship,
  support,
  gradientColors,
}) => {
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [finalPrice, setFinalPrice] = useState(price);

  useEffect(() => {
    const randomCoupon = Math.random().toString(36).substring(7).toUpperCase();
    setCoupon(randomCoupon);
  }, []);

  // checkout handler
  const checkoutHandler = async (amount) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    // const currentTime = new Date();
    // const currentHourIST = currentTime.getUTCHours() + 5.5;

    // if (currentHourIST < 10 || currentHourIST > 11) {
    //   alert("Payments are only allowed between 10 AM and 11 AM IST.");
    //   return;
    // }

    const {
      data: { key },
    } = await axios.get("http://localhost:8000/getKey");

    try {
      const response = await axios.post(
        "http://localhost:8000/payment",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const order = response.data.order;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Raghav",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        // callback_url: "http://localhost:8000/paymentverification",
        handler: async function (response) {
          const data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            // planName: planName,
            // price: price,
            // email: "radwimps187@gmail.com", // User's email
          };

          try {
            const verificationResponse = await axios.post(
              "http://localhost:8000/paymentverification",
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (verificationResponse.data.status === "success") {
              alert("Payment successful and verified!");
              console.log(verificationResponse.data);
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error("Verification error:", error);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#38bdf8",
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      razor.open();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscountChange = (event) => {
    const discountValue = parseInt(event.target.value);
    setDiscount(discountValue);
    const newPrice = price - (price * discountValue / 100);
    setFinalPrice(newPrice);
  };

  const handleGetStartedClick = () => {
    navigate('/checkout', {
      state: {
        planName,
        price,
        noOfInternship,
        support,
        gradientColors,
        coupon,
      }
    });
  };

  return (
    <div className="flex flex-col max-w-lg p-3 mx- text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow xl:p-3 sm:min-w-72 hover:shadow-lg transition ease-out">
      <h3
        className={`mb-4 text-2xl font-semibold border p-6 text-white rounded-lg px-5 text-center  ${gradientColors}`}
      >
        {planName}
      </h3>
      <div className="flex items-baseline justify-center my-8">
        <span className="mr-2 text-4xl font-extrabold text-slate-800">
          ₹{price}
        </span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>

      <ul role="list" className="mb-8 space-y-4 text-left">
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="w-full flex flex-col">
            <span className="text-sm font-semibold text-slate-400">
              Plan name
            </span>
            <span className="font-semibold">{planName}</span>
            <div className="border-b my-2"></div>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="w-full flex flex-col">
            <span className="text-sm font-semibold text-slate-400">
              No. of internship applications
            </span>
            <span className="font-semibold">
              {noOfInternship}
              <span className=" text-slate-500 font-normal text-sm">
                {" "}
                /month
              </span>
            </span>
            <div className="border-b my-2"></div>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="w-full flex flex-col">
            <span className="text-sm font-semibold text-slate-400">
              Support
            </span>
            <span className="font-semibold">{support}</span>
            <div className="border-b my-2"></div>
          </div>
        </li>
        <li className="flex items-center space-x-3">
          <svg
            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="w-full flex flex-col">
            <span className="text-sm font-semibold text-slate-400">Price</span>
            <span className="font-semibold">
              {price}
              <span className=" text-slate-500 font-normal text-sm">
                {" "}
                /month
              </span>
            </span>
            <div className="border-b my-2"></div>
          </div>
        </li>
      </ul>
      <div className="mb-4">
        <label htmlFor="discount">Choose your discount (1% - 10%): </label>
        <select id="discount" value={discount} onChange={handleDiscountChange}>
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}%</option>
          ))}
        </select>
      </div>
      <button
        className="focus:ring-2 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-slate-300 hover:bg-sky-100/40 transition ease-linear shadow"
        // onClick={() => checkoutHandler(finalPrice)}
        onClick={handleGetStartedClick}
      >
        Get started
      </button>
      
    </div>
  );
};

export default SubscriptionInfo;

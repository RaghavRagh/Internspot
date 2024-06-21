import SubscriptionInfo from "../../components/SubscriptionInfo/SubscriptionInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();

  const checkoutHandler = async (amount) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }

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
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
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

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="membershipWrapper mb-10">
        <div className="membershipContainer flex flex-col justify-center items-center md:container md:mx-auto">
          <h1 className=" text-4xl font-extrabold tracking-tight my-5">
            Subscription
          </h1>
          <div className="">
            <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
              <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
                  Unlock Your Internship Potential
                </h2>
                <p className="mb-5 font-light text-gray-500 sm:text-lg">
                  No matter where you are in your internship journey, we have a
                  plan to help you land the perfect opportunity. Choose from a
                  variety of options that allow you to apply to multiple
                  internships and gain access to valuable resources.
                </p>
              </div>
              <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-5 lg:space-y-0">
                <SubscriptionInfo
                  planName={"Free"}
                  price={0}
                  noOfInternship={1}
                  support={"None"}
                  gradientColors="bg-gradient-to-r from-emerald-400 to-blue-500"
                  checkoutHandler={checkoutHandler}
                />

                <SubscriptionInfo
                  planName={"Bronze"}
                  price={100}
                  noOfInternship={"3"}
                  support={"6 months"}
                  gradientColors="bg-gradient-to-r from-rose-400 to-blue-500"
                  checkoutHandler={checkoutHandler}
                />

                <SubscriptionInfo
                  planName={"Silver"}
                  price={300}
                  noOfInternship={"5"}
                  support={"6 months"}
                  gradientColors="bg-gradient-to-r from-gray-300 to-blue-500"
                  checkoutHandler={checkoutHandler}
                />

                <SubscriptionInfo
                  planName={"Gold"}
                  price={1000}
                  noOfInternship={"Unlimited"}
                  support={"12 months"}
                  gradientColors="bg-gradient-to-r from-yellow-500 to-yellow-700"
                  checkoutHandler={checkoutHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b mx-4 md:mx-12 mb-5"></div>
    </>
  );
};

export default Subscription;

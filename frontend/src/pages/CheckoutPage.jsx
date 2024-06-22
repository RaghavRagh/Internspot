import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SubscriptionInfo from "../components/SubscriptionInfo/SubscriptionInfo";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/userSlice";

const CheckoutPage = () => {
  const location = useLocation();
  const { planName, price, noOfInternship, support, gradientColors, coupon } =
    location.state;
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="checkoutWrapper">
      <Navbar />
      <div className="md:container md:mx-auto flex items-center justify-around mt-4">
        <form action="" className="flex flex-col shadow-md p-5 border rounded-xl gap-2">
          <div className="checkoutWrapper flex gap-5">
            <div className="formGroup flex flex-col gap-2">
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={userInfo?.name}
                className="border p-2 rounded-md text-slate-500"
                disabled
              />
            </div>

            <div className="formGroup flex flex-col gap-2">
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={userInfo?.email}
                className="border p-2 rounded-md text-slate-500"
                disabled
              />
            </div>

          </div>
            <div className="mt-4">
              <p>
                Coupon : <strong>{coupon}</strong>
              </p>
            </div>
        </form>
        <SubscriptionInfo
          planName={planName}
          price={price}
          noOfInternship={noOfInternship}
          support={support}
          gradientColors={gradientColors}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;

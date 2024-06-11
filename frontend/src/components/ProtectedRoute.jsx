import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.log(user); 
    return <Navigate to="/auth/login" />;
    // return <Navigate to="/user/profile" />;
  }

  // console.log("yaha ni ana");
  return children;
};

export default ProtectedRoute;

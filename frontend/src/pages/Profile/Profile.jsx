import { useContext, useState } from "react";
import "./Profile.css";
import AuthContext from "../../Context/AuthContext";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log("User -> ", user)
  const [profileData, setProfileData] = useState({
    name: user.name,
    phone: user.phone,
    language: user.language,
  });

  const [avatar, setAvatar] = useState(null);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    // setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("phone", profileData.phone);
    formData.append("language", profileData.language);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profileContainer flex justify-center items-center h-screen">
        <div className="profileWrapper m-8 p-8 flex flex-col border-2 rounded-xl w-[29rem] items-center shadow-lg">
          <h1 className="profile mb-10 font-semibold text-5xl">Profile</h1>
          <div className="relative">
            <div className="profilePhoto w-36 h-36 border rounded-full overflow-hidden object-cover outline-none  ring-offset-2 shadow hover:shadow-lg transition-shadow ease-linear relative">
              <img
                src="https://i.pinimg.com/736x/eb/8a/dd/eb8addac91cec1bba36b57ad28729f17.jpg"
                alt="profile photo"
              />
            </div>
            <span className="absolute bottom-3 right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-slate-800 hover:text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </span>
          </div>
          <div className="profileInfo mt-8 w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="profileForm flex flex-col">
                <label htmlFor="name" className="font-medium ml-1">
                  Name
                </label>
                <input
                  className="border rounded-md mt-1 p-2 outline-none hover:ring-2 focus:ring-2 focus:ring-indigo-300"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profileForm flex flex-col">
                <label htmlFor="phone" className="font-medium ml-1">
                  Phone
                </label>
                <input
                  className="border rounded-md mt-1 p-2 outline-none hover:ring-2 focus:ring-2 focus:ring-indigo-300"
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profileForm flex flex-col">
                <label htmlFor="language" className="font-medium  ml-1">
                  Language
                </label>
                <select
                  className="border rounded-md mt-1 p-2 outline-none hover:ring-2 focus:ring-2 focus:ring-indigo-300"
                  name="language"
                  value={profileData.language}
                  onChange={handleInputChange}
                >
                  <option value={"en"}>English</option>
                  <option value={"fr"}>French</option>
                  <option value={"de"}>German</option>
                </select>
              </div>
              <button className="bg-sky-400 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center mt-2">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

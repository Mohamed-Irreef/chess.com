import React, { useState } from "react";
import axios from "axios";
import ShowUserProfile from "./ShowUserProfile";
import { PropagateLoader } from "react-spinners";
import { ToastContainer, toast, Bounce, Slide } from "react-toastify";

const UserData = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState();
  const [userStats, setUserStats] = useState();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        ` https://api.chess.com/pub/player/${userName}`
      );
      const userData = response.data;
      setUserData(userData);

      const statsResponse = await axios.get(
        `https://api.chess.com/pub/player/${userName}/stats`
      );
      const userStatsData = statsResponse.data;
      setUserStats(userStatsData);

      toast.success("User Data fetched successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      setUserName("");
    } catch (error) {
      toast.error("Data Not Found!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      if (!userData && loading === false) {
        setText("No data found...");
      }
      setLoading(false);
    }
  };

  function setUserDetails(e) {
    e.preventDefault();
    setUserData("");
    setLoading(true);
    setTimeout(() => {
      getUserInfo();
    }, 3000);
  }
  return (
    <>
      <div className=" text-white flex justify-end pt-5 pr-1">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </div>
      <div className="input-container absolute top-40 right-0 left-0 m-auto">
        <form action="" className="flex gap-1" onSubmit={setUserDetails}>
          <input
            type="text"
            value={userName}
            name="userName"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Chess.com UserName"
            className="UserName w-full px-3 py-2 outline-none rounded-sm border-2 bg-transparent text-white "
            required
            autoComplete="off"
          />

          <button
            type="submit"
            className="bg-white flex justify-center items-center px-5 py-1 rounded-sm text-[16px] font-medium text-black hover:bg-slate-300 hover:border-slate-300 hover:text-gray-900 border-2 transition-all duration-300"
          >
            Search
          </button>
        </form>
      </div>
      <div className="absolute top-60 left-0 right-0 m-auto flex justify-center">
        {userData ? (
          <ShowUserProfile
            className="container"
            userData={userData}
            userStats={userStats}
          />
        ) : loading ? (
          <div className="mt-40">
            <PropagateLoader
              color="#e92525"
              cssOverride={{}}
              loading
              size={22}
              speedMultiplier={1}
            />
          </div>
        ) : (
          <p className="text-red-600 mt-40">{text}</p>
        )}
      </div>
    </>
  );
};

export default UserData;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";

const ShowUserProfile = ({ userData, userStats }) => {
  const [countryName, setCountryName] = useState();
  const [lastOnline, setLastOnline] = useState();
  const [joined, setJoined] = useState();
  const [stats, setShowStats] = useState(false);

  const rapidTot =
    userStats?.chess_rapid?.record?.win +
      userStats?.chess_rapid?.record?.loss +
      userStats?.chess_rapid?.record?.draw || 0;
  const rapidWin = userStats?.chess_rapid?.record?.win || 0;
  const rapidLoss = userStats?.chess_rapid?.record?.loss || 0;
  const rapidDraw = userStats?.chess_rapid?.record?.draw || 0;

  const blitzTot =
    userStats?.chess_blitz?.record?.win +
      userStats?.chess_blitz?.record?.loss +
      userStats?.chess_blitz?.record?.draw || 0;
  const blitzWin = userStats?.chess_blitz?.record?.win || 0;
  const blitzLoss = userStats?.chess_blitz?.record?.loss || 0;
  const blitzDraw = userStats?.chess_blitz?.record?.draw || 0;

  const bulletTot =
    userStats?.chess_bullet?.record?.win +
      userStats?.chess_bullet?.record?.loss +
      userStats?.chess_bullet?.record?.draw || 0;
  const bulletWin = userStats?.chess_bullet?.record?.win || 0;
  const bulletLoss = userStats?.chess_bullet?.record?.loss || 0;
  const bulletDraw = userStats?.chess_bullet?.record?.draw || 0;

  const [rapidOptions, setRapidOptions] = useState();
  const [blitzOptions, setBlitzOptions] = useState();
  const [bulletOptions, setBulletOptions] = useState();
  useEffect(() => {
    if (userStats) {
      setRapidOptions({
        height: 170,
        title: {
          text: "Rapid",
          fontSize: 12,
          fontWeight: "bold",
          color: "black",
        },
        data: [
          { Format: "Total", count: rapidTot },
          { Format: "Win", count: rapidWin },
          { Format: "Lose", count: rapidLoss },
          { Format: "Draw", count: rapidDraw },
        ],
        series: [
          {
            type: "bar",
            xKey: "Format",
            yKey: "count",
          },
        ],
      });

      setBlitzOptions({
        height: 170,
        title: {
          text: "Blitz",
          fontSize: 12,
          fontWeight: "bold",
          color: "black",
        },
        data: [
          { Format: "Total", count: blitzTot },
          { Format: "Win", count: blitzWin },
          { Format: "Lose", count: blitzLoss },
          { Format: "Draw", count: blitzDraw },
        ],
        series: [
          {
            type: "bar",
            xKey: "Format",
            yKey: "count",
          },
        ],
      });

      setBulletOptions({
        height: 170,
        title: {
          text: "Bullet",
          fontSize: 12,
          fontWeight: "bold",
          color: "black",
        },
        data: [
          { Format: "Total", count: bulletTot },
          { Format: "Win", count: bulletWin },
          { Format: "Lose", count: bulletLoss },
          { Format: "Draw", count: bulletDraw },
        ],
        series: [
          {
            type: "bar",
            xKey: "Format",
            yKey: "count",
          },
        ],
      });
    }
  }, [
    userStats,
    rapidTot,
    rapidWin,
    rapidLoss,
    rapidDraw,
    blitzTot,
    blitzWin,
    blitzLoss,
    blitzDraw,
    bulletTot,
    bulletWin,
    bulletLoss,
    bulletDraw,
  ]);

  const countryNameResponse = async () => {
    const response = await axios.get(userData.country);
    const countryData = response.data;
    const counName = countryData.name;
    setCountryName(counName);

    let lastOnlineTimeStamp = userData.last_online;
    const lastOnlineData = new Date(lastOnlineTimeStamp * 1000);
    const lastOnlineTime = lastOnlineData.toUTCString();
    setLastOnline(lastOnlineTime);

    const joinedTimeStamp = userData.joined;
    const joinedDate = new Date(joinedTimeStamp * 1000);
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "MAy",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const joinedMonth = monthArray[joinedDate.getMonth()];
    const joinedYear = joinedDate.getFullYear();
    const joined = `${joinedMonth} ${joinedYear}`;
    setJoined(joined);
  };
  useEffect(() => {
    countryNameResponse();
  }, [userData]);

  return (
    <>
      {userData ? (
        <section>
          <div className="text-white userProfile-container">
            <h1 className="text-2xl text-center title tracking-wider">
              {stats ? `Statistics` : `UserProfile`}
            </h1>

            <div className=" userCard flex p-4  w-full  mt-2 rounded-md">
              {!stats ? (
                <>
                  <div className=" w-1/2 flex justify-center flex-col  items-center p-2">
                    <a href={userData.url}>
                      <div className="Userprofile overflow-hidden rounded-full">
                        <img
                          src={userData.avatar}
                          alt=""
                          className="w-full bg-cover transition-all duration-300 bg-no-repeat hover:scale-105 h-full rounded-full"
                        />
                      </div>
                    </a>
                    <p className="text-xl mt-1 font-medium profile-name">
                      {userData.username}
                    </p>
                    <p className="text-xs font-normal">
                      Country: {countryName}
                    </p>

                    <p className="text-xs font-normal bg-white text-black px-4 p-0.5 mt-2 rounded-lg">
                      <b>{userData.followers} followers</b>
                    </p>
                  </div>

                  <div className=" w-1/2 py-10 px-7 space-y-2 ">
                    <p className="userDetail-text">
                      <b>
                        <i className="ri-user-fill text-blue-500"></i> Name:
                        &nbsp; &nbsp;
                      </b>
                      {userData.name}
                    </p>
                    <p className="userDetail-text">
                      <b>
                        <i className="ri-arrow-right-s-fill "></i> Player Id:
                        &nbsp; &nbsp;
                      </b>
                      {userData.player_id}
                    </p>
                    <p className="userDetail-text">
                      <b>
                        <i className="ri-arrow-right-s-fill "></i>{" "}
                        League:&nbsp;&nbsp;&nbsp;{" "}
                      </b>
                      {userData.league}
                    </p>
                    <p className="userDetail-text">
                      <b>
                        <i className="ri-arrow-right-s-fill "></i> Status:
                        &nbsp; &nbsp;&nbsp;{" "}
                      </b>
                      {userData.status}
                    </p>
                    <p className="userDetail-text">
                      <i className="ri-arrow-right-s-fill "></i>{" "}
                      <b>Joined: &nbsp; &nbsp;&nbsp;</b>
                      {joined}
                    </p>
                    <p className="userDetail-text">
                      <b>
                        <i className="ri-arrow-right-s-fill "></i>{" "}
                        Location:&nbsp;&nbsp;
                      </b>
                      {userData.location}
                    </p>
                    <p className="mt-2 font-medium">
                      🟢
                      <i className=" text-green-400 text-xs italic">
                        last Online:{" "}
                      </i>
                      <span className="text-xs italic">{lastOnline}</span>
                    </p>
                    <div className="">
                      <button
                        onClick={() => setShowStats(!stats)}
                        className="w-full border-2 border-white bg-white font-medium hover:border-slate-300 hover:text-blue-700 hover:bg-slate-300 text-black mt-4 py-2 rounded-md"
                      >
                        Show Stats
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <div className="w-full flex justify-end">
                    <button
                      className=" hover:scale-110"
                      onClick={() => setShowStats(!stats)}
                    >
                      <i class="ri-delete-back-2-line text-2xl text-white-500 hover:text-red-500 transition-all duration-300"></i>
                    </button>
                  </div>

                  <div className="mainStats-container w-full flex flex-col gap-1">
                    <div className="statsUp-box  py-4 flex w-full">
                      <div className="statsUp-left  w-1/5  flex justify-center items-center">
                        <div className="w-28 h-28 rounded-full">
                          <img
                            src={userData.avatar}
                            className="h-full w-full rounded-full"
                            alt=""
                          />
                        </div>
                      </div>

                      <div className="statsUp-right  w-4/5  flex gap-1">
                        <div className=" w-2/5  p-4">
                          <p className="text-white ">
                            <b className="text-yellow-300 ">Username:</b>{" "}
                            {userData.username}
                          </p>
                          <p className="text-white">
                            <b className="">Country:</b> {countryName}
                          </p>

                          <div className="flex gap-4 ">
                            <p className="text-white">
                              <b className="">Fide:</b> {userStats.fide}
                            </p>

                            <p className="text-sm font-medium">
                              <b className="text-green-400 text-base">Score:</b>{" "}
                              {Math.floor(
                                ((userStats.chess_rapid.record.win +
                                  userStats.chess_bullet.record.win +
                                  userStats.chess_blitz.record.win) /
                                  (userStats.chess_rapid.record.win +
                                    userStats.chess_bullet.record.win +
                                    userStats.chess_blitz.record.win +
                                    userStats.chess_rapid.record.loss +
                                    userStats.chess_bullet.record.loss +
                                    userStats.chess_blitz.record.loss +
                                    userStats.chess_rapid.record.draw +
                                    userStats.chess_bullet.record.draw +
                                    userStats.chess_blitz.record.draw)) *
                                  100
                              )}
                              %
                            </p>
                          </div>
                        </div>

                        <div className=" w-3/5 p-4 space-y-3 ">
                          <div className="flex gap-6">
                            <p className="text-white ">
                              <b className="text-orange-300">Total:</b>{" "}
                              {userStats.chess_rapid.record.win +
                                userStats.chess_bullet.record.win +
                                userStats.chess_blitz.record.win +
                                userStats.chess_rapid.record.loss +
                                userStats.chess_bullet.record.loss +
                                userStats.chess_blitz.record.loss +
                                userStats.chess_rapid.record.draw +
                                userStats.chess_bullet.record.draw +
                                userStats.chess_blitz.record.draw}
                            </p>
                            <p className="text-white ">
                              <b className="text-green-300">Win:</b>{" "}
                              {userStats.chess_rapid.record.win +
                                userStats.chess_bullet.record.win +
                                userStats.chess_blitz.record.win}
                            </p>
                            <p className="text-white">
                              <b className="text-red-400">Loss:</b>{" "}
                              {userStats.chess_rapid.record.loss +
                                userStats.chess_bullet.record.loss +
                                userStats.chess_blitz.record.loss}
                            </p>
                            <p className="text-white">
                              <b className="text-gray-400">Draw:</b>{" "}
                              {userStats.chess_rapid.record.draw +
                                userStats.chess_bullet.record.draw +
                                userStats.chess_blitz.record.draw}
                            </p>
                          </div>
                          <div className="flex gap-5">
                            <p className="text-white">
                              <b className="">Rapid:</b>{" "}
                              {userStats.chess_rapid.last.rating}
                            </p>
                            <p className="text-white">
                              <b className="">Bliz:</b>{" "}
                              {userStats.chess_blitz.last.rating}
                            </p>
                            <p className="text-white">
                              <b className="">Bullet:</b>{" "}
                              {userStats.chess_bullet.last.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="statsDown-box  py-4  w-full flex">
                      <div className="w-1/3 p-2">
                        <AgCharts options={rapidOptions} />
                      </div>
                      <div className="w-1/3   p-2">
                        <AgCharts options={blitzOptions} />
                      </div>
                      <div className="w-1/3   p-2">
                        <AgCharts options={bulletOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <p className="text-red-700 mt-40">No data found...</p>
      )}
    </>
  );
};

export default ShowUserProfile;

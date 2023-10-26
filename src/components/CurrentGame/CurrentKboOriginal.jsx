import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CurrentKboOriginal() {
  // python crawling data
  const [TodayGameList, setTodayGameList] = useState(() => {
    const savedData = localStorage.getItem("TodayGameList2");
    return savedData ? JSON.parse(savedData) : [{}];
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // 현재 시간을 저장하는 상태

  const [gameContainerVisibility, setGameContainerVisibility] = useState(
    TodayGameList.map(() => false)
  );

  const currentTime = new Date();
  const dayOfWeek = currentTime.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  let gameTime;

  if (dayOfWeek === 6) {
    // 토요일은 16:00으로 설정
    gameTime = "16:00";
  } else if (dayOfWeek === 0) {
    // 일요일은 14:30으로 설정
    gameTime = "14:30";
  } else {
    // 월요일부터 금요일까지는 18:30으로 설정
    gameTime = "18:30";
  }

  // 현재 시간을 가져옵니다
  const currentDate = new Date();

  // 게임 시간을 시와 분으로 파싱합니다
  const gameTimeParts = gameTime.split(":");
  const gameHour = parseInt(gameTimeParts[0], 10);
  const gameMinute = parseInt(gameTimeParts[1], 10);

  // 게임 시간을 나타내는 Date 객체를 생성합니다
  const gameDate = new Date();
  gameDate.setHours(gameHour, gameMinute, 0, 0);

  // 현재 시간과 게임 시간 간의 차이를 계산합니다
  const timeDifference = gameDate - currentDate;
  const isGameTimePassed = timeDifference <= 0; // 게임 시간이 지났는지 여부를 확인

  const clearLocalStorage = () => {
    localStorage.removeItem("TodayGameList2");
    setTodayGameList([{}]); // Set the state to an initial value or an empty array
    setIsLoading(false);
  };

  const toggleGameContainer = (index) => {
    const newVisibility = [...gameContainerVisibility];
    newVisibility[index] = !newVisibility[index];
    setGameContainerVisibility(newVisibility);
  };

  let timeUntilGame;
  if (isGameTimePassed) {
    timeUntilGame = "";
  } else {
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    timeUntilGame = `${hours} 시간 ${minutes} 분 ${seconds} 초`;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (isLoading) {
          return;
        }
        setIsLoading(true);

        const res = await axios.get("/CurrentGame");
        const data = res.data;
        const parsedData = JSON.parse(data.replace(/'/g, '"'));

        // 시간을 1초씩 경과하도록 업데이트
        setTodayGameList(parsedData);
        localStorage.setItem("TodayGameList2", JSON.stringify(parsedData));
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isLoading]); // isLoading 상태를 의존성 배열로 지정

  useEffect(() => {
    // 1초마다 현재 시간을 업데이트
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      // 컴포넌트 언마운트 시 clearInterval
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const midnightInterval = setInterval(
      clearLocalStorageMidnight,
      24 * 60 * 60 * 1000
    );

    // 컴포넌트가 언마운트될 때 clearInterval
    return () => {
      clearInterval(midnightInterval);
    };
  }, []);

  return (
    <div className="containerStyle">
      {TodayGameList.map((game, index) => (
        <Link to="/match" state={{ channelId: index }} key={index} className="mainContent">
          <div className="containerStyleForGame">
            {timeUntilGame ? timeUntilGame : "Xx"} <br />
            {game.State_Game}
            <div></div>
            {/* 나머지 컴포넌트 및 로직 추가 */}
          </div>
          <div className="Content">
            <span className="leftContent">
              {game.TodayLeftGameInfo}
              <img
                className="imgStyle"
                src={game.LeftImage_src}
                alt="Left Team"
                onClick={() => toggleGameContainer(index)}
              />
            </span>
            <span className="rightContent">
              {game.TodayRightGameInfo}
              <img
                className="imgStyle"
                src={game.RightImage_src}
                alt="Right Team"
                onClick={() => toggleGameContainer(index)}
              />
            </span>
          </div>
          {gameContainerVisibility[index] && (
            <div className="gameContainer">
              <div className="teamInfo">
                <div className="leftInfo">
                  <div>{game.leftTeam}</div>
                  <div>{game.leftVestHitter}</div>
                  <div>{game.leftVestPitcher}</div>
                </div>
                <div className="rightInfo">
                  <div>{game.rightTeam}</div>
                  <div>{game.rightVestHitter}</div>
                  <div>{game.rightVestPitcher}</div>
                </div>
              </div>
              <div>야근하기 싫어요.</div>
            </div>
          )}
        </Link>
      ))}
      <button onClick={clearLocalStorage}>localStorage 초기화</button>
    </div>
  );
}

function clearLocalStorageMidnight() {
  const now = new Date();
  const targetTime = new Date(now);
  targetTime.setHours(0, 0, 0, 0);

  const timeUntilMidnight = targetTime - now;

  if (timeUntilMidnight < 0) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  const timeToClearLocalStorage = targetTime - now;

  setTimeout(function () {
    localStorage.clear();
  }, timeToClearLocalStorage);
}
setInterval(clearLocalStorageMidnight, 24 * 60 * 60 * 1000);

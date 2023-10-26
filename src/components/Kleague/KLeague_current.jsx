import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function KLeague_current() {
  const [gameData, setGameData] = useState(() => {
    const savedData = localStorage.getItem("kLeagueGameList2");
    return savedData ? JSON.parse(savedData) : [{}];
  });

  const [isLoading, setIsLoading] = useState(true);

  const dayStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#222",
    listStyle: "none",
    margin: 0,
    padding: 0,
    border: 0,
    font: "inherit",
    verticalAlign: "baseline",
    borderCollapse: "collapse",
    borderSpacing: 0,
    width: "100%",
    borderTop: "1px solid #929292",
    justifyContent: "space-between", // 이 부분에 space-between 스타일을 추가
    background: "#fff",
  };

  const pStyle = {
    padding: "10px",
    lineHeight: "1.5",
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("kLeagueGameList");
    setGameData([{}]);
    setIsLoading(false);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        if (isLoading) {
          return;
        }
        const response = await axios.get("/kLeague/current");
        const parsedData = JSON.parse(response.data.replace(/'/g, '"'));
        console.log(response.data);
        localStorage.setItem("kLeagueGameList2", JSON.stringify(parsedData));
        setGameData(parsedData);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isLoading]);

  return (
    <div>
      <div style={dayStyle}>
        <p style={pStyle}>팀 명</p>
        <p style={pStyle}>팀 이름</p>
        <p style={pStyle}>번호</p>
      </div>
      <div className="current-container">
        {gameData.map((game, index) => (
          <div key={index} style={dayStyle}>
            <p>날짜: {game.day}</p>
            <p>시작 시간: {game.start_time}</p>
            <p>팀 대결: {game.team_vs}</p>
          </div>
        ))}
      </div>
      <button onClick={clearLocalStorage}>초기화</button>
    </div>
  );
}

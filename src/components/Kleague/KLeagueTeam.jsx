import React, { useEffect, useState } from "react";
import axios from "axios";

export default function KLeagueTeam() {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/kLeague/team");
        setTeamData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(teamData);

  const listItemStyle = {
    display: "flex", // 가로로 배열
    margin: "5px", // 아이템 간격
  };

  const commonStyle = {
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
    width: "80%",
    borderTop: "1px solid #929292",
    justifyContent: "space-between", // Add this line
    background: "#fff",
  };

  const pStyle = {
    padding: "10px", // Adjust the padding as needed
    lineHeight: "1.5", // Adjust the line height as needed
  };

  const pStyleElement = {
    padding: "21px", // Adjust the padding as needed
    lineHeight: "1.5", // Adjust the line height as needed
  };

  return (
    <div>
      <div style={commonStyle}>
        <p style={pStyle}>팀 순위</p>
        <p style={pStyle}>팀 이름</p>
        <p style={pStyle}>게임수</p>
        <p style={pStyle}>승점</p>
        <p style={pStyle}>승</p>
        <p style={pStyle}>무승부</p>
        <p style={pStyle}>패</p>
        <p style={pStyle}>점수</p>
        <p style={pStyle}>마지막 10경기</p>]<p style={pStyle}>실점</p>
        <p style={pStyle}>득실률</p>
        <p style={pStyle}>최근 5경기</p>
      </div>
      {teamData.map((team, index) => (
        <div key={index} style={{ ...commonStyle, marginTop: "10px" }}>
          <p style={pStyleElement}>{team.k_league_Ranking}</p>
          <p style={pStyleElement}>{team.k_league_club_Name}</p>
          <p style={pStyleElement}>{team.k_league_club_Game}</p>
          <p style={pStyleElement}>{team.k_league_Win_Point}</p>
          <p style={pStyleElement}>{team.k_league_Win}</p>
          <p style={pStyleElement}>{team.k_league_Draw}</p>
          <p style={pStyleElement}>{team.k_league_Lose}</p>
          <p style={pStyleElement}>{team.k_league_Score}</p>
          <p style={pStyleElement}>{team.k_league_Lose_Score}</p>
          <p style={pStyleElement}>{team.k_league_Gainor_Loss}</p>
          <p style={pStyleElement}>{team.k_league_recent}</p>
        </div>
      ))}
    </div>
  );
}

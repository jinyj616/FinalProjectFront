import React, { useState, useEffect } from "react";
import axios from "axios";

export default function KLeaguePlayer() {
  const [playerData, setPlayerData] = useState([]);
  const [playerDetail, setPlayerDetail] = useState(null);
  const [detailFetched, setDetailFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 12; // 한 페이지에 보여줄 선수 수를 조절하세요.
  const [allPlayerData, setAllPlayerData] = useState([]); // 모든 선수 데이터를 보관
  const [detailImg, setDetailImg] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/kLeague/player");
        setPlayerData(response.data);
        setAllPlayerData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const fetchPlayerDetail = async (
    k_league_player_id,
    k_league_player_img_url
  ) => {
    try {
      const response = await axios.get(`/kLeague/player/${k_league_player_id}`);
      setPlayerDetail(response.data);
      setDetailImg(k_league_player_img_url);
      setDetailFetched(true);
    } catch (err) {
      console.error(err);
    }
  };

  const clearPlayerDetail = () => {
    setPlayerDetail(null);
    setDetailFetched(false);
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
    width: "100%",
    borderTop: "1px solid #929292",
    justifyContent: "space-between",
    background: "#fff",
  };

  const pStyle = {
    padding: "10px",
    lineHeight: "1.5",
  };

  const playerDetailList = {
    fontSize: "80px",
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    background: "#fff",
  };

  const showPlayerDetail = (data) => {
    if (
      !detailFetched ||
      playerDetail.k_league_player_id !== data.k_league_player_id
    ) {
      fetchPlayerDetail(data.k_league_player_id, data.k_league_player_img_url);
    } else {
      clearPlayerDetail();
    }
  };

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = playerData.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(playerData.length / playersPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxDisplayedPages = 10; // 최대 표시할 페이지 수
  let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
  let endPage = startPage + maxDisplayedPages - 1;

  if (endPage > pageNumbers.length) {
    endPage = pageNumbers.length;
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }

  // 선수 목록 스타일
  const playerListStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr", // 4개의 열
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr", // 5개의 행
    gap: "10px", // 격자 간 간격
    width: "70%",
  };

  // 각 선수 스타일
  const playerStyle = {
    ...commonStyle,
    cursor: "pointer", // 클릭 가능하도록 커서 변경
  };

  // 선수 이미지 스타일
  const playerImageStyle = {
    width: "200px",
    height: "200px",
  };
  const [selectedOption, setSelectedOption] = useState("");

  // ...

  // ...

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // 선택된 옵션 업데이트
    setSelectedOption(selectedValue);

    if (selectedValue === "") {
      // "전체"가 선택된 경우 모든 선수 표시
      setCurrentPage(1); // 페이지를 첫 페이지로 초기화
      setPlayerData(allPlayerData); // 모든 선수 표시
    } else if (selectedValue === "FC") {
      // FC서울에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "FC서울"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "강원") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "강원FC"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "광주") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "광주FC"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "대구") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "대구FC"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "대전") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "대전 하나 시티즌"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "수원") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "수원 삼성"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "울산") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "울산 현대"
      );

      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "수원FC") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "수원FC"
      );

      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "인천") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "인천 Utd"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "전북") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "전북 현대"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "포항") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "포항 스틸러스"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    } else if (selectedValue === "제주") {
      // 강원FC에 속하는 선수 출력
      const filteredPlayers = allPlayerData.filter(
        (data) => data.k_league_player_team === "제주 Utd"
      );
      setPlayerData(filteredPlayers); // 선택된 팀에 해당하는 선수 표시
    }
    // 다른 클럽에 대한 조건문 추가 가능
  };

  // ...

  // ...

  return (
    <div>
      <div style={commonStyle}>
        <select
          id="clubList"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="" selected="">
            전체
          </option>
          <option value="FC">FC서울</option>
          <option value="강원">강원FC</option>
          <option value="광주">광주FC</option>
          <option value="대구">대구FC</option>
          <option value="대전">대전 하나 시티즌</option>
          <option value="수원">수원 삼성</option>
          <option value="수원FC">수원FC</option>
          <option value="울산">울산 현대</option>
          <option value="인천">인천 Utd</option>
          <option value="전북">전북 현대</option>
          <option value="제주">제주 Utd</option>
          <option value="포항">포항 스틸러스</option>
        </select>

        <p style={pStyle}>팀 이름</p>
        <p style={pStyle}>번호</p>
        <p style={pStyle}>사진</p>
        <p style={pStyle}>디테일</p>
      </div>
      <div style={{ display: "flex" }}>
        <div style={playerListStyle}>
          {currentPlayers.map((data, index) => (
            <div
              key={index}
              style={playerStyle}
              onClick={() => showPlayerDetail(data)}
            >
              <p>{data.k_league_player_team}</p>
              <p>{data.k_league_player_name}</p>
              <p>{data.k_league_player_num}</p>
              <p>
                <img
                  src={data.k_league_player_img_url}
                  style={playerImageStyle}
                  alt={data.k_league_player_name}
                />
              </p>
            </div>
          ))}
        </div>
        {playerDetail && (
          <div style={{ display: "flex" }}>
            <div style={{ width: "70%", marginLeft: "10px" }}>
              <div
                style={{
                  ...playerDetailList,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <strong>이름:</strong> {playerDetail.player_name}
                </p>
                <p>
                  <strong>팀:</strong> {playerDetail.player_team}
                </p>
                <p>
                  <strong>등번호:</strong> {playerDetail.player_number}
                </p>
                <p>
                  <strong>포지션:</strong> {playerDetail.player_position}
                </p>
                <p>
                  <strong>국적:</strong> {playerDetail.player_nationality}
                </p>
                <p>
                  <strong>사진:</strong>
                  <img src={detailImg} style={playerImageStyle} />
                </p>
                <p>
                  <strong>키:</strong> {playerDetail.player_height}
                </p>
                <p>
                  <strong>몸무게:</strong> {playerDetail.player_weight}
                </p>
                <p>
                  <strong>생년월일:</strong> {playerDetail.player_birthdate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ fontSize: "20px" }}
        >
          이전 페이지
        </button>
        {pageNumbers.map((number) => {
          if (number >= startPage && number <= endPage) {
            return (
              <button
                key={number}
                style={{
                  fontSize: "20px",
                  margin: "5px",
                  backgroundColor: currentPage === number ? "#aaa" : "inherit",
                }}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            );
          }
          return null;
        })}
        <button
          onClick={nextPage}
          disabled={indexOfLastPlayer >= playerData.length}
          style={{ fontSize: "20px" }}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}

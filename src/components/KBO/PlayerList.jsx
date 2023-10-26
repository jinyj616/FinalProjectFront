import React, { useEffect, useState } from "react";
import axios from 'axios';
import Pagination from "./Pagination";
import PitcherDetail from './PitcherDetail';
import HitterDetail from './HitterDetail';
import './stylesPlayerList.css';

export default function PlayerList({ teamFilter }) {
    const [originalList, setOriginalList] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [positionFilter, setPositionFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [page, setPage] = useState(1);
    const pageSize = 20;
    const [selectedPlayer, setSelectedPlayer] = useState(null);


    useEffect(() => { // 초기에 전체 호출, 뷰단에 출력하려면 검색 or 초기화 사용
        axios.get('/api/playerList')
            .then(response => {
                setOriginalList(response.data)
            })
            .catch(error => console.error(error))
    }, []);

    useEffect(() => { // 필터링 적용 후 출력
        filterAndSetPlayerList(searchText, positionFilter, page);
    }, [searchText, positionFilter, page]);

    const formatBirthDate = (dateString) => { // 생년월일 형식 변경
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handlePositionFilterChange = (event) => { // 포지션 필터
        const newPositionFilter = event.target.value;
        setPositionFilter(newPositionFilter);
        setPage(1);
        filterAndSetPlayerList(searchText, newPositionFilter, 1);
    };

    const handlePageChange = (newPage) => { // 페이지 전환
        setPage(newPage);
        filterAndSetPlayerList(searchText, positionFilter, newPage);
    };

    const handlePlayerClick = (player) => { // detail 표시 위함
        if (player && player.player_Id) {
            setSelectedPlayer(player);
        }
    };

    const filterAndSetPlayerList = (searchText, newPositionFilter, page) => { // 필터링 반영된 페이징 리스트 구현
        const filteredList = originalList.filter((player) => {
            const nameMatch = player.player_Name.toLowerCase().includes(searchText.toLowerCase());
            const teamMatch = player.player_Team.toLowerCase().includes(searchText.toLowerCase());
            const positionMatch = player.player_Position.toLowerCase() === newPositionFilter.toLowerCase();
            return (nameMatch || teamMatch) && (!newPositionFilter || positionMatch);
        });

        const teamFiltered = filteredList.filter((player) => {
            return teamFilter === "" || player.player_Team.toLowerCase() === teamFilter.toLowerCase();
        });

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedList = teamFiltered.slice(startIndex, endIndex);

        setTotalItemCount(teamFiltered.length);
        setPlayerList(paginatedList);
    };

    const handleSearch = () => { // 검색
        setPage(1);
        filterAndSetPlayerList(searchText, positionFilter, 1);
    };

    const resetSearch = () => { // 필터링 초기화
        setSearchText("");
        setPositionFilter("");
        setPage(1); // 초기화 시 페이지를 1로 설정하여 처음 페이지로 돌아갑니다.
        filterAndSetPlayerList("", "", 1);
    };

    return (
        <div>
            <div className="selectDiv">
                <label> TeamFilter: </label>
                <span><strong> {teamFilter} </strong></span>

                <label> PositionFilter: </label>
                <select onChange={handlePositionFilterChange} value={positionFilter}>
                    <option value="">포지션 선택</option>
                    <option value="투수">투수</option>
                    <option value="포수">포수</option>
                    <option value="내야수">내야수</option>
                    <option value="외야수">외야수</option>
                </select>

                <input
                    type="text"
                    placeholder="선수 검색"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
                <button onClick={resetSearch}>초기화</button>
            </div>
            <div className="player-list-container">
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>등번호</th>
                        <th>선수명</th>
                        <th>팀명</th>
                        <th>포지션</th>
                        <th>생년월일</th>
                        <th>체격</th>
                    </tr>
                    </thead>
                    <tbody>
                    {playerList.map(player => (
                        <tr key={player.player_Id}>
                            <td>{player.player_Num}</td>
                            <td onClick={() => handlePlayerClick(player)}>
                                {player.player_Name}
                            </td>
                            <td>{player.player_Team}</td>
                            <td>{player.player_Position}</td>
                            <td>{formatBirthDate(player.player_Birth)}</td>
                            <td>{player.player_Physical}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {selectedPlayer != null && (
                <div className="modal">
                    <div className="modal-content">
                        {selectedPlayer.player_Position === '투수' ? (
                            <PitcherDetail playerId={selectedPlayer.player_Id} />
                        ) : (
                            <HitterDetail playerId={selectedPlayer.player_Id} />
                        )}
                    </div>
                    <button onClick={() => setSelectedPlayer(null)}>닫기</button>
                </div>
            )}

            <div>
                <Pagination
                    currentPage={page}
                    pageSize={pageSize}
                    totalItems={totalItemCount}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

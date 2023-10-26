import React, { useState } from "react";
import PlayerList from "./PlayerList";
import TeamData from "./TeamData";
import {useLocation} from "react-router-dom";

export default function KBOData() {
    const teamName = useLocation().state.teamFilter;
    let teamFilter = "";
    if(teamName){
        teamFilter = teamName;
    }
    const [showPlayerList, setShowPlayerList] = useState(false);
    const [showTeamData, setShowTeamData] = useState(true);

    function togglePlayerList() {
        setShowPlayerList(true);
        setShowTeamData(false);
    }

    function toggleTeamData() {
        setShowPlayerList(false);
        setShowTeamData(true);
    }

    return (
        <div>
            <div className="kbo-data-container"> {/* 이 컨테이너를 스타일링하기 위해 CSS 클래스를 적용합니다 */}
                <h2>KBO DATA</h2>
                <div>
                    <button onClick={toggleTeamData}>KBO Team</button>
                    <button onClick={togglePlayerList}>KBO Player</button>
                </div>
                <div>
                    {showTeamData && <TeamData teamFilter={teamFilter}/>}
                    {showPlayerList && <PlayerList teamFilter={teamFilter}/>}
                </div>
            </div>
        </div>
    );
}



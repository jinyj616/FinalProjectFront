import React , {useState , useEffect} from "react";
import axios from "axios";
export default function KboTeam(){
    const [TeamData , setTeamData] = useState([]);
    useEffect(() => {

        const fetchTeamData = async() => {
            try {
                const response = await axios.get('/team/data');
                setTeamData(response.data);
                console.log(response.data);
            } catch (error){
                console.log(error);
            }
        }
        fetchTeamData();
    }, []);

    const listItemStyle = {
        display: "flex", // 가로로 배열
        margin: "5px", // 아이템 간격

    };

    const commonStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#222',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        border: 0,
        font: 'inherit',
        verticalAlign: 'baseline',
        borderCollapse: 'collapse',
        borderSpacing: 0,
        width: '80%',
        borderTop: '1px solid #929292',
        justifyContent: 'space-between', // Add this line
        background: '#fff',
    };

    const pStyle = {
        padding: '10px', // Adjust the padding as needed
        lineHeight: '1.5', // Adjust the line height as needed
    };

    const pStyleElement = {
        padding: '21px', // Adjust the padding as needed
        lineHeight: '1.5', // Adjust the line height as needed
    };

    return (
        <div>
            <h1>안녕하세요.</h1>
            <p>안녕하세요. 철구에요.</p>
            <div style={commonStyle}>
                <p style={pStyle}>팀 이름</p>
                <p style={pStyle}>팀 순위</p>
                <p style={pStyle}>팀 게임</p>
                <p style={pStyle}>팀승</p>
                <p style={pStyle}>팀패</p>
                <p style={pStyle}>무승부</p>
                <p style={pStyle}>승률</p>
                <p style={pStyle}>Behind</p>
                <p style={pStyle}>마지막 10경기</p>
                <p style={pStyle}>연속</p>
                <p style={pStyle}>Home 기록</p>
                <p style={pStyle}>Away 기록</p>
            </div>
            {TeamData.map((data, index) => (
                <div key={index} style={{ ...commonStyle, marginTop: '10px' }}>
                    <p style={pStyleElement}>{data.team_Name}</p>
                    <p style={pStyleElement}>{data.team_Ranking}</p>
                    <p style={pStyleElement}>{data.team_Game}</p>
                    <p style={pStyleElement}>{data.team_Win}</p>
                    <p style={pStyleElement}>{data.team_Lose}</p>
                    <p style={pStyleElement}>{data.team_Draw}</p>
                    <p style={pStyleElement}>{data.team_Win_Rate}</p>
                    <p style={pStyleElement}>{data.team_Games_Behind}</p>
                    <p style={pStyleElement}>{data.team_Last_Ten_Games}</p>
                    <p style={pStyleElement}>{data.team_Continuity}</p>
                    <p style={pStyleElement}>{data.team_Home_Record}</p>
                    <p style={pStyleElement}>{data.team_Away_Record}</p>
                </div>
            ))}
        </div>
    );


}
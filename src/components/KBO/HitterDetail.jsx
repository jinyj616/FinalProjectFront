import React, {useEffect, useState}  from "react";
import axios from 'axios';

export default function HitterDetail({playerId}) {
    console.log(playerId);
    const [hitterData, setHitterData] = useState(null);

    useEffect(() => {
        axios.get(`/api/hitterDetail/${playerId}`)
            .then(response => {
                setHitterData(response.data);
            })
            .catch(error => console.error(error));
    }, [playerId]);

    if (!hitterData){
        return <div>
            Loading...
        </div>;
    }

    return (
        <div>
            <h2>2023 성적</h2>
            <div>
                <img src={hitterData.player_Image_Url} alt={hitterData.player_Name} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><strong>이름:</strong> {hitterData.player_Name}</td>
                    </tr>
                    <tr>
                        <td><strong>팀명:</strong> {hitterData.player_Team}</td>
                    </tr>
                    <tr>
                        <td><strong>AVG:</strong> {hitterData.player_AVG}</td>
                    </tr>
                    <tr>
                        <td><strong>게임 수:</strong> {hitterData.player_Game}</td>
                    </tr>
                    <tr>
                        <td><strong>타수:</strong> {hitterData.player_AB}</td>
                    </tr>
                    <tr>
                        <td><strong>득점:</strong> {hitterData.player_R}</td>
                    </tr>
                    <tr>
                        <td><strong>안타:</strong> {hitterData.player_H}</td>
                    </tr>
                    <tr>
                        <td><strong>2루타:</strong> {hitterData.player_2B}</td>
                    </tr>
                    <tr>
                        <td><strong>3루타:</strong> {hitterData.player_3B}</td>
                    </tr>
                    <tr>
                        <td><strong>홈런:</strong> {hitterData.player_HR}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
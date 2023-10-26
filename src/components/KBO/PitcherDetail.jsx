import React, {useEffect, useState}  from "react";
import axios from 'axios';

export default function PitcherDetail({playerId}) {
    console.log(playerId);
    const [pitcherData, setPitcherData] = useState(null);

    useEffect(() => {
        axios.get(`/api/pitcherDetail/${playerId}`)
            .then(response => {
                setPitcherData(response.data);
            })
            .catch(error => console.error(error));
    }, [playerId]);

    if (!pitcherData){
        return <div>
            Loading...
        </div>;
    }

    return (
        <div>
            <h2>2023 성적</h2>
            <div>
                <img src={pitcherData.player_Image_Url} alt={pitcherData.player_Name} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <td><strong>이름:</strong> {pitcherData.player_Name}</td>
                    </tr>
                    <tr>
                        <td><strong>팀명:</strong> {pitcherData.player_Team}</td>
                    </tr>
                    <tr>
                        <td><strong>평균자책점:</strong> {pitcherData.player_ERA}</td>
                    </tr>
                    <tr>
                        <td><strong>게임 수:</strong> {pitcherData.player_Game}</td>
                    </tr>
                    <tr>
                        <td><strong>승리:</strong> {pitcherData.player_Win}</td>
                    </tr>
                    <tr>
                        <td><strong>패배:</strong> {pitcherData.player_Lose}</td>
                    </tr>
                    <tr>
                        <td><strong>세이브:</strong> {pitcherData.player_Save}</td>
                    </tr>
                    <tr>
                        <td><strong>홀드:</strong> {pitcherData.player_HLD}</td>
                    </tr>
                    <tr>
                        <td><strong>승률:</strong> {pitcherData.player_WPCT}</td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr> {/*size adjust*/}
                </tbody>
            </table>
        </div>
    );
}
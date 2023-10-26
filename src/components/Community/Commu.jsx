import {Link} from "react-router-dom";
import BoardList from "./BoardList";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Commu(){
    const [data, setData] = useState("")

    useEffect(() => {
        const getBoardList = async () => {
            const response = await axios.get("/api/board-list");
            console.log('main/response: ', response.data);
            setData(response.data.data);
        };
        getBoardList();
    }, [])
    return(
        <>
            <div className="container1">
                <Link to="/createBoard" >
                    <a> <img src = "/img/write.PNG"  alt="write"/>  </a>
                </Link>
                <BoardList data={data}/>
            </div>
        </>
    )
}
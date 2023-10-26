import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./WriteBoard.css"

const WriteBoard = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [titleError, setTitleError] = useState(false); // 제목 입력 여부를 나타내는 상태 추가
    let navigate = useNavigate();

    const resetInput = () => {
        setContent("");
        setTitle("");
        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
    }

    const handleInputClick = async (e) => {
        if (title === "") {
            setTitleError(true); // 제목이 비어있을 때 에러 상태를 true로 설정
            return;
        } else {
            setTitleError(false); // 제목이 비어있지 않으면 에러 상태를 false로 설정
        }

        document.getElementById('input_title').value = '';
        document.getElementById('textarea_content').value = '';
        console.log('writeBoard');
        const request_data = { title: title, content: content };
        console.log('req_data: ', request_data);
        try {
            let response = await axios({
                method: 'post',
                url: '/api/create-board',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(request_data)
            });
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            if (response.status >= 200 && response.status < 300) {
                alert("게시글이 정상적으로 생성되었습니다.");
                resetInput();
            }
            if (response.status >= 400) {
                alert("게시글 생성이 정상적으로 되지 않았습니다.");
            }
            navigate("/", {});
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
            resetInput();
        }
    }

    return (
        <>
            <div className="WriteBoardMain">
                <div className="WriteBoardMid">
                    <div className="WriteBoardMidh2"><h2>제목</h2></div> <br />
                    <input id='input_title' type="text" placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.target.value)} value= {title} /><br /><br />
                    {titleError && <p style={{ color: 'red' }}>제목을 입력해주세요</p>} {/* 제목 입력 에러 메시지 */}

                    <div className="WriteBoardMidh2"><h2>내용</h2></div> <br />

                    <textarea id='textarea_content' type="text" placeholder="내용을 입력해주세요" onChange={(e) => setContent(e.target.value)} value={content} /><br />

                    <input type="button" value="게시글 생성" onClick={handleInputClick} />

                </div>
                <div class="rightSidebar">
                    <a> <img src = "/img/rightSideBar.PNG" />  </a>
                </div>
            </div>
        </>
    )
}

export default WriteBoard;
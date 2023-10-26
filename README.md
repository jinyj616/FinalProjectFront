import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../CSS/Join.css';

export default function Join() {
    const [allIdData, setAllIdData] = useState([]);
    const [allEmailData, setAllEmailData] = useState([]);

    const initialUserState = {
        id: '',
        email: '',
        password: '',
        confirmPassword : '',
        nickName: '',
        name: '',
        birthDate: '',
    };

    const [user, setUser] = useState(initialUserState);
    const formRef = useRef(null);
    const [passwordMatch, setPasswordMatch] = useState(false); // 비밀번호 일치 여부 상태
    const [idFormatError, setIdFormatError] = useState(false); // 아이디 형식 오류 상태
    const [passwordFormatError , setPasswordFormatError] = useState(false); // 비밀번호 오류 상태
    const [emailFormatError, setEmailFormatError] = useState(false); // 이메일 형식 오류 상태
    const [nicknameFormatError, setNicknameFormatError] = useState(false); // 닉네임 형식 오류 상태
    const [nameFormatError, setNameFormatError] = useState(false); // 이름 형식 오류 상태

    const fetchAllData = async () => {
        try {
            const response = await axios.get('/Login/findAll');
            const idList = response.data.map(member => member.id);
            const emailList = response.data.map(member => member.email)
            setAllIdData(idList);
            setAllEmailData(emailList);
        } catch (error) {
            console.error('데이터 불러오기 실패:', error);
        }

    };

    useEffect(() => {
        fetchAllData(); // 컴포넌트가 마운트될 때 한 번 호출
    }, []);

    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [fieldName]: value });

        if (fieldName === "confirmPassword") {
            if (user.password === value) {
                setPasswordMatch(true);
            }
        }

        // 아이디 형식 검사 (8글자 이상, 영문자와 숫자, 공백 허용 but 앞뒤 공백 제외)
        if (fieldName === "id") {
            const isValidId = /^[A-Za-z0-9\s]{8,}$/u.test(value);
            setIdFormatError(!isValidId);
        }

        if (fieldName === "password") {
            const isValidPassword = /^[A-Za-z0-9\s]{8,}$/.test(value);
            setPasswordFormatError(!isValidPassword);
        }

        if (fieldName === "email") {
            const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z\s]{2,}$/.test(value);
            setEmailFormatError(!isValidEmail);
        }

        if (fieldName === "nickName") {
            const isValidNickname = /^[A-Za-z0-9\uAC00-\uD7A3\s]{1,8}$/u.test(value);
            setNicknameFormatError(!isValidNickname);
        }

        if (fieldName === "name") {
            const isValidName = /^[A-Za-z\uAC00-\uD7A3\s]*[A-Za-z\uAC00-\uD7A3\s]+$/u.test(value) && value.length >= 2 && value.length <= 8;
            setNameFormatError(!isValidName);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordMatch) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (emailFormatError) {
            alert('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (nicknameFormatError) {
            alert('닉네임 형식이 올바르지 않습니다.');
            return;
        }

        try {
            const userData = {
                id: user.id,
                email: user.email,
                password: user.password,
                nickName: user.nickName,
                name: user.name,
                birthDate: user.birthDate,
            };
            const response = await axios.post('/Login/save', userData);
            console.log(response);
            formRef.current.reset();
            setUser(initialUserState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form ref={formRef} className="joinForm" onSubmit={handleSubmit}>
            <div className="inputContainer">
                <input
                    type="text"
                    name="id"
                    value={user.id}
                    onChange={handleChange}
                    placeholder="아이디 (8글자 이상, 영문자와 숫자 포함)"
                />
                {idFormatError && (
                    <p>아이디 형식이 올바르지 않습니다.</p>
                )}

                {!idFormatError && user.id && allIdData.includes(user.id) && (
                    <p>이미 사용 중인 아이디입니다.</p>
                )}
                {!idFormatError && user.id && !allIdData.includes(user.id) && (
                    <p>사용 가능한 아이디입니다.</p>
                )}

            </div>
            <div className="inputContainer">
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                />
            </div>
            <div className="inputContainer">
                <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                />
                {passwordFormatError &&  (
                    <p>비밀번호 형식이 올바르지 않습니다.</p>
                )}
                {!passwordFormatError && user.password && user.confirmPassword && !passwordMatch
                    && ( <p>중복비밀번호가 일치하지 않습니다.
                    </p>)}
                {!passwordFormatError && user.password && user.confirmPassword && passwordMatch &&
                    ( <p> 중복비밀번호가 일치합니다. </p>
                    )}
            </div>
            <div className="inputContainer">
                <input
                    type="text"
                    name="nickName"
                    value={user.nickName}
                    onChange={handleChange}
                    placeholder="닉네임 (2글자 이상) "
                />
                {nicknameFormatError && <p>닉네임 형식이 올바르지 않습니다.</p>}
            </div>
            <div className="inputContainer">
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="이름(두 글자이상 , 숫자 x)"
                />
                {nameFormatError && <p> 형식에 맞춰서 입력해주세요.</p>}
            </div>
            <div className="inputContainer">
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="이메일"
                />
                {emailFormatError && (
                    <p>이메일 형식이 올바르지 않습니다.</p>
                )}

                {!emailFormatError && user.email && allEmailData.includes(user.email) && (
                    <p>이미 사용 중인 이메일입니.</p>
                )}
                {!emailFormatError && user.email && !allEmailData.includes(user.email) && (
                    <p>사용 가능한 이메일입니다.</p>
                )}

            </div>
            <div className="inputContainer">
                <input
                    type="date"
                    name="birthDate"
                    value={user.birthDate}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
}
---------------------------------------------------------------- join.js

// Login.js

import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useHistory를 임포트
import axios from "axios";
import '../CSS/Join.css'
export default function Login() {
    const navigate = useNavigate(); // useHistory 훅을 사용하여 라우터의 이동을 관리
    const [user, setUser] = useState({
        id: '',
        password: ''
    });


    const handleChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [fieldName]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                id: user.id,
                password: user.password
            };
            const response = await axios.post("/Login/login", userData);
            const message = response.data.message;
            const sessionData = response.data.sessionData;
            if (message === "로그인 성공") {
                console.log("로그인 성공!");
                navigate('/Login/main',{state :  {userId: sessionData}});
            } else {
                console.error("로그인 실패");
            }
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    };

    return (
        <form className="loginForm" onSubmit={handleLogin}>
            <div className="inputContainer">
                <label>Id:</label>
                <input
                    type="text"
                    name="id"
                    value={user.id}
                    onChange={handleChange}
                />
            </div>
            <div className="inputContainer">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">로그인</button>
        </form>
    );
}

---------------------------------------------------------------- login.js

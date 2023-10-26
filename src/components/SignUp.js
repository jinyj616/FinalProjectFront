import React, {useEffect, useState} from "react";
import { signUp } from "../api/AuthAPI";
import axios from "axios";
import {Form, FormContainer, FormWrapper} from "./SignIn";

export default function SignUp() {
  const [values, setValues] = useState({
    userId:"",
    email:"",
    password: "",
    passwordConfirm:"",
    nickName:"",
    name: "",
    birthDate:"",
  });
  const [allIdData, setAllIdData] = useState([]);
  const [allEmailData, setAllEmailData] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(false); // 비밀번호 일치 여부 상태
  const [idFormatError, setIdFormatError] = useState(false); // 아이디 형식 오류 상태
  const [passwordFormatError , setPasswordFormatError] = useState(false); // 비밀번호 오류 상태
  const [emailFormatError, setEmailFormatError] = useState(false); // 이메일 형식 오류 상태
  const [nicknameFormatError, setNicknameFormatError] = useState(false); // 닉네임 형식 오류 상태
  const [nameFormatError, setNameFormatError] = useState(false); // 이름 형식 오류 상태

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
    const fieldName = e.target.name;
    const value = e.target.value;

    if (fieldName === "passwordConfirm"){
      console.log(value)
      console.log(values.password)
      if(value===values.password){
        setPasswordMatch(true)
      }else{
        setPasswordMatch(false)
      }
      console.log(passwordMatch)
    }

    // 아이디 형식 검사 (8글자 이상, 영문자와 숫자, 공백 허용 but 앞뒤 공백 제외)
    if (fieldName === "userId") {
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
  const fetchAllData = async() => {
    try {
      const response = await axios.get('/api/allUser');
      const idList = response.data.map(member => member.userId);
      const emailList = response.data.map(member => member.email)
      console.log(idList)
      console.log(emailList);
      setAllIdData(idList);
      setAllEmailData(emailList);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }

  };

  useEffect(() => {
 // 컴포넌트가 마운트될 때 한 번 호출
    fetchAllData();
  }, []);

  const handleSubmit = async (e) => {
    const user = {
      userId: values.userId,
      email: values.email,
      password: values.password,
      nickName: values.nickName,
      name: values.name,
      birthDate: values.birthDate,
    }
    if(user.name && user.email && user.password && user.nickName && user.name && user.birthDate){
      signUp(user)
          .then((response) => {
            if (response){
              alert("가입 성공")
              window.location.href = `/Login`;
            }else{
              alert("이미 가입된 ID 입니다.")
            }
          }).catch((error) => {
        console.log(error);
      });
    }
    e.preventDefault()
  };

  return (
    <FormContainer>
      <FormWrapper>
        <h2 style={{ color: "#ecf0f1" }}>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              placeholder="ID"
              onChange={handleChange}
              value={values.userId}
            />
            {idFormatError && (
                <p>아이디 형식이 올바르지 않습니다.</p>
            )}

            {!idFormatError && values.userId && allIdData.includes(values.userId) && (
                <p>이미 사용 중인 아이디입니다.</p>
            )}
            {!idFormatError && values.userId && !allIdData.includes(values.userId) && (
                <p>사용 가능한 아이디입니다.</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />

            {passwordFormatError &&  (
                <p>비밀번호 형식이 올바르지 않습니다.</p>
            )}
          </div>
          <div className="form-group">

            <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Password_Check"
                onChange={handleChange}
                value={values.passwordConfirm}
            />
            {passwordMatch
                ? <p> 중복비밀번호가 일치합니다. </p>
                : <p> 중복비밀번호가 일치하지 않습니다.</p>
            }
          </div>

          <div className="form-group">
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
            />
            {emailFormatError && (
                <p>이메일 형식이 올바르지 않습니다.</p>
            )}
            {!emailFormatError && values.email && allEmailData.includes(values.email) && (
                <p>이미 사용 중인 이메일입니.</p>
            )}
            {!emailFormatError && values.email && !allEmailData.includes(values.email) && (
                <p>사용 가능한 이메일입니다.</p>
            )}
          </div>
          <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="nickName"
                name="nickName"
                placeholder="NickName"
                onChange={handleChange}
                value={values.nickName}
            />
            {nicknameFormatError && <p>닉네임 형식이 올바르지 않습니다.</p>}
          </div>
          <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={values.name}
            />
            {nameFormatError && <p> 형식에 맞춰서 입력해주세요.</p>}
          </div>
          <div className="form-group">
            <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                placeholder="birthDate"
                onChange={handleChange}
                value={values.birthDate}
            />
          </div>
          <div className="form-group">
            <button type="submit">Sign up</button>
          </div>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
}
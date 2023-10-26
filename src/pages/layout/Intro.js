import React from "react";
import styled from "styled-components";
import aboutImage from "../../assets/main.jpg"; // 이미지 파일을 import 합니다.

export const introText = {
  title: "'ENJOY YOUR SPORT'",   
  desc: ["CELEBRATE", " YOUR DREAMS THROUGH", "THE POWER OF SPORTS"],

};

const IntroSection = styled.section`
  height: 100vh;
`;

const IntroInner = styled.div`
  width: 100%;
  height: 100%; 
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  padding: 16px;

  
  @media (max-width: 800px) {
    justify-content: center;
  }

  .intro__title {
    font-size: 10vw;
    text-transform: uppercase;
    line-height: 1;
    font-weight: 800;
    white-space: nowrap;
    text-indent: -0.5vw;
    letter-spacing: -0.3vw;
    text-shadow: 6px 2px 2px gray;

    @media (max-width: 320px) {
      display: none;
    }
  }
  .intro__text {
    width: 100%;
    height: 40vh;
    background-color: var(--black);
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    text-shadow: 6px 2px 2px gray;

    .text {
      font-size: 3vw;
      line-height: 1;
      font-weight: 900;
      text-transform: uppercase;
      text-decoration: underline;
      text-align: center;
      position: relative;
      z-index: 100;
      transition: all 0.3s;
      cursor: all-scroll;

      @media (max-width: 800px) {
        font-size: 24px;
      }
    }
    .img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 30vh;
      height: 30vh;
      border-radius: 50%;
      overflow: hidden;
      filter: grayscale(100%);
      transition: all 0.3s;

      @media (max-width: 320px) {
        width: 20vh;
        height: 20vh;
      }
    }

    &:hover .text {
      opacity: 0;
    }
    &:hover .img {
      filter: grayscale(0);
    }
  }
  .intro__lines {
    width: 100%;

    .line {
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--black);
      margin-bottom: 0.5vw;
      
    }

    &.bottom {
      .line {
        margin-top: 0.5vw;
        margin-bottom: 0;
        display: none;

        @media (max-width: 800px) {
          display: block;
        }
      }
    }
  }
`;

const Intro = () => {
  return (
    <IntroSection id="intro">
      <IntroInner className="intro__inner">
        <h2 className="intro__title">{introText.title}</h2>
        <div className="intro__lines" aria-hidden="true">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div className="intro__text">
          <div className="text">
            <div>{introText.desc[0]}</div>
            <div>{introText.desc[1]}</div>
            <div>{introText.desc[2]}</div>
          </div>
          <div className="img">
            <img src={aboutImage} alt="어바웃미" />
          </div>
        </div>
      </IntroInner>
    </IntroSection>
  );
};

export default Intro;
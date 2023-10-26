import {useLocation} from "react-router-dom";
import React from "react";
import styled from "styled-components";


export default function CurrentKboSpecific(){
    const index = useLocation().state.channelId;
    const game = useLocation().state.game;

    return(
        <Container>
            <MathDetail>
            <span className="leftContent">
              {game.TodayLeftGameInfo}
                <img
                    className="imgStyle"
                    src={game.LeftImage_src}
                    alt="Left Team"
                />
            </span>
                <span className="rightContent">
              {game.TodayRightGameInfo}
                    <img
                        className="imgStyle"
                        src={game.RightImage_src}
                        alt="Right Team"
                    />
            </span>
            </MathDetail>
        </Container>
    )

}

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const MathDetail = styled.div`
  border-radius: 10px;
  width: 80%;
  height: 80%;
  margin: 20px auto;
`

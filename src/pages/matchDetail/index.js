import MainLayout from "../layout/MainLayout";
import ChatRoom from "../../components/ChatRoom";
import CurrentKboSpecific from "../../components/CurrentKboSpecific";
import styled from "styled-components";

function Match() {

  return (
    <MainLayout>
        <Container>
            <MatchDiv>
                <CurrentKboSpecific/>
            </MatchDiv>
            <ChatDiv>
                <ChatRoom/>
            </ChatDiv>
        </Container>
    </MainLayout>
  );
}

export default Match;

export const MatchDiv = styled.div`
  border: 1px #7d7d7d solid;
  border-radius: 5px;
  width: 50%;
  height: 20%;
  margin: auto;
  background: #7d7d7d;
`
export const ChatDiv = styled.div`
  border: 1px #7d7d7d solid;
  width: 50%;
  border-radius: 5px;
  margin: auto;
`
const Container = styled.div`
  height: 100%;
  border-radius: 5px;
  width: 100%;
`
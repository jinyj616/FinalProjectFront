import { useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import { fetchUser } from "../api/UserAPI";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ChatRoom = () => {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const client = useRef({});
  const messageEndRef = useRef(null)
  const channelId = useLocation().state.channelId;
  const [user, setUser] = useState({});

  const [fontColor, setFontColor] = useState(0);

  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  const colors = [
      "#FFC0CB","#DC143C","#FF7F50"
    ,"#FFFF00","#00FF00","#00FFFF"
    ,"#0000FF","#9400D3","#FF00FF"
    ,"#FFF0F5"
  ]

  useEffect(() => {
    if (ACCESS_TOKEN) {
      fetchUser()
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFontColor(Math.floor(Math.random() * 10));
  }, [ACCESS_TOKEN]);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: () => {
        console.log("success");
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    console.log("publish:", chat);
    if (!client.current.connected) {
      return;
    }
    console.log(user.name);
    const message = {
      channelId: channelId,
      writerName: user.nickName,
      chat: chat,
    };
    console.log(message);
    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify(message),
    });

    setChat("");
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat/" + channelId, (body) => {
      const json_body = JSON.parse(body.body);
      console.log(typeof json_body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    event.preventDefault();
    if(chat){
      console.log(chat);
      publish(chat);
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);


  useEffect(() => {
    if(ACCESS_TOKEN){
      messageEndRef.current.scrollIntoView({behavior:'smooth'})
    }
  }, [chatList])

  return (
    <>
      {ACCESS_TOKEN ? (
        <div>
          <ChatBox>
            {chatList.map((data) => {
              return (
                <ChatUl key={data.channelId}>
                  <li>
                    <span style={{color:colors.at(fontColor)}}>{data.writerName}</span> :{data.chat}
                  </li>
                </ChatUl>
              );
            })}
            <div ref={messageEndRef}></div>
          </ChatBox>
          <form onSubmit={(event) => handleSubmit(event, chat)}>
            <FullDiv>
              <ChatInput
                type="text"
                name="chatInput"
                placeholder="메세지 보내기"
                onChange={handleChange}
                value={chat}
              />
              <SendButton type="submit">Chat</SendButton>
            </FullDiv>
          </form>
        </div>
      ) : (
        <div>
          <div>login 해주세요!</div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;


const FullDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const ChatBox = styled.div`
  height: 300px;
  max-width: 100%;
  padding-bottom:2px;
  overflow-y:auto;
  overflow-x:hidden;
  white-space:nowrap;
  &::-webkit-scrollbar{
    display: none;
  }
  margin-bottom: 10px;
`
export const ChatUl = styled.ul`
  color:#ffff;
`

const ChatInput = styled.input`
  width: 100%;
  background: #202025;
  color: white;
  border: #D3D3D3 1px solid;
`

const SendButton = styled.button`
  width: 60px;
  
`
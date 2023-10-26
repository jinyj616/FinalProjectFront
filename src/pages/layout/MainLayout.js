import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Container = styled.div`
  min-width: 100%;
  min-height: 1250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center; /* 또는 다른 정렬 방법을 선택하세요 */
`;

const Content = styled.div`
  width: 100%;
  height: 100%; /* 60% 대신 100%로 변경 */
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default MainLayout;

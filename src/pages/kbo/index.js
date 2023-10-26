
import React from 'react';
import MainLayout from "../layout/MainLayout";
import KBOData from "../../components/KBO/KBOData";
import KBOLogoPath from "../../components/KBOLogoPath";
import styled from "styled-components";

export default function KBO(){
    return(
        <MainLayout>
            <KBOContainer>
                <KboBox>
                    <KBOLogoPath />
                </KboBox>
                <KboBox>
                    <KBOData />
                </KboBox>
            </KBOContainer>
        </MainLayout>
    )
}

export const KBOContainer = styled.div`
  width: 95%;
  height: 95%;
  margin: auto;
  display: grid;
  grid-template-columns: 0.3fr 2fr 1fr;
  grid-template-rows: 1fr 1fr;/* 각 행(세로줄)의 길이 */
  gap: 10px;
`

export const KboBox = styled.div`
  background: #202030;
  width: 100%;
  height: 100%;
  font-size: 20px;
  border: 1px solid #202030;
  text-align: center;
  border-radius: 10px;
  &:nth-child(1){
    grid-row:1/ span 2;
  }
  &:nth-child(2){
    grid-row:1/ span 2;
  }
`


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 1100) {
        setIsFooterVisible(true);
      } else {  
        setIsFooterVisible(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isFooterVisible && (
        <FooterSection>
          <p style={{ margin: 0 }}>&copy; 2023 Baseball Analysis Information Website.</p>
        </FooterSection>
      )}
    </>
  );
};

export default Footer;

const FooterSection = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333333;
  padding: 20px;
  border-top: 1px solid #ddd;
  text-align: center;
  color: #f8f3f3;
`;
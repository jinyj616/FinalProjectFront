import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../api/UserAPI';

const Header = () => {
  const [user, setUser] = useState({});
  const ACCESS_TOKEN = localStorage.getItem('accessToken');

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
  }, [ACCESS_TOKEN]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    { label: 'Home', to: '/' },
    { label: 'Community', to: '/Community' },
    { label: 'Match', to: '/Match' },
    { label: 'News', to: '/articles' },
    { label: 'Team', to: '/Team' }
  ];

  return (
    <HeaderContainer>
      <div className="header">
        {menuItems.map((item, index) => (
          <MenuItem key={index} to={item.to}>
            {item.label}
          </MenuItem>
        ))}
      </div>
      {ACCESS_TOKEN ? (
        <Dropdown>
          <Dropth>{user.nickName}</Dropth>
          <DropdownContent>
            <DropdownContentLink to="/my-page">My Page</DropdownContentLink>
            <DropdownContentLink to="/" onClick={handleLogout}>
              Logout
            </DropdownContentLink>
          </DropdownContent>
        </Dropdown>
      ) : (
        <Dropdown>
          <Dropth>Log In</Dropth>
          <DropdownContent>
            <DropdownContentLink to="/login">Log In</DropdownContentLink>
            <DropdownContentLink to="/join">Sign Up</DropdownContentLink>
          </DropdownContent>
        </Dropdown>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  
  background-color: #333333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MenuItem = styled(Link)`
  border-radius: 4px;
  background-color: #333333;
  font-weight: 400;
  color: #f8f3f3;
  padding: 12px;
  width: 100px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  margin-right: 20px;
  text-decoration: none;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #555555;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropth = styled.button`
  border-radius: 4px;
  background-color: #333333;
  font-weight: 400;
  color: #f8f3f3;
  padding: 12px;
  width: 100px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  font-weight: 400;
  background-color: #FBF3F3;
  min-width: 100px;
  ${Dropdown}:hover & {
    display: block;
  }
`;

const DropdownContentLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: rgb(37, 37, 37);
  font-size: 13px;
  padding: 12px 20px;
  &:hover {
    background-color: #FBF3F3;
  }
`;

export default Header;


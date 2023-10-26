import { Outlet } from 'react-router-dom';
import GlobalStyle from './style/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;

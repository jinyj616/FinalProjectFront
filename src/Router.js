import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Main from "./pages/main";
import Community from "./pages/community";
import Login from "./pages/login";
import MyPage from "./pages/mypage";
import Join from "./pages/join";
import Match from "./pages/match";
import Chat from "./pages/chat";
import KBO from "./pages/kbo";
import KLeagueTeamView from "./pages/Info/KLeague/KLeagueTeamView";
import KboTeamView from "./pages/Info/KboTeam/KboTeamView";
import KLeauge_playerView from "./pages/Info/KLeague/KLeague_playerView";
import KLeague_currentView from "./pages/Info/KLeague/KLeague_currentView";
import Article from "./pages/news";
import ArticleDetail from "./news/component/ArticleDetail";
import MainLayout from "./pages/layout/MainLayout";
import MatchDetail from "./pages/matchDetail";
import CommuDetail from "./pages/commuDetail";
import CreateBoard from "./pages/createBoard";
import UpdateBoard from "./pages/updateBoard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "my-page",
        element: <MyPage />,
      },
      {
        path: "match",
        element: <Match />,
      },
      {
        path: "matchDetail",
        element: <MatchDetail/>,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "/kbo/team",
        element: <KboTeamView />,
      },
      {
        path: '/KBO',
        element : <KBO/> ,
      },
      {
        path: "/kLeague/player",
        element: <KLeauge_playerView />,
      },
      {
        path: "/kLeague/team",
        element: <KLeagueTeamView />,
      },
      {
        path: "/KLeague/current",
        element: <KLeague_currentView/>,
      },
      {
        path: 'articles/',
        element: <Article />,
      },
      {
        path: 'articles/:id',
        element: (
            <MainLayout>
              <ArticleDetail />
            </MainLayout>
        ),
      },
      {
        path: '/commuDetail',
        element: <CommuDetail/>,
      },
      {
        path: '/createBoard',
        element: <CreateBoard/>,
      },
      {
        path: '/updateBoard',
        element: <UpdateBoard/>
      },
    ],
  },
]);

export default Router;

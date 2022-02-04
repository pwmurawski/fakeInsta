import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useMemo, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header/Header";
import Menu from "./components/Layout/Menu/Menu";
import Home from "./Page/Home/Home";
import Footer from "./components/Layout/Footer/Footer";
import Post from "./Page/Post/Post";
import NotFound from "./Page/NotFound/NotFound";
import Explore from "./Page/Explore/Explore";
import SelectImgNewPost from "./Page/SelectImgNewPost/SelectImgNewPost";
import DetailsNewPost from "./Page/DetailsNewPost/DetailsNewPost";
import Profil from "./Page/Profil/Profil";
import InboxMessage from "./Page/InboxMessage/InboxMessage";
import AddNewMessage from "./Page/AddNewConversation/AddNewConversation";
import ProfilSettings from "./Page/Profil/ProfilSettings/ProfilSettings";
import Login from "./Page/Auth/Login/Login";
import Register from "./Page/Auth/Register/Register";
import ReducerContext from "./context/ReducerContext";
import AuthContext from "./context/AuthContext";
import UserProfil from "./Page/UserProfil/UserProfil";

interface ILocationState {
  state?: {
    background: string;
  };
}

interface ISetAuth {
  email: string;
  token: string;
  userId: string;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation() as ILocationState;
  const background = location.state?.background;
  const authMemo = useMemo(
    () => ({
      user: state.user,
      login: (user: ISetAuth) => dispatch({ type: "login", user }),
      logout: () => dispatch({ type: "logout" }),
    }),
    [state, dispatch]
  );
  const reducerMemo = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  const auth = (
    <Routes>
      <Route index element={<Login />} />
      <Route path="accounts/emailsignup" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  const header = (
    <Header>
      <Menu />
    </Header>
  );
  const content = (
    <>
      <Routes location={background}>
        <Route path="/" element={<Home />} />
        <Route path="direct/*" element={<InboxMessage />} />
        <Route path="explore" element={<Explore />} />
        <Route path="u/:userId/*" element={<UserProfil />} />
        <Route path="profile/*" element={<Profil />} />
        <Route path="accounts/*" element={<ProfilSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background ? (
        <Routes>
          <Route path="p/:userId/:postId/:postImg" element={<Post />} />
          <Route path="create/select" element={<SelectImgNewPost />} />
          <Route path="create/details" element={<DetailsNewPost />} />
          <Route path="direct/new" element={<AddNewMessage />} />
        </Routes>
      ) : null}
    </>
  );
  const footer = <Footer />;

  return (
    <AuthContext.Provider value={authMemo}>
      <ReducerContext.Provider value={reducerMemo}>
        <Layout auth={auth} header={header} content={content} footer={footer} />
      </ReducerContext.Provider>
    </AuthContext.Provider>
  );
}

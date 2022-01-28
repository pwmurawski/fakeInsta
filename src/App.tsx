/* eslint-disable react/jsx-no-useless-fragment */
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
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
import AddNewMessage from "./Page/AddNewMessage/AddNewMessage";
import ProfilSettings from "./Page/Profil/ProfilSettings/ProfilSettings";
import Login from "./Page/Auth/Login/Login";
import Register from "./Page/Auth/Register/Register";

interface ILocationState {
  state?: {
    background: string;
  };
}

export default function App() {
  const { state } = useLocation() as ILocationState;
  const background = state?.background;
  const [isAuth, setIsAuth] = useState(false);

  const auth = (
    <Routes>
      <Route index element={<Login setIsAuth={setIsAuth} />} />
      <Route
        path="accounts/emailsignup"
        element={<Register setIsAuth={setIsAuth} />}
      />
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
        <Route path=":userName/*" element={<Profil />} />
        <Route path="accounts/*" element={<ProfilSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background ? (
        <Routes>
          <Route path="p/:id" element={<Post />} />
          <Route path="create/select" element={<SelectImgNewPost />} />
          <Route path="create/details" element={<DetailsNewPost />} />
          <Route path="direct/new" element={<AddNewMessage />} />
        </Routes>
      ) : null}
    </>
  );
  const footer = <Footer />;

  return (
    <Layout
      isAuth={isAuth}
      auth={auth}
      header={header}
      content={content}
      footer={footer}
    />
  );
}

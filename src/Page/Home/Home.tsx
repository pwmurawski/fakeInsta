import { useState } from "react";
import {
  Wrapper,
  Content,
  AsideContainer,
  FooterContainer,
} from "./Home_styles";
import Posts from "../../components/Posts/Posts";
import Stories from "../../components/Stories/Stories";
import Footer from "../../components/Layout/Footer/Footer";
import Aside from "../../components/Layout/Aside/Aside";
import userImg from "../../assets/user.jpg";
import Img3 from "../../assets/3.jpg";

export default function Home() {
  const [postsData, setPostsData] = useState([
    {
      id: 1,
      user: {
        id: 1,
        userName: "kowal.adam",
        logo: userImg,
      },
      img: Img3,
      like: 10,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      comments: 5,
      time: 35,
    },
    {
      id: 2,
      user: {
        id: 1,
        userName: "murawski123",
        logo: userImg,
        storiesActive: true,
      },
      img: Img3,
      like: 1000,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      comments: 352,
      time: 5,
    },
    {
      id: 3,
      user: {
        id: 1,
        userName: "nowwwwaak",
        logo: userImg,
      },
      img: Img3,
      like: 98,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      comments: 7,
      time: 45,
    },
  ]);

  return (
    <Wrapper>
      <Content>
        <Stories />
        <Posts postsData={postsData} />
      </Content>
      <AsideContainer>
        <Aside />
      </AsideContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Wrapper>
  );
}

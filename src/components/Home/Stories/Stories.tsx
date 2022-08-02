import { useState } from "react";
import nextImg from "../../../assets/next .png";
import useStories from "../../../hooks/useStories";
import { IStoriesData } from "../../../interfaces/interfaces";
import {
  Wrapper,
  NextBtn,
  NextBtnIcon,
  StoryContainer,
  PrevBtn,
  PrevBtnIcon,
} from "./Stories_style";
import StoryMap from "./StoryMap/StoryMap";

export default function Stories() {
  const [storiesData, setStoriesData] = useState<IStoriesData[]>([
    {
      id: "1",
      userName: "User1",
    },
    {
      id: "2",
      userName: "User2",
    },
    {
      id: "3",
      userName: "User3",
    },
    {
      id: "4",
      userName: "User4",
    },
    {
      id: "5",
      userName: "User5",
    },
    {
      id: "6",
      userName: "User6",
    },
    {
      id: "7",
      userName: "User7",
    },
    {
      id: "8",
      userName: "User8",
    },
    {
      id: "9",
      userName: "User9",
    },
    {
      id: "10",
      userName: "User10",
    },
    {
      id: "11",
      userName: "User11",
    },
    {
      id: "12",
      userName: "User12",
    },
    {
      id: "13",
      userName: "User13",
    },
    {
      id: "14",
      userName: "User14",
    },
  ]);
  const [
    storiesScroll,
    nextBtnMounted,
    prevBtnMounted,
    nextBtnHandler,
    prevBtnHandler,
    storyContainerRef,
  ] = useStories();

  return (
    <Wrapper>
      <StoryContainer ref={storyContainerRef} scroll={-storiesScroll}>
        <StoryMap storiesData={storiesData} />
      </StoryContainer>
      {prevBtnMounted ? (
        <PrevBtn onClick={prevBtnHandler}>
          <PrevBtnIcon src={nextImg} alt="next" />
        </PrevBtn>
      ) : null}
      {nextBtnMounted ? (
        <NextBtn onClick={nextBtnHandler}>
          <NextBtnIcon src={nextImg} alt="next" />
        </NextBtn>
      ) : null}
    </Wrapper>
  );
}

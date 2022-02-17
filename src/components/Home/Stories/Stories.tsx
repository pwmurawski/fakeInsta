import { useEffect, useRef, useState } from "react";
import nextImg from "../../../assets/next .png";
import {
  Wrapper,
  NextBtn,
  NextBtnIcon,
  StoryContainer,
  PrevBtn,
  PrevBtnIcon,
} from "./Stories_style";
import StoryMap from "./StoryMap/StoryMap";

interface IStoriesData {
  id: string;
  userName: string;
  userLogo?: string;
}

export default function Stories() {
  const storyContainerRef = useRef<HTMLUListElement>(null);
  const [storiesScroll, setStoriesScroll] = useState(0);
  const [nextBtnMounted, setNextBtnMounted] = useState(true);
  const [prevBtnMounted, setPrevBtnMounted] = useState(false);
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

  const nextBtnHandler = () => {
    const storiesClientWidth = storyContainerRef.current?.clientWidth ?? 0;
    const storiesScrollWidth = storyContainerRef.current?.scrollWidth ?? 0;
    const limitStoriesScroll = storiesScrollWidth - storiesClientWidth;

    if (storiesScroll + storiesClientWidth / 2 >= limitStoriesScroll) {
      setStoriesScroll(storiesScroll + (limitStoriesScroll - storiesScroll));
    } else {
      setStoriesScroll(storiesScroll + storiesClientWidth / 2);
    }
  };

  const prevBtnHandler = () => {
    const storiesClientWidth = storyContainerRef.current?.clientWidth ?? 0;

    if (storiesScroll - storiesClientWidth / 2 <= 0) {
      setStoriesScroll(
        storiesScroll -
          (storiesClientWidth / 2 + storiesScroll - storiesClientWidth / 2)
      );
    } else {
      setStoriesScroll(storiesScroll - storiesClientWidth / 2);
    }
  };

  useEffect(() => {
    const storiesScrollWidth = storyContainerRef.current?.scrollWidth ?? 0;
    const storiesClientWidth = storyContainerRef.current?.clientWidth ?? 0;
    const limitStoriesScroll = storiesScrollWidth - storiesClientWidth;

    if (storiesScroll > 0) {
      setPrevBtnMounted(true);
    } else {
      setPrevBtnMounted(false);
    }

    if (storiesScroll < limitStoriesScroll) {
      setNextBtnMounted(true);
    } else {
      setNextBtnMounted(false);
    }
  }, [storiesScroll]);

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

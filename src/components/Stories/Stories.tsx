import { useEffect, useRef, useState } from "react";
import userImg from "../../assets/user.jpg";
import nextImg from "../../assets/next .png";
import {
  Wrapper,
  Story,
  StoryIcon,
  UserName,
  NextBtn,
  NextBtnIcon,
  StoryContainer,
  PrevBtn,
  PrevBtnIcon,
} from "./Stories_style";

export default function Stories() {
  const [storiesScroll, setStoriesScroll] = useState(0);
  const [nextBtnMounted, setNextBtnMounted] = useState(true);
  const [prevBtnMounted, setPrevBtnMounted] = useState(false);
  const storyContainerRef = useRef<HTMLUListElement>(null);

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
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User1</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User2</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User3</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User4</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User5</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User6</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User7</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User8</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User9</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User10</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User11</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User12</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User13</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User14</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User15</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User16</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User17</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User18</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User19</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User20</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User21</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User22</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User23</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User24</UserName>
        </Story>
        <Story>
          <StoryIcon src={userImg} />
          <UserName>User25</UserName>
        </Story>
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

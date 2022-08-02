import { useEffect, useRef, useState } from "react";

const useStories = (): [
  storiesScroll: typeof storiesScroll,
  nextBtnMounted: typeof nextBtnMounted,
  prevBtnMounted: typeof prevBtnMounted,
  nextBtnHandler: typeof nextBtnHandler,
  prevBtnHandler: typeof prevBtnHandler,
  storyContainerRef: typeof storyContainerRef
] => {
  const storyContainerRef = useRef<HTMLUListElement>(null);
  const [storiesScroll, setStoriesScroll] = useState(0);
  const [nextBtnMounted, setNextBtnMounted] = useState(true);
  const [prevBtnMounted, setPrevBtnMounted] = useState(false);

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

  return [
    storiesScroll,
    nextBtnMounted,
    prevBtnMounted,
    nextBtnHandler,
    prevBtnHandler,
    storyContainerRef,
  ];
};

export default useStories;

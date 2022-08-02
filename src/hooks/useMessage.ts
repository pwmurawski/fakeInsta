import { useEffect, useRef, useState } from "react";
import { IMessagesData } from "../interfaces/interfaces";

const useMessage = (): [
  messagesData: typeof messagesData,
  addMessage: typeof addMessage,
  containerContentRef: typeof containerContentRef
] => {
  const containerContentRef = useRef<HTMLDivElement | null>(null);
  const [messagesData, setMessagesData] = useState<IMessagesData>({
    userName: "user",
    messages: [
      {
        id: 1,
        text: "message1",
      },
      {
        id: 2,
        your: true,
        text: "message2",
      },
      {
        id: 3,
        your: true,
        text: "message3",
      },
      {
        id: 4,
        text: "message4",
      },
    ],
  });

  const addMessage = (newMessage: string) => {
    setMessagesData({
      ...messagesData,
      messages: [
        ...messagesData.messages,
        { id: Math.random(), your: true, text: newMessage },
      ],
    });
  };

  const scrollDownHandler = () => {
    const heightScroll = containerContentRef.current?.scrollHeight;
    const heightClient = containerContentRef.current?.clientHeight;
    if (heightScroll && heightClient) {
      if (heightScroll > heightClient) {
        containerContentRef.current?.scrollTo({
          top: heightScroll - heightClient,
        });
      }
    }
  };

  useEffect(() => {
    scrollDownHandler();
  }, [messagesData]);

  return [messagesData, addMessage, containerContentRef];
};

export default useMessage;

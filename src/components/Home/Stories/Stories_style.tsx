import styled from "styled-components";

export const Wrapper = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: 118px;
  margin-top: 0;
  margin-bottom: 24px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

export const StoryContainer = styled.ul`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 16px 10px;
  transition: 500ms;
  transform: translateX(${({ scroll }: { scroll: number }) => scroll ?? 0}px);
`;

export const Story = styled.li`
  box-sizing: border-box;
  width: 80px;
  height: 100%;
  padding: 0 4px;
  list-style: none;
`;

export const StoryIcon = styled.img`
  box-sizing: border-box;
  margin: 0 3px;
  width: 66px;
  height: 66px;
  border: 2px solid violet;
  border-radius: 150px;
`;

export const UserName = styled.div`
  text-align: center;
  font-size: 12px;
  overflow: hidden;
`;

export const Btn = styled.button`
  --height: 29px;
  background: transparent;
  border: 0;
  padding: 0;
  position: absolute;
  cursor: pointer;
`;

export const NextBtn = styled(Btn)`
  top: calc(50% - var(--height) / 2);
  right: 10px;
`;

export const NextBtnIcon = styled.img`
  border-radius: 150px;
  box-shadow: 0 1px 2px 0 black;
`;

export const PrevBtn = styled(Btn)`
  top: calc(50% - var(--height) / 2);
  left: 10px;
`;

export const PrevBtnIcon = styled.img`
  border-radius: 150px;
  transform: rotate(180deg);
  box-shadow: 0 -1px 2px 0 black;
`;

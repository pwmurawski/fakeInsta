import styled from "styled-components";
import searchFilter from "../../../helpers/searchFilter";
import useAllUsers from "../../../hooks/useAllUsers";
import { ISearchBoxProps } from "../../../interfaces/interfaces";
import UsersList from "../../UsersList/UsersList";

const Wrapper = styled.section`
  position: absolute;
  top: 50px;
  left: -50px;
  width: fit-content;
  height: fit-content;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px lightgray;
  z-index: 2;
`;
const Arrow = styled.div`
  position: absolute;
  top: -6px;
  left: 49%;
  width: 14px;
  height: 14px;
  background-color: white;
  transform: rotate(45deg);
  box-shadow: 0 0 5px 1px lightgray;
  z-index: -1;
`;
const SearchBoxContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: fit-content;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  z-index: 1;
`;
const HiddenSearchBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export default function SearchBox({
  term,
  setSearchBoxActive,
}: ISearchBoxProps) {
  const usersData = useAllUsers();

  return (
    <>
      <Wrapper>
        <Arrow />
        <SearchBoxContainer>
          <UsersList
            usersListData={searchFilter(term, usersData)}
            userInListOnClick={() => setSearchBoxActive(false)}
          />
        </SearchBoxContainer>
      </Wrapper>
      <HiddenSearchBox
        onClick={(e) => {
          setSearchBoxActive(false);
          e.stopPropagation();
        }}
      />
    </>
  );
}

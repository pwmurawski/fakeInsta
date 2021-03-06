import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchUsers } from "../../../api/userQuery";
import objectToArray from "../../../helpers/objectToArray";
import searchFilter from "../../../helpers/searchFilter";
import { ISearchBoxProps, IUsersData } from "../../../interfaces/interfaces";
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
  const abortController = new AbortController();
  const { signal } = abortController;
  const [usersData, setUsersData] = useState<IUsersData[]>([
    {
      userId: "",
      userName: "",
      userFullName: "",
    },
  ]);

  const userInListOnClick = () => {
    setSearchBoxActive(false);
  };

  const getUsersData = async () => {
    const res = await fetchUsers(signal);
    if (res) {
      const users: IUsersData[] = objectToArray(res, false).flatMap((e) =>
        objectToArray(e)
      );
      setUsersData(users);
    }
  };

  useEffect(() => {
    getUsersData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Wrapper>
        <Arrow />
        <SearchBoxContainer>
          <UsersList
            usersListData={searchFilter(term, usersData)}
            userInListOnClick={userInListOnClick}
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

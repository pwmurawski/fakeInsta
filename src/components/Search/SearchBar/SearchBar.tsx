import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBox from "../SearchBox/SearchBox";

const Wrapper = styled.section`
  width: 100%;
  height: 36px;
  position: relative;
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  background-color: whitesmoke;
  border: 1px solid lightgray;
  border-radius: 3px;
  outline: 0;
`;

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [searchBoxActive, setSearchBoxActive] = useState(false);

  const inputClickHandler = () => {
    if (term.length > 0) {
      setSearchBoxActive(true);
    }
  };

  useEffect(() => {
    if (term.length > 0) {
      setSearchBoxActive(true);
    } else {
      setSearchBoxActive(false);
    }
  }, [term]);

  return (
    <Wrapper>
      <Input
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
        }}
        onClick={inputClickHandler}
        placeholder="Szukaj"
      />
      {searchBoxActive ? (
        <SearchBox term={term} setSearchBoxActive={setSearchBoxActive} />
      ) : null}
    </Wrapper>
  );
}

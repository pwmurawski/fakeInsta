import styled from "styled-components";

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  background-color: whitesmoke;
  border: 1px solid lightgray;
  border-radius: 3px;
  outline: 0;
`;

export default function SearchBar() {
  return <Input placeholder="Szukaj" />;
}

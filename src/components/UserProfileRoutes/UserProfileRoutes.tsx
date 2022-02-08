/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import ImgPosts from "../../components/ImgPosts/ImgPosts";
import sortPostsByDate from "../../helpers/sortPostsByDate";
import NoSavedPosts from "../../components/InfoLackPosts/NoSavedPosts/NoSavedPosts";
import NoTaggedPosts from "../../components/InfoLackPosts/NoTaggedPosts/NoTaggedPosts";
import NoMyPosts from "../../components/InfoLackPosts/NoMyPosts/NoMyPosts";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

export const SavedPostsInfo = styled.p`
  box-sizing: border-box;
  height: 48px;
  padding: 16px;
  margin: 0;
  font-size: 12px;
  color: gray;
`;

interface IPostsData {
  id: string;
  img: string;
  likes?: string[];
  comments?: string[];
  date: string;
  user: {
    userId: string;
  };
}

interface IUserProfileRoutesProps {
  postsData: IPostsData[];
  postsSavedData?: IPostsData[];
  postsTaggedData: IPostsData[];
  loading: boolean;
  loadingSaved?: boolean;
  loadingTagged?: boolean;
  background: string | undefined;
  savedPageDisabled?: boolean;
}

const defaultProps = {
  savedPageDisabled: false,
  postsSavedData: [{}],
  loadingSaved: false,
  loadingTagged: false,
};

export default function UserProfileRoutes({
  postsData,
  postsSavedData,
  postsTaggedData,
  loading,
  loadingSaved,
  loadingTagged,
  background,
  savedPageDisabled,
}: IUserProfileRoutesProps) {
  return (
    <Routes location={background}>
      <Route
        index
        element={
          <>
            {loading ? (
              <LoadingIcon />
            ) : (
              <>
                {postsData.length !== 0 ? (
                  <ImgPosts
                    postsData={postsData.sort((post1, post2) =>
                      sortPostsByDate(post1, post2)
                    )}
                  />
                ) : (
                  <NoMyPosts />
                )}
              </>
            )}
          </>
        }
      />
      {savedPageDisabled ? null : (
        <Route
          path="saved"
          element={
            <>
              {loadingSaved ? (
                <LoadingIcon />
              ) : (
                <>
                  <SavedPostsInfo>
                    Tylko Ty widzisz zapisane elementy
                  </SavedPostsInfo>
                  {postsSavedData?.length !== 0 ? (
                    <ImgPosts
                      postsData={[...(postsSavedData ?? [])].reverse()}
                    />
                  ) : (
                    <NoSavedPosts />
                  )}
                </>
              )}
            </>
          }
        />
      )}
      <Route
        path="tagged"
        element={
          <>
            {loadingTagged ? (
              <LoadingIcon />
            ) : (
              <>
                {postsTaggedData.length !== 0 ? (
                  <ImgPosts postsData={postsTaggedData} />
                ) : (
                  <NoTaggedPosts />
                )}
              </>
            )}
          </>
        }
      />
    </Routes>
  );
}

UserProfileRoutes.defaultProps = defaultProps;

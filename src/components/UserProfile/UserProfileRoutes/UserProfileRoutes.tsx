/* eslint-disable react/jsx-no-useless-fragment */
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import ImgPosts from "../../ImgPosts/ImgPosts";
import sortPostsByDate from "../../../helpers/sortPostsByDate";
import NoSavedPosts from "../../InfoLackPosts/NoSavedPosts/NoSavedPosts";
import NoTaggedPosts from "../../InfoLackPosts/NoTaggedPosts/NoTaggedPosts";
import NoMyPosts from "../../InfoLackPosts/NoMyPosts/NoMyPosts";
import LoadingIcon from "../../UI/LoadingIcon/LoadingIcon";
import { IUserProfileRoutesProps } from "../../../interfaces/interfaces";

export const SavedPostsInfo = styled.p`
  box-sizing: border-box;
  height: 48px;
  padding: 16px;
  margin: 0;
  font-size: 12px;
  color: gray;
`;

const defaultProps = {
  profileUserNotAuth: false,
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
  profileUserNotAuth,
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
                  <NoMyPosts profileUserNotAuth={profileUserNotAuth} />
                )}
              </>
            )}
          </>
        }
      />
      {profileUserNotAuth ? null : (
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
                  <NoTaggedPosts profileUserNotAuth={profileUserNotAuth} />
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

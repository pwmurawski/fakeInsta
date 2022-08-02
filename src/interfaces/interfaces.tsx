/* eslint-disable no-unused-vars */
import { ReactElement, ReactChild } from "react";

export interface ILocationState {
  state?: {
    background: string;
  };
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IEditPassword {
  idToken: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IEditEmail {
  idToken: string;
  email: string;
  returnSecureToken: boolean;
}

export interface IUserData {
  userFullName: string;
  userId?: string;
  userName: string;
  logo?: string;
  storiesActive?: boolean;
}

export interface IPostData {
  img: string | undefined;
  desc: string;
  location: string;
  date: Date;
  user: IUserData;
}

export interface IRes {
  email: string;
  idToken: string;
  localId: string;
  error: {
    errors: [{ message: string }];
  };
}

export interface IAddPostContentProps {
  newPostData: IPostData;
  setNewPostData: React.Dispatch<React.SetStateAction<IPostData>>;
}

export interface IAddPostHeaderProps {
  onClickShareBtn: () => void;
  onClickBackBtn: () => void;
}

export interface IErrorInfoProps {
  error: string;
}

export interface IFormLoginProps {
  onSubmit: (data: ILoginData) => void;
}

export interface IFormRegisterProps {
  onSubmit: (data: IRegisterData, userData: IUserData) => void;
}

export interface IUsersList {
  userId: string;
  userName: string;
  userFullName: string;
  userImg?: string;
}

export interface IStoriesData {
  id: string;
  userName: string;
  userLogo?: string;
}

export interface IStoryProps {
  userName: string;
  userLogo?: string;
}

export interface IPostsDataProfile {
  id: string;
  img: string;
  likes?: string[];
  comments?: string[];
  date: string;
  user: {
    userId: string;
  };
}

export interface IPostsData {
  id: string;
  desc: string;
  img: string;
  likes?: string[];
  location: string;
  date: string;
  user: IUserData;
}

export interface IImgPostsProps {
  postsData: IPostsDataProfile[];
  customLayOut?: boolean;
}

export interface IImgPostProps {
  id: string;
  img: string;
  likes?: string[];
  userId?: string;
  customLayOut?: boolean;
}

export interface IImgPostHoverProps {
  userId?: string;
  id: string;
  likes?: string[];
}

export interface IConversationsProps {
  conversationsData: {
    id: number;
    userName: string;
    userImg: string;
  }[];
}

export interface IConversationProps {
  id: number;
  userName: string;
  userImg: string;
}

export interface IAddMessageProps {
  onNewMessage: (newMessage: string) => void;
}

export interface IHeaderConContentProps {
  userName: string;
  userLogo?: string;
}

export type MessagesType = (
  | {
      id: number;
      text: string;
      your?: undefined;
    }
  | {
      id: number;
      your: boolean;
      text: string;
    }
)[];

export interface IMessagesData {
  userName: string;
  userImg?: string;
  messages: MessagesType;
}

export interface IMessagesProps {
  messagesData: MessagesType;
  userLogo?: string;
}

export interface ILayoutProps {
  auth: ReactElement;
  header: ReactElement;
  content: ReactElement;
  footer: ReactElement;
  modals: ReactElement;
}

export interface IHeaderProps {
  children: ReactChild;
}

export interface IProfilMenuProps {
  setProfilMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IPostsProps {
  postsData: IPostsData[];
}

export interface ICommentUser {
  userId: string;
  userName: string;
  userLogo?: string;
  storiesActive?: boolean;
}

export interface IComment {
  user: ICommentUser;
  content: string;
}

export interface ICommentData {
  id: string;
  user: ICommentUser;
  content: string;
}

export interface IPostData2 {
  desc: string;
  date: string;
  location: string;
  likes?: string[];
}

export interface ICommentsProps {
  comments: ICommentData[];
}

export interface ICommentProps {
  user: ICommentUser;
  content: string;
}

export interface ICommentsSpaceProps {
  postImg?: string;
  userData: IUserData;
  postDesc: string;
  commentsData: ICommentData[];
}

export interface IPostHeaderProps {
  userName: string;
  userLogo: string;
  userId?: string;
  location: string;
  storiesActive?: boolean;
}

export interface IUserAuthData {
  id: string;
  savedPosts?: string[];
}

export interface IPostOptionsProps {
  postId?: string;
  userId?: string;
  likesData?: string[];
  setLikesData: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  commentBtnOff?: boolean;
}

export interface IPostImgProps {
  image: string;
  postImg?: string;
  onClick: () => void;
}

export interface IUsersData {
  userId: string;
  userName: string;
  userFullName: string;
  userImg?: string;
}

export interface ISearchBoxProps {
  term: string;
  setSearchBoxActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISvgProps {
  color?: string;
  width?: string;
  height?: string;
}

export interface IUserAuthDataProfile {
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  usersWatched?: string[];
  storiesActive?: boolean;
  savedPosts?: string[];
  bio?: string;
  website?: string;
}

export interface IProfileHeaderProps {
  userData: IUserAuthDataProfile | undefined;
  postsData: IPostsDataProfile[];
  isMediaMatches: boolean;
  profileUserNotAuth?: boolean;
  userAuthWatched?: string[];
  userId?: string;
  onFollow?: () => void;
  onUnFollow?: () => void;
}

export interface IProfileHeaderButtonsProps {
  profileUserNotAuth?: boolean;
  userAuthWatched?: string[];
  userId?: string;
  onFollow?: () => void;
  onUnFollow?: () => void;
}

export interface IProfileHeaderContentProps {
  userData: IUserAuthDataProfile | undefined;
  postsData: IPostsDataProfile[];
  isMediaMatches: boolean;
  profileUserNotAuth?: boolean;
  userAuthWatched?: string[];
  userId?: string;
  onFollow?: () => void;
  onUnFollow?: () => void;
}

export interface IProfileHeaderUserImgProps {
  userData: IUserData | undefined;
}

export interface IUserInfoData {
  userFullName: string;
  usersWatched?: string[];
  bio?: string;
  website?: string;
}

export interface IUserInfoProps {
  userData: IUserInfoData | undefined;
  postsData: IPostsDataProfile[];
  columnReverse?: boolean;
}

export interface IOptionProps {
  url: string;
  text: string;
  SvgIcon: ({ color }: { color: string | undefined }) => JSX.Element;
}

export interface IUserProfileRoutesProps {
  postsData: IPostsDataProfile[];
  postsSavedData?: IPostsDataProfile[];
  postsTaggedData: IPostsDataProfile[];
  loading: boolean;
  loadingSaved?: boolean;
  loadingTagged?: boolean;
  background: string | undefined;
  profileUserNotAuth?: boolean;
}

export interface IUsersListProps {
  usersListData: {
    userId: string;
    userName: string;
    userFullName: string;
    userImg?: string;
  }[];
  textInUser?: string;
  userImgSize?: string;
  fontSize?: string;
  offLink?: boolean;
  userInListOnClick?: () => void;
}

export interface IUserInListProps {
  userId: string;
  userName: string;
  userFullName: string;
  userImg?: string;
  textInUser?: string;
  userImgSize?: string;
  fontSize?: string;
  offLink?: boolean;
  userInListOnClick?: () => void;
}

export interface IUser {
  email: string;
  token: string;
  userId: string;
}

export interface IAuthContext {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

export interface ILoginAction {
  type: "login";
  user: IUser;
}

export interface ILogoutAction {
  type: "logout";
}

export interface IState {
  user: IUser | null;
}

export type Action = ILoginAction | ILogoutAction;

export interface IReducerContext {
  state: IState;
  dispatch: React.Dispatch<Action>;
}

export interface ISetAuth {
  email: string;
  token: string;
  userId: string;
}

export interface ILocationStateNewPost {
  state?: {
    uploadImg: string;
  };
}

export interface IUserAuth {
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  storiesActive?: boolean;
}

export interface IPostDataPost {
  img: string;
  desc: string;
  date: string;
  location: string;
  likes?: string[];
}

export interface IUserAuthDataProfileSet {
  id: string;
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  website?: string;
  bio?: string;
  number?: string;
  sex?: string;
}
export interface IUserDataProfileSet {
  id: string;
  email: string;
  userFullName: string;
  userId: string;
  userName: string;
  logo?: string;
  website: string;
  bio: string;
  number: string;
  sex: string;
}

export interface IProfilChangePassProps {
  user: {
    userName: string;
    logo?: string;
  };
}

export interface IProfilEditProps {
  defaultValue?: IUserDataProfileSet;
  onSubmit: (data: IUserDataProfileSet) => void;
  error: string;
}

export interface IUserDataUserProfil {
  email: string;
  userFullName: string;
  userName: string;
  userId: string;
  logo?: string;
  usersWatched?: string[];
  storiesActive?: boolean;
  bio?: string;
  website?: string;
}

export interface IUserAuthDataUserProfil {
  id: string;
  userId: string;
  usersWatched?: string[];
}

export interface IPostsDataSort {
  date: string;
}

export interface ICreateUserData {
  email: string;
  userId: string;
  userFullName: string;
  userName: string;
}

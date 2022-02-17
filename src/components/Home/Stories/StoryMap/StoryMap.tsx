import Story from "../Story/Story";

interface IStoriesData {
  id: string;
  userName: string;
  userLogo?: string;
}

export default function StoryMap({
  storiesData,
}: {
  storiesData: IStoriesData[];
}) {
  return (
    <>
      {storiesData.map((story) => (
        <Story
          key={story.id}
          userName={story.userName}
          userLogo={story.userLogo}
        />
      ))}
    </>
  );
}

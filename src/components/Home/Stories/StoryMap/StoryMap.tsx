import { IStoriesData } from "../../../../interfaces/interfaces";
import Story from "../Story/Story";

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

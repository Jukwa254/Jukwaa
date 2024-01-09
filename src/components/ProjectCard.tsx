import { useState } from "react";
import {
  Message,
  ThumbsDownFilled,
  ThumbsDownRegular,
  ThumbsUpFilled,
  ThumbsUpRegular,
} from "./Icons";
import { CardType } from "./SampleData";
import { formatDistanceToNow } from "date-fns";

type ProjectCardProps = {
  card: CardType;
  onCardClick: (card: CardType) => void;
  selectedCard: CardType | null;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  card,
  onCardClick,
  selectedCard,
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
  };
  return (
    <div
      key={card.id}
      onClick={() => {
        // handleCardClick();
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-300 mb-4 cursor-pointer border p-6 rounded-xl hover:bg-BackgroundAccent ${
        selectedCard && selectedCard.id === card.id
          ? "bg-BackgroundAccent border-2 border-accent"
          : "border-strokeOne"
      }`}
    >
      <div>
        <div className="bg-white rounded-lg">
          <div className="flex gap-2 ">
            <img
              src={card.organizationLogo}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-xl font-medium text-[#2C444E]">
                {card.organizationName}
              </p>
              <p className="text-xs text-[#796552]">
                {formatDistanceToNow(new Date(card.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <div className="mt-4 text-[#2C444E]">
            <h1 className="uppercase font-semibold text-xl py-2">
              {card.projectTitle}
            </h1>
            <p className="text-base">{card.projectDescription}</p>
            <div className="mt-4">
              <img
                src={card.projectImage}
                alt=""
                className="h-80 w-full rounded-lg object-cover"
              />
            </div>
            <div className="mt-6 flex justify-between mb-1 text-[#6C2D1B]">
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-1">
                  <span
                    className="text-2xl cursor-pointer text-[#6C2D1B]"
                    onClick={handleLike}
                  >
                    {liked ? <ThumbsUpFilled /> : <ThumbsUpRegular />}
                  </span>
                  <p>{likes} Likes</p>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className="text-2xl cursor-pointer text-[#6C2D1B]"
                    onClick={handleDislike}
                  >
                    {disliked ? <ThumbsDownFilled /> : <ThumbsDownRegular />}
                  </span>
                  <p>{dislikes} Dislikes</p>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="text-2xl">
                  <Message />
                </span>
                <p>{card.projectComments} Comments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

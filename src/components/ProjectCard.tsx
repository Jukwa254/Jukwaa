import { useState } from "react";
import {
  LikeFilled,
  LikeRegular,
  Message,
  ThumbsDownFilled,
  ThumbsDownRegular,
} from "./Icons";
import { formatDistanceToNow } from "date-fns";
import { PostItem } from "./dataComponent";

type ProjectCardProps = {
  card: PostItem;
  onCardClick: (card: PostItem) => void;
  selectedCard: PostItem | null;
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
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-200 mb-4 cursor-pointer border border-BackgroundAccent px-4 py-4 lg:pt-6 lg:pb-3 rounded-xl hover:bg-BackgroundOne ${
        selectedCard && selectedCard.id === card.id
          ? "bg-BackgroundOne"
          : "border-strokeOne"
      }`}
    >
      <div>
        <div className="bg-white rounded-lg">
          <div className="flex gap-2 ">
            <img
              src={card.post_image}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-xl font-semibold text-[#2C444E]">
                {card.profiles?.user_name}
              </p>
              <p className="text-xs text-[#796552]">
                {formatDistanceToNow(new Date(card.created_at), {
                  // addSuffix: true,
                })}{" "}
                ago
              </p>
            </div>
          </div>
          <div className="mt-4 text-[#2C444E]">
            <h1 className="uppercase font-semibold text-xl py-2">
              {card.post_title}
            </h1>
            <p className="text-base">{card.post_description}</p>
            <div className="mt-4">
              <img
                src={card.post_image}
                alt=""
                className="h-80 w-full rounded-lg object-cover"
              />
            </div>
            <div className="mt-3 flex justify-between mb-1 text-[#6C2D1B]">
              <div className="flex gap-2 text-lg items-center">
                <div className="flex items-center font-semibold">
                  <span
                    className="cursor-pointer text-[#6C2D1B]"
                    onClick={handleLike}
                  >
                    {liked ? <LikeFilled /> : <LikeRegular />}
                  </span>
                  <p className="text-sm">{likes + card.likes}</p>
                </div>
                <div className="flex items-center font-semibold">
                  <span
                    className="text-2xl cursor-pointer text-[#6C2D1B]"
                    onClick={handleDislike}
                  >
                    {disliked ? <ThumbsDownFilled /> : <ThumbsDownRegular />}
                  </span>
                  <p className="text-sm">{dislikes + card.dislikes}</p>
                </div>
              </div>
              <div className="flex font-semibold items-center">
                <span className="">
                  <Message />
                </span>
                <p className="text-sm">200</p>
              </div>
            </div>
            <div className="comments">
              {card.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment.user_id?.user_name}</p>{" "}
                  <p>{comment.comment_description}</p>
                  <p>{new Date(comment.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

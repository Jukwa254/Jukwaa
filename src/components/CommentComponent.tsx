import { useState } from "react";
import {
  LikeFilled,
  LikeRegular,
  ThumbsDownFilled,
  ThumbsDownRegular,
} from "./Icons";

export interface CommentItem {
  id: string;
  created_at: string;
  comment_description: string;
  likes: number;
  dislike: number;
}

function CommentComponent(props: CommentItem) {
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
    <div className="mt-4">
      <div>
        <div className="">
          <div className="flex gap-2 items-center">
            {/* <img src={props.image} alt="" className="w-8 h-8 rounded-full " /> */}

            {/* <p className="font-semibold">{props.name}</p> */}
            <p className="text-xs font-medium text-[#796552]">
              {props.created_at}
            </p>
          </div>
          <p className="text-textThree font-normal text-base">
            {props.comment_description}
          </p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-4 text-sm text-[#414141] items-center">
              <div
                className="flex items-center gap-1 cursor-pointer font-bold"
                onClick={handleLike}
              >
                <span className="text-sm">
                  {liked ? <LikeFilled /> : <LikeRegular />}
                </span>
                <p>{likes + props.likes}</p>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer font-bold"
                onClick={handleDislike}
              >
                <span className="text-sm">
                  {disliked ? <ThumbsDownFilled /> : <ThumbsDownRegular />}
                </span>
                <p>{dislikes + props.dislike}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentComponent;

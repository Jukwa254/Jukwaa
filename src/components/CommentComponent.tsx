import React, { useState } from "react";
import {
  LikeFilled,
  LikeRegular,
  ThumbsDownFilled,
  ThumbsDownRegular,
} from "./Icons";

interface CommentProps {
  image: string;
  name: string;
  time: string;
  comment: string;
  likes: number;
  dislike: number;
  replays: number;
}

function CommentComponent(props: CommentProps) {
  const [isReplying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const toggleReply = () => {
    setReplying(!isReplying);
  };

  const handleReplyChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setReplyText(e.target.value);
  };

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
            <img src={props.image} alt="" className="w-8 h-8 rounded-full " />

            <p className="font-semibold">{props.name}</p>
            <p className="text-xs font-medium text-[#796552]">{props.time}</p>
          </div>
          <p className="text-textThree font-normal">{props.comment}</p>
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-4 text-sm text-[#414141] items-center">
              <div
                className="flex items-center gap-1 cursor-pointer font-bold"
                onClick={handleLike}
              >
                <span className="text-sm">
                  {liked ? <LikeFilled /> : <LikeRegular />}
                </span>
                <p>{likes}</p>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer font-bold"
                onClick={handleDislike}
              >
                <span className="text-sm">
                  {disliked ? <ThumbsDownFilled /> : <ThumbsDownRegular />}
                </span>
                <p>{dislikes}</p>
              </div>
              <p className="font-medium">{props.replays} Replies</p>
            </div>
            <div>
              <p
                className="text-sm text-[#6C2D1B] font-bold cursor-pointer hover:bg-[#6C2D1B] px-2 hover:text-BackgroundTwo rounded-full"
                onClick={toggleReply}
              >
                Reply
              </p>
            </div>
          </div>
          {isReplying && (
            <div className="mt-4">
              <textarea
                placeholder="Write your reply here..."
                value={replyText}
                onChange={handleReplyChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6C2D1B]"
              />
              <div className="mt-2">
                <button
                  className="px-4 py-2 bg-[#6C2D1B] text-white rounded hover:bg-[#977268] font-bold"
                  onClick={() => {
                    setReplying(false);
                  }}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentComponent;

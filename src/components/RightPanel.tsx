import { useEffect, useRef, useState } from "react";
import {
  AddIcon,
  BackIcon,
  LikeFilled,
  LikeRegular,
  Message,
  SendIcon,
  ThumbsDownFilled,
  ThumbsDownRegular,
} from "./Icons";
import { formatDistanceToNow } from "date-fns";

import supabase from "../config/superbaseClient";
import { PostItem } from "./dataComponent";
import { User } from "@supabase/auth-helpers-react";

export type RightPanelProps = {
  selectedCard: PostItem | null;
  isOpen: boolean;
  onClose: () => void;
  postId: string | undefined;
};

export type CommentlProps = {
  userId: string | undefined;
};

export const RightPanel: React.FC<RightPanelProps & CommentlProps> = ({
  isOpen,
  onClose,
  postId,
  selectedCard,
}) => {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [commentDescription, setCommentDescription] = useState<string>("");
  const paragraphs = selectedCard?.post_description.split(/\n|\r\n/);

  const saveScrollPosition = () => {
    if (rightPanelRef.current) {
      localStorage.setItem(
        "rightPanelScroll",
        rightPanelRef.current.scrollTop.toString()
      );
    }
  };

  const restoreScrollPosition = (
    ref: React.RefObject<HTMLDivElement>,
    key: string
  ) => {
    const savedScrollPosition = parseInt(localStorage.getItem(key) || "0", 10);
    if (ref.current) {
      ref.current.scrollTop = savedScrollPosition;
    }
  };

  useEffect(() => {
    restoreScrollPosition(rightPanelRef, "rightPanelScroll");
    window.addEventListener("resize", saveScrollPosition);
    return () => {
      window.removeEventListener("resize", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const rightPanel = rightPanelRef.current;
    rightPanel?.addEventListener("scroll", saveScrollPosition);
    return () => {
      rightPanel?.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  const [isCommenting, setCommenting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleComment = () => {
    setCommenting(!isCommenting);
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

  const handleSubimtComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser = sessionStorage.getItem("token");
    if (!storedUser) {
      throw new Error("No user data found in session storage.");
    }

    const user = JSON.parse(storedUser) as User;
    const userId = user.id;

    if (!commentDescription) {
      console.log("Please write a comment");
      return;
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          comment_description: commentDescription,
          post_id: postId,
          user_id: userId,
        },
      ])
      .eq("user_id", userId)

      // .single()
      .select();

    if (error) {
      console.log("Error submitting comment:" + error.message);
    } else if (data) {
      console.log("Inserted Comment:", data);
      setCommentDescription("");
      // onClose();
    }
  };

  return (
    <div className="overflow-y-auto">
      <div
        ref={rightPanelRef}
        className={`transform top-0 right-0 w-full h-screen transition-transform duration-300 overflow-y-auto no-scrollbar ${
          isOpen
            ? "fixed z-50 translate-x-0" // Use 'fixed' to keep it in place even when scrolling
            : "translate-x-full hidden"
        } bg-BackgroundTwo md:static md:translate-x-0`} // 'md:static' resets positioning on medium screens and up
      >
        {selectedCard && (
          <div className="h-full w-full">
            <div className="p-6 rounded-xl flex flex-col">
              <div className="flex-0">
                <button
                  onClick={onClose}
                  className="md:hidden my-2 py-2.5 rounded-full "
                >
                  <div className="flex gap-2 items-center font-medium rounded-full ">
                    <BackIcon />
                    <p className="font-bold">Back</p>
                  </div>
                </button>
              </div>
              <div className="flex-1">
                <div className="h-full">
                  <div className="flex gap-4 items-center">
                    <img
                      src={selectedCard.post_image}
                      alt=""
                      className="w-14 h-14 object-cover rounded-full"
                    />
                    <div>
                      <p className="text-2xl font-bold">
                        {selectedCard.profiles?.user_name}
                      </p>
                      <p className="text-xs text-[#796552]">
                        {formatDistanceToNow(
                          new Date(selectedCard.created_at),
                          {
                            // addSuffix: true,
                          }
                        )}{" "}
                        ago
                      </p>
                    </div>
                  </div>
                  <h1 className="uppercase font-semibold text-xl py-2 mt-4">
                    {selectedCard.post_title}
                  </h1>
                  <p className="">{paragraphs}</p>
                  <img
                    src={selectedCard.post_image}
                    alt=""
                    className="h-80 w-full rounded-lg object-cover my-4"
                  />

                  <div className="mt-3 flex justify-between mb-1 text-[#6C2D1B]">
                    <div className="flex gap-2 text-lg items-center">
                      <div className="flex items-center font-semibold">
                        <span
                          className="cursor-pointer text-[#6C2D1B]"
                          onClick={handleLike}
                        >
                          {liked ? <LikeFilled /> : <LikeRegular />}
                        </span>
                        <p className="text-sm">{likes + selectedCard.likes}</p>
                      </div>
                      <div className="flex items-center font-semibold">
                        <span
                          className="text-2xl cursor-pointer text-[#6C2D1B]"
                          onClick={handleDislike}
                        >
                          {disliked ? (
                            <ThumbsDownFilled />
                          ) : (
                            <ThumbsDownRegular />
                          )}
                        </span>
                        <p className="text-sm">
                          {dislikes + selectedCard.dislikes}
                        </p>
                      </div>
                    </div>
                    <div className="flex font-semibold items-center">
                      <span className="">
                        <Message />
                      </span>
                      <p className="text-sm">
                        {selectedCard.comments.length} Comments
                      </p>
                    </div>
                  </div>

                  <form onClick={handleSubimtComment}>
                    <div className="flex py-4">
                      <p
                        className="text-sm items-center flex gap-1 font-bold cursor-pointer border bg-[#6C2D1B] px-2.5 py-1.5 text-BackgroundTwo rounded-full"
                        onClick={toggleComment}
                      >
                        <AddIcon />
                        <span>Post Comment</span>
                      </p>
                    </div>
                    <div>
                      {isCommenting && (
                        <div className="mt-4">
                          <textarea
                            value={commentDescription}
                            ref={textareaRef}
                            rows={2}
                            placeholder="Post Your Comment"
                            onChange={(e) =>
                              setCommentDescription(e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6C2D1B]"
                            style={{
                              overflow: "hidden",
                            }}
                          />
                          <div className="mt-2 flex justify-end">
                            <button
                              type="submit"
                              className="flex items-center gap-2 px-4 py-2 bg-[#6C2D1B] text-BackgroundAccent rounded-full hover:bg-[#57281b] font-bold"
                            >
                              <SendIcon />
                              <p>Post</p>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                  <div className="w-full bg-BackgroundOne h-0.5 my-4"></div>
                  <div className="">
                    {selectedCard.comments
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((cards, index) => (
                        <div key={index} className="">
                          <div className="py-4 border-b border-b-BackgroundOne ">
                            <div className="flex gap-2 items-center">
                              <img
                                src={selectedCard.post_image}
                                alt=""
                                className="w-8 h-8 rounded-full "
                              />
                              <div className="">
                                <p className="font-semibold">
                                  {cards.user_id.user_name}
                                </p>
                                <p className="text-xs text-[#796552]">
                                  {formatDistanceToNow(
                                    new Date(cards.created_at),
                                    {}
                                  )}{" "}
                                  ago
                                </p>
                              </div>
                            </div>
                            <p className="text-textThree font-normal text-base py-2">
                              {cards.comment_description}
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
                                </div>
                                <div
                                  className="flex items-center gap-1 cursor-pointer font-bold"
                                  onClick={handleDislike}
                                >
                                  <span className="text-sm">
                                    {disliked ? (
                                      <ThumbsDownFilled />
                                    ) : (
                                      <ThumbsDownRegular />
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;

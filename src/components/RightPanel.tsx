import { useEffect, useRef, useState } from "react";
import { UserComments } from "./Comment";
import {
  AddIcon,
  LikeFilled,
  LikeRegular,
  Message,
  SendIcon,
  ThumbsDownFilled,
  ThumbsDownRegular,
} from "./Icons";
import { formatDistanceToNow } from "date-fns";
import { PostItem } from "../pages/pageComponents/ProfilePageComponent";
import supabase from "../config/superbaseClient";

export type RightPanelProps = {
  selectedCard: PostItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export const RightPanel: React.FC<RightPanelProps> = ({
  isOpen,
  onClose,
  selectedCard,
}) => {
  const rightPanelRef = useRef<HTMLDivElement>(null);
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
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleCommentChange = () => {
    adjustTextareaHeight();
  };

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

  const paragraphs = selectedCard?.post_description.split(/\n|\r\n/);

  const [commentDescription, setCommentDescription] = useState<string>("");

  async function handleSubimtComment() {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ comment_description: commentDescription }])
        .select();

      if (data) {
        console.log("Inserted data:", data);
        setCommentDescription("");
      } else if (error) {
        console.log("Error inserting data: " + error.message);
      }
    } catch (error) {
      console.log("Error in comment submission", error);
    }
  }

  return (
    <div
      className="lg:h-screen flex flex-col text-strokeLight py-4 overflow-y-auto no-scrollbar"
      ref={rightPanelRef}
    >
      <div
        className={`md:relative transform top-0 right-0 w-full h-full transition-transform duration-300 ${
          isOpen
            ? "absolute translate-x-0"
            : "fixed translate-x-full md:translate-x-0"
        }`}
      >
        {selectedCard && (
          <div className="bg-BackgroundTwo p-4 lg:p-6 rounded-xl">
            <div className="grid grid-cols-3 lg:block items-center w-full border-BackgroundAccent ">
              <button
                onClick={onClose}
                className="md:hidden my-2 py-2.5 rounded-full "
              >
                <div className="flex gap-2 items-center font-medium rounded-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  <p className="font-bold">Back</p>
                </div>
              </button>
              <p className="font-bold text-lg text-center lg:text-left ">
                Post
              </p>
              <div></div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={selectedCard.post_image}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">This is Name</p>
                  <p className="text-xs text-[#796552]">
                    {formatDistanceToNow(new Date(selectedCard.created_at), {
                      // addSuffix: true,
                    })}{" "}
                    ago
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <h1 className="uppercase font-semibold text-xl py-2">
                  {selectedCard.post_title}
                </h1>
                <p className="text-base mb-2">{paragraphs}</p>
                <img
                  src={selectedCard.post_image}
                  alt=""
                  className="rounded-xl h-96 object-cover w-full"
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
                    {/* <p className="text-sm">{selectedCard.projectComments}</p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-BackgroundAccent h-0.5 my-4"></div>
            <div>
              <div className="flex ">
                <p
                  className="text-sm items-center flex gap-1 font-bold cursor-pointer border bg-[#6C2D1B] px-2.5 py-1.5 text-BackgroundTwo rounded-full"
                  onClick={toggleComment}
                >
                  <AddIcon />
                  <span>Post Comment</span>
                </p>
              </div>
              <form onClick={handleSubimtComment}>
                {isCommenting && (
                  <div className="mt-4">
                    <textarea
                      value={commentDescription}
                      ref={textareaRef}
                      rows={2}
                      placeholder="Post Your Comment"
                      onChange={(e) => setCommentDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6C2D1B]"
                      style={{
                        overflow: "hidden", // Hide the scrollbar
                      }}
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        className="flex items-center gap-2 px-4 py-2 bg-[#6C2D1B] text-BackgroundAccent rounded-full hover:bg-[#57281b] font-bold"
                        onClick={() => {
                          setCommenting(false);
                        }}
                      >
                        <SendIcon />
                        <p>Post</p>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
            <div className="w-full bg-BackgroundAccent h-0.5 my-4"></div>
            <div>
              <UserComments />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;

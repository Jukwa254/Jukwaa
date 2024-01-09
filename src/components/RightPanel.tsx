import { useEffect, useRef, useState } from "react";
import { CardType } from "./SampleData";
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

export type RightPanelProps = {
  cards: CardType[];
  selectedCard: CardType | null;
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

  const [isReplying, setReplying] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleReply = () => {
    setReplying(!isReplying);
  };
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleReplyChange = () => {
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

  return (
    <div
      className="lg:h-screen flex flex-col py-4 overflow-y-auto no-scrollbar"
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
          <div className="bg-BackgroundTwo p-6 rounded-xl">
            <div className="flex justify-between items-center w-full border-BackgroundAccent">
              <button onClick={onClose} className="md:hidden my-4">
                <div className="flex gap-2 items-center font-medium  rounded-full">
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
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={selectedCard.organizationLogo}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-bold text-lg">
                    {selectedCard.organizationName}
                  </p>
                  <p className="text-xs text-[#796552]">
                    {formatDistanceToNow(new Date(selectedCard.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-base mb-2">
                  {selectedCard.projectDescription}
                </p>
                <img
                  src={selectedCard.projectImage}
                  alt=""
                  className="rounded-xl h-96 object-cover"
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
                      <p>{likes + selectedCard.likes}</p>
                    </div>
                    <div className="flex items-center font-bold">
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
                      <p>{dislikes + selectedCard.dislikes}</p>
                    </div>
                  </div>
                  <div className="flex font-bold items-center">
                    <span className="text-2xl">
                      <Message />
                    </span>
                    <p>{selectedCard.projectComments}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-BackgroundAccent h-0.5 my-4"></div>
            <div>
              <div className="flex ">
                <p
                  className="text-sm items-center flex gap-1 font-bold cursor-pointer border bg-[#6C2D1B] px-2.5 py-1.5 text-BackgroundTwo rounded-full"
                  onClick={toggleReply}
                >
                  <AddIcon />
                  <span>Post Comment</span>
                </p>
              </div>
              <div>
                {isReplying && (
                  <div className="mt-4">
                    <textarea
                      ref={textareaRef}
                      rows={2}
                      placeholder="Post Your Comment"
                      onChange={handleReplyChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6C2D1B]"
                      style={{
                        overflow: "hidden", // Hide the scrollbar
                      }}
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        className="flex items-center gap-2 px-4 py-2 bg-[#6C2D1B] text-BackgroundAccent rounded-full hover:bg-[#57281b] font-bold"
                        onClick={() => {
                          setReplying(false);
                        }}
                      >
                        <SendIcon />
                        <p>Post</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
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

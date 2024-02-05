import { useEffect, useRef, useState } from "react";
import {
  AddIcon,
  BackIcon,
  Message,
  SendIcon,
} from "./Icons";
import { formatDistanceToNow } from "date-fns";

import supabase from "../config/superbaseClient";
import { PostItem } from "./dataComponent";
import { User } from "@supabase/auth-helpers-react";
import LikeDislikeButton from "./LikeDislikeComponent";

export type RightPanelProps = {
  selectedCard: PostItem | null;
  isOpen: boolean;
  onClose: () => void;
  postId: string | undefined;
  currentUserId: string;
};

export type CommentProps = {
  userId: string | undefined;
  // id: string | undefined
};


export const RightPanel: React.FC<RightPanelProps & CommentProps> = ({
  isOpen,
  onClose,
  postId,
  selectedCard,
  currentUserId
}) => {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [commentDescription, setCommentDescription] = useState<string>("");
  const paragraphs = selectedCard?.post_description.split(/\n|\r\n/);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let timer: number | undefined;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000) as unknown as number; // Type assertion
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [successMessage]);

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
      .select();

    if (error) {
      console.log("Error submitting comment:" + error.message);
    } else if (data) {
      console.log("Inserted Comment:", data);
      setCommentDescription("");
      setSuccessMessage(
        "Comment Submited Successfully"
      );
      // window.location.reload();
      // onClose();

    }
  };

  return (
    <div className="overflow-y-auto">
      <div
        ref={rightPanelRef}
        className={`transform top-0 right-0 w-full h-screen transition-transform duration-300 overflow-y-auto no-scrollbar ${isOpen
          ? "fixed z-50 translate-x-0 visibility-visible"
          : "translate-x-full visibility-hidden delay-300 fixed"
          } bg-BackgroundTwo md:static md:translate-x-0 lg:visibility-visible`}
      >
        {selectedCard && (
          <div className="h-full w-full" key={selectedCard.id}>
            <div className="p-6 rounded-xl flex flex-col">
              <div className="flex-0">
                <button
                  onClick={onClose}
                  className="lg:hidden mb-2 pb-2.5 rounded-full hover:text-accent"
                >
                  <div className="flex gap-2 items-center font-medium rounded-full ">
                    <BackIcon />
                    <p className="font-bold">Back</p>
                  </div>
                </button>
              </div>
              <div className="flex-1">
                <div className="h-full">
                  <div className="flex gap-2 items-center">
                    <img
                      src={selectedCard.profiles.avatar}
                      alt=""
                      className="w-14 h-14 object-cover rounded-full border-2 border-BackgroundAccent"
                    />
                    <div>
                      <p className="text-xl font-bold leading-none">
                        {selectedCard.profiles?.user_name}
                      </p>
                      <p className="text-xs text-[#796552] mt-2">
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
                  <h1 className="uppercase font-semibold text-xl mt-4 mb-2">
                    {selectedCard.post_title}
                  </h1>
                  <p className="">{paragraphs}</p>
                  <img
                    src={selectedCard.post_image}
                    alt=""
                    className="w-full rounded-lg object-cover my-4 border border-BackgroundAccent"
                  />

                  <div className="flex justify-between">
                    <LikeDislikeButton postId={selectedCard.id} userId={currentUserId} />
                    <div className="flex items-center">
                      <Message />
                      <p>{selectedCard.comments.length} Comments</p>
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
                          {successMessage && (

                            <div className="flex justify-end">
                              <div className="bg-successTwo px-4 p-1 text-xs mb-3 rounded-full"> {successMessage}</div>
                            </div>
                          )}
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
                          <div className="mt-2 flex justify-end mb-4">
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
                  <div className="w-full bg-BackgroundOne h-0.5"></div>
                  <div className="">
                    {selectedCard.comments
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((cards) => (
                        <div key={cards.id} className="">
                          <div className="py-2 border-b border-b-BackgroundOne ">
                            <div className="flex gap-2 items-center">
                              <img
                                src={cards.user_id.avatar}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="">
                                <p className="font-semibold text-[#2C444E]">
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
                            <p className=" font-normal py-2">
                              {cards.comment_description}
                            </p>
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


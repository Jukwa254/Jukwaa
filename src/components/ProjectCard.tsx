
import { formatDistanceToNow } from "date-fns";
import { PostItem } from "./dataComponent";
import LikeDislikeButton from "./LikeDislikeComponent";
import { Message } from "./Icons";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

type ProjectCardProps = {
  card: PostItem;
  onCardClick: (card: PostItem) => void;
  selectedCard: PostItem | null;
  currentUserId: string;
};



const ProjectCard: React.FC<ProjectCardProps> = ({
  card,
  onCardClick,
  selectedCard,
  currentUserId
}) => {

  const [isLoading] = useState(false);

  return (
    <div
      key={card.id}
      onClick={() => {
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-200 mb-4 cursor-pointer border border-BackgroundAccent px-4 py-4 lg:pt-6 lg:pb-3 rounded-xl hover:bg-BackgroundOne ${selectedCard && selectedCard.id === card.id
        ? "bg-BackgroundOne"
        : "border-strokeOne"
        }`}
    >
      <div className="w-full">
        <div className="bg-white rounded-lg w-full">
          <div className="flex gap-2 w-full items-center">
            <img
              src={card.profiles.avatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex justify-between items-start w-full">
              <div className="">
                <p className="text-lg font-semibold text-[#2C444E] leading-none">
                  {card.profiles?.user_name}
                </p>
                <p className="text-[#2C444E] text-xs uppercase pt-1">{card.post_category}</p>
              </div>
              <div className=" flex justify-end ">
                <p className="text-xs text-[#796552] leading-none">
                  {formatDistanceToNow(new Date(card.created_at), {
                    addSuffix: false,
                  })}{" "}
                  ago
                </p>
              </div>

            </div>
          </div>
          <div className="mt-4 text-[#2C444E]">
            <h1 className="uppercase font-semibold text-xl py-2 leading-none">
              {card.post_title}
            </h1>
            <p className="text-base">{card.post_description}</p>
            <div className="mt-4">
              {isLoading ? (
                <Skeleton height={150} duration={500} />
              ) : (
                <img
                  src={card.post_image}
                  alt=""
                  className="w-full rounded-lg object-cover border border-BackgroundAccent"
                />
              )}

            </div>
            <div className="flex justify-between mt-3">
              <LikeDislikeButton postId={card.id} userId={currentUserId} />
              <div className="flex items-center">
                <Message />
                <p>{card.comments.length}</p>
              </div>
            </div>
            {/* <div>
              {card.comments.map((comment) => (
                <div>
                  <p>{comment.user_id.user_name}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;


import { formatDistanceToNow } from "date-fns";
import { PostItem } from "./dataComponent";
import LikeDislikeButton from "./LikeDislikeComponent";
import { Message } from "./Icons";

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
      <div>
        <div className="bg-white rounded-lg">
          <div className="flex gap-2 ">
            <img
              src={card.profiles.avatar}
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
            <div className="flex justify-between mt-3">
              <LikeDislikeButton postId={card.id} userId={currentUserId} />
              <div className="flex items-center">
                <Message />
                <p>{card.comments.length}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

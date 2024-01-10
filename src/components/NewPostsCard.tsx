import { CardType } from "./SampleData";

type ProjectCardProps = {
  card: CardType;
  onCardClick: (card: CardType) => void;
  selectedCard: CardType | null;
};

export const NewPostsCard: React.FC<ProjectCardProps> = ({
  card,
  onCardClick,
  selectedCard,
}) => {
  return (
    <div
      key={card.id}
      onClick={() => {
        // handleCardClick();
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-200 mb-4 cursor-pointer border px-4 py-4 lg:pt-6 lg:pb-3 rounded-xl hover:bg-BackgroundAccent ${
        selectedCard && selectedCard.id === card.id
          ? "bg-BackgroundAccent border border-accent"
          : "border-strokeOne"
      }`}
    >
      <div className="flex gap-2 justify-start">
        <img
          src={card.organizationLogo}
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="uppercase font-semibold text-xl py-2">
            {card.projectTitle}
          </h1>
          <p className="text-sm">{card.projectComments} Comments</p>
        </div>
      </div>
    </div>
  );
};

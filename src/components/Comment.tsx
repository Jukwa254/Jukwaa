import CommentComponent from "./CommentComponent";
import Image from "../assets/images/signup-image.png";

export const UserComments = () => {
  return (
    <div>
      <div>
        <div className="">
          <p className="font-bold">Comments</p>
        </div>
        <CommentComponent
          image={Image}
          name={"Grace Njeri"}
          time={"3 hours"}
          comment={
            "The new highway project has significantly reduced my commute time 🚗🛣️. Kudos to the government for prioritizing infrastructure! 👏"
          }
          likes={200}
          dislike={12}
          replays={367}
        />
        <CommentComponent
          image={Image}
          name={"Andrew Mbugua"}
          time={"5 hours"}
          comment={
            "I've noticed improved road markings and signage 🚸, making it safer for both drivers and pedestrians. Great initiative! 🌟"
          }
          likes={36}
          dislike={2}
          replays={17}
        />
        <CommentComponent
          image={Image}
          name={"Joseph Kilumda"}
          time={"22 hours"}
          comment={
            "The new infrastructure has boosted local commerce 🏪💼. Our business has seen a noticeable increase in customers since the project's completion. 📈"
          }
          likes={1304}
          dislike={34}
          replays={1241}
        />
        <CommentComponent
          image={Image}
          name={"Andrew Mbugua"}
          time={"5 hours"}
          comment={
            "The green spaces 🌳 and eco-friendly designs 🌿 incorporated into the project are commendable. A step in the right direction for sustainable development! ♻️"
          }
          likes={36}
          dislike={2}
          replays={17}
        />
        <CommentComponent
          image={Image}
          name={"Joseph Kilumda"}
          time={"22 hours"}
          comment={
            "The government's engagement with the local community 👥 throughout the project was exemplary. Our concerns were heard, and the outcomes reflect that. 🗣️✅"
          }
          likes={1304}
          dislike={34}
          replays={1241}
        />
        <CommentComponent
          image={Image}
          name={"Andrew Mbugua"}
          time={"5 hours"}
          comment={
            "From a technical standpoint, the project's execution is impressive 🏗️. The engineering solutions adopted showcase innovation and foresight. 🔍📐"
          }
          likes={36}
          dislike={2}
          replays={17}
        />
        <CommentComponent
          image={Image}
          name={"Joseph Kilumda"}
          time={"22 hours"}
          comment={
            "The integration of public transportation hubs 🚉 within the project is a game-changer. Easier city navigation using public transit now! 🚌🚇"
          }
          likes={1304}
          dislike={34}
          replays={1241}
        />
      </div>
    </div>
  );
};

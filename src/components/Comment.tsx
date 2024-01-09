import CommentComponent from "./CommentComponent";
import Image from "../assets/images/signup-image.png";

export const UserComments = () => {
  return (
    <div>
      <div>
        <div className="">
          <p className="font-semibold text-xl">Comments</p>
        </div>
        <CommentComponent
          image={Image}
          name={"Grace Njeri"}
          time={"3 hours"}
          comment={
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure."
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
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure.  undertake a new project aimed at improving transportation infrastructure."
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
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure."
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
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure.  undertake a new project aimed at improving transportation infrastructure."
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
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure."
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
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure.  undertake a new project aimed at improving transportation infrastructure."
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
            "Our government proposes to undertake a new project aimed at improving transportation infrastructure."
          }
          likes={1304}
          dislike={34}
          replays={1241}
        />
      </div>
    </div>
  );
};

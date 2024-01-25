import { NotificationIcon } from "./Icons";

interface CenterPanelNavBarProps {
  title: string;
}

const CenterPanelNavBar = (props: CenterPanelNavBarProps) => {
  return (
    <div>
      <div className="flex justify-between items-center w-full bg-BackgroundTwo p-4 rounded-t-xl">
        <p className="uppercase text-[20px] font-bold text-accent">
          {props.title}
        </p>
        <div className="">
          <NotificationIcon />
        </div>
      </div>
    </div>
  );
};

export default CenterPanelNavBar;

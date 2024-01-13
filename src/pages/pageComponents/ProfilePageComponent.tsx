import { useEffect, useRef, useState } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/superbaseClient";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@supabase/auth-helpers-react";
import { AddIcon } from "../../components/Icons";

const ProfilePageComponent = () => {
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const centerPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveScrollPosition = () => {
    if (centerPanelRef.current) {
      localStorage.setItem(
        "centerPanelScroll",
        centerPanelRef.current.scrollTop.toString()
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
    restoreScrollPosition(centerPanelRef, "centerPanelScroll");

    window.addEventListener("resize", saveScrollPosition);
    return () => {
      window.removeEventListener("resize", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const centerPanel = centerPanelRef.current;
    centerPanel?.addEventListener("scroll", saveScrollPosition);
    return () => {
      centerPanel?.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div>
        <div
          className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4 bg-BackgroundTwo lg:rounded-xl p-2 lg:p-4"
          ref={centerPanelRef}
        >
          <CenterPanelNavBar title={"User Profile"} />
          <div className="flex justify-between">
            {/* <button onClick={() => signOutUser()}> SignOut</button> */}
            <div>
              <button
                onClick={openModal}
                className="bg-accent text-BackgroundOne p-2 rounded flex"
              >
                <AddIcon />
                <p>Add Project</p>
              </button>

              <ProjectFormModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ImageData {
  id: string;
  url: string;
}

export interface ProjectItem {
  project_title: string;
  project_description: string;
  project_category: string;
  project_image: string;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [project_title, setProjectTitle] = useState<string>("");
  const [project_description, setProjectDescription] = useState<string>("");
  const [project_category, setProjectCategory] = useState<string>("");
  const [projectImage, setProjectImage] = useState<ImageData[]>([]);
  const user = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer: number | undefined;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !project_title ||
      !project_category ||
      !project_description ||
      projectImage.length === 0
    ) {
      setErrorMessage("Please fill in all the fields and upload one image");
      return;
    }

    const project_image = projectImage[0].url;

    const { data, error } = await supabase.from("project").insert([
      {
        project_title,
        project_description,
        project_category,
        project_image,
      },
    ]);
    if (error) {
      setErrorMessage("Error inserting data: " + error.message);
    } else if (data) {
      console.log("Inserted data:", data);
      setProjectTitle("");
      setProjectCategory("");
      setProjectDescription("");
      setProjectImage([]);
    }

    onClose(); // Close modal after submit
  };

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0] && user) {
      let file = e.target.files[0];
      const imageId = uuidv4();
      const { data, error } = await supabase.storage
        .from("project_images")
        .upload(user.id + "/" + imageId, file);

      if (error) {
        console.error("Upload error:", error);
      } else if (data) {
        const newImageUrl = `https://hlprrellgqppivpzwwap.supabase.co/storage/v1/object/public/project_images/${user.id}/${imageId}`;
        const newImageData: ImageData = {
          id: imageId,
          url: newImageUrl,
        };
        setProjectImage((prev) => [...prev, newImageData]);
      }
    }
  }
  useEffect(() => {
    console.log("Current images state:", projectImage);
  }, [projectImage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-textOne bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 lg:mx-auto p-5 border mx-4 lg:w-1/3 shadow-lg rounded-md bg-BackgroundTwo">
        <div className="mt-3">
          <div className="flex justify-between">
            <h3 className="text-xl leading-6 text-accent font-bold">
              Add Project
            </h3>
            <button
              onClick={onClose}
              className="text-sm underline hover:text-accent"
            >
              Close
            </button>
          </div>
          {errorMessage && (
            <div className="bg-errorTwo px-4 p-1 mt-4">
              <p>{errorMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-8">
              <label htmlFor="projectTitle">Title</label>
              <input
                type="text"
                name="projectTitle"
                value={project_title}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="mt-2 p-2 border rounded border-strokeOne w-full"
                placeholder="Project Title"
              />
            </div>
            <div>
              <label htmlFor="projectDescription">Description</label>
              <textarea
                value={project_description}
                rows={4}
                name="projectDescription"
                onChange={(e) => setProjectDescription(e.target.value)}
                className="mt-2 p-2 border rounded w-full border-strokeOne"
                placeholder="Project Description"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectCategory">Category</label>
              <input
                type="text"
                name="projectCategory"
                value={project_category}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="mt-2 p-2 border rounded border-strokeOne w-full"
                placeholder="Health"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                className="border rounded w-full py-2 px-3 bg-darkBackgroundTwo border-strokeDark leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                id="imageUpload"
                onChange={uploadImage}
                accept="image/png, image/jpeg"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-accent text-BackgroundOne font-bold p-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

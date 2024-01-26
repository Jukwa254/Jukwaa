import { useEffect, useRef, useState } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/superbaseClient";
import { v4 as uuidv4 } from "uuid";
import { AddIcon } from "../../components/Icons";
import { User } from "@supabase/auth-helpers-react";
import Skeleton from "react-loading-skeleton";
import { SignupFormData } from "../../Auth/RegisterAuth";

interface Post {
  post_title: string;
  post_description: string;
  post_category: string;
  post_image: string;
  user_id: string;
  profiles: {
    email: string;
    full_name: string;
  }[]; // Adjust this according to the actual structure
}

// interface UserDetailsItem {
//   email: string;
//   user_name: string;
// }

const ProfilePageComponent = () => {
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const centerPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postCard, setPosts] = useState<Post[]>([]);
  const [userDetails, setUserDetails] = useState<SignupFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchPostsData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("User not logged in");
        return;
      }

      // Parse the token to get the user object
      const user = JSON.parse(token) as User;

      if (user) {
        const { data, error } = await supabase
          .from("posts")
          .select(
            `
                    post_title,
                    post_description,
                    post_category,
                    post_image,
                    user_id,
                    profiles (*)
                `
          )
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching posts:", error);
        } else if (data) {
          setPosts(data);
          console.log("Fetch Successful");
        }
        setIsLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        // Retrieve user data from session storage
        const storedUser = sessionStorage.getItem("token");
        if (!storedUser) {
          throw new Error("No user data found in session storage.");
        }

        const user = JSON.parse(storedUser) as User;
        const userId = user.id;

        // Fetch user profile from Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) throw error;
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <div>
        <div
          className="h-screen text-strokeLight overflow-y-auto no-scrollbar lg:py-4"
          ref={centerPanelRef}
        >
          <div className="lg:mx-3">
            <CenterPanelNavBar title={"Profile"} />
          </div>
          <div className="bg-BackgroundTwo p-4 lg:px-6 lg:rounded-b-xl lg:mx-3 h-full">
            <div className=" my-4 flex justify-end">
              <button
                onClick={openModal}
                className="bg-accent text-BackgroundOne p-2 rounded flex"
              >
                <AddIcon />
                <p>Add a Post</p>
              </button>

              <ProjectFormModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
            <div className="flex flex-col h-full">
              {isLoading ? (
                <div>
                  <div className="">
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="bg-BackgroundOne p-4 rounded-lg ">
                    <p className="text-lg font-bold pb-4">User Details</p>
                    <div className="flex justify-between items-center py-2">
                      <p className="">User Name</p>
                      <p className="text-textTwo">{userDetails?.user_name}</p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">Email</p>
                      <p className="text-textTwo">{userDetails?.email}</p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">Phone</p>
                      <p className="text-textTwo">0759000575</p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">County</p>
                      <p className="text-textTwo">Kakamega</p>
                    </div>
                    <div className="flex justify-between items-center mt-10">
                      <p>Logout</p>
                      <button
                        onClick={handleLogout}
                        className="border px-4 py-2 border-strokeOne rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="my-4  bg-BackgroundOne p-4 rounded-lg">
                <div className=""></div>
                <p className="text-lg font-bold">My Posts</p>
                <div>
                  {isLoading ? (
                    <div>
                      <div className="">
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                      </div>
                    </div>
                  ) : postCard && postCard.length > 0 ? (
                    <div className="">
                      {postCard.map((post, index) => (
                        <div
                          key={index}
                          className="border-b-4 pb-4 border-BackgroundTwo"
                        >
                          <p className="mt-4 font-bold mb-2">
                            {post.post_title}
                          </p>
                          <div className="lg:flex gap-2">
                            <p>{post.post_description}</p>
                            <img
                              src={post.post_image}
                              alt=""
                              className="w-full lg:w-40 object-cover rounded my-2"
                            />
                          </div>

                          {/* <p>
                            Posted by: {post.users[0]?.user_name || "Unknown"}
                          </p> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="pb-5">No Posts ...</p>
                      <button
                        onClick={openModal}
                        className="bg-accent text-BackgroundOne p-2 rounded flex"
                      >
                        <AddIcon />
                        <p>Add a Post</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
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

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [projectMainImage, setProjectMainImage] = useState<ImageData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000) as unknown as number; // Type assertion
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [errorMessage]);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const userToken = sessionStorage.getItem("token");
    let user = null;

    if (userToken) {
      user = JSON.parse(userToken);
    }
    console.log("User authenticated:", user);
    console.log("Files selected:", e.target.files);

    console.log("User authenticated:", user);
    if (e.target.files && e.target.files[0] && user) {
      let file = e.target.files[0];
      const imageId = uuidv4();
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(user.id + "/" + imageId, file);

      if (error) {
        setErrorMessage("Image upload failed: " + error.message); // Display error message
      } else if (data) {
        const newImageUrl = `https://hlprrellgqppivpzwwap.supabase.co/storage/v1/object/public/post-images/${user.id}/${imageId}`;
        const newImageData = {
          id: imageId,
          url: newImageUrl,
        };
        setProjectMainImage((prev) => [...prev, newImageData]);
      }
    } else {
      console.log("No file selected or user is not authenticated");
    }
  }

  useEffect(() => {
    console.log("Current images state:", projectMainImage);
  }, [projectMainImage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form with state:", {
      projectTitle,
      projectCategory,
      projectDescription,
      projectMainImage,
    });
    setErrorMessage("");

    try {
      if (!projectTitle || !projectCategory || !projectDescription) {
        setErrorMessage("Please fill in all the non-file fields");
        return;
      }
      if (projectMainImage.length === 0) {
        setErrorMessage("No image has been uploaded");
        return;
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        setErrorMessage("User not logged in");
        return;
      }

      // Parse the token to get the user object
      const user = JSON.parse(token) as User;

      const projectImage = projectMainImage[0]?.url;
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            post_title: projectTitle,
            post_description: projectDescription,
            post_category: projectCategory,
            post_image: projectImage,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        setErrorMessage("Error inserting data: " + error.message);
      } else if (data) {
        console.log("Inserted data:", data);
        setProjectTitle("");
        setProjectCategory("");
        setProjectDescription("");
        setProjectMainImage([]);
        setFormSubmitted(true);

        console.log("Calling onClose to close the modal"); // Debugging statement
        onClose(); // Attempt to close the modal
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setErrorMessage("An unexpected error occurred during form submission.");
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      onClose();
      setFormSubmitted(false); // Reset the form submission state
    }
  }, [formSubmitted, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-textOne bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 lg:mx-auto p-5 border mx-4 lg:w-1/3 shadow-lg rounded-md bg-BackgroundTwo">
        <div className="mt-3">
          <div className="flex justify-between">
            <h3 className="text-xl leading-6 text-accent font-bold">
              Add Post
            </h3>
            <button
              onClick={onClose}
              className="text-sm underline hover:text-accent"
            >
              Close
            </button>
          </div>
          {errorMessage && (
            <div className="bg-errorTwo px-4 p-1 mt-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-8">
              <label htmlFor="projectTitle">Title</label>
              <input
                type="text"
                name="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="mt-2 p-2 border rounded border-strokeOne w-full"
                placeholder="Project Title"
              />
            </div>
            <div>
              <label htmlFor="projectDescription">Description</label>
              <textarea
                value={projectDescription}
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
                value={projectCategory}
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
                name="image"
                id="imageUpload"
                onChange={uploadImage}
                accept="image/png, image/jpeg, image/jpg"
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

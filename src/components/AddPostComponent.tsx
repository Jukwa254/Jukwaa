import { useEffect, useState } from "react";
import supabase from "../config/superbaseClient";
import Skeleton from "react-loading-skeleton";
import { AddIcon } from "./Icons";
import { User } from "@supabase/auth-helpers-react";
import { ProjectFormModal } from "./PostFormComponent";
import { Post } from "../pages/pageComponents/ProfilePageComponent";

const AddPostComponent = () => {
    const [role, setRole] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [postCard, setPostCard] = useState<Post[]>([]); // Assuming you have a state for posts

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Fetch user's role from Supabase
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                console.log("User not logged in");
                return;
            }

            // Parse the token to get the user object
            const user = JSON.parse(token) as User;

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select("*")
                    .eq('user_id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user role', error);
                } else if (data) {
                    setRole(data.roles);
                    // setPostCard(data.roles)
                }
            }
            setIsLoading(false);
        };

        fetchUserRole();
    }, []);


    if (isLoading) {
        return <div>
            <Skeleton height={100} />
            <Skeleton height={50} />
            <Skeleton height={50} />
        </div>;
    }

    if (role !== 'admin') {
        return null; // Or any other appropriate JSX for non-admin users
    }
    return (
        <div>
            <div className=" bg-BackgroundOne rounded-lg">
                <ProjectFormModal isOpen={isModalOpen} onClose={closeModal} />
                <button
                    onClick={openModal}
                    className="bg-accent text-BackgroundOne p-2 rounded flex"
                >
                    <AddIcon />
                    <p>Add a Post</p>
                </button>
                <div className="mt-4"></div>
                <p className="text-lg font-bold">My Posts</p>
                {/* <div>
                    {isLoading ? (
                        <div>
                            <div className="">
                                <Skeleton height={100} />
                                <Skeleton height={100} />
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
                                    <p className="mt-4 font-bold mb-2 uppercase">
                                        {post.post_title}
                                    </p>
                                    <div className="lg:flex gap-4 items-start justify-between">
                                        <div>
                                            <div>
                                                <p>{post.post_description.substring(0, 109)} ...</p>
                                                <div className="flex gap-10 mt-4 text-sm">
                                                    <p>{post.likes} Likes</p>
                                                    <p>{post.dislikes} Dislikes</p>
                                                </div>

                                            </div>
                                        </div>
                                        <img
                                            src={post.post_image}
                                            alt=""
                                            className="w-full lg:w-40 object-cover rounded my-2"
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className="pb-5">No Posts ...</p>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default AddPostComponent
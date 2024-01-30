import { useEffect, useState } from "react";
import supabase from "../config/superbaseClient";
import { User } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../pages/pageComponents/SearchPageComponent";

export interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ImageData {
    id: string;
    url: string;
}

export const EditFormComponent: React.FC<ProjectFormModalProps> = ({
    isOpen,
    onClose,

}) => {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [projectMainImage, setProjectMainImage] = useState<ImageData[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isUploading, setIsUploading] = useState(false);


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
            setIsUploading(true);
            let file = e.target.files[0];
            const imageId = uuidv4();
            const { data, error } = await supabase.storage
                .from("avatar")
                .upload(user.id + "/" + imageId, file);

            setIsUploading(false);
            if (error) {
                setErrorMessage("Image upload failed: " + error.message); // Display error message
            } else if (data) {
                const newImageUrl = `https://hlprrellgqppivpzwwap.supabase.co/storage/v1/object/public/avatar/${user.id}/${imageId}`;
                const newImageData = {
                    id: imageId,
                    url: newImageUrl,
                };
                setProjectMainImage((prev) => [...prev, newImageData]);
            }
            setTimeout(() => {
                setIsUploading(false);
            }, 5000);
        } else {
            console.log("No file selected or user is not authenticated");
        }
    }

    useEffect(() => {
        console.log("Current images state:", projectMainImage);
    }, [projectMainImage]);


    const token = sessionStorage.getItem("token");
    if (!token) {
        setErrorMessage("User not logged in");
        return;
    }

    // Parse the token to get the user object
    const user = JSON.parse(token) as User;
    const id = user.id


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting form with state:", {
            userName,
            email,
            phone,
            location,
            projectMainImage,
        });
        setErrorMessage("");

        const profileImage = projectMainImage[0]?.url;
        const { data, error } = await supabase
            .from("profiles")
            .update([
                {
                    user_name: userName,
                    email: email,
                    phone: phone,
                    location: location,
                    avatar: profileImage,
                    user_id: user.id,
                },
            ])
            .eq("user_id", id)
            .select();

        if (error) {
            setErrorMessage("Error inserting data: " + error.message);
        } else if (data) {
            console.log("Inserted data:", data);
            console.log("Calling onClose to close the modal"); // Debugging statement
            onClose(); // Attempt to close the modal
            alert("Form Edited Successfully")
        }

    };

    useEffect(() => {
        const fetchFormData = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select()
                .eq("user_id", id)
                .single();

            if (error) {
                // navigate("/admin", { replace: true });
                console.log("Error Updating Data", error)
            }
            if (data) {
                setUserName(data.user_name);
                setEmail(data.email);
                setPhone(data.phone);
                setLocation(data.location);
                setProjectMainImage([]);
                // setFormSubmitted(true);
            }
        };

        fetchFormData();
    }, [id]);

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
                            Edit Profile Details
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
                        <div className="flex items-center gap-10 mt-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="image"
                                >
                                    Profile Image
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
                            {isUploading && (
                                <Spinner />
                            )}
                        </div>
                        <div className="mb-4 ">
                            <label htmlFor="projectTitle">User Name</label>
                            <input
                                type="text"
                                name="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="mt-2 p-2 border rounded border-strokeOne w-full"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectDescription">Email</label>
                            <input
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 p-2 border rounded w-full border-strokeOne"
                                placeholder="email@gmail.com"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectCategory">Phone</label>
                            <input
                                type="number"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-2 p-2 border rounded border-strokeOne w-full"
                                placeholder="O700 000000"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectCategory">County</label>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-2 p-2 border rounded border-strokeOne w-full"
                                placeholder="Nairobi"
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


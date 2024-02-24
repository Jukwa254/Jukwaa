// import { User } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/superbaseClient";
import { Spinner } from "../Auth/RegisterAuth";



const AdminAuth = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // useEffect(() => {
    //     let timer: number | undefined;
    //     if (errorMessage) {
    //         timer = setTimeout(() => {
    //             setErrorMessage("");
    //         }, 3000) as unknown as number; // Type assertion
    //     }

    //     return () => {
    //         if (timer) clearTimeout(timer);
    //     };
    // }, [errorMessage]);

    // const setToken = (user: User) => {
    //     sessionStorage.setItem("token", JSON.stringify(user)); // Store the entire user object
    // };

    const isAuthenticated = () => {
        const token = sessionStorage.getItem("token");
        return !!token;
    };

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard");
        }
    }, [navigate]);

    function handleChange(event: { target: { name: any; value: any } }) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    async function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        if (!formData.email.trim() || !formData.password.trim()) {
            setErrorMessage("Please fill in all fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (response.error) {
                throw response.error;
            }

            if (response.data && response.data.user) {
                console.log(response.data.user);

                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('roles')
                    .eq('user_id', response.data.user.id)
                    .single();

                if (profileError) {
                    throw profileError;
                }

                if (profileData && profileData.roles === "super_admin") {
                    navigate("/dashboard");
                } else {
                    setErrorMessage("You have no permission")
                }

                setIsSubmitting(false);
                window.location.reload();
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else if (typeof error === "string") {
                setErrorMessage(error);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    }

    // async function handleSubmit(e: { preventDefault: () => void }) {
    //     e.preventDefault();
    //     setErrorMessage("");
    //     setIsSubmitting(true);

    //     if (!formData.email.trim() || !formData.password.trim()) {
    //         setErrorMessage("Please fill in all fields.");
    //         setIsSubmitting(false);
    //         return;
    //     }

    //     try {
    //         const response = await supabase.auth.signInWithPassword({
    //             email: formData.email,
    //             password: formData.password,
    //         });

    //         if (response.error) {
    //             throw response.error;
    //         }

    //         if (response.data && response.data.user) {
    //             console.log(response.data.user);
    //             setToken(response.data.user); // Save user data in sessionStorage
    //             navigate("/dashboard");
    //             setIsSubmitting(false);

    //             window.location.reload();
    //         } else {
    //             setErrorMessage("Login failed. Please try again.");
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             setErrorMessage(error.message);
    //         } else if (typeof error === "string") {
    //             setErrorMessage(error);
    //         } else {
    //             setErrorMessage("An unexpected error occurred.");
    //         }
    //     }
    // }

    console.log(formData);

    return (
        <div>
            <div className="h-screen w-full text-[#424242] font-medium">
                <div className="w-full flex justify-center">
                    <form
                        className="lg:max-w-[600px] w-full lg:mx-20 rounded-lg p-8 px-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-between text-accent font-extrabold">
                            <h1>JUKWAA</h1>
                        </div>

                        <h2 className="text-start text-3xl  font-bold pt-16 md:pt-28 pb-8 text-accent">
                            Super Admin
                        </h2>
                        {errorMessage && (
                            <div className="bg-errorTwo px-4 p-1">{errorMessage}</div>
                        )}
                        <div className="flex flex-col py-4">
                            <label className="text-start text-base">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Joe@gmail.com"
                                onChange={handleChange}
                                className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
                            />
                        </div>
                        <div className="flex flex-col py-4">
                            <label className="text-start text-base">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="**********"
                                className="text-base rounded-md mt-2 px-4 py-3 focus:bg-gray-100 focus:outline-2 focus:outline-[#6C2D1B] outline outline-1 outline-[#D9D9D9]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full my-5 py-4 bg-[#6C2D1B] shadow-lg hover:shadow-[#6C2D1B]/40 text-BackgroundOne font-semibold rounded-md text-xl"
                        >
                            {isSubmitting ? <Spinner /> : "Login"}
                        </button>

                    </form>
                </div>


            </div>
        </div>
    )
}

export default AdminAuth
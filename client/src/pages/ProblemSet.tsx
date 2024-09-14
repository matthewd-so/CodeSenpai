import { useState, useEffect } from "react";
import CustomNavbar from "../components/CustomNavbar";
import ProblemList from "../components/ProblemList";
import MainHeading from "../components/MainHeading";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const API_URL = "http://localhost:80";

const ProblemSet = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [problemListData, setProblemListData] = useState<any[]>([]); // Storing the problem list data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const navigate = useNavigate();

    const customNavData: Navbar = {
        items: [
            { text: "All Topics", link_path: "/problemset" },
            { text: "Algorithms", link_path: "/problemset" },
            { text: "JavaScript", link_path: "/problemset" },
            { text: "Database", link_path: "/problemset" },
            { text: "Shell", link_path: "/problemset" },
        ],
    };

    const [searchQ, setSearchQ] = useState<string>("");

    // Function to fetch the problem list, with support for search and sorting
    const handleSearch = async (
        searchQuery: string,
        options: SortOptions = {
            acceptance_rate_count: "",
            difficulty: "",
            title: "",
        }
    ) => {
        const { acceptance_rate_count, difficulty, title } = options;
        try {
            setLoading(true); // Start loading
            const { data } = await axios.post(
                `${API_URL}/api/problem/all?search=${searchQuery}&acceptance=${acceptance_rate_count}&difficulty=${difficulty}&title=${title}`,
                { id }
            );
            setProblemListData(data); // Set the fetched problems in the state
            setLoading(false); // End loading
        } catch (error) {
            console.error("Error searching problems:", error);
            setLoading(false); // End loading in case of an error
        }
    };

    useEffect(() => {
        // Fetch the user's details using the provided token and id
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
            })
            .catch((e: AxiosError) => {
                console.log("User verification failed:", e);
                navigate("/sorry"); // Navigate to a sorry page on failure
                setVerified(false);
            });

        // Fetch the initial problem list when the component mounts
        axios
            .post(`${API_URL}/api/problem/all`, { id: id })
            .then(({ data }) => {
                setProblemListData(data); // Set the problems data in state
                setLoading(false); // End loading
            })
            .catch((error) => {
                console.error("Error fetching problems:", error);
                setLoading(false); // End loading in case of an error
            });
    }, [id, token, navigate]);

    return (
        <>
            {/* Display the username or a placeholder if the user isn't verified */}
            {verified ? (
                <MainHeading data={{ username: username }} />
            ) : (
                <MainHeading data={{ status: "none" }} />
            )}

            <div className="h-[calc(100vh-60px)] overflow-hidden bg-black">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px]"
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-black border border-borders ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                    >
                        {/* Custom Navbar */}
                        <div className="w-full bg-black border-b border-borders ">
                            <div className="ml-[9px]">
                                <CustomNavbar data={customNavData} />
                            </div>
                        </div>

                        {/* Search input */}
                        <div className="w-full bg-black h-[40px] relative border-b border-borders">
                            <input
                                type="text"
                                placeholder="Search questions..."
                                onChange={(e) => {
                                    handleSearch(e.target.value); // Fetch based on search query
                                    setSearchQ(e.target.value); // Update the search state
                                }}
                                className="bg-black outline-none border-none relative -translate-y-1/2 top-1/2 left-[9px] px-[20px] text-[14px] h-[calc(100%-2px)] placeholder:text-[14px] placeholder:text-text_2 w-[calc(100%-100px)]"
                            />
                        </div>

                        {/* Render the Problem List */}
                        <div>
                            {loading ? (
                                <p>Loading problems...</p> // Show loading indicator
                            ) : (
                                <ProblemList
                                    searchFn={handleSearch}
                                    searchQuery={searchQ}
                                    data={problemListData as any} // Pass the problems data to the list
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;
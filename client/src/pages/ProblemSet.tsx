import axios, { AxiosError } from "axios";

import { API_URL } from "../App";
import CustomNavbar from "../components/CustomNavbar";
import MainHeading from "../components/MainHeading";
import ProblemList from "../components/ProblemList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import welcome from "../images/welcome-nobg.png";

const ProblemSet = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [money, setMoney] = useState<number>(0);
    const [verified, setVerified] = useState<boolean>(false);
    const navigate = useNavigate();
    const [problemListData, setProblemListData] = useState();
    const customNavData: Navbar = {
        items: [{ text: "All Topics", link_path: "/problemset" }],
    };

    const [searchQ, setSearchQ] = useState<string>("");

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
            const { data } = await axios.post(
                `${API_URL}/api/problem/all?search=${searchQuery}&acceptance=${acceptance_rate_count}&difficulty=${difficulty}&title=${title}`,
                { id }
            );
            setProblemListData(data);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    useEffect(() => {
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setMoney(data.money);
                setVerified(true);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                navigate("/sorry");
                setVerified(false);
            });

        axios
            .post(`${API_URL}/api/problem/all`, { id: id })
            .then(({ data }) => {
                setProblemListData(data);
            });
    }, []);

    return (
        <>
            {verified ? (
                <MainHeading data={{ username: username, money: money }} />
            ) : (
                <MainHeading data={{ status: "none" }} />
            )}

            <div className="h-[calc(100vh-60px)] overflow-hidden bg-white text-black">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-white border-gray-500 border-borders ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                    >
                        <div className="w-full bg-violet-400 border-b border-gray-500 ">
                            <div className="ml-[9px]">
                                {/* <CustomNavbar data={customNavData} /> */}
                            </div>
                        </div>
                        <div className="w-full bg-white h-[40px] relative border-b border-gray-500">
                            <input
                                type="text"
                                placeholder="Search questions..."
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                    setSearchQ(e.target.value);
                                }}
                                className="bg-violet-100 outline-none border-2 border-violet-500 focus:border-violet-700 hover:border-violet-600 text-violet-900 placeholder-violet-400 px-4 py-2 rounded-lg w-full transition duration-300 ease-in-out"
                            />
                        </div>
                        <div>
                            <ProblemList
                                searchFn={handleSearch}
                                searchQuery={searchQ}
                                data={problemListData as any}
                            />
                        </div>
                        <div className="flex row w-full mt-4 gap-16 ml-40 mt-28">
                            <div className="bg-[#B3A1CF]/50  h-32 border-4 text-2xl border-[#E3A6D1] mt-16 py-6 mb-0 font-suse text-violet-900 justify-center  px-6">
                                <p className="text-semibold">
                                    Let's try to do the Valid Partners,{" "}
                                    {username}.<br></br> I believe in you! And
                                    if you have any questions or feel stuck,
                                    just let me know!
                                </p>
                            </div>
                            <img
                                src={welcome}
                                alt="Your anime wifu smiling"
                                className="h-[250px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;

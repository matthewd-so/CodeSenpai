import React, { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../App";
import ChatOverlay from "../components/ChatOverlay";
import Editorial from "../components/Editorial";
import Loading from "../components/Loading";
import MainHeading from "../components/MainHeading";
import ProblemDescription from "../components/ProblemDescription";
import ProblemNavbar from "../components/ProblemNavbar";
import ReactCodeMirror from "@uiw/react-codemirror";
import Submissions from "../components/Submissions";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

// Add this interface above the ProblemPage component
interface ChatOverlayProps {
    problemContext?: string;
}

const ProblemPage = ({
    data,
    token,
    id,
}: {
    data?: ProblemPageData;
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [money, setMoney] = useState<string>("");
    const [initCode, setInitCode] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [currentLang, setCurrentLang] = useState<string>("javascript");

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const activeNavOption = data?.activeNavOption || "description";
    const [problemDescriptionData, setProblemDescriptionData] =
        useState<DescriptionData>();
    const [submissionData, setSubmissionData] = useState<Submission[]>();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const { name } = useParams();

    const submitCode = () => {
        setIsSubmitLoading(true);
        if (!id || !name) {
            console.log("id not found");
            setIsSubmitLoading(false);
            return;
        }

        const problem_name = name;
        axios
            .post<
                {},
                { data: Submission[] },
                { code: string; id: string; problem_name: string }
            >(`${API_URL}/api/problem/submit/${name}`, {
                code,
                id,
                problem_name,
            })
            .then(({ data }) => {
                setIsSubmitted(true);
                setSubmissionData(data);
                navigate(`/problem/${name}/submissions`);
                setIsSubmitLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsSubmitLoading(false);
                setIsSubmitted(true);
            });
    };

    useEffect(() => {
        axios
            .post(`${API_URL}/api/problem/${name}`, { id: id })
            .then(({ data }) => {
                setProblemDescriptionData(
                    data.main as unknown as SetStateAction<
                        DescriptionData | undefined
                    >
                );
                if (
                    "code_body" in data.main &&
                    "javascript" in data.main.code_body
                ) {
                    setInitCode(
                        data.main.code_body.javascript as unknown as string
                    );
                }
            })
            .catch((e) => console.error(e));

        if (!token) return;

        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setMoney(data.money);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                navigate("/sorry");
            });

        if (!id || !name) {
            console.log("id not found");
            return;
        }
        axios
            .post<{}, { data: Submission[] }, { id: string }>(
                `${API_URL}/api/problem/submissions/${name}`,
                { id: id || "" }
            )
            .then(({ data }) => {
                if (data.length !== 0) {
                    setCode(data[0].code_body);
                }
                setSubmissionData(data);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        if (activeNavOption === "description") return;

        axios
            .get(`${API_URL}/api/problem/${name}/${activeNavOption}`)
            .catch((e) => console.error(e));
    }, [activeNavOption]);

    return (
        <>
            <MainHeading
                data={{
                    items: [{ text: "Problem List", link_path: "/problemset" }],
                    username: username,
                }}
            />
            <div className="h-[calc(100vh-60px)] overflow-hidden bg-white">
                <div
                    id="cont"
                    className="relative bg-white flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-white border-gray-300 ml-[8px] rounded-lg w-[50%] overflow-hidden border border-violet-200"
                    >
                        <div className="relative w-full bg-violet-200 h-[50px] rounded-t-lg overflow-hidden border-borders box-content">
                            {name != undefined && (
                                <ProblemNavbar
                                    data={{
                                        problem_name: name,
                                        nav_option_name: activeNavOption,
                                    }}
                                />
                            )}
                        </div>

                        {/* Problem Description */}
                        <div className="description-body relative w-full h-[calc(100%-50px)] overflow-y-auto bg-white text-black">
                            {problemDescriptionData != undefined &&
                            activeNavOption === "description" ? (
                                <>
                                    <ProblemDescription
                                        data={problemDescriptionData}
                                    />
                                </>
                            ) : activeNavOption === "description" ? (
                                <Loading For="pDescription" />
                            ) : (
                                <></>
                            )}
                            {activeNavOption === "submissions" &&
                                submissionData != undefined && (
                                    <Submissions
                                        data={{
                                            submissions_list: submissionData,
                                            is_submitted: isSubmitted,
                                        }}
                                    />
                                )}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="ml-4 flex flex-col h-[calc(100%-16px)] w-[calc(50%-8px)] mr-[8px] flex-grow">
                        <div className="min-h-0 flex-grow min-w-full mr-[8px] mb-[8px] rounded-lg overflow-hidden bg-white border border-violet-200">
                            <div className="h-[50px] bg-violet-500 relative border-b border-borders">
                                <div className="text-white inline-block relative w-fit h-fit rounded-md ml-[13px] top-[8px] px-[6px] py-[6px] text-white hover:text-white cursor-pointer text-[14px] transition select-none">
                                    {currentLang}
                                </div>
                            </div>

                            {/* Custom CodeMirror */}
                            <ReactCodeMirror
                                value={
                                    code === "" || code == null
                                        ? initCode || ""
                                        : code || ""
                                }
                                extensions={[loadLanguage("javascript")!]}
                                theme={"light"}
                                onChange={(value) => {
                                    setCode(value);
                                }}
                                height="100%"
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: "#4c4c4c", // Editor Text Color
                                    caretColor: "#ff007f", // Blinking pink cursor
                                }}
                                className="rounded-b-lg"
                            />
                        </div>

                        {/* Submit Console */}
                        <div
                            id="console"
                            className="flex justify-start px-2 items-center bg-violet-500 w-full h-[50px] rounded-lg overflow-hidden border border-borders"
                        >
                            <div
                                className="w-fit h-fit rounded mr-[11px] px-[20px] py-[4px] hover:bg-violet-600 cursor-pointer hover:text-white text-white bg-violet-400 text-[14px] active:border-green-800 active:bg-green-800 border-green-500 font-bold right-0 transition select-none"
                                onClick={submitCode}
                            >
                                {isSubmitLoading ? (
                                    <div className="w-full block h-[21px]">
                                        <div className="">
                                            <Loading />
                                        </div>
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatOverlay problemContext={problemDescriptionData}/>

            {/* Inline Styling for the Example Boxes */}
            <style>{`
                .example-box {
                    background-color: #f0f0f0; /* Light grey */
                    border-radius: 4px;
                    padding: 10px;
                    margin-bottom: 10px;
                    color: #333;
                }
                .example-box code {
                    background-color: #d9d9d9; /* Darker grey for inline code */
                    color: #333;
                }

                /* Problem list hover effect */
                .problem-list-item:hover {
                    background-color: #d3c4e9; /* A darker purple */
                    transition: background-color 0.3s ease;
                }

                /* Cursor Blinking Effect */
                .cm-cursor {
                    border-left: 2px solid #ff007f; /* Bright pink cursor */
                    animation: blink 1.2s steps(1) infinite;
                }

                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>
        </>
    );
};

export default ProblemPage;

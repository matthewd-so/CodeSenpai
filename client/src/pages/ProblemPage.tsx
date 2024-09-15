import React, { SetStateAction, useEffect } from "react";
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
import { useState } from "react";

// Add this interface above the ProblemPage component
interface ChatOverlayProps {
    problemTitle: string;
    currentSolution: string;
    problemDescription: string;
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

    const [editorial, setEditorial] = useState<string>("");

    const activeNavOption = data?.activeNavOption || "description";

    const [problemDescriptionData, setProblemDescriptionData] =
        useState<DescriptionData>();

    const [submissionData, setSubmissionData] = useState<Submission[]>();
    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { name } = useParams();
    const problemTitle = name || '';

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
                        className="h-[calc(100%-16px)] bg-violet-300  border-gray-500 ml-[8px] rounded-lg w-[50%] overflow-hidden"
                    >
                        <div className="relative w-full bg-violet-300 h-[50px] rounded-t-lg overflow-hidden  border-borders box-content">
                            {name != undefined && (
                                <ProblemNavbar
                                    data={{
                                        problem_name: name,
                                        nav_option_name: activeNavOption,
                                    }}
                                />
                            )}
                        </div>
                        <div className="description-body relative w-full h-[calc(100%-50px)] overflow-y-auto bg-violet-300 text-black">
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
                    <div className="ml-4 flex flex-col h-[calc(100%-16px)] w-[calc(50%-8px)] mr-[8px] flex-grow">
                        <div className="min-h-0 flex-grow min-w-full mr-[8px] mb-[8px] rounded-lg overflow-hidden bg-black border border-borders">
                            <div className="h-[50px] bg-violet-800 relative border-b border-borders">
                                <div className="text-white inline-block relative w-fit h-fit rounded-md ml-[13px] top-[8px] px-[6px] py-[6px] text-text_2 hover:text-white cursor-pointer text-[14px] transition select-none">
                                    {currentLang}
                                </div>
                            </div>
                            <ReactCodeMirror
                                value={
                                    code === "" || code == null
                                        ? initCode || ""
                                        : code || ""
                                }
                                extensions={[loadLanguage("javascript")!]}
                                theme={tokyoNight}
                                onChange={(value) => {
                                    setCode(value);
                                }}
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div
                            id="console"
                            className="flex justify-start px-2 items-center bg-violet-800 w-full h-[50px] rounded-lg overflow-hidden border border-borders"
                        >
                            <div
                                className="w-fit h-fit rounded mr-[11px] px-[20px] py-[4px] hover:bg-red-400 cursor-pointer hover:text-black text-black bg-red-200 text-[14px] active:border-green-800 active:bg-green-800 border-green-500 font-bold right-0 transition select-none"
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
            <ChatOverlay 
                problemTitle={problemTitle} 
                currentSolution={code} 
                problemDescription={problemDescriptionData?.description_body || ''}
            />
        </>
    );
};

export default ProblemPage;
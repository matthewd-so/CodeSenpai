import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { API_URL } from "../App";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MainHeading from "../components/MainHeading";
import { TypeAnimation } from "react-type-animation";
import girlImg from "../images/girlalone.png";
import girlSmiling from "../images/grl-smiling.png";
import { render } from "react-dom";

enum Stage {
    Intorduction,
    Motivation,
    SignUp,
    Promise,
}

const LandingPage = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [currentStage, setCurrentStage] = useState<Stage>(Stage.Intorduction);
    const [username, setUsername] = useState<string>("");
    const [goal, setGoal] = useState<string>("");

    const renderContent = () => {
        switch (currentStage) {
            case Stage.Intorduction:
                return (
                    <>
                        <img
                            src={girlImg}
                            alt="Your anime wifu"
                            className="h-[400px]"
                        />
                        <p className="text-center mt-0 mb-0 font-suse text-7xl text-black">
                            Code Senpai
                        </p>
                        <p className="text-center mt-0 font-suse text-2xl w-full text-black">
                            Your AI-GF that will make you employed and feel
                            loved!
                        </p>
                        <button
                            className="bg-[#B3A1CF] font-suse text-black py-[10px] px-[40px] font-semibold rounded-[30px] border border-black"
                            onClick={() => setCurrentStage(Stage.Motivation)}
                        >
                            Let's talk!
                        </button>
                    </>
                );
            case Stage.Motivation:
                return (
                    <>
                        <img
                            src={girlSmiling}
                            alt="Your anime wifu smiling"
                            className="h-[350px]"
                        />
                        <div
                            className="bg-[#B3A1CF]/50 w-9/12 border-4 text-2xl  border-[#E3A6D1] py-6 mb-0 font-suse text-violet-900 text-bold 
                        px-6 "
                        >
                            <p>
                                Hi, I’m Lia, but you can call me Code-Senpai! I
                                want to be a Software Engineer and I love
                                problem solving, but sometimes it get's lonely..
                                You look cute! Tell me about yourself!
                            </p>
                        </div>
                        <div className="w-9/12 ml-[20%]">
                            <p className="text-violet-900 w-9/12 font-suse font-semibold text-lg">
                                {" "}
                                My name is
                                <input
                                    className="inline appearance-none border-2 w-40 py-2 px-3 mx-4 placeholder:text-text_2  bg-[#B3A1CF]/50 rounded leading-tight focus:outline-none focus:border-violet-600"
                                    type="text"
                                    placeholder="Eshaan"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required={true}
                                />
                                and I want to learn more about
                                <input
                                    className="inline appearance-none border-2 w-40 py-2 px-3 mx-4 placeholder:text-text_2  bg-[#B3A1CF]/50 rounded leading-tight focus:outline-none focus:border-violet-600"
                                    type="text"
                                    placeholder="Hashmaps"
                                    value={goal}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required={true}
                                />
                                !
                            </p>
                        </div>

                        <button
                            className="bg-[#B3A1CF]/50 font-suse font-semibold text-violet-700 text-purple py-[10px] px-[40px] rounded-[30px] border-4 border-[#E3A6D1]"
                            onClick={() => setCurrentStage(Stage.Promise)}
                        >
                            Next Step
                        </button>
                    </>
                );
            case Stage.Promise:
                return (
                    <div className="text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Code?
                        </h2>
                        <p className="text-xl mb-4">
                            Let's dive into some coding challenges!
                        </p>
                        <div className="space-y-4">
                            <button className="bg-[#B3A1CF] font-suse text-purple py-[10px] px-[40px] rounded-[30px] border border-black w-full">
                                Easy Challenge
                            </button>
                            <button className="bg-[#B3A1CF] font-suse text-purple py-[10px] px-[40px] rounded-[30px] border border-black w-full">
                                Medium Challenge
                            </button>
                            <button className="bg-[#B3A1CF] font-suse text-purple py-[10px] px-[40px] rounded-[30px] border border-black w-full">
                                Hard Challenge
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden absolute bg-white">
            <div className="">
                <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-indigo-500 opacity-60 z-10"></div>
                <div className="absolute circle-2-animation top-[8%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-pink-500 opacity-60 z-10"></div>
                <div className="absolute circle-3-animation top-[10%] left-[45%] -translate-x-1/2 w-[400px] h-[300px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-yellow-200 opacity-60 z-10"></div>
                <div className="absolute circle-4-animation top-[10%] left-[50%] -translate-x-1/2 w-[200px] h-[200px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-red-200 opacity-60 z-10"></div>
                <div className="absolute circle-5-animation top-[10%] left-[45%] -translate-x-1/2 w-[400px] h-[400px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-blue-200 opacity-60 z-10"></div>
                <div className="absolute top-[20%] left-[47%] -translate-x-1/2 w-[600px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-600 opacity-60 z-10"></div>
                <div className="absolute circle-7-animation top-[10%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-800 opacity-60 z-10"></div>
            </div>
            {/* {verifiedCertain && verified ? (
                <>
                    <h1 className="absolute text-[38px] md:text-[48px] mx-auto text-center font-bold mt-[100px] z-50 inset-0 top-[100px]">
                        <TypeAnimation
                            sequence={[
                                `Welcome back ${username}!`,
                                2000,
                                `Ready for more challenges, ${username}?`,
                                2000,
                                "Let's dive in!",
                            ]}
                            wrapper="span"
                            cursor={true}
                            style={{
                                fontSize: "1em",
                                display: "inline-block",
                            }}
                        />
                    </h1>
                    <p className="absolute md:w-1/2 w-3/4 text-center mx-auto mt-[50px] z-50 inset-0 md:top-[300px] top-[400px]">
                        Ready to conquer complex challenges? Explore our Problem
                        List now!
                    </p>
                    <div className="absolute md:top-[450px] top-[550px] left-1/2 -translate-x-1/2 z-50">
                        <Link
                            to="/problemset"
                            className="relative ml-[8px] font-bold inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-md text-black text-[18px] hover:bg-red-800"
                        >
                            <div className="w-full h-full bg-black text-white py-[6px] px-[16px] rounded-[6px] border border-black hover:bg-[#00000000] hover:border-[#00000000] hover:text-black transition active:bg-red-700">
                                Problem List
                            </div>
                        </Link>
                    </div>
                </>
            ) : verifiedCertain === true && verified === false ? (
                <> */}

            <div className="absolute flex flex-col items-center justify-center space-y-6   z-50 inset-0 mx-auto">
                {renderContent()}
            </div>

            <div />
        </div>
    );
};

export default LandingPage;

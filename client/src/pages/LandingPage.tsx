import { useEffect, useState } from "react";

import { API_URL } from "../App";
import { Link } from "react-router-dom";
import MainHeading from "../components/MainHeading";
import axios from "axios";
import girlImg from "../images/girlalone.png";
import girlSmiling from "../images/grl-smiling.png";
import grlHeart from "../images/heartgrl.png";
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
    const [money, setMoney] = useState<number>(0);
    const [verified, setVerified] = useState<boolean>(false);
    const [goal, setGoal] = useState<string>("");

    // Access API_KEY and VOICE_ID from the environment variables
    const API_KEY = process.env.REACT_APP_API_KEY;
    const VOICE_ID = process.env.REACT_APP_VOICE_ID;

    // Function to make Lia speak
    const makeLiaSpeak = async (text: string) => {
        if (!API_KEY || !VOICE_ID) {
            console.error(
                "Missing API key or Voice ID in environment variables"
            );
            return;
        }

        try {
            const response = await axios.post(
                `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
                {
                    text: text,
                    voice_settings: {
                        stability: 0.25, // Lower stability for more expressive, anime-like voice
                        similarity_boost: 0.9,
                    },
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "xi-api-key": API_KEY,
                    },
                    responseType: "arraybuffer", // Important to handle audio response
                }
            );

            // Create a Blob from the response and play it as audio
            const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play(); // Play the audio in the browser
        } catch (error) {
            console.error("Error generating speech:", error);
        }
    };

    // Make Lia speak when the user reaches the Motivation stage
    useEffect(() => {
        if (currentStage === Stage.Motivation) {
            makeLiaSpeak(
                "Hi, I’m Lia! But you can call me Code-Senpai. I want to be a Software Engineer and I love Leetcoding, but sometimes, it gets quite lonely... You look cute! Tell me about yourself!"
            );
        }
    }, [currentStage]);

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
                        <p className="mt-0 mb-0 text-center text-black font-suse text-7xl">
                            Code Senpai
                        </p>
                        <p className="w-full mt-0 text-2xl text-center text-black font-suse">
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
                                problem solving, but sometimes it get's
                                lonely...
                                <br></br>You look cute! Tell me about yourself!
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
                                    onChange={(e) => setGoal(e.target.value)}
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
                    <>
                        <img
                            src={grlHeart}
                            alt="Your anime wifu showing hearts"
                            className="h-[350px]"
                        />
                        <div
                            className="bg-[#B3A1CF]/50 w-9/12 border-4 text-2xl  border-[#E3A6D1] py-6 mb-0 font-suse text-violet-900 text-bold 
                        px-6 "
                        >
                            <p>
                                Nice to meet you, {username}. Lets go on a study
                                date together! Solve more questions, earn
                                points, and unlock exclusive experiences with
                                me!
                            </p>
                        </div>

                        <button
                            className="bg-[#B3A1CF]/50 font-suse font-semibold text-violet-700 text-purple py-[10px] px-[40px] rounded-[30px] border-4 border-[#E3A6D1]"
                            onClick={() => setCurrentStage(Stage.Promise)}
                        >
                            <Link to="/problemset" className="">
                                Let's go!~
                            </Link>
                        </button>
                    </>
                );
        }
    };

    useEffect(() => {
        if (!id) {
            setVerified(false);
            setVerifiedCertain(true);
        }
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
                setVerifiedCertain(true);
            })
            .catch((e: AxiosError) => {
                setVerified(false);
                setVerifiedCertain(true);
            });
    }, []);
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

            <div className="absolute flex flex-col items-center justify-center space-y-6 z-50 inset-0 mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default LandingPage;

import { API_URL } from "../App";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import girlImg from "../images/girlalone.png";
import girlSmiling from "../images/grl-smiling.png";
import grlHeart from "../images/heartgrl.png";

// Fix typo in enum
enum Stage {
    Introduction,
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
    const [currentStage, setCurrentStage] = useState<Stage>(Stage.Introduction);
    const [username, setUsername] = useState<string>("");
    const [goal, setGoal] = useState<string>("");

    // Access API_KEY and VOICE_ID from the environment variables
    const API_KEY = process.env.REACT_APP_API_KEY;
    const VOICE_ID = process.env.REACT_APP_VOICE_ID;

    // Function to make Lia speak
    const makeLiaSpeak = async (text: string) => {
        if (!API_KEY || !VOICE_ID) {
            console.error("Missing API key or Voice ID in environment variables");
            return;
        }

        // try {
        //     const response = await axios.post(
        //         `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        //         {
        //             text: text,
        //             voice_settings: {
        //                 stability: 0.25,
        //                 similarity_boost: 0.9,
        //             },
        //         },
        //         {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 "xi-api-key": API_KEY,
        //             },
        //             responseType: "arraybuffer", // Important to handle audio response
        //         }
        //     );

        //     const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
        //     const audioUrl = URL.createObjectURL(audioBlob);
        //     const audio = new Audio(audioUrl);

        //     // Play the audio only after user interaction (click)
        //     audio.play().catch((error) => {
        //         console.error("Audio playback failed:", error);
        //     });
        // } catch (error: any) {
        //     console.error("Error generating speech:", error);
        //     if (error.response) {
        //         console.error("Response data:", new TextDecoder().decode(error.response.data));
        //     }
        // }
    };

    // Render content based on the current stage
    const renderContent = () => {
        switch (currentStage) {
            case Stage.Introduction:
                return (
                    <>
                        <img src={girlImg} alt="Your anime wifu" className="h-[400px]" />
                        <p className="mt-0 mb-0 text-center text-black font-suse text-7xl">Code Senpai</p>
                        <p className="w-full mt-0 text-2xl text-center text-black font-suse">
                            Your personal GF that will get you a job and make you feel loved!
                        </p>
                        <button
                            className="bg-[#B3A1CF] font-suse text-black py-[10px] px-[40px] font-semibold rounded-[30px] border border-black"
                            onClick={() => {
                                setCurrentStage(Stage.Motivation);
                                makeLiaSpeak(
                                    "Hi, I’m Code-Senpai, but you can call me Lia! I want to be a Software Engineer and I love Leetcoding... but sometimes, it gets quite lonely... Hey! you look cute! Tell me about yourself!"
                                );
                            }}
                        >
                            Let's talk!
                        </button>
                    </>
                );
            case Stage.Motivation:
                return (
                    <>
                        <img src={girlSmiling} alt="Your anime wifu smiling" className="h-[350px]" />
                        <div className="bg-[#B3A1CF]/50 w-9/12 border-4 text-2xl border-[#E3A6D1] py-6 mb-0 font-suse text-violet-900 text-bold px-6">
                            <p>
                                Hi, I’m Code-Senpai, but you can call me Lia! I want to be a Software Engineer and I
                                love Leetcoding, but sometimes it gets quite lonely. <br /> Hey, you look cute! Tell me about
                                yourself!
                            </p>
                        </div>
                        <div className="w-9/12 ml-[20%]">
                            <p className="w-9/12 text-lg font-semibold text-violet-900 font-suse">
                                My name is
                                <input
                                    className="inline appearance-none border-2 w-40 py-2 px-3 mx-4 placeholder:text-text_2 bg-[#B3A1CF]/50 rounded leading-tight focus:outline-none focus:border-violet-600"
                                    type="text"
                                    placeholder="Handsome"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required={true}
                                />
                                and I want to learn more about
                                <input
                                    className="inline appearance-none border-2 w-40 py-2 px-3 mx-4 placeholder:text-text_2 bg-[#B3A1CF]/50 rounded leading-tight focus:outline-none focus:border-violet-600"
                                    type="text"
                                    placeholder="Hashmaps"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    required={true}
                                />
                            </p>
                        </div>
                        <button
                            className="bg-[#B3A1CF]/50 font-suse font-semibold text-violet-700 py-[10px] px-[40px] rounded-[30px] border-4 border-[#E3A6D1]"
                            onClick={() => {
                                setCurrentStage(Stage.Promise);
                                makeLiaSpeak(
                                    `Nice to meet you, ${username}. Let's go on a study date together! Solve more questions, earn points, and unlock exclusive experiences with me!`
                                );
                            }}
                        >
                            Next Step
                        </button>
                    </>
                );
            case Stage.Promise:
                return (
                    <>
                        <img src={grlHeart} alt="Your anime wifu showing hearts" className="h-[350px]" />
                        <div className="bg-[#B3A1CF]/50 w-9/12 border-4 text-2xl border-[#E3A6D1] py-6 mb-0 font-suse text-violet-900 text-bold px-6">
                            <p>
                                Nice to meet you, {username}. Let's go on a study date together! Solve more questions,
                                earn points, and unlock exclusive experiences with me!
                            </p>
                        </div>
                        <button
                            className="bg-[#B3A1CF]/50 font-suse font-semibold text-violet-700 py-[10px] px-[40px] rounded-[30px] border-4 border-[#E3A6D1]"
                        >
                            <Link to="/problemset">Let's go!~</Link>
                        </button>
                    </>
                );
        }
    };

    // Fetch user data from API (optional)
    useEffect(() => {
        if (id && token) {
            axios
                .get(`${API_URL}/api/accounts/id/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(({ data }) => {
                    setUsername(data.username);
                })
                .catch((err) => console.error("Error fetching user data:", err));
        }
    }, [id, token]);

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden absolute bg-white">
            <div className="">
                {/* Animated background elements */}
                <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-indigo-500 opacity-60 z-10"></div>
                <div className="absolute circle-2-animation top-[8%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-pink-500 opacity-60 z-10"></div>
                <div className="absolute circle-3-animation top-[10%] left-[45%] -translate-x-1/2 w-[400px] h-[300px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-yellow-200 opacity-60 z-10"></div>
                <div className="absolute circle-4-animation top-[10%] left-[50%] -translate-x-1/2 w-[200px] h-[200px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-red-200 opacity-60 z-10"></div>
                <div className="absolute top-[20%] left-[47%] -translate-x-1/2 w-[600px] h-[500px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-600 opacity-60 z-10"></div>
                <div className="absolute circle-7-animation top-[10%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full filter blur-[99px] bg-gradient-to-br from-transparent to-orange-800 opacity-60 z-10"></div>
            </div>

            {/* Main content */}
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center mx-auto space-y-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default LandingPage;

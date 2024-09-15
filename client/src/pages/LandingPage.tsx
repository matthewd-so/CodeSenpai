import axios from "axios";
import { useEffect, useState } from "react";

import { API_URL } from "../App";
import MainHeading from "../components/MainHeading";
import girlImg from "../images/girlalone.png";
import girlSmiling from "../images/grl-smiling.png";

enum Stage {
    Intorduction,
    Motivation,
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
    const [verified, setVerified] = useState<boolean>(false);
    const [verifiedCertain, setVerifiedCertain] = useState<boolean>(false);

    // Access API_KEY and VOICE_ID from the environment variables
    const API_KEY = process.env.REACT_APP_API_KEY;
    const VOICE_ID = process.env.REACT_APP_VOICE_ID;

    // Function to make Lia speak
    const makeLiaSpeak = async (text: string) => {
        if (!API_KEY || !VOICE_ID) {
            console.error("Missing API key or Voice ID in environment variables");
            return;
        }

        try {
            const response = await axios.post(
                `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
                {
                    text: text,
                    voice_settings: {
                        stability: 0.25,  // Lower stability for more expressive, anime-like voice
                        similarity_boost: 0.9,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xi-api-key': API_KEY,
                    },
                    responseType: 'arraybuffer', // Important to handle audio response
                }
            );
            
            // Create a Blob from the response and play it as audio
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play(); // Play the audio in the browser
        } catch (error) {
            console.error('Error generating speech:', error);
        }
    };

    // Make Lia speak when the user reaches the Motivation stage
    useEffect(() => {
        if (currentStage === Stage.Motivation) {
            makeLiaSpeak("Hi, I’m Lia! But you can call me Code-Senpai. I want to be a Software Engineer and I looove Leetcoding, but sometimes, it get's quite lonely... You look cute! Tell me about yourself!");
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
                            Let's meet!
                        </button>
                    </>
                );
            case Stage.Motivation:
                return (
                    <>
                        <img
                            src={girlSmiling}
                            alt="Your anime wifu smiling"
                            className="h-[400px]"
                        />
                        <div
                            className="bg-[#B3A1CF]/50 border-4 text-2xl  border-[#E3A6D1] py-6 mb-0 font-suse text-violet-900 text-bold
                       px-6 "
                        >
                            <p>
                                Hi, I’m Lia, but you can call me Code-Senpai! I
                                want to be a Software Engineer and I love
                                problem solving, but sometimes it get's lonely...
                                <br></br>You look cute! Tell me about yourself!
                            </p>
                        </div>
                        <p className="text-xl mb-4">
                            Let's start our coding journey together.
                        </p>

                        <button
                            className="bg-[#B3A1CF] font-suse text-purple py-[10px] px-[40px] rounded-[30px] border border-black"
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
                setVerified(true);
                setVerifiedCertain(true);
            })
            .catch((e) => {
                setVerified(false);
                setVerifiedCertain(true);
            });
    }, []);

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden absolute bg-white">
            {verifiedCertain && verified ? (
                <MainHeading
                    data={{
                        username: username,
                        status: "loggedin",
                    }}
                />
            ) : verifiedCertain === true && verified === false ? (
                <MainHeading
                    data={{
                        status: "not-loggedin",
                    }}
                />
            ) : (
                <MainHeading
                    data={{
                        status: "none",
                    }}
                />
            )}
            <div className="absolute flex flex-col items-center justify-center space-y-6 z-50 inset-0 mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default LandingPage;

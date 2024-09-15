import axios, { AxiosError } from "axios";

import { API_URL } from "../App";
import CustomNavbar from "../components/CustomNavbar";
import MainHeading from "../components/MainHeading";
import ProblemList from "../components/ProblemList";
import { TiHeart } from "react-icons/ti";
import beach from "../images/beach.jpg";
import coffee from "../images/coffee.jpg";
import hackathon from "../images/hackathon.jpg";
import karaoke from "../images/karaoke.jpg";
import resume from "../images/resume.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import vr from "../images/vr.jpg";

interface CardData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
}

const Shop = ({ token, id }: { token: string | null; id: string | null }) => {
    const [username, setUsername] = useState<string>("");
    const [money, setMoney] = useState<number>(0);
    const [verified, setVerified] = useState<boolean>(false);
    const navigate = useNavigate();

    const [cardData, setCardData] = useState<CardData[]>([
        {
            id: 1,
            title: "Resume Coffee Chat",
            description:
                "You and Lia take a cozy break from the bustling world to enjoy a coffee chat",
            imageUrl: coffee,
            price: 150,
        },
        {
            id: 2,
            title: "VR Date",
            description:
                "You and Lia take a peaceful walk through a scenic park and enjoy nature ",
            imageUrl: vr,
            price: 200,
        },
        {
            id: 3,
            title: "Mock Interview",
            description:
                "Prepare for the future together in this unique mock interview date with Lia",
            imageUrl: resume,
            price: 500,
        },
        {
            id: 4,
            title: "Karaoke Date",
            description:
                "Hit the karaoke lounge with Lia for a night of music and laughter! ",
            imageUrl: karaoke,
            price: 700,
        },
        {
            id: 5,
            title: "Beach Date",
            description:
                "Spend a relaxing day with Lia at a beautiful, sun-drenched beach",
            imageUrl: beach,
            price: 1000,
        },
        {
            id: 6,
            title: "Hackathon All-nighter",
            description:
                " you and your virtual girlfriend dive into the excitement of a hackathon all-nighter. Let's have a crazy night!",
            imageUrl: hackathon,
            price: 1500,
        },
        // Add more items as needed
    ]);

    const Card = ({ title, description, imageUrl, price }: CardData) => (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 transition-shadow duration-300 cursor-pointer hover:shadow-xl hover:shadow-gray-400">
            <img
                className="rounded-t-lg w-full  object-cover"
                src={imageUrl}
                alt={title}
            />
            <div className="p-5 bg-white">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700">{description}</p>
                <p className="mb-3 font-bold text-lg">
                    <TiHeart className="inline-block ml-1 text-3xl text-pink-400" />
                    {price}
                </p>
                <button className="inline-flex  items-center px-6 py-2 text-sm font-medium text-center text-violet-950 bg-[#E3A6D1] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#E3A6D1]] dark:hover:bg-[#E3A6D1] dark:focus:ring-[#E3A6D1]">
                    Buy Date
                </button>
            </div>
        </div>
    );

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
    }, []);

    return (
        <>
            {verified ? (
                <MainHeading data={{ username: username, money: money }} />
            ) : (
                <MainHeading data={{ status: "none" }} />
            )}

            <div className="min-h-[calc(100vh-60px)] bg-white text-black p-4">
                <h2 className="text-2xl font-semibold mb-6 pl-5 text-[#2F2D42] text-center">
                    Shop Expiriences and Items
                </h2>
                <div className="flex flex-wrap justify-center bg-white">
                    {cardData.map((card) => (
                        <Card key={card.id} {...card} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;

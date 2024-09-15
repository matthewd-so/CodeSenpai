import axios, { AxiosError } from "axios";

import { API_URL } from "../App";
import CustomNavbar from "../components/CustomNavbar";
import MainHeading from "../components/MainHeading";
import ProblemList from "../components/ProblemList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
            imageUrl: "/images/coding-tutorial.jpg",
            price: 150,
        },
        {
            id: 2,
            title: "VR Date",
            description:
                "You and Lia take a peaceful walk through a scenic park and enjoy nature ",
            imageUrl: "/images/algorithm-course.jpg",
            price: 200,
        },
        {
            id: 3,
            title: "Mock Interview",
            description:
                "Essential tools and resources for modern web development.",
            imageUrl: "/images/webdev-toolkit.jpg",
            price: 500,
        },
        {
            id: 4,
            title: "Karaoke Date",
            description:
                "Essential tools and resources for modern web development.",
            imageUrl: "/images/webdev-toolkit.jpg",
            price: 700,
        },
        {
            id: 5,
            title: "Beach Date",
            description:
                "Essential tools and resources for modern web development.",
            imageUrl: "/images/webdev-toolkit.jpg",
            price: 1000,
        },
        {
            id: 6,
            title: "Hackathon All-nighter",
            description:
                "Essential tools and resources for modern web development.",
            imageUrl: "/images/webdev-toolkit.jpg",
            price: 1500,
        },
        // Add more items as needed
    ]);

    const Card = ({ title, description, imageUrl, price }: CardData) => (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
            <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={imageUrl}
                alt={title}
            />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {description}
                </p>
                <p className="mb-3 font-bold text-lg">${price.toFixed(2)}</p>
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Buy Now
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
                <div className="flex flex-wrap justify-center">
                    {cardData.map((card) => (
                        <Card key={card.id} {...card} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;

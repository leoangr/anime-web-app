import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { Button, Modal } from 'antd';
import dayjs from "dayjs";

interface Detail {
    title: string;
    title_japanese: string;
    year: number;
    duration: string;
    streaming: StreamingItem[];
    trailer: {
        embed_url: string
    }
    synopsis: string;
    images: {
        webp: ImageFormat
    },
    score: number;
}

interface StreamingItem {
    name: string;
    url: string;
}

interface ImageFormat {
    large_image_url: string;
    image_url: string
}

interface Statistics {
    watching: number;
}

interface Reviews {
    review: string;
    user: UserItem;
    date: string;
    score: number;
}

interface UserItem {
    images: {
        webp: ImageFormat
    }
    username: string
}

export const CardDetailLeft = () => {

    let { id_mal } = useParams()
    const endpoint = "https://api.jikan.moe/v4"
    const [detail, setDetail] = useState<Detail | null>(null);

    const [statistics, setStatistics] = useState<Statistics | null>(null)
    const [reviews, setReviews] = useState<Reviews[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchAnimeByID = async () => {
        try {
            
            const response = await fetch(`${endpoint}/anime/${id_mal}/full`)
            const data = await response.json()

            if (data.data) {
                setDetail(data.data)
            } else {
                setDetail(null)
            }

            
        } catch (error) {
            
        }
    }

    const fetchStatistics = async () => {
        try {
            
            const response = await fetch(`${endpoint}/anime/${id_mal}/statistics`)
            const data = await response.json()

            if (data.data) {
                setStatistics(data.data)
            } else {
                setStatistics(null)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const fetchReviews = async () => {
        try {
            
            const response = await fetch(`${endpoint}/anime/${id_mal}/reviews`)
            const data = await response.json()
            
            if (data.data && data.data.length > 0) {
                setReviews(data.data)
            } else {
                setReviews([])
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAnimeByID();
    }, []);

    useEffect(() => {
        fetchStatistics()
        fetchReviews()
    }, [])

    return (
        <div className="card-left-detail">
            <div className="box-poster">
                <img src={detail?.images?.webp.large_image_url} alt="naruto" />
            </div>
            <div className="flex flex-col mt-[1rem] gap-4">
                <div className="detail-info-other left">
                    <p>
                        {reviews.length} reviews
                        <span>•</span>
                    </p>
                    <p>
                        {detail?.score || 0} ratings
                        <span>•</span>
                    </p>
                    <p>{statistics?.watching.toLocaleString() || 0} views</p>
                </div>
                <Button className="btn-reviews" onClick={showModal}>
                    View Reviews
                </Button>
                <Modal
                    title="Reviews"
                    className="box-review"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}
                >
                    <div className="data-box-review">
                        {reviews.map((item) => (
                            <div className="flex gap-[11px]">
                                <img
                                className="min-w-[30px] h-[30px] object-cover rounded-full"
                                src={item.user.images.webp.image_url} alt="user icon" />
                                <div className="flex flex-col">
                                    <p className="text-[12.5px] font-semibold ">{item.user.username}</p>
                                    <div className="flex items-center gap-[5px]">
                                        <p className="text-[12px] text-gray-500">{dayjs(item.date).format("YYYY-MM-DD HH:mm")} | </p>
                                        <span className="flex gap-[2px] items-center text-[12px] text-gray-500 ">
                                            Score {item.score}
                                        </span>
                                    </div>
                                    <article className="text-review">{item.review}</article>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal>
            </div>
        </div>
    )
}
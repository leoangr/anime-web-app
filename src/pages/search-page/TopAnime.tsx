import { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { Link } from "react-router";


interface Anime {
    mal_id: number;
    title: string;
    images: {
        webp: ImageFormat;
    }
}

interface ImageFormat {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export const TopAnime = () => {
    const [topAnime, setTopAnime] = useState<Anime[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const endpoint = "https://api.jikan.moe/v4"

    const fetchTopAnime = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${endpoint}/top/anime`);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setTopAnime(data.data);
                setIsLoading(false);
            } else {
                console.error("No top anime data available");
            }

        } catch (error) {
            console.error("Failed to fetch top anime:", error);
        }
    }

    const slugTitle = (title: string): string => {
        return title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')    
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
    }

    useEffect(() => {
        fetchTopAnime()
    }, [])

    const limitedTopAnime = topAnime.slice(0, 10)

    return (
        <section>
            <div className="box-content">
                {isLoading ?
                        <Spinner />
                    :
                <div className="flex flex-col gap-[1.2rem]">
                    <h2 className="sub-tag scroll-slide">Top Anime</h2>
                    <div className="list-slide scroll-slide">
                        {limitedTopAnime.map((item) => {

                            return (
                                <Link to={`detail/${item.mal_id}/${slugTitle(item.title)}`}
                                key={item.mal_id}
                                className="card-anime">
                                    <img
                                        className="image-popular"
                                        src={item.images.webp.large_image_url}
                                        alt={item.title}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
                }
            </div>
        </section>
    )
}
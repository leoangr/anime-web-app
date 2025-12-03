import { useParams } from "react-router"
import { useEffect, useState } from "react";

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
    genres: GenreItem[]
}

interface StreamingItem {
    name: string;
    url: string;
}

interface ImageFormat {
    large_image_url: string;
}

interface Pictures {
    webp: ImageFormat
}

interface GenreItem {
    name: string
}

export const CardDetailRight = () => {

    let { id_mal } = useParams()
    const endpoint = "https://api.jikan.moe/v4"
    const [detail, setDetail] = useState<Detail | null>(null);
    const [pictures, setPictures] = useState<Pictures[]>([])

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

    const fetchPicturesByID = async () => {
        try {
            
            const response = await fetch(`${endpoint}/anime/${id_mal}/pictures`)
            const data = await response.json()

            if (data.data && data.data.length > 0) {
                setPictures(data.data)
            } else {
                setPictures([])
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAnimeByID();
        fetchPicturesByID()
    }, []);
    
    return (
        <div className="card-right-detail">
            <h1 className="title-detail">{detail?.title}</h1>
            <div className="detail-info-other">
                <p>
                    {detail?.title_japanese}
                    <span>•</span>
                </p>
                <p>
                    {detail?.year}
                    <span>•</span>
                </p>
                <p>{detail?.duration}</p>
            </div>
            {detail?.streaming &&
                <div className="watch-btn">
                    {detail?.streaming?.map((item) => (
                        <a
                            key={item.name}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="stream-btn"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            }
            {detail?.trailer?.embed_url &&
                <div className="box-trailer">
                    <h4 className="tag-info">Trailer</h4>
                    <iframe
                        src={detail?.trailer?.embed_url}
                    ></iframe>
                </div>
            }
            <div className="box-desc">
                <h4 className="tag-info">Synopsis</h4>
                <p className="desc-detail">
                    {detail?.synopsis}
                </p>
            </div>
            <div className="box-genres">
                <h4 className="tag-info">Genres</h4>
                <div className="list-genres">
                    {detail?.genres.map((item, index) => (
                        <span key={index} className="text-white">{item.name}</span>
                    ))}
                </div>
            </div>
            <div className="comp-image">
                {pictures.map((item, index) => (
                    <img key={index} src={item.webp.large_image_url} alt="anime picture" loading="lazy" />
                ))}
            </div>
        </div>
    )
}
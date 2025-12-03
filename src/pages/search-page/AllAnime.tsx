import { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { useSearchQuery } from "../../store/searchStore";
import { useDebounce } from "react-use";
import { Link } from "react-router";


interface Anime {
    mal_id: number;
    title: string;
    images: {
        webp: ImageFormat;
    }
    year: number;
}

interface ImageFormat {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export const AllAnime = () => {
    const [allAnime, setAllAnime] = useState<Anime[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const query = useSearchQuery((state) => state.query);
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);

    useDebounce(() => setDebouncedQuery(query), 1000, [query])


    const fetchAllAnime = async (query = '', page = 1) => {

        setIsLoading(true)
        setErrorMessage('')
        setAllAnime([])

        try {

            const endpoint = query
            ? `https://api.jikan.moe/v4/anime?q=${query}&page=${page}`
            : `https://api.jikan.moe/v4/anime?page=${page}`;

            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setAllAnime(data.data);
                setCurrentPage(data.pagination.current_page)
                setTotalPages(data.pagination.last_visible_page)
            } else if (response.status === 429) {
                setErrorMessage("Too many request, please refresh the page")
            } else {
                setAllAnime([]);
                setErrorMessage("Anime Not Found")
                console.error("Anime Not Found");
            }

        } catch (error) {
            setAllAnime([]);
            setErrorMessage("Something Error, please refresh the page")
            console.error("Something Error, please refresh the page", error);
        } finally {
            setIsLoading(false);
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
        fetchAllAnime(debouncedQuery, currentPage);
    }, [currentPage])

    useEffect(() => {
        setCurrentPage(1);
        fetchAllAnime(debouncedQuery, 1)
    }, [debouncedQuery])

    return (
        <section className="mt-[4rem]" id="all-anime">
            <div className="box-content">
                {isLoading ?
                    <Spinner />
                    : allAnime.length === 0 ?
                    <p className="not-found">{errorMessage}</p>
                    :
                    <div className="flex flex-col gap-[1.2rem]">
                        <h2 className="sub-tag scroll-slide">All Anime</h2>
                        <div className="all-anime">
                            {allAnime.map((item) => {

                                return (
                                    <Link to={`detail/${item.mal_id}/${slugTitle(item.title)}`}
                                        key={item.mal_id}
                                        className="card-anime-all scroll-slide">
                                        <img
                                            className="image-all-anime"
                                            src={item.images.webp.large_image_url}
                                            alt={item.title}
                                        />
                                        <p className="title-all-anime">{item.title} {item.year ? `- ${item.year}` : ""}</p>
                                    </Link>
                                )
                            })}
                        </div>
                        {totalPages > 1 && (
                            <div className="box-pagination">
                                <button
                                className="button-pagination"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev -1, 1))}
                                >
                                Prev
                                </button>
                                <span className="text-white">
                                    {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
                                </span>
                                <button
                                className="button-pagination"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                >Next</button>
                            </div>
                        )}
                    </div>
                }
            </div>
        </section>
    )
}
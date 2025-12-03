import { IoSearchOutline } from "react-icons/io5";
import { useSearchQuery } from "../../store/searchStore";
import { useRef } from "react";

export const SearchForm = () => {

    const { query, setQuery } = useSearchQuery()
    const inputRef = useRef<HTMLInputElement | null>(null);


    return (
        <section className="box-search">
            <div>
                <div className="box-content flex flex-col">
                    <h1 className="tagline auto-slide">Search <span>Your</span> Favorite <span>Anime</span> Here</h1>
                    <form 
                    onSubmit={(e) => {
                        e.preventDefault();
                        inputRef.current?.blur();
                        const section = document.querySelector("#all-anime");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}>
                    <div className="input-search auto-slide">
                        <IoSearchOutline
                        size={24}
                        />
                            <input
                            ref={inputRef}
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            enterKeyHint="search"
                            id="search-anime"
                            placeholder="search here" />
                    </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
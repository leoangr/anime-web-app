// import { Header } from "../../components/Header"
import { AllAnime } from "./AllAnime"
import { SearchForm } from "./SearchForm"
import { TopAnime } from "./TopAnime"

const SearchPage = () => {

    return (
        <main className="container">
            <div className="pattern" />
            <SearchForm />
            <TopAnime />
            <AllAnime />
        </main>
    )
}

export default SearchPage
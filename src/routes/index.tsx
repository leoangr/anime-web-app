import { Routes, Route } from "react-router";
import SearchPage from "../pages/search-page";
import Detail from "../pages/detail-page";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="detail/:id_mal/:slug" element={<Detail />}></Route>
        </Routes>
    )
}

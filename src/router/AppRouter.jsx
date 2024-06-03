import { Navigate, Route, Routes } from "react-router-dom"
import { Layout, Navbar } from "../components"
import { Main ,Graphic,Simplex} from "../pages"

const AppRouter = () => {
    return (
        <>
            {/* <Navbar /> */}
            {/* <Layout> */}
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/graphic" element={<Graphic />} />
                    <Route path="/simplex" element={<Simplex />} />
                </Routes>
            {/* </Layout> */}
        </>
    )
}

export default AppRouter
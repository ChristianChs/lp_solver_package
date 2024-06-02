import { Navigate, Route, Routes } from "react-router-dom"
import { Layout, Navbar } from "../components"
import {GraphicMethod,Principal, SimplexMethod} from "../pages"
import { Main } from "../pages/Main"
import { Graphic } from "../pages/Graphic"
import { Simplex } from "../pages/Simplex"

const AppRouter = () => {
    return (
        <>
            {/* <Navbar /> */}
            {/* <Layout> */}
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="graphic-method" element={<GraphicMethod />} />
                    <Route path="simplex-method" element={<SimplexMethod />} />
                    <Route path="graphic" element={<Graphic />} />
                    <Route path="simplex" element={<Simplex />} />
                </Routes>
            {/* </Layout> */}
        </>
    )
}

export default AppRouter
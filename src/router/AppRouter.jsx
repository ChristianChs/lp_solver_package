import { Navigate, Route, Routes } from "react-router-dom"
import { Layout, Navbar } from "../components"
import {GraphicMethod,Principal, SimplexMethod} from "../pages"

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="home" element={<Principal />} />
                    <Route path="graphic-method" element={<GraphicMethod />} />
                    <Route path="simplex-method" element={<SimplexMethod />} />
                </Routes>
            </Layout>
        </>
    )
}

export default AppRouter
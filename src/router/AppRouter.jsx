import { Navigate, Route, Routes } from "react-router-dom"
import Principal from "../pages/Principal"
import { Layout, Navbar } from "../components"

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="home" element={<Principal />} />

                </Routes>
            </Layout>
        </>
    )
}

export default AppRouter
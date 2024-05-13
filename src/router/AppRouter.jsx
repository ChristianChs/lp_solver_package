import { Navigate, Route, Routes } from "react-router-dom"
import Principal from "../pages/Principal"
import Navbar from "../components/Navbar"

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="home" element={<Principal />} />

            </Routes>
        </>
    )
}

export default AppRouter
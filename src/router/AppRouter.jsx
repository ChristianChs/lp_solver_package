import { Navigate, Route, Routes } from "react-router-dom"
import Principal from "../pages/Principal"

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="home" element={<Principal/>} />
                
            </Routes>
        </>
    )
}

export default AppRouter
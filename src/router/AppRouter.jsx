import { Navigate, Route, Routes } from "react-router-dom"
import { Layout, Navbar } from "../components"
import { Main ,Graphic,Simplex} from "../pages"
import { TransportNorthwestCorner } from "../pages/TransportNorthwestCorner2"
import { TransportMinimumCost } from "../pages/TransportMinimumCost"
import { CPM } from "../pages/CPM"
import { PERT } from "../pages/PERT"

const AppRouter = () => {
    return (
        <>
            {/* <Navbar /> */}
            {/* <Layout> */}
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/graphic" element={<Graphic />} />
                    <Route path="/simplex" element={<Simplex />} />
                    <Route path="/transporte-noroeste" element={<TransportNorthwestCorner />} />
                    <Route path="/transporte-costominimo" element={<TransportMinimumCost />} />
                    <Route path="/critical-route" element={<CPM />} />
                    <Route path="/pert" element={<PERT />} />
                </Routes>
            {/* </Layout> */}
        </>
    )
}

export default AppRouter
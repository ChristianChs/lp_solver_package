import { Navigate, Route, Routes } from "react-router-dom"
import { Main,Graphic,Simplex,TransportMinimumCost,TransportNorthwestCorner,TransportVogel,CPM,PERT } from "../pages/index";

const AppRouter = () => {
    return (
        <>
            {/* <Navbar /> */}
            {/* <Layout> */}
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/graphic" element={<Graphic />} />
                    <Route path="/simplex" element={<Simplex />} />
                    <Route path="/northwest-corner" element={<TransportNorthwestCorner />} />
                    <Route path="/least-cost" element={<TransportMinimumCost />} />
                    <Route path="/vogel" element={<TransportVogel />} />
                    <Route path="/critical-route" element={<CPM />} />
                    <Route path="/pert" element={<PERT />} />
                </Routes>
            {/* </Layout> */}
        </>
    )
}

export default AppRouter
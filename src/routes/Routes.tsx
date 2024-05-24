import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../components/pages/index"

const RoutesPage = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    )
}

export default RoutesPage
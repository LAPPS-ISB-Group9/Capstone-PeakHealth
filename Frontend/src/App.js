import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Assessment from "./components/Assesment";
import Results from "./components/Results";
import ComparisonBox from "./components/Comparison";
import VideoRecommendations from "./components/Video";
import VideoRecommendationHighB from "./components/Videos_HB";
import ThankYou from "./components/Thankyou";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import ParentComponent from "./components/ParentComponent";
import SignUpPage from "./components/SignupPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') !== null);

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="assesment" element={<Assessment/>}></Route>
          {/* <Route path="results" element={<Results />}></Route> */}
          <Route path="/results/:sectionTotals" element={<Results />} />
          <Route path="compare" element={<ComparisonBox/>}></Route>
          <Route path="videos" element={<VideoRecommendations/>}></Route>
          <Route path="videoshigh" element={<VideoRecommendationHighB/>}></Route>
          <Route path="thankyou" element={<ThankYou/>}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          {/* <Route path="signup" element={<SignUpPage />} /> */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="par" element={<ParentComponent />} />
          <Route path="signup" element={<SignUpPage />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

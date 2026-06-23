import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Generate from "./pages/Generate";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AuroraBackground from "./components/AuroraBackground";
import { ToastProvider } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuroraBackground>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuroraBackground>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;

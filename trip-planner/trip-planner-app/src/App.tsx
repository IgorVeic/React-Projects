import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import NotFound from "./components/NotFound";
import TripPlanPage from "./components/TripPlanPage";
import PlannedTripsPage from "./components/planned-trips-page/PlannedTripsPage";
import TripFormPage from "./components/TripFormPage";
import FavoritePage from "./components/FavoritePage ";
import { CountryProvider } from "./contexts/CountryContext";
import { TripPlanProvider } from "./contexts/TripPlanContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";

const App = () => {
  const location = useLocation();

  const shouldRenderNavbar = () => {
    const noNavbarPaths = ["/404"];
    return (
      !noNavbarPaths.includes(location.pathname) &&
      !(location.state && location.state.hideNavbar)
    );
  };

  return (
    <CountryProvider>
      <TripPlanProvider>
        <FavoriteProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            {shouldRenderNavbar() && <Navbar />}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<MainPage page="Home" />} />
                <Route path="/asia" element={<MainPage page="Asia" />} />
                <Route path="/europe" element={<MainPage page="Europe" />} />
                <Route path="/africa" element={<MainPage page="Africa" />} />
                <Route
                  path="/americas"
                  element={<MainPage page="Americas" />}
                />
                <Route path="/oceania" element={<MainPage page="Oceania" />} />
                <Route path="/trip-plan" element={<TripPlanPage />} />
                <Route path="/planned-trips" element={<PlannedTripsPage />} />
                <Route path="/trip-form" element={<TripFormPage />} />
                <Route path="/favorites" element={<FavoritePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FavoriteProvider>
      </TripPlanProvider>
    </CountryProvider>
  );
};

export default App;

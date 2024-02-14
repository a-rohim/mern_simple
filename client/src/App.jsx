import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import TripList from "./pages/TripList.jsx";
import WishList from "./pages/WishList.jsx";
import PropertyList from "./pages/PropertyList.jsx";
import ReservationList from "./pages/ReservationList.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
export const server_Url = import.meta.env.VITE_HOST

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Page404 } from "./Page404";
import { Profile } from "./Profile";
import { PrivateRoute } from "../components/Auxiliary/PrivateRoute";
import { Hotels } from "./Hotels";
import { HotelPage } from "../components/Hotels/HotelPage";
import { ForOwners } from "./ForOwners";
import { OwnersHotels } from "./OwnersHotels";
import { HotelRequests } from "../components/ForOwners/HotelRequests";
import { UserNotifications } from "../components/Notifications/UserNotifications";
import { Wishlists } from "./Wishlists";
import { WishlistPage } from "../components/Wishlist/WishlistPage";
import { Register } from "./Register";
import { Login } from "./Login";
import { Main } from "./Main";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/signup"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/hotels" element={<Hotels />} />
      <Route
        path="/hotels/:location/:arrival/:departure/:number"
        element={<Hotels />}
      />
      <Route path="/hotels/hotel/:hotelId" element={<HotelPage />} />
      <Route
        path="/for-owners"
        element={
          <PrivateRoute>
            <ForOwners />
          </PrivateRoute>
        }
      />
      <Route
        path="/for-owners/hotels"
        element={
          <PrivateRoute>
            <OwnersHotels />
          </PrivateRoute>
        }
      />
      <Route
        path="/for-owners/hotels/:hotelId/requests"
        element={
          <PrivateRoute>
            <HotelRequests />
          </PrivateRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <UserNotifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlists"
        element={
          <PrivateRoute>
            <Wishlists />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlists/wishlist/:wishlistName"
        element={
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

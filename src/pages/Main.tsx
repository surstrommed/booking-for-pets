import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page404 from "./Page404";
import { Profile } from "./Profile";
import { PrivateRoute } from "./../components/Auxiliary/PrivateRoute";
import { Hotels } from "./Hotels";
import { HotelPage } from "./../components/Hotels/HotelPage";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { useSelector } from "react-redux";
import { RootState } from "../helpers/types";
import { ForOwners } from "./ForOwners";
import { OwnersHotels } from "./OwnersHotels";
import { HotelRequests } from "../components/ForOwners/HotelRequests";
import { UserNotifications } from "../components/Notifications/UserNotifications";
import { Wishlists } from "./Wishlists";
import { WishlistPage } from "./../components/Wishlist/WishlistPage";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

export const MainPage = () => {
  return (
    <div className="Main">
      <div className="Top">
        <div className="MainImageBoard">
          <img
            src="https://i.ibb.co/qyX9783/febvuibvbi3v.jpg"
            alt="Main image board"
          />
        </div>
      </div>
    </div>
  );
};

export const Main = () => {
  const promise = useSelector((state: RootState) => state.promise);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
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
      <Route
        path="/hotels"
        element={
          <PrivateRoute>
            <Hotels />
          </PrivateRoute>
        }
      />
      <Route
        path="/hotels/:location/:arrival/:departure/:number"
        element={<Hotels />}
      />
      <Route
        path="/hotels/hotel/:hotelId"
        element={
          <Preloader
            promiseName={"getHotels"}
            promiseState={promise}
            sub={<HotelPage />}
          />
        }
      />
      <Route
        path="/for-owners"
        element={
          <Preloader
            promiseName={"getHotels"}
            promiseState={promise}
            sub={
              <PrivateRoute>
                <ForOwners />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/for-owners/hotels"
        element={
          <Preloader
            promiseName={"getHotels"}
            promiseState={promise}
            sub={
              <PrivateRoute>
                <OwnersHotels />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/for-owners/hotels/:hotelId/requests"
        element={
          <Preloader
            promiseName={"getHotels"}
            promiseState={promise}
            sub={
              <PrivateRoute>
                <HotelRequests />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/notifications"
        element={
          <Preloader
            promiseName={"getNotifications"}
            promiseState={promise}
            sub={
              <PrivateRoute>
                <UserNotifications />
              </PrivateRoute>
            }
          />
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
          <Preloader
            promiseName={"signin"}
            promiseState={promise}
            sub={
              <PrivateRoute>
                <WishlistPage />
              </PrivateRoute>
            }
          />
        }
      />
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

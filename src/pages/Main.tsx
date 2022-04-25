import React from "react";
import { Routes, Route } from "react-router-dom";
import Page404 from "./Page404";
import { CProfile } from "./Profile";
import { PrivateRoute } from "./../components/Auxiliary/PrivateRoute";
import { CHotels } from "./Hotels";
import { CHotelPage } from "./../components/Hotels/HotelPage";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../helpers/types";
import { CForOwners } from "./ForOwners";
import { COwnersHotels } from "./OwnersHotels";
import { CHotelRequests } from "../components/ForOwners/HotelRequests";
import { CUserNotifications } from "../components/Notifications/UserNotifications";
import { CWishlists } from "./Wishlists";
import { CWishlistPage } from "./../components/Wishlist/WishlistPage";
import { CRegister } from "../pages/Register";
import { CLogin } from "../pages/Login";

function MainPage() {
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
}

const Main = ({ promise }) => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/signup"
        element={
          <PrivateRoute>
            <CRegister />
          </PrivateRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <PrivateRoute>
            <CLogin />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <CProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/hotels"
        element={
          <PrivateRoute>
            <CHotels />
          </PrivateRoute>
        }
      />
      <Route
        path="/hotels/:location/:arrival/:departure/:number"
        element={<CHotels />}
      />
      <Route
        path="/hotels/hotel/:hotelId"
        element={
          <Preloader
            promiseName={"getHotels"}
            promiseState={promise}
            sub={<CHotelPage />}
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
                <CForOwners />
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
                <COwnersHotels />
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
                <CHotelRequests />
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
                <CUserNotifications />
              </PrivateRoute>
            }
          />
        }
      />
      <Route
        path="/wishlists"
        element={
          <PrivateRoute>
            <CWishlists />
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
                <CWishlistPage />
              </PrivateRoute>
            }
          />
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export const CMain = connect((state: RootState) => ({
  promise: state.promise,
}))(Main);

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../helpers/types";
import {
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton,
  Badge,
} from "@mui/material";
import { pagesStyles } from "./pagesStyles";
import { truncText } from "../helpers/functions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InboxIcon from "@mui/icons-material/Inbox";
import { actionFullHotelDelete as onHotelDelete } from "../actions/thunks";
import { FullWindowHotelEditing } from "../components/ForOwners/FullWindowHotelEditing";
import useSnackBar from "../components/Auxiliary/SnackBar";
import { Preloader } from "../components/Auxiliary/Preloader";
import { links } from "../helpers/consts";
import {
  HotelModel,
  CurrencyModel,
  UserRequestModel,
} from "../server/api/api-models";
import {
  RESOLVED_PROMISE_STATUS,
  DELETED_HOTEL,
  PENDING_REQUEST_MESSAGE,
} from "../helpers/consts";
import { useNavigate } from "react-router-dom";

export const OwnersHotels = () => {
  const promise = useSelector((state: RootState) => state.promise);
  const auth = useSelector((state: RootState) => state.auth);
  const currencyList = useSelector((state: RootState) => state.currencyList);
  const navigate = useNavigate();

  const [openEditingDialogId, setOpenEditingDialogId] = useState<
    string | number
  >(0);

  const [, sendSnackbar] = useSnackBar();

  const { payload: allHotels } = promise.getHotels || [];

  const currentUserHotels = allHotels?.filter(
    (hotel: HotelModel) => hotel.owner === auth.payload.id && hotel.owner !== 0
  );

  const currentCurrency = (currencyList?.currency || []).find(
    (currency: CurrencyModel) => auth?.payload?.currencyId === currency?.id
  );

  function handleDelete(hotelId: string) {
    onHotelDelete(hotelId);
  }

  function updateEditingDialogStatusId(value: string | number) {
    setOpenEditingDialogId(value);
  }

  function sendDeletedMessage() {
    promise.hotelDelete.status === RESOLVED_PROMISE_STATUS &&
      typeof sendSnackbar === "function" &&
      sendSnackbar({
        msg: DELETED_HOTEL,
        variant: "error",
      });
  }

  return (
    <div style={{ padding: "5vh" }}>
      <Typography variant="h3" gutterBottom component="div">
        Your hotels
      </Typography>
      {currentUserHotels.length === 0 ? (
        <Typography variant="h6" component="div" gutterBottom>
          You have no hotels created yet
        </Typography>
      ) : (
        currentUserHotels.map((hotel: HotelModel, index: number) => (
          <div key={index}>
            {openEditingDialogId !== 0 && (
              <Preloader
                promiseName={"hotelUpdate"}
                promiseState={promise}
                sub={
                  <FullWindowHotelEditing
                    updateOpenDialogStatus={updateEditingDialogStatusId}
                    hotelId={openEditingDialogId}
                  />
                }
              />
            )}
            <Card sx={pagesStyles.ownersHotels.hotelCard}>
              <CardMedia
                component="img"
                sx={pagesStyles.ownersHotels.width100}
                image={hotel.photos[0] || links.noImage}
                alt={hotel.name}
              />
              <CardActionArea
                onClick={() => navigate(`/hotels/hotel/${hotel.id}`)}
              >
                <Typography variant="h6" display="block" gutterBottom>
                  &nbsp;&nbsp;&nbsp;{hotel.name}
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  &nbsp;&nbsp;&nbsp;{truncText(hotel.description, 40)}
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  &nbsp;&nbsp;&nbsp;{currentCurrency?.sign}
                  {Math.round(
                    +(
                      hotel.price *
                      currencyList.exchangeList[currentCurrency.name]
                    ).toFixed(1)
                  )}
                </Typography>
              </CardActionArea>
              <CardActions>
                <IconButton
                  color="secondary"
                  onClick={() => setOpenEditingDialogId(hotel.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    sendDeletedMessage();
                    handleDelete(hotel.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() =>
                    navigate(`/for-owners/hotels/${hotel.id}/requests`)
                  }
                >
                  {hotel?.userRequests?.filter(
                    (request: UserRequestModel) =>
                      request.status === PENDING_REQUEST_MESSAGE
                  )?.length > 0 ? (
                    <Badge
                      badgeContent={
                        hotel.userRequests.filter(
                          (request: UserRequestModel) =>
                            request.status === PENDING_REQUEST_MESSAGE
                        ).length
                      }
                      color="warning"
                    >
                      <InboxIcon />
                    </Badge>
                  ) : (
                    <InboxIcon />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

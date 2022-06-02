import React, { useState } from "react";
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
import { formateUser, truncText } from "../helpers/functions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InboxIcon from "@mui/icons-material/Inbox";
import { FullWindowHotelEditing } from "../components/ForOwners/FullWindowHotelEditing";
import useSnackBar from "../components/Auxiliary/SnackBar";
import { Preloader } from "../components/Auxiliary/Preloader";
import { links, siteCurrencyList } from "../helpers/consts";
import {
  HotelModel,
  CurrencyModel,
  UserRequestModel,
} from "../server/api/api-models";
import { DELETED_HOTEL, PENDING_REQUEST_MESSAGE } from "../helpers/consts";
import { useNavigate } from "react-router-dom";
import { hotelAPI } from "../store/reducers/HotelService";
import { currencyAPI } from "../store/reducers/CurrencyService";

export const OwnersHotels = () => {
  const currentUser = formateUser();

  const navigate = useNavigate();

  const [openEditingDialogId, setOpenEditingDialogId] = useState("");

  const [, sendSnackbar] = useSnackBar();

  const {
    data: currencyList,
    error: currencyError,
    isLoading: currencyLoading,
  } = currencyAPI.useFetchAllCurrencyQuery("");

  const [
    deleteHotel,
    { isLoading: deleteHotelLoading, error: deleteHotelError },
  ] = hotelAPI.useDeleteHotelMutation();

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const currentUserHotels = (allHotels || []).filter(
    (hotel: HotelModel) => hotel?.owner === currentUser?.id
  );

  const currentCurrency = (siteCurrencyList || []).find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
  );

  const handleHotelDelete = async (hotelId: string) => {
    await deleteHotel(hotelId);

    typeof sendSnackbar === "function" &&
      deleteHotelError?.data &&
      sendSnackbar({
        msg: DELETED_HOTEL,
        variant: "error",
      });
  };

  const updateEditingDialogStatusId = (value: string) => {
    setOpenEditingDialogId(value);
  };

  return (
    <Preloader
      isLoading={deleteHotelLoading || currencyLoading || hotelsLoading}
      error={deleteHotelError?.data || currencyError?.data || hotelsError?.data}
    >
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
              {!!openEditingDialogId?.length && (
                <FullWindowHotelEditing
                  updateOpenDialogStatus={updateEditingDialogStatusId}
                  hotelId={openEditingDialogId}
                />
              )}
              <Card sx={pagesStyles.ownersHotels.hotelCard}>
                <CardMedia
                  component="img"
                  sx={pagesStyles.ownersHotels.width100}
                  image={hotel?.photos?.[0] || links.noImage}
                  alt={hotel?.name}
                />
                <CardActionArea
                  onClick={() => navigate(`/hotels/hotel/${hotel?.id}`)}
                >
                  <Typography variant="h6" display="block" gutterBottom>
                    &nbsp;&nbsp;&nbsp;{hotel?.name}
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    &nbsp;&nbsp;&nbsp;{truncText(hotel?.description, 40)}
                  </Typography>
                  <Typography variant="body2" display="block" gutterBottom>
                    &nbsp;&nbsp;&nbsp;{currentCurrency?.sign}
                    {Math.round(
                      +(
                        hotel?.price *
                        currencyList?.rates[currentCurrency?.name]
                      ).toFixed(1)
                    )}
                  </Typography>
                </CardActionArea>
                <CardActions>
                  <IconButton
                    color="secondary"
                    onClick={() => setOpenEditingDialogId(hotel?.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleHotelDelete(hotel?.id)}
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
    </Preloader>
  );
};

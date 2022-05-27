import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { RootState } from "../../helpers/types";
import { UserRequestModel, UserModel } from "../../server/api/api-models";
import { useSelector } from "react-redux";
import { forOwnersStyles } from "./forOwnersStyles";
import { formatStringDate } from "../../helpers/functions";
import { links } from "../../helpers/consts";
import {
  PENDING_REQUEST_MESSAGE,
  CONFIRMED_REQUEST_MESSAGE,
  REJECTED_REQUEST_MESSAGE,
} from "../../helpers/consts";
import { useNavigate } from "react-router-dom";

export const RequestsTab = ({
  type,
  openNotificationModalWindow,
  currentHotel,
}) => {
  const promise = useSelector((state: RootState) => state.promise);
  const { payload: allUsers } = promise.getUsers || [];

  const navigate = useNavigate();

  return (
    <>
      {currentHotel?.userRequests?.filter(
        (request: UserRequestModel) => request.status === type
      )?.length > 0 ? (
        <Box sx={forOwnersStyles.flex}>
          {currentHotel?.userRequests
            ?.filter((request: UserRequestModel) => request.status === type)
            .map((request: UserRequestModel, index: number) => {
              const requestOwner = (allUsers || []).find(
                (user: UserModel) => user.id === request.usersId
              );
              return (
                <Card sx={forOwnersStyles.requestCard} key={index}>
                  <CardActionArea
                    onClick={() => navigate(`/users/${request.usersId}`)}
                  >
                    <CardMedia
                      component="img"
                      image={requestOwner?.pictureUrl || links.noAvatar}
                      alt={`${requestOwner?.firstName} ${requestOwner?.lastName}`}
                      sx={forOwnersStyles.requestCardMedia}
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Name:{" "}
                        <b>
                          {requestOwner?.firstName} {requestOwner?.lastName}
                        </b>
                      </Typography>
                      <Typography variant="body2">
                        Arrival date:{" "}
                        <b>{formatStringDate(request.arrivalDate)}</b>
                      </Typography>
                      <Typography variant="body2">
                        Departure date:{" "}
                        <b>{formatStringDate(request.departureDate)}</b>
                      </Typography>
                      <Typography variant="body2">
                        Number of seats: <b>{request.animalsNumber}</b>
                      </Typography>
                      <Typography variant="body2">
                        Message:{" "}
                        {request.message.length > 10 ? (
                          <Tooltip
                            title={`${request.message}`}
                            placement="right"
                          >
                            <span style={forOwnersStyles.underline}>
                              Hover to read
                            </span>
                          </Tooltip>
                        ) : (
                          request.message
                        )}
                      </Typography>
                      <Typography variant="body2">
                        Status:{" "}
                        <b
                          style={
                            type === PENDING_REQUEST_MESSAGE
                              ? forOwnersStyles.orangeColor
                              : type === CONFIRMED_REQUEST_MESSAGE
                              ? forOwnersStyles.greenColor
                              : type === REJECTED_REQUEST_MESSAGE
                              ? forOwnersStyles.redColor
                              : {}
                          }
                        >
                          {request.status}
                        </b>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <>
                    {type === PENDING_REQUEST_MESSAGE && (
                      <CardActions sx={forOwnersStyles.cardActions}>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            openNotificationModalWindow(
                              REJECTED_REQUEST_MESSAGE,
                              request.id
                            )
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            openNotificationModalWindow(
                              CONFIRMED_REQUEST_MESSAGE,
                              request.id
                            )
                          }
                        >
                          <CheckIcon />
                        </IconButton>
                      </CardActions>
                    )}
                  </>
                </Card>
              );
            })}
        </Box>
      ) : (
        <Typography variant="h4" component="span" gutterBottom>
          There are currently{" "}
          {type === PENDING_REQUEST_MESSAGE
            ? "no requests pending"
            : type === CONFIRMED_REQUEST_MESSAGE
            ? "no confirmed requests"
            : type === REJECTED_REQUEST_MESSAGE
            ? "no rejected requests"
            : ""}
        </Typography>
      )}
    </>
  );
};

import React, { useState } from "react";
import { RootState } from "../../helpers/types";
import { useSelector } from "react-redux";
import {
  actionFullHotelUpdate as onHotelUpdate,
  actionFullSendNotification as onSendNotification,
} from "../../actions/thunks";
import { Tabs, Tab, Box } from "@mui/material";
import { forOwnersStyles } from "./forOwnersStyles";
import { useParams } from "react-router-dom";
import useSnackBar from "../Auxiliary/SnackBar";
import { ModalWindow } from "../Auxiliary/ModalWindow";
import { RequestNotification } from "./RequestNotification";
import {
  clearPastFreeRooms,
  clearPastUserDates,
  clearPastUsersDates,
  completeFreeRooms,
  completeDisableUserDates,
  completeDisableUsersDates,
} from "../Hotels/bookingFunctions";
import {
  NOTIFICATION_MESSAGE_MODAL,
  RESOLVED_PROMISE_STATUS,
  CONFIRMED_REQUEST_MESSAGE,
  REJECTED_REQUEST_MESSAGE,
  PENDING_REQUEST_MESSAGE,
  UNREAD_NOTIFICATION,
  CONFIRMED_REQUEST_USER,
  REJECTED_REQUEST_USER,
  CONFIRMED_REQUEST_OWNER,
  REJECTED_REQUEST_OWNER,
} from "../../helpers/consts";
import {
  HotelModel,
  UserModel,
  UserRequestModel,
} from "../../server/api/api-models";
import { RequestsTab } from "./RequestsTab";
import { createUniqueId, setTabsProps } from "../../helpers/functions";
import { TabPanelProps } from "../../server/api/api-models";

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const HotelRequests = () => {
  const promise = useSelector((state: RootState) => state.promise);

  const { hotelId } = useParams();
  const [value, setValue] = useState(0);
  const [ownerNotification, setOwnerNotification] = useState("");
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [typeIndex, setTypeIndex] = useState({ type: "", requestId: "" });
  const [, sendSnackbar] = useSnackBar();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { payload: allHotels } = promise.getHotels || [];
  const { payload: allUsers } = promise.getUsers || [];

  const currentHotel = allHotels?.find(
    (hotel: HotelModel) => hotel.id === hotelId && hotel.owner !== 0
  );

  const currentHotelOwner = allUsers?.find(
    (user: UserModel) => user.id === currentHotel.owner
  );

  const updateNotificationModal = (value: boolean) => {
    setOpenNotificationModal(value);
  };

  const updateNotificationMessage = (value: string) => {
    setOwnerNotification(value);
  };

  const getRequestByType = (type: string, requestId: string) => {
    const currentRequest = currentHotel.userRequests.find(
      (request: UserRequestModel) => request.id === requestId
    );
    const currentRequestIndex = currentHotel.userRequests.findIndex(
      (request: UserRequestModel) => request.id === requestId
    );
    const requestMessage =
      type === CONFIRMED_REQUEST_MESSAGE
        ? CONFIRMED_REQUEST_USER
        : REJECTED_REQUEST_USER;

    const changedHotelStatus = {
      ...currentRequest,
      status:
        type === CONFIRMED_REQUEST_MESSAGE
          ? CONFIRMED_REQUEST_MESSAGE
          : REJECTED_REQUEST_MESSAGE,
    };

    const currentUserRequests = [...currentHotel.userRequests];
    currentUserRequests.splice(currentRequestIndex, 1);

    if (type === CONFIRMED_REQUEST_MESSAGE) {
      let disableUserDates = { ...(currentHotel?.disableUserDates || {}) };
      let disableUsersDates = [...(currentHotel?.disableUsersDates || [])];
      let freeRooms = { ...(currentHotel?.freeRooms || {}) };

      freeRooms = clearPastFreeRooms(freeRooms);
      disableUserDates = clearPastUserDates(disableUserDates);
      disableUsersDates = clearPastUsersDates(disableUsersDates);

      disableUserDates = completeDisableUserDates({
        formattedDateArrival: currentRequest.arrivalDate,
        formattedDateDeparture: currentRequest.departureDate,
        currentHotel,
        userId: currentRequest.usersId,
        numberAnimals: currentRequest.animalsNumber,
        disableUserDates,
      });

      disableUsersDates = completeDisableUsersDates({
        currentHotel,
        numberAnimals: currentRequest.animalsNumber,
        disableUsersDates,
      });

      freeRooms = completeFreeRooms({
        formattedDateArrival: currentRequest.arrivalDate,
        formattedDateDeparture: currentRequest.departureDate,
        freeRooms,
        currentHotel,
        numberAnimals: currentRequest.animalsNumber,
        userId: currentRequest.usersId,
      });

      onHotelUpdate({
        id: hotelId,
        userRequests: [...currentUserRequests, changedHotelStatus],
        freeRooms: { ...freeRooms },
        disableUserDates: {
          ...disableUserDates,
        },
        disableUsersDates: [...disableUsersDates],
      });
    } else {
      onHotelUpdate({
        id: hotelId,
        userRequests: [...currentUserRequests, changedHotelStatus],
      });
    }

    onSendNotification({
      id: createUniqueId(),
      text: ownerNotification.length > 0 ? ownerNotification : requestMessage,
      status: UNREAD_NOTIFICATION,
      fromId: currentHotelOwner.id,
      toId: currentHotel.userRequests[currentRequestIndex].usersId,
    });

    if (typeof sendSnackbar === "function") {
      promise.hotelUpdate.status === RESOLVED_PROMISE_STATUS &&
        sendSnackbar({
          msg:
            type === CONFIRMED_REQUEST_MESSAGE
              ? CONFIRMED_REQUEST_OWNER
              : REJECTED_REQUEST_OWNER,
          variant: type === CONFIRMED_REQUEST_MESSAGE ? "success" : "error",
        });
    }
  };

  const requestReject = (requestId: string) => {
    getRequestByType(REJECTED_REQUEST_MESSAGE, requestId);
  };

  const requestConfirm = (requestId: string) => {
    getRequestByType(CONFIRMED_REQUEST_MESSAGE, requestId);
  };

  const openNotificationModalWindow = (type: string, requestId: string) => {
    setOpenNotificationModal(true);
    setTypeIndex({ type, requestId });
  };

  const tabLabel = (type: string) =>
    `${type} Requests (${
      currentHotel?.userRequests?.filter(
        (request: UserRequestModel) => request.status === type
      )?.length || 0
    })`;

  return (
    <Box sx={forOwnersStyles.width100}>
      {openNotificationModal && (
        <ModalWindow
          title={NOTIFICATION_MESSAGE_MODAL}
          body={
            <RequestNotification
              updateNotificationMessage={updateNotificationMessage}
              typeIndex={typeIndex}
              requestConfirm={requestConfirm}
              requestReject={requestReject}
            />
          }
          type={"notification"}
          modalWindowState={updateNotificationModal}
        />
      )}
      <Box sx={forOwnersStyles.tabsBox}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
        >
          <Tab label={tabLabel(PENDING_REQUEST_MESSAGE)} {...setTabsProps(0)} />
          <Tab
            label={tabLabel(CONFIRMED_REQUEST_MESSAGE)}
            {...setTabsProps(1)}
          />
          <Tab
            label={tabLabel(REJECTED_REQUEST_MESSAGE)}
            {...setTabsProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RequestsTab
          type={PENDING_REQUEST_MESSAGE}
          openNotificationModalWindow={openNotificationModalWindow}
          currentHotel={currentHotel}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RequestsTab
          type={CONFIRMED_REQUEST_MESSAGE}
          openNotificationModalWindow={openNotificationModalWindow}
          currentHotel={currentHotel}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RequestsTab
          type={REJECTED_REQUEST_MESSAGE}
          openNotificationModalWindow={openNotificationModalWindow}
          currentHotel={currentHotel}
        />
      </TabPanel>
    </Box>
  );
};

import { formatDate } from "../../helpers/functions";
import { MAX_ANIMALS } from "../../helpers/consts";
import {
  IDisableUserDates,
  IDisableUsersDates,
  IFreeRooms,
} from "../../server/api/api-models";

const today = Date.parse(formatDate(new Date()));

export const completeDisableUserDates = (
  disableUserDatesParams: IDisableUserDates
) => {
  const disabledDates = [];
  if (Object.keys(disableUserDatesParams.currentHotel.freeRooms).length !== 0) {
    const bookedDates = Object.keys(
      disableUserDatesParams.currentHotel.freeRooms
    );

    for (const date of bookedDates) {
      let totalAnimals = 0;
      const dateFreeRoom = disableUserDatesParams.currentHotel.freeRooms[date];

      for (let i = 0; i < dateFreeRoom.usersId.length; i++) {
        if (disableUserDatesParams.userId === dateFreeRoom.usersId[i]) {
          totalAnimals += dateFreeRoom.usersAnimalsCount[i];
        }
      }

      if (totalAnimals + disableUserDatesParams.numberAnimals >= MAX_ANIMALS) {
        disabledDates.push(+date);
        disableUserDatesParams.disableUserDates[disableUserDatesParams.userId] =
          [
            ...(disableUserDatesParams.currentHotel.disableUserDates[
              disableUserDatesParams.userId
            ] || []),
            ...disabledDates,
          ];
      }
    }
  }
  return disableUserDatesParams.disableUserDates;
};

export const completeDisableUsersDates = (
  disableUsersDatesParams: IDisableUsersDates
) => {
  const bookedDates = Object.keys(
    disableUsersDatesParams.currentHotel.freeRooms
  );

  for (const date of bookedDates) {
    const dateFreeRoom = disableUsersDatesParams.currentHotel.freeRooms[date];
    if (
      dateFreeRoom.availableSeats - disableUsersDatesParams.numberAnimals <=
      0
    ) {
      disableUsersDatesParams.disableUsersDates.push(+date);
    }
  }
  return disableUsersDatesParams.disableUsersDates;
};

export const completeFreeRooms = (freeRoomsParams: IFreeRooms) => {
  const dateRangeDecomposition = [];
  for (
    let i = freeRoomsParams.formattedDateArrival;
    i <= freeRoomsParams.formattedDateDeparture;
    i += 24 * 60 * 60 * 1000
  ) {
    dateRangeDecomposition.push(i);
  }
  for (const date of dateRangeDecomposition) {
    let availableSeats = freeRoomsParams.currentHotel.freeRooms?.[date]
      ?.availableSeats
      ? freeRoomsParams.currentHotel.freeRooms[date].availableSeats
      : freeRoomsParams.currentHotel.hotelRooms;

    let availableDiff = 0;

    const userIdIndexes = (
      freeRoomsParams.currentHotel.freeRooms?.[date]?.usersId || []
    ).filter((userId: number) => userId === freeRoomsParams.userId);

    const currentAnimalsCount =
      freeRoomsParams.currentHotel.freeRooms[date]?.usersAnimalsCount?.reduce(
        (total: number, num: number, index: number) =>
          userIdIndexes.some((userIndex) => userIndex === index)
            ? total + num
            : total + 0,
        0
      ) || 0;

    if (availableSeats - freeRoomsParams.numberAnimals < 0) {
      availableDiff = availableSeats;
      availableSeats = 0;
    } else {
      if (currentAnimalsCount + freeRoomsParams.numberAnimals >= MAX_ANIMALS) {
        availableDiff = MAX_ANIMALS - currentAnimalsCount;
      }
    }

    availableSeats -=
      availableDiff > 0 ? availableDiff : freeRoomsParams.numberAnimals;

    freeRoomsParams.freeRooms[date] = {
      availableSeats: availableSeats,
      usersId: [
        ...(freeRoomsParams.currentHotel?.freeRooms?.[date]?.usersId || []),
        freeRoomsParams.userId,
      ],
      usersAnimalsCount: [
        ...(freeRoomsParams.currentHotel?.freeRooms?.[date]
          ?.usersAnimalsCount || []),
        availableDiff > 0 ? availableDiff : freeRoomsParams.numberAnimals,
      ],
    };

    sessionStorage.usersAnimalsCount =
      availableDiff > 0 ? availableDiff : freeRoomsParams.numberAnimals;
  }

  return freeRoomsParams.freeRooms;
};

export const clearPastFreeRooms = (freeRooms: object) => {
  const freeRoomsKeys = Object.keys(freeRooms);
  for (const date of freeRoomsKeys) {
    if (today > +date) {
      delete freeRooms[date];
    }
  }
  return freeRooms;
};

export const clearPastUserDates = (disableUserDates: object) => {
  const disableUserDatesKeys = Object.keys(disableUserDates);
  for (const userId of disableUserDatesKeys) {
    if (
      disableUserDates[userId][0] < today &&
      disableUserDates[userId][1] < today
    ) {
      delete disableUserDates[userId];
    }
  }
  return disableUserDates;
};

export const clearPastUsersDates = (disableUsersDates: number[]) => {
  for (let i = 0; i < disableUsersDates.length; i++) {
    if (disableUsersDates[i] < today) {
      disableUsersDates.splice(i, 1);
    }
  }
  return disableUsersDates;
};

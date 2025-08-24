// src/constants/messages/reservation/index.ts
export const RESERVATION_MESSAGES = {
  CREATED_SUCCESS: "Reservation created successfully",
  SPACE_NOT_FOUND: "The space does not exist or is inactive",
  CAPACITY_OUT_OF_RANGE: "The number of people is out of range",
  FULL_ROOM_FORBIDDEN: "Full-room reservation is not allowed for this space",
  UNIT_BOOKING_FORBIDDEN: "Unit booking is not allowed for this space",
  TIME_OVERLAP: "There is an overlapping reservation in that time interval",
  NO_CAPACITY_LEFT: "No capacity left for the selected time interval",
  PRICE_NOT_DEFINED: "Price not defined for the selected duration",
  NOT_FOUND: "Reservation not found",
  FORBIDDEN: "You do not have permission to view this reservation.",
  ALREADY_CANCELLED: "Reservation is already cancelled",
  IN_PROGRESS_CANNOT_CANCEL: "Reservation in progress cannot be cancelled",
  STATUS_INVALID_FOR_CANCEL: "Reservation status is not valid for cancellation",
  CANCELLED_SUCCESS: "Reservation cancelled successfully",
};

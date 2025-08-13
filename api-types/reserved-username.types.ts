export type ReserveUsernameEndpointData = {
  reservationToken: string;
  expiresAt: Date;
  username: string;
  isNew: boolean;
};

export type ClaimReservedUsernameEndpointData = {
  reservationToken: string;
  username: string;
  expiresAt: Date;
  isNew: boolean;
};

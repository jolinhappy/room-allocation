export interface Guest {
  adult: number;
  child: number;
}

export interface AllocatedRoom {
  id: number;
  adult: number;
  child: number;
  price?: number;
}

export interface Room {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export interface FavouriteRequest {
  id: number;
  userId: number;
  category: string;
}

export interface APIResponse {
  msg: string;
  status: number;
}

export interface HomeAdressResponse {
  address: string;
  latitude: number;
  longitude: number;
}

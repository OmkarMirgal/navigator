export interface FavouriteRequest {
  id: number;
  userId: number;
  category: string;
}

export interface FavouriteResponse {
  msg: string;
  status: number;
}

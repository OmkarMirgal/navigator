export interface LeafletMapProps {
  points: Points;
}

export interface Point {
  x: string;
  y: string;
  category: string;
  color: string;
}

export interface Points {
  [category: string]: Point[];
}

export interface AddressSuggestion {
  x: number;
  y: number;
  label: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface PopupPoint {
  x: string;
  y: string;
  category: string;
}

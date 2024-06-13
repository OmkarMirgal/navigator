"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface POIContextProps {
  userId: string; // Define userId state
  setUserId: React.Dispatch<React.SetStateAction<string>>; // Define setter for userId state
  schulsocialarbeitCoordinates: boolean;
  setSchulsocialarbeitCoordinates: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  schulenCoordinates: boolean;
  setSchulenCoordinates: React.Dispatch<React.SetStateAction<boolean>>;
  kindertageseinrichtungenCoordinates: boolean;
  setKindertageseinrichtungenCoordinates: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  jugendberufshilfenCoordinates: boolean;
  setJugendberufshilfenCoordinates: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const POIContext = createContext<POIContextProps | undefined>(undefined);

export const POIProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>(""); // Initialize userId state
  const [schulsocialarbeitCoordinates, setSchulsocialarbeitCoordinates] =
    useState(false);
  const [schulenCoordinates, setSchulenCoordinates] = useState(false);
  const [
    kindertageseinrichtungenCoordinates,
    setKindertageseinrichtungenCoordinates,
  ] = useState(false);
  const [jugendberufshilfenCoordinates, setJugendberufshilfenCoordinates] =
    useState(false);

  const value = {
    userId,
    setUserId,
    schulsocialarbeitCoordinates,
    setSchulsocialarbeitCoordinates,
    schulenCoordinates,
    setSchulenCoordinates,
    kindertageseinrichtungenCoordinates,
    setKindertageseinrichtungenCoordinates,
    jugendberufshilfenCoordinates,
    setJugendberufshilfenCoordinates,
  };

  return <POIContext.Provider value={value}>{children}</POIContext.Provider>;
};

export const usePOI = (): POIContextProps => {
  const context = useContext(POIContext);
  if (context === undefined) {
    throw new Error("usePOI must be used within a POIProvider");
  }
  return context;
};

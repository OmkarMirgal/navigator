"use client";

import React, { useEffect, useState } from "react";
import { Point, PopupPoint } from "@/types/point-types";
import { Heart } from "lucide-react";
import { axiosApiCall } from "@/lib/utils";

interface FavouriteIconProps {
  id: string;
  details: Point;
  userId: string;
}

const FavouriteIcon = ({ id, details, userId }: FavouriteIconProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const handleFavourite = async () => {
    try {
      const response = await axiosApiCall("post", "api/mark-favourite", {
        id: Number(id),
        category: details.category,
        userId: Number(userId),
      });
      if (response.status == 200) {
        setIsFavourite(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUnFavourite = async () => {
    try {
      const response = await axiosApiCall("post", "api/mark-unfavourite", {
        id: Number(id),
        category: details.category,
        userId: Number(userId),
      });
      if (response.status == 200) {
        if (response.data == true) {
          setIsFavourite(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        const response = await axiosApiCall("post", "api/user-favourite", {
          id: Number(id),
          category: details.category,
          userId: Number(userId),
          flag: true, //flag set to true will only give boolean responses eg. {isFavourite:true|false}
        });
        if (response.status === 200) {
          setIsFavourite(response.data.isFavourite);
        }
      } catch (error) {
        console.error("Error fetching favourite status:", error);
      }
    };

    checkIfFavourite();
  }, [id, details.category, userId]);

  return (
    <>
      {isFavourite ? (
        <Heart
          size={20}
          fill="red"
          stroke="1"
          onClick={handleUnFavourite}
          className="hover:cursor-pointer"
        />
      ) : (
        <Heart
          size={20}
          onClick={handleFavourite}
          className="hover:cursor-pointer"
        />
      )}
    </>
  );
};

export default FavouriteIcon;

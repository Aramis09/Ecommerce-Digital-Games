import React,{ useEffect, useState } from "react";
import { Game } from "../types";
interface UseCarrouselType {
  setProductsCarrousel:any
  topProductsData:Game[]
}
export const useCarrousel = ({setProductsCarrousel, topProductsData}:UseCarrouselType) => {
  useEffect(() => {
    setProductsCarrousel(topProductsData.slice(0, 3));
  }, [topProductsData]);
};
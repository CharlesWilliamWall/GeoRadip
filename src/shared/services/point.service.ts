import type { Point } from "../interface/Point.interface";


import axios from "axios";
//Objectif: Communiquer avec le serveur et
 const BASE_URL = '/api/point';

 export async function savePoint(
   point: Point[]
 ): Promise<Point | null> {
 
 const response = await axios.post(BASE_URL, point);
 
 if (!response.data.error) {
    return response.data;
  } else {
    throw new Error('Point error in savePoint() : ' + response.data.error);
  }
}
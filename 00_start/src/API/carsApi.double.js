import axios from "axios";
import { baseUrl, graphqlUrl } from "./carsApi";
import { GraphQLClient } from "graphql-request";

import { httpClient } from "./httpClient";

const baseUrlCars = `${baseUrl}/api/cars`;
export const graphQLClient = new GraphQLClient(graphqlUrl);

//fetch

export const getAllCars = () =>
  fetch(baseUrlCars).then((response) => response.json());

export const getCarById = (id) =>
  fetch(`${baseUrlCars}/${id}`).then((response) => response.json());

export const addCar = (car) =>
  fetch(baseUrlCars, {
    method: "POST",
    body: JSON.stringify(car),
  }).then((response) => response.json());
//axios
export const getAllCars2 = () =>
  axios.get(baseUrlCars).then(({ data }) => data);

export const getCarById2 = (id) =>
  axios.get(`${baseUrlCars}/${id}`).then(({ data }) => data);

export const addCar2 = (car) =>
  axios.post(baseUrlCars, car).then(({ data }) => data);

//XMLHttpRequest
export const getAllCars3 = () => httpClient.get(baseUrlCars);

export const getCarById3 = (id) => httpClient.get(`${baseUrlCars}/${id}`);

export const addCar3 = (car) => httpClient.post(baseUrlCars, car);

//Graphql
const query = `
  query {
    cars{
      car_id
      name
      brand
      year_release
      }
  }
`;
export const getAllCars4 = () =>
  graphQLClient.request(query).then(({ cars }) => cars);
export const getCarById4 = (id) => {
  const query = `
  query {
    car (id: "${id}"){
      car_id
      name
      brand
      year_release
      }
  }
`;
  return graphQLClient.request(query).then(({ car }) => car);
};
export const addCar4 = (car) => {
  const query = `
    mutation($carEdit: CarEdit!) {
      addCar(carEdit: $carEdit)
    }
  `;
  return graphQLClient
    .request(query, {
      carEdit: car,
    })
    .then((res) => res.saveCar);
};

import { InitializeDB } from "../interfaces/initializeDB";

export const initialDatabase: InitializeDB[] = [
  {
    collectionName: "books",
    instances: [
      {
        _id: "8h65f81d-d91a-49e4-a899-612699e18347",
        name: "Harry Potter",
        author: "J. K. Rowling",
        price: 10.0,
        registerDate: new Date(),
        isDeleted: false,
      },
      {
        _id: "d4e5f81d-d91a-49e4-a899-612699e1c546",
        name: "Percy Jackson",
        author: "Rick Riordan",
        price: 10.0,
        registerDate: new Date(),
        isDeleted: false,
      },
      {
        _id: "a3y5f81d-d91a-49e4-a899-612699e1c123",
        name: "Game of Thrones",
        author: "George R. R. Martin",
        price: 10.0,
        registerDate: new Date(),
        isDeleted: false,
      },
    ],
  },
];

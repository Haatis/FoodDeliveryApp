import mysql from "mysql2/promise";

export const getConnection = async () => {
  const dbconnection = await mysql.createConnection({
    host: process.env.REACT_APP_HOST_NAME,
    database: process.env.REACT_APP_DATABASE_NAME,
    user: process.env.REACT_APP_DATABASE_USER,
    password: process.env.REACT_APP_DATABASE_PASSWORD,
  });
  return dbconnection;
};

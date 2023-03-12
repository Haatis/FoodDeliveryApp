import { getConnection } from "../../lib/db";

export default async function handler(req, res) {
  const dbconnection = await getConnection();
  try {
    const [rows, fields] = await dbconnection.execute(`SELECT * FROM orders`);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  } finally {
    dbconnection.end(); // close the database connection
  }
}

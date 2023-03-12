import { getConnection } from "../../lib/db";

export default async function handler(req, res) {
  const { Datetime, orderItems, total, UserID, restaurantName } = req.body;
  const dbconnection = await getConnection();
  try {
    //sent order to database
    const [rows, fields] = await dbconnection.execute(
      "INSERT INTO orders (OrderDate, OrderItems, OrderTotal, UserID, RestaurantName) VALUES (?, ?, ?, ?, ?)",
      [Datetime, orderItems, total, UserID, restaurantName]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  } finally {
    dbconnection.end(); // close the database connection
  }
}

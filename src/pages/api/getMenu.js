import { getConnection } from "../../lib/db";

export default async function handler(req, res) {
  const { restaurant } = req.query;
  const dbconnection = await getConnection();
  try {
    const [rows, fields] = await dbconnection.execute(
      "SELECT * FROM `Menu` JOIN `Restaurants` ON `Menu`.`RestaurantID`=`Restaurants`.`RestaurantID` WHERE `Restaurants`.`RestaurantName`=?",
      [restaurant]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  } finally {
    dbconnection.end(); // close the database connection
  }
}

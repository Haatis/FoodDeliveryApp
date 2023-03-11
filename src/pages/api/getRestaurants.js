import { getConnection } from "../../lib/db";

export default async function handler(req, res) {
  const { city } = req.query;
  const dbconnection = await getConnection();
  try {
    const [rows, fields] = await dbconnection.execute(
      "SELECT * FROM `Restaurants` JOIN `Cities` ON `Restaurants`.`CityID`=`Cities`.`CityID` WHERE `Cities`.`CityName`=?",
      [city]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  } finally {
    dbconnection.end(); // close the database connection
  }
}

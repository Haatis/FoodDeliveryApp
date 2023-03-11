import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getConnection } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Invalid input" });
  }

  try {
    const dbConnection = await getConnection();
    const [rows] = await dbConnection.execute(
      "SELECT UserID, UserPassword FROM users WHERE UserEmail = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const passwordsMatch = await compare(password, user.UserPassword);

    if (!passwordsMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = sign(
      { userId: user.UserID },
      process.env.REACT_APP_JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

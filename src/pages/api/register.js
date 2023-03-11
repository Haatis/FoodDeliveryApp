import { hash } from "bcryptjs";
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
    const hashedPassword = await hash(password, 12); // hash the password

    const dbConnection = await getConnection();
    const [result] = await dbConnection.execute(
      "INSERT INTO users (UserEmail, UserPassword) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

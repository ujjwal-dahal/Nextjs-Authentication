
import jwt from "jsonwebtoken";

// Extract data from JWT token
export const GetDataFromToken = (request) => {
  try {
    // Extract the token from cookies
    const token = request.cookies.get("token")?.value || ""; // "token" is the cookie key

    if (!token) {
      throw new Error("No token found in cookies");
    }

    // Verify the token using the secret from environment variables
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); // Decode the token with the secret

    return decodedToken.id; // Assuming your token contains an "id" field
  } catch (error) {
    // Handle errors with a custom message
    throw new Error(`Token verification failed: ${error.message}`);
  }
};



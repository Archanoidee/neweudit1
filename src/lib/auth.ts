import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "./jwt";

interface AuthenticatedRequest extends NextApiRequest {
  user?: unknown; // Attach user info to the request
}

export const withAuth = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void> | void) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = decoded; // Attach user info to the request
    return handler(req, res);
  };
};

import withHandler, { ResponseType } from "../../../lib/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));

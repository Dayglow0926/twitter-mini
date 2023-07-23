import withHandler, { ResponseType } from "../../../lib/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import { useRouter } from "next/router";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> {
  console.log(req.session);
  const { userId } = req.body;

  console.log(userId);

  const foundInfo = await client.user.findFirst({
    where: {
      OR: [{ email: userId }, { phone: userId }],
    },
  });

  if (!foundInfo) return res.status(404).end();

  req.session.user = {
    id: foundInfo.id,
  };

  await req.session.save();

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

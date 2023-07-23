import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/db";
import withHandler, { ResponseType } from "../../../lib/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email, name } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name,
            ...user,
          },
        },
      },
    },
  });

  console.log(token);

  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

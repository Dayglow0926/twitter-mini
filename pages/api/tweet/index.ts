import withHandler, { ResponseType } from "../../../lib/withHandler";
import { withApiSession } from "../../../lib/withSession";
import client from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.method);
  if (req.method === "GET") {
    const tweets = await client.post.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }
  if (req.method === "POST") {
    const {
      body: { content },
      session: { user },
    } = req;

    console.log(user);

    const profile = await client.user.findFirst({
      where: {
        id: req.session.user?.id,
      },
    });

    const tweet = await client.post.create({
      data: {
        name: profile?.name!,
        content,
        user: {
          connect: {
            id: profile?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

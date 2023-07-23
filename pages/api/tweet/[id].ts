import withHandler, { ResponseType } from "../../../lib/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await client.post.findUnique({
    where: {
      id: +id!,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        postId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({ ok: true, tweet, isLiked });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);

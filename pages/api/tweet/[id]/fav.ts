import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/db";
import withHandler, { ResponseType } from "../../../../lib/withHandler";
import { withApiSession } from "../../../../lib/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.fav.findFirst({
    where: {
      postId: +id!,
      userId: user?.id,
    },
  });

  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id!,
          },
        },
        post: {
          connect: {
            id: +id!,
          },
        },
      },
    });
  }

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);

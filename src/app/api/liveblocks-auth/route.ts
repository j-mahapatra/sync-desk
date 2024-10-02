import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_API_KEY as string,
});

export async function POST(request: Request) {
  const { room } = await request.json();
  const user = await currentUser();

  const session = liveblocks.prepareSession(
    user?.primaryEmailAddress?.emailAddress ?? '',
  );

  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();

  return new Response(body, { status });
}

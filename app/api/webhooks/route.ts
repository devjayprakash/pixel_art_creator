import connectMongo from '@/lib/database';
import UserModal from '@/schema/User';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req: Request) {
  connectMongo();

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }
  const { id } = evt.data;

  if (evt.type === 'user.created') {
    const user_data = evt.data;

    if (!user_data) {
      return new Response('Error occurred -- no user data', {
        status: 400,
      });
    }

    const { first_name, last_name, image_url } = evt.data;

    const new_user = new UserModal({
      name: `${first_name} ${last_name}`,
      clerk_id: id,
      image_url,
    });

    await new_user.save();
  }

  return new Response('', { status: 200 });
}

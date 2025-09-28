import { getEntry } from 'astro:content';

export async function GET() {
  try {
    const entry = await getEntry('profile', 'cv');
    const data = entry?.data as { variant: string; cv: Record<string, string> } | undefined;
    const variant = data?.variant || 'mobile';
    const target = (data?.cv && data.cv[variant]) || data?.cv?.mobile || 'https://cv-gracjanziemianski.vercel.app';
    return new Response(null, {
      status: 302,
      headers: { Location: target },
    });
  } catch {
    return new Response(null, {
      status: 302,
      headers: { Location: 'https://cv-gracjanziemianski.vercel.app' },
    });
  }
}



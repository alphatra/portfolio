import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const locale = url.searchParams.get('locale') || 'pl';
  const supported = new Set(['pl', 'en', 'de', 'it', 'zh']);
  const lang = supported.has(locale) ? locale : 'pl';
  const target = `/cv/cv-${lang}.pdf`;
  return new Response(null, {
    status: 302,
    headers: { Location: target },
  });
};



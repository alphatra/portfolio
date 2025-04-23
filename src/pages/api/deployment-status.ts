import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // Odczytaj zmienne środowiskowe - MUSISZ je ustawić w Vercel!
  // Używamy process.env, standard w Node.js / funkcjach Vercel
  const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID || 'prj_F6EdYIkhdgW2krNZahwV8kzrH1wN';

  if (!VERCEL_API_TOKEN) {
    console.error('Missing Vercel API Token environment variable');
    return new Response(
      JSON.stringify({ error: 'Missing Vercel API Token (VERCEL_API_TOKEN environment variable)' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiUrl = `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=1&target=production`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vercel API Error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Vercel API request failed: ${response.statusText}`, details: errorText }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const latestDeployment = data?.deployments?.[0];

    if (!latestDeployment) {
      console.error('No production deployments found for project', VERCEL_PROJECT_ID);
      return new Response(
        JSON.stringify({ error: 'No production deployments found for this project' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Wyekstrahuj przydatne informacje
    const deploymentInfo = {
      id: latestDeployment.uid,
      url: `https://${latestDeployment.url}`,
      state: latestDeployment.state,
      createdAt: latestDeployment.createdAt,
      source: latestDeployment.meta?.githubCommitRef || 'Unknown',
      commit: {
        sha: latestDeployment.meta?.githubCommitSha || 'Unknown',
        message: latestDeployment.meta?.githubCommitMessage || 'Unknown',
      },
    };

    // Utwórz strumień SSE
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        const sseFormattedData = `data: ${JSON.stringify(deploymentInfo)}\n\n`;
        controller.enqueue(encoder.encode(sseFormattedData));
        controller.close(); // Zamknij strumień po wysłaniu jednej wiadomości
      }
    });

    // Zwróć strumień z nagłówkami SSE
    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error('Internal Server Error fetching Vercel deployment status:', error);
    // Sprawdź typ błędu przed dostępem do .message
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 
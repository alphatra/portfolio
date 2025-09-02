export async function GET({ url }: { url: URL }) {
  try {
    const user = url.searchParams.get('user') || import.meta.env.PUBLIC_LASTFM_USERNAME;
    const apiKey = import.meta.env.PUBLIC_LASTFM_API_KEY;
    if (!user || !apiKey) {
      return new Response(JSON.stringify({ artist: '', song: '', albumArtUrl: '', nowPlaying: false }), { headers: { 'Content-Type': 'application/json' } });
    }

    const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(apiKey)}&limit=1&format=json`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Last.fm fetch failed: ${res.status}`);
    const data = await res.json();
    const track = data?.recenttracks?.track?.[0];
    if (!track) {
      return new Response(JSON.stringify({ artist: '', song: '', albumArtUrl: '', nowPlaying: false }), { headers: { 'Content-Type': 'application/json' } });
    }
    const isNowPlaying = track['@attr']?.nowplaying === 'true';
    const albumArtUrl = Array.isArray(track.image)
      ? (track.image.find((img: any) => img.size === 'medium')?.['#text'] || '')
      : '';
    const payload = {
      artist: track.artist?.['#text'] || '',
      song: track.name || '',
      albumArtUrl,
      nowPlaying: isNowPlaying,
    };
    return new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ artist: '', song: '', albumArtUrl: '', nowPlaying: false, error: err?.message || 'unknown' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}



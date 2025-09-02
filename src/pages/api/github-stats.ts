export async function GET({ url }: { url: URL }) {
  try {
    const user = url.searchParams.get('user') || 'alphatra';

    // Basic in-memory cache per server instance
    const cacheKey = `gh:${user}`;
    const now = Date.now();
    const cached = (globalThis as any).__GH_CACHE__?.[cacheKey];
    if (cached && now - cached.timestamp < 1000 * 60) {
      return new Response(JSON.stringify(cached.data), { headers: { 'Content-Type': 'application/json' } });
    }

    const headers: Record<string, string> = { 'User-Agent': 'portfolio-app' };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers['Authorization'] = `token ${token}`;

    const userRes = await fetch(`https://api.github.com/users/${user}`, { headers });
    if (!userRes.ok) throw new Error(`GitHub user fetch failed: ${userRes.status}`);
    const userJson = await userRes.json();

    // Fetch first 100 repos (most cases sufficient)
    const reposRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, { headers });
    if (!reposRes.ok) throw new Error(`GitHub repos fetch failed: ${reposRes.status}`);
    const reposJson = await reposRes.json();

    const stars = Array.isArray(reposJson)
      ? reposJson.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
      : 0;

    const data = {
      stars,
      followers: userJson.followers ?? 0,
      public_repos: userJson.public_repos ?? 0,
      html_url: userJson.html_url ?? `https://github.com/${user}`,
      login: userJson.login ?? user,
    };

    (globalThis as any).__GH_CACHE__ = (globalThis as any).__GH_CACHE__ || {};
    (globalThis as any).__GH_CACHE__[cacheKey] = { timestamp: now, data };

    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    const fallback = { stars: 0, followers: 0, public_repos: 0 };
    return new Response(JSON.stringify({ error: err?.message || 'unknown', ...fallback }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}



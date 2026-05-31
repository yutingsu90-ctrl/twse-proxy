// 台股證交所 API 代理伺服器
// 部署於 Vercel，解決瀏覽器 CORS 限制

const ALLOWED_HOSTS = [
  'mis.twse.com.tw',
  'openapi.twse.com.tw',
  'www.twse.com.tw',
  'www.tpex.org.tw',
  'openapi.taifex.com.tw',
];

export default async function handler(req, res) {
  // 允許所有來源跨域存取（CORS headers）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: '缺少 url 參數' });
  }

  let decoded;
  try {
    decoded = decodeURIComponent(url);
  } catch (e) {
    return res.status(400).json({ error: 'url 格式錯誤' });
  }

  // 安全檢查：只允許轉發到白名單網域
  let hostname;
  try {
    hostname = new URL(decoded).hostname;
  } catch (e) {
    return res.status(400).json({ error: 'url 不合法' });
  }

  if (!ALLOWED_HOSTS.includes(hostname)) {
    return res.status(403).json({ error: `不允許的網域：${hostname}` });
  }

  try {
    const response = await fetch(decoded, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TWSE-Proxy/1.0)',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://mis.twse.com.tw/',
      },
    });

    const contentType = response.headers.get('content-type') || 'application/json';
    const text = await response.text();

    res.setHeader('Content-Type', contentType.includes('json') ? 'application/json' : 'text/plain');
    return res.status(response.status).send(text);
  } catch (e) {
    return res.status(502).json({ error: '上游請求失敗', detail: e.message });
  }
}

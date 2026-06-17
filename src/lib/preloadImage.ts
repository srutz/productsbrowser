const blobCache = new Map<string, string>(); // CDN URL → object URL
const inflight = new Map<string, Promise<void>>();

export function preloadImage(url: string): void {
  if (blobCache.has(url) || inflight.has(url)) return;
  const p = fetch(url)
    .then(r => r.blob())
    .then(blob => { blobCache.set(url, URL.createObjectURL(blob)); })
    .catch(() => {})
    .finally(() => inflight.delete(url));
  inflight.set(url, p);
}

export function getCachedImageSrc(url: string): string {
  return blobCache.get(url) ?? url;
}

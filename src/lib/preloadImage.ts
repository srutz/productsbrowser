// Module-level map keeps Image objects alive until their request completes,
// preventing GC from canceling in-flight fetches.
const inflight = new Map<string, HTMLImageElement>();

export function preloadImage(url: string): void {
  if (inflight.has(url)) return;
  const image = new Image();
  inflight.set(url, image);
  image.onload = image.onerror = () => inflight.delete(url);
  image.src = url;
}

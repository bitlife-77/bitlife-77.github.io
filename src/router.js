// Simple query-based SPA router
const routes = {};

export function on(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  // path is usually something like '/' or '/?play=10'
  // When parsing we treat the pathname part as the virtual route path
  history.pushState(null, '', path);
  resolve();
}

export function resolve() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('play')) {
    // Redirect old ?play= URLs to new static pages
    const playParam = params.get('play');
    const parts = playParam.split('-');
    const id = parts[0];
    const title = parts.slice(1).join('-');
    // Create slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '');
    window.location.href = `/game/${slug}.html`;
    return;
  } else if (params.has('page')) {
    // Expected format: ?page=contact
    const pageId = params.get('page');
    if (routes['/page']) routes['/page']({ id: pageId });
  } else {
    // Normal Home
    if (routes['/']) routes['/']({});
  }
}

export function init() {
  window.addEventListener('popstate', resolve);
  resolve();
}

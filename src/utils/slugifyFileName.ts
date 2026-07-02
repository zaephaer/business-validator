export function slugifyFileName(input: string, maxLength = 60): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const truncated = slug.slice(0, maxLength).replace(/-+$/g, '');
  return truncated || 'validation-report';
}

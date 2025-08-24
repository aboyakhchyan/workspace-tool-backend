export const generateSlug = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')            
    .replace(/[^a-zа-я0-9\-]/g, '') 
    .replace(/\-+/g, '-');
};
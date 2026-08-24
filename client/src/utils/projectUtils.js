/** Turn a project title into a stable, url-safe id fragment. */
export function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
/** Turn a File into a lightweight, serializable item with a preview URL. */
export function toFileItem(file) {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    isImage: file.type.startsWith("image/"),
    url: URL.createObjectURL(file),
  };
}

export function releaseFileItem(item) {
  if (item?.url) URL.revokeObjectURL(item.url);
}

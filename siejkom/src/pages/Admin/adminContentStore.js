const STORAGE_KEY = "siejkom-admin-content";

export function loadAdminContent() {
  const savedContent = window.localStorage.getItem(STORAGE_KEY);
  if (!savedContent) return {};

  const parsedContent = JSON.parse(savedContent);
  if (!parsedContent || typeof parsedContent !== "object" || Array.isArray(parsedContent)) {
    throw new Error("Invalid saved content");
  }

  return parsedContent;
}

// Replace this browser storage adapter with the CMS API when the backend is ready.
export function saveAdminContent(content) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

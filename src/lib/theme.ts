const COOKIE_NAME = "honya-theme";
const COOKIE_DOMAIN = ".honya.dev";

function getThemeCookie(): "light" | "dark" | null {
  const match = document.cookie.match(
    new RegExp(`${COOKIE_NAME}=(light|dark)`),
  );
  return match ? (match[1] as "light" | "dark") : null;
}

function setThemeCookie(theme: "light" | "dark") {
  document.cookie = `${COOKIE_NAME}=${theme}; domain=${COOKIE_DOMAIN}; path=/; max-age=31536000; SameSite=Lax`;
}

export function isLightMode(): boolean {
  return document.documentElement.classList.contains("light-mode");
}

function applyTheme(light: boolean) {
  document.documentElement.classList.toggle("light-mode", light);
}

export function toggleTheme(): boolean {
  const light = !isLightMode();
  applyTheme(light);
  setThemeCookie(light ? "light" : "dark");
  return light;
}

export function initTheme() {
  const cookie = getThemeCookie();
  if (cookie) applyTheme(cookie === "light");
  window.addEventListener("message", (e: MessageEvent) => {
    if (
      e.data?.type === "honya-theme" &&
      (e.data.theme === "light" || e.data.theme === "dark")
    ) {
      applyTheme(e.data.theme === "light");
      setThemeCookie(e.data.theme);
    }
  });
}

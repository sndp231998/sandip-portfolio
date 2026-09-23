/**
 * Inline script that sets data-theme on <html> before first paint, so there is
 * no flash of the wrong theme. Stored choice wins; otherwise the OS setting.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

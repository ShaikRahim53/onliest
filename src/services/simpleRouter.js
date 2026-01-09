// Simple router implementation to replace react-router-dom temporarily
export const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export const getCurrentPath = () => {
  return window.location.pathname;
};

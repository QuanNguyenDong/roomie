import '@testing-library/jest-dom';

// Polyfill for matchMedia in Jest environment
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {},
  };
};

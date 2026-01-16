export function initializeSignInShortcut() {
  document.addEventListener('keypress', (e) => {
    if (e.key === 's' || e.key === 'S') {
      window.location.href = '/signin.html';
    }
  });
}


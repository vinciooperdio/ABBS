// Nuovo script per gestire il cursore personalizzato
document.addEventListener('DOMContentLoaded', () => {
  // Creiamo l'elemento del cursore personalizzato
  const customCursor = document.createElement('div');
  customCursor.classList.add('custom-cursor');
  document.body.appendChild(customCursor);
  
  // Aggiorniamo la posizione del cursore
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });
  
  // Gestione degli eventi hover
  document.querySelectorAll('a, button, [role="button"]').forEach(element => {
    element.addEventListener('mouseenter', () => {
      customCursor.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
      customCursor.classList.remove('active');
    });
  });
}); 
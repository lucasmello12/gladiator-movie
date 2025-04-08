document.addEventListener('DOMContentLoaded', () => {
  initializeCards();
  handleResize();
  window.addEventListener('resize', handleResize);
});

// Verifica se é dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Inicializa os cards com flip para desktop
function initializeCards() {
  const cards = document.querySelectorAll('.cast-card');
  
  if (!isMobile()) {
      cards.forEach(card => {
          const actorName = card.querySelector('h3')?.textContent;
          if (!actorName || !actorInfo[actorName]) return;

          // Preserva o conteúdo original
          const originalContent = card.innerHTML;

          // Cria a estrutura do flip card
          card.innerHTML = `
              <div class="cast-card__inner">
                  <div class="cast-card__front">
                      ${originalContent}
                  </div>
                  <div class="cast-card__back">
                      <h4>Informações sobre ${actorName}</h4>
                      <ul>
                          <li><strong>Idade:</strong> ${actorInfo[actorName].age} anos</li>
                          <li><strong>Prêmios:</strong> ${actorInfo[actorName].awards}</li>
                          <li><strong>Curiosidade:</strong> ${actorInfo[actorName].trivia}</li>
                          <li><strong>Frase:</strong> ${actorInfo[actorName].quote}</li>
                      </ul>
                  </div>
              </div>
          `;

          // Adiciona evento de clique
          card.addEventListener('click', function() {
              // Fecha outros cards abertos
              cards.forEach(c => {
                  if (c !== this) {
                      c.classList.remove('is-flipped');
                  }
              });
              
              // Toggle do card atual
              this.classList.toggle('is-flipped');
          });
      });

      // Fecha cards quando clicar fora
      document.addEventListener('click', (e) => {
          if (!e.target.closest('.cast-card')) {
              cards.forEach(card => card.classList.remove('is-flipped'));
          }
      });
  }
}

// Gerencia o comportamento dos cards quando a tela é redimensionada
function handleResize() {
  const cards = document.querySelectorAll('.cast-card');
  
  if (isMobile()) {
      // Remove a estrutura de flip e restaura o conteúdo original no mobile
      cards.forEach(card => {
          const inner = card.querySelector('.cast-card__inner');
          if (inner) {
              const front = card.querySelector('.cast-card__front');
              card.innerHTML = front.innerHTML;
          }
      });
  } else {
      // Reinicializa os cards com flip no desktop
      cards.forEach(card => {
          const inner = card.querySelector('.cast-card__inner');
          if (!inner) {
              initializeCards();
          }
      });
  }
}

const actorInfo = {
  "Russell Crowe": {
      age: 36,
      awards: "Oscar de Melhor Ator (2001)",
      trivia: "Treinou com gladiadores por 6 meses",
      quote: '"No meu comando, desencadeiem o inferno!"'
  },
  "Joaquin Phoenix": {
      age: 26,
      awards: "Indicado ao Globo de Ouro",
      trivia: "Estudou o imperador Cômodo para o papel",
      quote: '"O general que se tornou escravo..."'
  },
  "Connie Nielsen": {
      age: 35,
      awards: "Prêmio Bodil de Melhor Atriz",
      trivia: "Falou fluentemente em latim",
      quote: '"Meu irmão tem muitas virtudes..."'
  },
  "Richard Harris": {
      age: 71,
      awards: "2 indicações ao Oscar",
      trivia: "Improvisou seu discurso famoso",
      quote: '"Havia um sonho que era Roma..."'
  }
};

// Adiciona animação do título
const title = document.querySelector('.hero__title');
if (title) {
  const letters = title.textContent.split('');
  title.textContent = '';
  
  letters.forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.animationDelay = `${i * 0.1}s`;
      span.classList.add('hero__letter');
      title.appendChild(span);
  });
}

// Adiciona efeito de scroll no header
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const header = document.querySelector('.header');
  
  if (header) {
      if (scrollPosition > 100) {
          header.style.background = 'rgba(26, 26, 26, 0.9)';
      } else {
          header.style.background = 'transparent';
      }
  }
});
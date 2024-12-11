document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("game-modal");
    const openModal = document.getElementById("open-modal");
    const closeModal = document.querySelector(".close");
  
    const startButton = document.getElementById("start-game");
    const restartButton = document.getElementById("restart-game");
    const gameArea = document.getElementById("game-area");
    const timerElement = document.getElementById("timer");
    const scoreElement = document.getElementById("score");
  
    let score = 0;
    let timeLeft = 30;
    let gameInterval, timerInterval;
  
    // Função para abrir o modal
    openModal.addEventListener("click", () => {
      modal.style.display = "block";
      startGame();
    });
  
    // Função para fechar o modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      endGame();
    });
  
    // Iniciar o jogo
    function startGame() {
      score = 0;
      timeLeft = 30;
      scoreElement.textContent = score;
      timerElement.textContent = timeLeft;
      restartButton.style.display = "none";
  
      // Spawn Demogorgons
      gameInterval = setInterval(spawnDemogorgon, 1000);
  
      // Contagem regressiva
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft -= 1;
          timerElement.textContent = timeLeft;
        } else {
          endGame();
        }
      }, 1000);
    }
  
    function spawnDemogorgon() {
        const demogorgon = document.createElement("div");
        demogorgon.classList.add("demogorgon");
      
        // Definir a imagem como fundo
        demogorgon.style.backgroundImage = "url('/assets/images/characters/demogorgon.png')"; // Ajuste o caminho conforme seu projeto
        demogorgon.style.backgroundSize = "cover";
        demogorgon.style.backgroundRepeat = "no-repeat";
      
        // Posição aleatória dentro do game-area
        const x = Math.random() * (gameArea.offsetWidth - 50);
        const y = Math.random() * (gameArea.offsetHeight - 50);
        demogorgon.style.left = `${x}px`;
        demogorgon.style.top = `${y}px`;
      
        // Clique para ganhar pontos
        demogorgon.addEventListener("click", () => {
          score += 1;
          scoreElement.textContent = score;
          demogorgon.remove();
        });
      
        // Remover após 2 segundos
        setTimeout(() => demogorgon.remove(), 2000);
      
        gameArea.appendChild(demogorgon);
      }
      
  
    // End game
    function endGame() {
        // Parar os intervalos do jogo e do timer
        clearInterval(gameInterval);
        clearInterval(timerInterval);
      
        // Mostrar a pontuação e perguntar ao jogador
        const restart = confirm(`Fim do jogo! Sua pontuação foi ${score}.\nDeseja jogar novamente?`);
      
        if (restart) {
          // Reinicia o jogo
          startGame();
        } else {
          // Fecha o modal
          modal.style.display = "none";
        }
      }

  });
  
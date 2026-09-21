```javascript
/* =========================================================
   PLAYZONE
   SCRIPT.JS
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTOS
     ======================================================= */

  const searchInput = document.getElementById("gameSearch");
  const gameCards = Array.from(document.querySelectorAll(".game-card"));
  const noResults = document.getElementById("noResults");

  const randomGameButton = document.getElementById("randomGame");

  const modal = document.getElementById("gameModal");
  const closeModalButton = document.getElementById("closeModal");

  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalIcon = document.getElementById("modalIcon");
  const modalAction = document.getElementById("modalAction");

  const playButtons = document.querySelectorAll(".play-button");

  const categoryButtons =
    document.querySelectorAll("[data-category-filter]");

  const musicToggle = document.getElementById("musicToggle");
  const playMusicButton = document.getElementById("playMusic");
  const prevSongButton = document.getElementById("prevSong");
  const nextSongButton = document.getElementById("nextSong");

  const songTitle = document.getElementById("songTitle");
  const songStatus = document.getElementById("songStatus");

  const volumeSlider = document.getElementById("volume");


  /* =======================================================
     DATOS DE LOS JUEGOS
     ======================================================= */

  const games = [
    {
      name: "Snake",
      icon: "🐍",
      category: "arcade",
      description:
        "Haz crecer tu serpiente y consigue el récord."
    },

    {
      name: "Memory",
      icon: "🧠",
      category: "mental",
      description:
        "Encuentra todas las parejas."
    },

    {
      name: "Reaction Test",
      icon: "⚡",
      category: "reflejos",
      description:
        "Pon a prueba la velocidad de tus reflejos."
    },

    {
      name: "2048",
      icon: "🔢",
      category: "mental",
      description:
        "Combina números para llegar hasta 2048."
    },

    {
      name: "Tic Tac Toe",
      icon: "❌",
      category: "casual",
      description:
        "Juega una partida rápida de tres en raya."
    },

    {
      name: "Click Speed",
      icon: "🖱️",
      category: "reflejos",
      description:
        "Haz todos los clics posibles en pocos segundos."
    }
  ];


  /* =======================================================
     BUSCADOR
     ======================================================= */

  function filterGames(query) {

    const cleanQuery = query
      .trim()
      .toLowerCase();

    let visibleGames = 0;

    gameCards.forEach((card) => {

      const name =
        card.dataset.name || "";

      const category =
        card.dataset.category || "";

      const matches =
        cleanQuery === "" ||
        name.includes(cleanQuery) ||
        category.includes(cleanQuery);

      card.style.display = matches
        ? ""
        : "none";

      if (matches) {
        visibleGames++;
      }

    });

    noResults.style.display =
      visibleGames === 0
        ? "block"
        : "none";
  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {
        filterGames(searchInput.value);
      }
    );

  }


  /* =======================================================
     FILTRO POR CATEGORÍA
     ======================================================= */

  categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const category =
        button.dataset.categoryFilter;

      if (!searchInput) {
        return;
      }

      searchInput.value = category;

      filterGames(category);

      const gamesSection =
        document.getElementById("juegos");

      if (gamesSection) {
        gamesSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  /* =======================================================
     MODAL DE JUEGO
     ======================================================= */

  function getGameData(gameName) {

    return games.find(
      (game) =>
        game.name.toLowerCase() ===
        gameName.toLowerCase()
    );

  }


  function openGame(gameName) {

    const game =
      getGameData(gameName);

    if (!game || !modal) {
      return;
    }

    modalIcon.textContent =
      game.icon;

    modalTitle.textContent =
      game.name;

    modalMessage.textContent =
      `${game.description} El juego se conectará aquí en la siguiente fase del proyecto.`;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

    if (modalAction) {
      modalAction.focus();
    }

  }


  function closeGameModal() {

    if (!modal) {
      return;
    }

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

  }


const gameLinks = {
  "Snake": "games/snake.html",
  "Memory": "games/memory.html",
  "Reaction Test": "games/reaction.html",
  "2048": "games/2048.html",
  "Tic Tac Toe": "games/tic-tac-toe.html",
  "Click Speed": "games/click-speed.html"
};

playButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const gameName = button.dataset.game;

    if (gameLinks[gameName]) {
      window.location.href = gameLinks[gameName];
      return;
    }

    openGame(gameName);

  });

});


  if (closeModalButton) {

    closeModalButton.addEventListener(
      "click",
      closeGameModal
    );

  }


  if (modalAction) {

    modalAction.addEventListener(
      "click",
      closeGameModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      (event) => {

        if (event.target === modal) {
          closeGameModal();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
      ) {
        closeGameModal();
      }

    }
  );


  /* =======================================================
     JUEGO ALEATORIO
     ======================================================= */

  if (randomGameButton) {

    randomGameButton.addEventListener(
      "click",
      () => {

        if (gameCards.length === 0) {
          return;
        }

        const randomIndex =
          Math.floor(
            Math.random() *
            gameCards.length
          );

        const selectedCard =
          gameCards[randomIndex];

        const gameName =
          selectedCard.dataset.name;

        const game =
          games.find(
            (item) =>
              item.name.toLowerCase() ===
              gameName.toLowerCase()
          );

        if (!game) {
          return;
        }

     if (gameLinks[game.name]) {
  window.location.href = gameLinks[game.name];
} else {
  openGame(game.name);
}

      }
    );

  }


  /* =======================================================
     MÚSICA
     ======================================================= */

  /*
     IMPORTANTE:

     Todavía no hay archivos MP3 en el proyecto.

     Cuando creemos la carpeta:

       music/

     podremos colocar canciones y modificar este arreglo:

       const playlist = [
  {
    title: "Rochy RD - Ella No Es Tuya",
    file: "Rochy RD - Ella No Es Tuya _ Video Oficial-128kbps.mp3"
  },
  {
    title: "EL JUIDERO - Chimbala x Bulin 47",
    file: "EL JUIDERO - Chimbala x Bulin 47 (Video Oficial) 4-128kbps.mp3"
  },
  {
    title: "El Alfa El Jefe - Gogo Dance",
    file: "El Alfa El Jefe - Gogo Dance (Video Oficial) #ElAlfaSabiduria 4-128kbps.mp3"
  },
  {
    title: "OZUNA - Baje con trenza Remix",
    file: "OZUNA ft El Cherry Scom y Kiko El Crazy - Baje con trenza Remix (Video Oficial)-128kbps.mp3"
  },
  {
    title: "LIL NAAY - PRENDE",
    file: "LIL NAAY - PRENDE VIDEO OFFICIAL-128kbps.mp3"
  },
  {
    title: "LIL NAAY - UNA BABY EN SANTIAGO",
    file: "LIL NAAY - UNA BABY EN SANTIAGO (VIDEO OFICIAL)-128kbps.mp3"
  },
  {
    title: "LIL NAAY - MOOD BRAZIL",
    file: "LIL NAAY - MOOD BRAZIL (VIDEO OFICAL)-128kbps.mp3"
  },
  {
    title: "Skokka - HUAN 62",
    file: "Skokka - HUAN 62 - (video Oficial)-128kbps.mp3"
  },
  {
    title: "Rochy RD - UVA BOMBOM",
    file: "Rochy RD - UVA 🍇 BOMBOM _ Video Oficial x Chuky De Lewa 4-128kbps.mp3"
  },
  {
    title: "DILON BABY - FLOW DE 30",
    file: "DILON BABY - FLOW DE 30 🔪-128kbps.mp3"
  },
  {
    title: "DILON BABY - DOMINICANO",
    file: "DILON BABY- DOMINICANO 🇩🇴 _@LeordProduciendo_-128kbps.mp3"
  },
  {
    title: "Bulin 47 - Me La Sube",
    file: "Bulin 47 - Me La Sube (Official Video)-128kbps.mp3"
  },
  {
    title: "Bulin 47 X Ceky Viciny - Ta Talde Pah",
    file: "Bulin 47 X Ceky Viciny - Ta Talde Pah (Official Video)-128kbps.mp3"
  }
];
  let currentSong = 0;

  let audio = null;

  let isPlaying = false;


  function createAudio() {

    if (audio) {
      return;
    }

    audio = new Audio();

    audio.preload = "metadata";

    audio.volume =
      Number(volumeSlider?.value || 70) / 100;

    audio.addEventListener(
      "ended",
      () => {
        nextSong();
      }
    );

  }


  function updateSongInterface() {

    const song =
      playlist[currentSong];

    if (!song) {
      return;
    }

    if (songTitle) {
      songTitle.textContent =
        song.title;
    }

    if (songStatus) {

      songStatus.textContent =
        song.file
          ? "Lista para reproducir"
          : "Añade música en /music";

    }

  }


  function toggleMusic() {

    createAudio();

    const song =
      playlist[currentSong];

    if (!song || !song.file) {

      isPlaying = false;

      if (songStatus) {
        songStatus.textContent =
          "Añade una canción en /music";
      }

      if (playMusicButton) {
        playMusicButton.textContent =
          "▶";
      }

      return;
    }


    if (isPlaying) {

      audio.pause();

      isPlaying = false;

      if (playMusicButton) {
        playMusicButton.textContent =
          "▶";
      }

      if (songStatus) {
        songStatus.textContent =
          "Pausado";
      }

    } else {

      audio.src = song.file;

      audio.play()
        .then(() => {

          isPlaying = true;

          if (playMusicButton) {
            playMusicButton.textContent =
              "⏸";
          }

          if (songStatus) {
            songStatus.textContent =
              "Reproduciendo";
          }

        })
        .catch(() => {

          isPlaying = false;

          if (songStatus) {
            songStatus.textContent =
              "No se pudo reproducir la canción";
          }

        });

    }

  }


  function nextSong() {

    currentSong =
      (currentSong + 1) %
      playlist.length;

    updateSongInterface();

    isPlaying = false;

    if (playMusicButton) {
      playMusicButton.textContent =
        "▶";
    }

    if (
      audio &&
      playlist[currentSong].file
    ) {
      audio.src =
        playlist[currentSong].file;

      audio.play()
        .then(() => {

          isPlaying = true;

          if (playMusicButton) {
            playMusicButton.textContent =
              "⏸";
          }

          if (songStatus) {
            songStatus.textContent =
              "Reproduciendo";
          }

        })
        .catch(() => {});
    }

  }


  function previousSong() {

    currentSong =
      (currentSong - 1 + playlist.length) %
      playlist.length;

    updateSongInterface();

    isPlaying = false;

    if (playMusicButton) {
      playMusicButton.textContent =
        "▶";
    }

  }


  if (playMusicButton) {

    playMusicButton.addEventListener(
      "click",
      toggleMusic
    );

  }


  if (musicToggle) {

    musicToggle.addEventListener(
      "click",
      () => {

        const player =
          document.querySelector(".music-player");

        if (player) {

          player.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }
    );

  }


  if (nextSongButton) {

    nextSongButton.addEventListener(
      "click",
      nextSong
    );

  }


  if (prevSongButton) {

    prevSongButton.addEventListener(
      "click",
      previousSong
    );

  }


  if (volumeSlider) {

    volumeSlider.addEventListener(
      "input",
      () => {

        createAudio();

        const value =
          Number(volumeSlider.value);

        if (
          Number.isFinite(value) &&
          audio
        ) {

          audio.volume =
            Math.min(
              100,
              Math.max(0, value)
            ) / 100;

        }

      }
    );

  }


  /* =======================================================
     INICIALIZACIÓN
     ======================================================= */

  updateSongInterface();

  filterGames("");

});
```

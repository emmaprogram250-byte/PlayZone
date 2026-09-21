"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // JUEGOS
  // =========================

  const gameLinks = {
    "Snake": "games/snake.html",
    "Memory": "games/memory.html",
    "Reaction Test": "games/reaction.html",
    "2048": "games/2048.html",
    "Tic Tac Toe": "games/tic-tac-toe.html",
    "Click Speed": "games/click-speed.html"
  };

  const playButtons = document.querySelectorAll(".play-button");

  playButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const gameName = button.getAttribute("data-game");
      const gameUrl = gameLinks[gameName];

      if (gameUrl) {
        window.open(gameUrl, "_blank");
      }

    });

  });


  // =========================
  // BÚSQUEDA
  // =========================

  const searchInput = document.getElementById("gameSearch");
  const gameCards = document.querySelectorAll(".game-card");
  const noResults = document.getElementById("noResults");

  function filterGames() {

    if (!searchInput) return;

    const query = searchInput.value
      .trim()
      .toLowerCase();

    let visible = 0;

    gameCards.forEach(function (card) {

      const name =
        (card.getAttribute("data-name") || "")
        .toLowerCase();

      const category =
        (card.getAttribute("data-category") || "")
        .toLowerCase();

      const match =
        query === "" ||
        name.includes(query) ||
        category.includes(query);

      card.style.display = match ? "" : "none";

      if (match) {
        visible++;
      }

    });

    if (noResults) {
      noResults.style.display =
        visible === 0 ? "block" : "none";
    }

  }

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      filterGames
    );
  }


  // =========================
  // FILTROS
  // =========================

  const categoryButtons =
    document.querySelectorAll(
      "[data-category-filter]"
    );

  categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const category =
        button.getAttribute(
          "data-category-filter"
        );

      if (searchInput) {
        searchInput.value = category;
        filterGames();
      }

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


  // =========================
  // JUEGO ALEATORIO
  // =========================

  const randomGameButton =
    document.getElementById("randomGame");

  if (randomGameButton) {

    randomGameButton.addEventListener(
      "click",
      function () {

        const availableGames =
          Object.keys(gameLinks);

        const randomIndex =
          Math.floor(
            Math.random() *
            availableGames.length
          );

        const gameName =
          availableGames[randomIndex];

        window.open(
          gameLinks[gameName],
          "_blank"
        );

      }
    );

  }


  // =========================
  // MÚSICA
  // =========================

  const musicToggle =
    document.getElementById("musicToggle");

  const playMusicButton =
    document.getElementById("playMusic");

  const prevSongButton =
    document.getElementById("prevSong");

  const nextSongButton =
    document.getElementById("nextSong");

  const songTitle =
    document.getElementById("songTitle");

  const songStatus =
    document.getElementById("songStatus");

  const volumeSlider =
    document.getElementById("volume");


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

    if (audio) return;

    audio = new Audio();

    audio.preload = "metadata";

    audio.volume =
      Number(
        volumeSlider
          ? volumeSlider.value
          : 70
      ) / 100;

    audio.addEventListener(
      "ended",
      function () {
        nextSong();
      }
    );

  }


  function updateSongInterface() {

    const song =
      playlist[currentSong];

    if (!song) return;

    if (songTitle) {
      songTitle.textContent =
        song.title;
    }

    if (songStatus) {
      songStatus.textContent =
        "Lista para reproducir";
    }

  }


  function playCurrentSong() {

    createAudio();

    const song =
      playlist[currentSong];

    if (!song) return;

    audio.src = song.file;

    audio.play()
      .then(function () {

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
      .catch(function (error) {

        console.error(
          "Error reproduciendo:",
          error
        );

        isPlaying = false;

        if (playMusicButton) {
          playMusicButton.textContent =
            "▶";
        }

        if (songStatus) {
          songStatus.textContent =
            "No se pudo reproducir";
        }

      });

  }


  function toggleMusic() {

    createAudio();

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

      playCurrentSong();

    }

  }


  function nextSong() {

    currentSong =
      (currentSong + 1) %
      playlist.length;

    updateSongInterface();

    playCurrentSong();

  }


  function previousSong() {

    currentSong =
      (currentSong - 1 +
        playlist.length) %
      playlist.length;

    updateSongInterface();

    if (isPlaying) {
      playCurrentSong();
    }

  }


  if (playMusicButton) {

    playMusicButton.addEventListener(
      "click",
      toggleMusic
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


  if (musicToggle) {

    musicToggle.addEventListener(
      "click",
      function () {

        const player =
          document.querySelector(
            ".music-player"
          );

        if (player) {

          player.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      }
    );

  }


  if (volumeSlider) {

    volumeSlider.addEventListener(
      "input",
      function () {

        createAudio();

        const value =
          Number(volumeSlider.value);

        audio.volume =
          Math.min(
            100,
            Math.max(0, value)
          ) / 100;

      }
    );

  }


  // Inicializar

  updateSongInterface();
  filterGames();

});

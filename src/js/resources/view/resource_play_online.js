/**
 * Đối tượng cung cấp resources cho PlayOnline view-component.
 */
const resourcesPlayOnline = {
  players: {
    opponent: {
      "en-US": "Opponent",
      "vi-VN": "Đối thủ",
    },
    player: {
      "en-US": "Player",
      "vi-VN": "Kỳ thủ",
    },
  },

  sidebarContent: {
    // nav
    navHeader: {
      newGame: {
        "en-US": "New Game",
        "vi-VN": "Ván cờ mới",
      },
      games: {
        "en-US": "Games",
        "vi-VN": "Các ván đấu",
      },
      players: {
        "en-US": "Players",
        "vi-VN": "Các kỳ thủ",
      },
    },

    sectionNewGame: {
      // Siêu chớp
      groupOptionsBullet: {
        title: {
          "en-US": "Bullet",
          "vi-VN": "Siêu chớp",
        },
        options: {
          text1min: {
            "en-US": "1 min",
            "vi-VN": "1 phút",
          },
          text1vs1: "1|1",
          text2vs1: "2|1",
        },
      },

      // Chớp
      groupOptionsBlitz: {
        title: {
          "en-US": "Blitz",
          "vi-VN": "Chớp",
        },
        options: {
          text3min: {
            "en-US": "3 min",
            "vi-VN": "3 phút",
          },
          text3vs2: "3|2",
          text5min: {
            "en-US": "5 min",
            "vi-VN": "5 phút",
          },
        },
      },

      // Cờ chớp
      groupOptionsRapid: {
        title: {
          "en-US": "Rapid",
          "vi-VN": "Cờ chớp",
        },
        options: {
          text10min: {
            "en-US": "10 min",
            "vi-VN": "10 phút",
          },
          text15vs10: "15|10",
          text30min: {
            "en-US": "30 min",
            "vi-VN": "30 phút",
          },
        },
      },

      // Các nút bấm
      buttons: {
        textPlay: {
          "en-US": "Play",
          "vi-VN": "Chơi",
        },
        textPlayAFriend: {
          "en-US": "Play a Friend",
          "vi-VN": "Chơi với một người bạn",
        },
        textTournaments: {
          "en-US": "Tournaments",
          "vi-VN": "Các giải đấu",
        },
      },

      // Các giải đấu sắp tới
      upcomingTournaments: {
        textUpcomingTournaments: {
          "en-US": "Upcoming Tournaments",
          "vi-VN": "Các giải đấu sắp tới",
        },
      },

      footer: {
        textPlaying: {
          "en-US": "PLAYING",
          "vi-VN": "ĐANG CHƠI",
        },

        textGamesToday: {
          "en-US": "GAMES TODAY",
          "vi-VN": "VÁN",
        },
      },
    },

    sectionGames: {
      tabNavigation: {
        textArchive: {
          "en-US": "Archive",
          "vi-VN": "Lưu trữ",
        },
        textWatch: {
          "en-US": "Watch",
          "vi-VN": "Theo dõi",
        },
      },
      inputSearch: {
        textUsername: {
          "en-US": "Username...",
          "vi-VN": "Tên người dùng",
        },
      },

      textNoMatchFound: {
        "en-US": "No matches found.",
        "vi-VN": "Không có ván đấu nào được tìm thấy.",
      },

      textGoToFullArchive: {
        "en-US": "Go to full archive",
        "vi-VN": "Đi tới kho lưu trữ đầy đủ",
      },
    },

    sectionPlayers: {
      tabNavigation: {
        textFriends: {
          "en-US": "Friends",
          "vi-VN": "Bạn bè",
        },
        textAllPlayers: {
          "en-US": "All Players",
          "vi-VN": "Mọi người",
        },
        textStreaming: "Streaming",
      },
      inputSearch: {
        textUsername: {
          "en-US": "Username...",
          "vi-VN": "Tên người dùng",
        },
      },
    },
  },
};

export default resourcesPlayOnline;

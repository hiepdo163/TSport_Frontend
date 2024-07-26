type SeasonPlayerDetails = {
    id: number;
    "season-id": number;
    "player-id": number;
    player: {
      id: number;
      code: string;
      name: string;
      status: string;
      "club-id": number;
      "created-date": string;
      "created-account-id": number;
      "modified-date": string;
      "modified-account-id": number;
    };
    season: {
      id: number;
      code: string;
      name: string;
      "club-id": number;
      "created-date": string;
      "created-account-id": number;
      "modified-date": string;
      "modified-account-id": number;
      status: string;
      club: {
        id: number;
        code: string;
        name: string;
        "logo-url": string;
        status: string;
        "created-date": string;
        "created-account-id": number;
        "modified-date": string;
        "modified-account-id": number;
      };
    };
  };
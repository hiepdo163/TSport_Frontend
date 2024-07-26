type FullOrderDetails = {
    "order-id": number;
    "shirt-id": number;
    code: string;
    size: string;
    subtotal: number;
    quantity: number;
    status: string;
    shirt: {
      id: number;
      code: string;
      name: string;
      description: string;
      quantity: number;
      status: string;
      "shirt-edition-id": number;
      "season-player-id": number;
      "created-date": string;
      "created-account-id": number;
      "modified-date": string;
      "modified-account-id": number;
      images: [
        {
          id: number;
          url: string;
          "shirt-id": number;
        }
      ];
      "shirt-edition": {
        id: number;
        code: string;
        size: string;
        "has-signature": boolean;
        "stock-price": number;
        "discount-price": number;
        color: string;
        status: string;
        origin: string;
        quantity: number;
        material: string;
        "season-id": number;
        "created-date": string;
        "created-account-id": number;
        "modified-date": string;
        "modified-account-id": number;
      };
    };
  };
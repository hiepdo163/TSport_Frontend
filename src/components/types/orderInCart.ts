type OrderInCart = {
    id: number;
    code: string;
    "order-date": string;
    status: string;
    total: number;
    "created-date": string;
    "created-account-id": number;
    "modified-date": string;
    "modified-account-id": number;
    "order-details": OrderInCartDetails[];
};

type OrderInCartDetails = {
    "order-id": number;
    "shirt-id": number;
    code: string;
    size: string;
    subtotal: number;
    quantity: number;
    status: string;
    shirt: Shirt;
};

type Shirt = {
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
    images: Image[];
    "shirt-edition": ShirtEdition;
};

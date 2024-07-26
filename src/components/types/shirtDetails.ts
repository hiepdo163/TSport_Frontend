type ShirtDetails = {
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
    "created-account": AccountDetails;
    images: Image[];
    "modified-account": AccountDetails;
    "order-details": OrderDetail[];
    "season-player": SeasonPlayer;
    "shirt-edition": ShirtEdition;
};

type AccountDetails = {
    id: number;
    username: string;
    email: string;
    "first-name": string;
    "last-name": string;
    gender: string;
    address: string;
    phone: string;
    dob: DateOfBirth;
    "supabase-id": string;
    role: string;
    status: string;
};

type DateOfBirth = {
    year: number;
    month: number;
    day: number;
    "day-of-week": number;
    "day-of-year": number;
    "day-number": number;
};

type Image = {
    id: number;
    url: string;
    "shirt-id": number;
};

type OrderDetail = {
    "order-id": number;
    "shirt-id": number;
    code: string;
    size: string;
    subtotal: number;
    quantity: number;
    status: string;
};

type SeasonPlayer = {
    id: number;
    "season-id": number;
    "player-id": number;
    player: Player;
    season: Season;
};

type Player = {
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

type Season = {
    id: number;
    code: string;
    name: string;
    "club-id": number;
    "created-date": string;
    "created-account-id": number;
    "modified-date": string;
    "modified-account-id": number;
    status: string;
    club: Club;
};

type Club = {
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

type ShirtEdition = {
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
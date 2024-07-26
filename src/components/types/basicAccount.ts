type BasicAccount = {
    id: number;
    username: string;
    email: string;
    "first-name": string;
    "last-name": string;
    gender: string;
    address: string;
    phone: string;
    dob: {
        year: number;
        month: number;
        day: number;
        "day-of-week": number;
        "day-of-year": number;
        "day-number": number;
    };
    "supabase-id": string;
    role: string;
    status: string;
};
type CreateShirtRequest = {
    imageFile: File;
    code: string;
    name: string;
    description: string;
    quantity: number;
    shirtEditionId: number;
    seasonPlayerId: number;
};
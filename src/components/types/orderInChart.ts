type OrderReport = {
"total-order-count": number,
  "total-shirt-quantity": number,
  "total-revenue": number,
  "shirt-quantities-by-size": QuantityBySize[],
orders: OrderInChart[],
}

type OrderInChart = {
    id: number;
    code: string;
    "order-date": string;
    status: string;
    total: number;
    "created-date": string;
    "created-account-id": number;
    "modified-date": string;
    "modified-account-id": number;
};

type QuantityBySize = {
    size: string,
    quantity: number
}
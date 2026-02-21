
export type ActiveScreen = 'home' | 'menu' | 'links' | 'about';

export type TransactionType = 'income' | 'expense' | 'dues' | 'attendance';

export interface Income {
    id: string;
    name: string;
    type: string;
    item: string;
    receiptCount: number;
    amount: number;
    comment: string;
}

export interface Expense {
    id: string;
    name: string;
    type: string;
    item: string;
    payeeName: string;
    amount: number;
    comment: string;
}

export interface Dues {
    id: string;
    debtorName: string;
    item: string;
    amount: number;
    dueDate: string;
}

export interface Attendance {
    id: string;
    name: string;
    employeeId: string;
    date: string;
    status: 'উপস্থিত' | 'অনুপস্থিত';
}

export interface LinkItem {
    title: string;
    url: string;
}

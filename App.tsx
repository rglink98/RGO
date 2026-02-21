project-root/
├─ src/
│   ├─ App.tsx
│   └─ components/
│       └─ BottomNav.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { Income, Expense, Dues, Attendance, LinkItem, ActiveScreen, TransactionType } from './types';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import LinksScreen from './screens/LinksScreen';
import AboutScreen from './screens/AboutScreen';

const App: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
    
    // State for all data types
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [dues, setDues] = useState<Dues[]>([]);
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [links, setLinks] = useState<LinkItem[]>([
        { title: 'মুভি সার্ভার', url: 'http://example.com/movies' },
        { title: 'টিভি সার্ভার', url: 'http://example.com/tv' }
    ]);

    // Memoized calculations for the dashboard
    const totals = useMemo(() => {
        const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
        const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
        const totalDues = dues.reduce((sum, item) => sum + item.amount, 0);
        const currentCash = totalIncome - totalExpense;
        return { totalIncome, totalExpense, totalDues, currentCash };
    }, [incomes, expenses, dues]);

    const handleAddTransaction = useCallback((type: TransactionType, data: any) => {
        const newId = Date.now().toString();
        switch (type) {
            case 'income':
                setIncomes(prev => [...prev, { ...data, id: newId }]);
                break;
            case 'expense':
                setExpenses(prev => [...prev, { ...data, id: newId }]);
                break;
            case 'dues':
                setDues(prev => [...prev, { ...data, id: newId }]);
                break;
            case 'attendance':
                setAttendances(prev => [...prev, { ...data, id: newId }]);
                break;
        }
    }, []);
    
    const handleAddLink = useCallback((link: LinkItem) => {
        setLinks(prev => [...prev, link]);
    }, []);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'home':
                return <HomeScreen totals={totals} />;
            case 'menu':
                return <MenuScreen onAddTransaction={handleAddTransaction} />;
            case 'links':
                return <LinksScreen links={links} onAddLink={handleAddLink} />;
            case 'about':
                return <AboutScreen />;
            default:
                return <HomeScreen totals={totals} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <main className="flex-grow pb-20">
                <div className="container mx-auto px-4 py-6">
                    {renderScreen()}
                </div>
            </main>
            <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        </div>
    );
};

export default App;

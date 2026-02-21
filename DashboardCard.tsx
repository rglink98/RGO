
import React from 'react';

interface DashboardCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    colorClass: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, colorClass }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex items-center space-x-4`}>
            <div className={`p-3 rounded-full ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
            </div>
        </div>
    );
};

export default DashboardCard;

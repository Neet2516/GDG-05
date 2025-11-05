import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus } from 'react-icons/fa';
import ReminderForm from './ReminderForm'; 
import { useNavigate } from 'react-router';
// Key for Local Storage
const REMINDERS_STORAGE_KEY = 'healthsnapReminders';

// Sample Reminder component (unchanged)
const ReminderItem = ({ reminder, onToggle }) => (
    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm mb-3 max-w-lg">
        <div className="flex items-center space-x-4">
            {/* Toggle Switch */}
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input 
                        type="checkbox" 
                        checked={reminder.active} 
                        onChange={() => onToggle(reminder.id)} 
                        className="sr-only" 
                    />
                    <div className={`block w-12 h-6 rounded-full transition-colors duration-300 ${reminder.active ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${reminder.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            </label>
            <span className="text-lg font-medium text-gray-700">{reminder.name}</span>
        </div>
        <span className="text-xl font-bold text-blue-600">{reminder.time}</span>
    </div>
);

const RemindersPage = () => {
    
    // --- 1. Load Initial State from Local Storage ---
    const getInitialReminders = () => {
        try {
            const storedReminders = localStorage.getItem(REMINDERS_STORAGE_KEY);
            return storedReminders ? JSON.parse(storedReminders) : [];
        } catch (error) {
            console.error("Could not load reminders from local storage:", error);
            return [];
        }
    };
    const navigate = useNavigate();
    const [reminders, setReminders] = useState(getInitialReminders);
    const [isAdding, setIsAdding] = useState(false);

    // --- 2. Save Reminders to Local Storage on every 'reminders' state change ---
    useEffect(() => {
        try {
            localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
        } catch (error) {
            console.error("Could not save reminders to local storage:", error);
        }
    }, [reminders]);


    const handleToggleReminder = (id) => {
        setReminders(prev =>
            prev.map(r => (r.id === id ? { ...r, active: !r.active } : r))
        );
    };

    const handleSaveReminder = (newReminder) => {
        // Ensure the ID is unique for new reminders
        setReminders(prev => [
            ...prev,
            { ...newReminder, id: Date.now(), active: true }
        ]);
        setIsAdding(false);
    };

    if (isAdding) {
        return (
            <div className="p-8">
                <ReminderForm onSave={handleSaveReminder} onCancel={() => setIsAdding(false)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBell className="text-yellow-500 mr-3" /> My Reminders
                </h1>
                
                {reminders.length === 0 ? (
                    /* Empty State */
                    <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
                        <p className="text-lg text-gray-600 mb-4">You haven't set any reminder yet !</p>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            Start by adding your first medication or wellness activity
                        </button>
                    </div>
                ) : (
                    /* Reminder List */
                    <div className="mb-6">
                        {reminders.map(r => (
                            <ReminderItem key={r.id} reminder={r} onToggle={handleToggleReminder} />
                        ))}
                    </div>
                )}
                
                {/* Add New Reminder Button */}
                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center px-4 py-2 mt-4 bg-blue-100 text-blue-600 font-semibold rounded-full hover:bg-blue-200 transition-colors"
                >
                    <FaPlus className="mr-2 text-sm" /> Add New Reminder
                </button>
                
                {/* Back button for navigation */}
                <button
                    onClick={()=>{navigate('/dashboard')}}
                    className="mt-6 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default RemindersPage;
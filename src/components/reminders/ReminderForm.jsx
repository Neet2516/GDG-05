import React, { useState, useEffect } from 'react';
import { MdSave, MdClose, MdTimer } from 'react-icons/md';

// Helper function to format 24h time (HH:MM) to 12h time (HH:MM am/pm)
const formatTime12h = (time24h) => {
    if (!time24h) return 'Set Time';
    const [hours, minutes] = time24h.split(':').map(Number);
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12; 
    const minuteStr = minutes.toString().padStart(2, '0');
    return `${hour12}:${minuteStr} ${ampm}`;
};

// Helper function to parse 24h time into separate parts (for the TimePickerModal state)
const parseTime24h = (time24h) => {
    if (!time24h || time24h.length !== 5 || time24h.indexOf(':') === -1) {
        // Default to 10:21 AM if invalid/missing
        return { hour: 10, minute: 21, ampm: 'am' };
    }
    const [h24, m] = time24h.split(':').map(Number);
    const ampm = h24 >= 12 ? 'pm' : 'am';
    const hour = h24 % 12 || 12; // Convert 0 and 12 to 12
    return { hour, minute: m, ampm };
};


// --- Functional Time Picker Modal Component ---
const TimePickerModal = ({ initialTime24h, onSetTime, onClose }) => {
    
    // Convert 24h initial time to the internal 12h representation for editing
    const initialParts = parseTime24h(initialTime24h);

    const [hour, setHour] = useState(initialParts.hour);
    const [minute, setMinute] = useState(initialParts.minute);
    const [ampm, setAmpm] = useState(initialParts.ampm);

    const handleOk = () => {
        // Convert 12h parts back to 24h format (HH:MM)
        let h24 = hour;
        if (ampm === 'pm' && hour !== 12) {
            h24 += 12;
        } else if (ampm === 'am' && hour === 12) {
            h24 = 0; // Midnight
        }

        const newTime24h = `${String(h24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        onSetTime(newTime24h);
        onClose();
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-2xl border border-gray-300 z-20 w-64 md:w-72">
            <p className="text-base font-semibold text-gray-700 mb-3">Set time</p>
            <div className="flex items-center space-x-2">
                <input 
                    type="number" 
                    value={hour}
                    onChange={(e) => setHour(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-14 p-2 border border-gray-300 rounded text-center text-lg font-mono focus:border-blue-500"
                    min="1" max="12"
                />
                <span className="text-xl font-bold">:</span>
                <input 
                    type="number" 
                    value={String(minute).padStart(2, '0')}
                    onChange={(e) => setMinute(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 p-2 border border-gray-300 rounded text-center text-lg font-mono focus:border-blue-500"
                    min="0" max="59"
                />
                <select 
                    value={ampm}
                    onChange={(e) => setAmpm(e.target.value)}
                    className="p-2 border border-gray-300 rounded text-lg font-semibold focus:border-blue-500 appearance-none bg-white pr-6"
                >
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                </select>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
                <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-800 transition-colors px-3 py-1">CANCEL</button>
                <button 
                    onClick={handleOk} 
                    className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors px-3 py-1"
                >
                    OK
                </button>
            </div>
        </div>
    );
};
// --- End Functional Time Picker Modal Component ---


const ReminderForm = ({ initialData = {}, onSave, onCancel }) => {
    
    // State to manage the time in 24h format (HH:MM), which is easier for logic
    // We default to '10:21' to match the initial display in your design
    const [name, setName] = useState(initialData.name || '');
    const [time24h, setTime24h] = useState(initialData.time24h || '10:21'); 
    const [selectedDays, setSelectedDays] = useState(initialData.days || ['Mo', 'Tu', 'We', 'Th', 'Fr']);
    const [isEveryday, setIsEveryday] = useState(initialData.isEveryday || false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false); // New state to control modal

    const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    // Ensure initial days are set correctly if 'Everyday' is already true (e.g., loaded from storage)
    useEffect(() => {
        if (isEveryday && selectedDays.length !== 7) {
            setSelectedDays(DAYS);
        }
    }, [isEveryday, selectedDays.length]);


    const toggleDay = (day) => {
        if (isEveryday) return; 
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };
    
    const handleEverydayToggle = () => {
        const newState = !isEveryday;
        setIsEveryday(newState);
        if (newState) {
            setSelectedDays(DAYS); 
        } else {
            // Default to Mon-Fri when turning off 'Everyday'
            setSelectedDays(['Mo', 'Tu', 'We', 'Th', 'Fr']); 
        }
    };

    const handleSave = () => {
        onSave({ 
            name, 
            time: formatTime12h(time24h), // Save the display format (e.g., 10:21 am)
            time24h: time24h,            // Save the logic format (e.g., 10:21)
            days: isEveryday ? DAYS : selectedDays,
            isEveryday: isEveryday,
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <MdTimer className="text-blue-600 mr-2" /> Set New Reminder
            </h2>

            {/* Reminder Name */}
                        <div className="mb-8">
                            <label className="text-lg text-gray-700 block mb-2">
                                Reminder name <span className="text-sm text-red-600 font-semibold ml-2">Required</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Type here"
                                required
                                aria-required="true"
                                aria-invalid={name.trim() === '' ? 'true' : 'false'}
                                className={`w-full max-w-lg p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                    name.trim() === '' ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'
                                }`}
                            />
                            {name.trim() === '' && (
                                <p className="text-sm text-red-600 mt-2">This field cannot be blank.</p>
                            )}
                        </div>

                        {/* Reminder Times and Days */}
            <div>
                <label className="text-lg text-gray-700 block mb-4">Reminder times</label>
                
                <div className="relative border border-gray-300 rounded-lg p-4 max-w-lg">
                    
                    {/* Time Toggle Button */}
                    <button 
                        onClick={() => setIsTimePickerOpen(true)}
                        className="relative flex items-center space-x-2 p-2 bg-gray-100 rounded-full font-semibold text-blue-800 focus:outline-none"
                    >
                        {/* Toggle switch visual indicator */}
                        <div className={`w-8 h-4 rounded-full transition-all duration-300 ${isTimePickerOpen ? 'bg-blue-300' : 'bg-blue-600'}`}></div>
                        {/* Dynamic Time Display */}
                        <span>{formatTime12h(time24h)}</span>
                    </button>
                    
                    {/* The Functional Time Picker Modal */}
                    {isTimePickerOpen && (
                        <TimePickerModal 
                            initialTime24h={time24h} 
                            onSetTime={setTime24h} 
                            onClose={() => setIsTimePickerOpen(false)} 
                        />
                    )}

                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-3">Set reminder day & time</p>
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                                {DAYS.map(day => (
                                    <button
                                        key={day}
                                        onClick={() => toggleDay(day)}
                                        className={`w-10 h-10 rounded-full font-semibold transition-colors duration-200 ${
                                            selectedDays.includes(day)
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                        }`}
                                        disabled={isEveryday} // Disabled if 'Everyday' is checked
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Everyday Checkbox */}
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isEveryday}
                                    onChange={handleEverydayToggle}
                                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-700">Everyday</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end space-x-4">
                <button
                    onClick={onCancel}
                    className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <MdClose className="mr-2" /> Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <MdSave className="mr-2" /> Save Reminder
                </button>
            </div>
        </div>
    );
};

export default ReminderForm;
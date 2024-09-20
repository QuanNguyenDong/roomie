import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from "framer-motion";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    startOfWeek,
    endOfWeek,
} from 'date-fns';
import getUserProfile from "../services/getUserProfile";

const events = [
    { id: 1, name: 'Leslie Alexander', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2024-09-11T13:00', endDatetime: '2024-09-11T14:30' },
    { id: 2, name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2024-09-11T13:00', endDatetime: '2024-09-11T14:30' },
    { id: 3, name: 'Dries Vincent', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2024-09-11T13:00', endDatetime: '2024-09-11T14:30' },
    { id: 45, name: 'Michael Foster', imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2024-09-11T13:00', endDatetime: '2024-09-11T14:30' },
    { id: 5, name: 'John Doe', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2022-05-22T12:00', endDatetime: '2022-05-22T13:30' },
    { id: 6, name: 'Jane Smith', imageUrl: 'https://images.unsplash.com/photo-1530577197743-7adf14294584?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2022-05-25T10:00', endDatetime: '2022-05-25T11:30' },
    { id: 7, name: 'Samuel Green', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2022-05-30T15:00', endDatetime: '2022-05-30T16:30' },
    { id: 8, name: 'Nina Brown', imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', startDatetime: '2022-06-02T09:00', endDatetime: '2022-06-02T10:30' },
];
  
let colClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

function Calendar() {
    let navigate = useNavigate();

    let [user, setUser] = useState({});
    let [selectedDay, setSelectedDay] = useState(startOfToday());
    let [currentMonth, setCurrentMonth] = useState(format(startOfToday(), 'MMM-yyyy'));
    let [modalState, setModalState] = useState({ open: false, expanded: false });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            getUserProfile()
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => navigate("/"));
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    const handleDayClick = (day) => {
        if (!modalState.open) {
            setSelectedDay(day);
            setModalState({ open: true, expanded: false });
        } else {
            if (isEqual(day, selectedDay)) {
                setModalState(prevState => ({ ...prevState, expanded: !prevState.expanded }));
            } else {
                setSelectedDay(day);
            }
        }
    };

    const closeModal = () => {
        setModalState({ open: false, expanded: false });
    };

    const toggleExpandModal = () => {
        setModalState(prevState => ({
            open: prevState.open,
            expanded: !prevState.expanded
        }));
    };

    // const handleMouseEnter = () => {
    //     setModalState({ open: true, expanded: true });
    // };

    // const handleMouseLeave = () => {
    //     setModalState({ open: true, expanded: false });
    // };

    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    const day = format(selectedDay, 'd');
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;

    const getSelectedWeekDays = () => {
        const startOfSelectedWeek = startOfWeek(selectedDay, { weekStartsOn: 0 });
        const endOfSelectedWeek = endOfWeek(selectedDay, { weekStartsOn: 0 });
        return eachDayOfInterval({ start: startOfSelectedWeek, end: endOfSelectedWeek });
    };
    
    let days = (modalState.open && modalState.expanded) ? getSelectedWeekDays() : eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    const handleDatesChange = (direction) => {
        if (modalState.expanded && modalState.open) {
            const newSelectedDay = add(selectedDay, { days: direction * 7 });
            setSelectedDay(newSelectedDay);

            const newMonth = format(newSelectedDay, 'MMM-yyyy');
            if (newMonth !== currentMonth) {
                setCurrentMonth(newMonth);
            }
            
        } else {
            const newMonth = add(firstDayCurrentMonth, { months: direction });
            setCurrentMonth(format(newMonth, 'MMM-yyyy'));
        }
    };

    return (
        <div className="max-w-[520px] mx-auto h-full text-black">
            <div class="flex justify-between h-10 mb-6 mx-8">
                <text className="text-4xl font-bold font-lexend">Calendar</text>
            </div>

            <div className="pt-4">
                <div className="max-w-md px-4 mx-auto">
                    <div className="flex items-center justify-between mx-6">
                        <div className="flex flex-row">
                            <text className="text-xl font-medium mr-3">
                                {format(firstDayCurrentMonth, 'MMMM')}
                            </text>
                            <text className="text-xl font-thin">
                                {format(firstDayCurrentMonth, 'yyyy')}
                            </text>
                        </div>
                        <div className="flex flex-row">
                            <button
                                type="button"
                                onClick={() => handleDatesChange(-1)}
                                className="-my-1.5 p-1.5 text-[#111827] hover:text-gray-500"
                            >
                                <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => handleDatesChange(1)}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 p-1.5 text-[#111827] hover:text-gray-500"
                            >
                                <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="relative grid grid-cols-7 mt-10 text-xs font-semibold leading-6 text-center text-black z-2"
                        style={{ zIndex: 1 }}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, idx) => (
                            <div
                                key={dayName}
                                className={classNames(
                                    modalState.open && modalState.expanded && getDay(selectedDay) === idx ? 'text-white' : 'text-black'
                                )}
                            >
                                {dayName}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colClasses[getDay(day)],
                                    'py-1.5'
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDayClick(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) && isToday(day) && 'text-red-500',
                                        !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                        !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                        isEqual(day, selectedDay) && !isToday(day) && 'bg-black',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                        isEqual(day, selectedDay) && modalState.expanded && modalState.open
                                            ? 'relative w-[55px] h-[85px] rounded-[26px] text-white translate-x-[2px] translate-y-[-47.5px]'
                                            : 'static w-8 h-8 mx-auto flex items-center justify-center rounded-full'
                                    )}
                                >
                                    <div
                                        className={`flex items-center justify-center h-full w-full ${modalState.expanded && isEqual(day, selectedDay) && modalState.open
                                                ? 'translate-y-[23%]'
                                                : ''
                                            }`}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </div>
                                </button>
                                
                                <div className="w-1 h-1 mx-auto mt-1">
                                    {events.some((event) =>
                                        isSameDay(parseISO(event.startDatetime), day)
                                    ) && (
                                            <div className="`w-1 h-1 rounded-full bg-sky-500"/>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <AnimatePresence>
                    {modalState.open && (
                        <motion.div
                            className="max-w-[520px] mx-auto fixed bottom-0 left-0 right-0 rounded-t-[2.5rem] bg-black text-white font-poppins"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%", height: modalState.expanded ? "60%" : "33%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            // onMouseEnter={() => setModalState({ ...modalState, expanded: true })}
                            // onMouseLeave={() => setModalState({ ...modalState, expanded: false })}
                            onClick={toggleExpandModal}
                        >
                            <div 
                                className="flex justify-between items-center px-10 pt-4 cursor-pointer">
                                <h3 className="text-md">
                                    {format(selectedDay, `eeee, `)}{dayWithSuffix} {format(selectedDay, 'MMMM')}
                                </h3>
                                {/* <button onClick={toggleExpandModal} className="text-white">
                                    {modalState.expanded ? 'v' : '^'}
                                </button> */}
                                <button onClick={closeModal} className="text-red-400">x</button>
                            </div>

                            <div className="rounded-t-[2.5rem] mt-5 space-y-4 bg-white h-full pt-10 pb-44 px-10 overflow-y-auto">
                                {events.filter(event => isSameDay(parseISO(event.startDatetime), selectedDay)).length > 0 ? (
                                    events.filter(event => isSameDay(parseISO(event.startDatetime), selectedDay)).map(event => (
                                        <div key={event.id} className="p-4 border-l-[8px] h-24 border-[1px] border-blue-500 bg-white shadow-md rounded-2xl">
                                            <div className="flex items-center space-x-4">
                                                <img src={event.imageUrl} alt={event.name} className="w-12 h-12 rounded-full" />
                                                <div>
                                                    <h4 className="text-lg font-bold">{event.name}</h4>
                                                    <p className="text-sm">{format(parseISO(event.startDatetime), 'p')} - {format(parseISO(event.endDatetime), 'p')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-gray-500">No events today</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
            <div className="h-40"></div>
        </div>
    );
}

export default Calendar;

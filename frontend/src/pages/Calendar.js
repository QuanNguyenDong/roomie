import React, { useState, useEffect, useCallback } from "react";

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

import { getAllActiveTaskAssignment } from "../services/Task/getActiveTaskAssignment.js";
import { getEvents } from "../services/Event/getEvents.js";
import { initGoogleApiClient, syncCalendarEvents } from '../services/Event/syncCalendar.js';

import SyncIcon from "../svgs/Calendar/Sync.js";

let colClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

const labelColours = [
    "#3176A8", "#42A079", "#7742A0", "#A04842", "#A07542",
    "#DA70D6", "#8A2BE2", "#20B2AA", "#FF6347", "#4682B4"
];

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

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function Calendar() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedUser, setSelectedUser] = useState('All');
    const [users, setUsers] = useState([]);
    const [selectedDay, setSelectedDay] = useState(startOfToday());
    const [currentMonth, setCurrentMonth] = useState(format(startOfToday(), 'MMM-yyyy'));
    const [modalState, setModalState] = useState({ open: false, expanded: false });

    useEffect(() => {
        const initializeGoogleApi = async () => {
            try {
                await initGoogleApiClient();
            } catch (error) {
                console.error("Failed to initialize Google API client", error);
            }
        };
        initializeGoogleApi();
    }, []);

    const fetchAndSetData = useCallback(async () => {
        try {
            const fetchedTasks = await getAllActiveTaskAssignment();
            const fetchedEvents = await getEvents();

            const formattedTasks = fetchedTasks.map(task => {
                task.dueDate = calculateDueDate(task.startDate, task.frequency);
                task.endDate = new Date(new Date(task.startDate).getTime() + task.duration * 60 * 1000).toISOString();
                return task;
            });

            const uniqueUsers = ['All', ...new Set(formattedTasks.map(task => task.username))];

            setUsers(uniqueUsers);
            setTasks(formattedTasks);
            setFilteredTasks(formattedTasks);

            const formattedEvents = fetchedEvents.map(event => ({
                eventname: event.eventname,
                startDate: event.startDate,
                endDate: event.endDate,
                user: event.user,
            }));

            setEvents(formattedEvents);
            setFilteredEvents(formattedEvents);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchAndSetData();
    }, [fetchAndSetData]);

    const syncCalendar = async () => {
        try {
            await syncCalendarEvents();

            const updatedEvents = await getEvents();

            const formattedEvents = updatedEvents.map(event => ({
                eventname: event.eventname,
                startDate: event.startDate,
                endDate: event.endDate,
                user: event.user,
            }));

            setEvents(formattedEvents);
            setFilteredEvents(formattedEvents);
        } catch (error) {
            console.error('Error syncing calendar:', error);
        }
    };

    const filterByUser = (user) => {
        setSelectedUser(user);
        if (user === 'All') {
            fetchAndSetData();
        } else {
            const filteredTasks = tasks.filter(task => task.username === user);
            const filteredEvents = events.filter(event => event.user.username === user);
            setFilteredTasks(filteredTasks);
            setFilteredEvents(filteredEvents);
        }
    };

    const combineAndSortItems = (tasks, events) => {
        const combinedItems = [...tasks, ...events];
        return combinedItems.sort((a, b) => {
            const dateA = parseISO(a.dueDate || a.startDate);
            const dateB = parseISO(b.dueDate || b.startDate);
            return dateA - dateB;
        });
    };

    const calculateDueDate = (startDate, frequency) => {
        const start = new Date(startDate);
        const dueDate = new Date(start);
        dueDate.setDate(start.getDate() + frequency);
        return dueDate.toISOString();
    };

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

    const closeModal = () => {
        setModalState({ open: false, expanded: false });
    };

    const toggleExpandModal = () => {
        setModalState(prevState => ({
            open: prevState.open,
            expanded: !prevState.expanded
        }));
    };

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

    const getUnderline = (day) => {
        const hasTasks = filteredTasks.some(task => isSameDay(parseISO(task.dueDate), day));
        const hasEvents = filteredEvents.some(event => isSameDay(parseISO(event.startDate), day));

        if (hasTasks && hasEvents) {
            return 'bg-gradient-to-r from-sky-500 to-purple-500 h-1 w-[32px]';
        } else if (hasTasks) {
            return 'bg-sky-500 h-1 w-[32px]';
        } else if (hasEvents) {
            return 'bg-purple-500 h-1 w-[32px]';
        }
        return 'h-1 w-full';
    };


    return (
        <div className="max-w-[520px] mx-auto h-full text-black">
            <div className="flex justify-between h-10 mb-6 mx-8">
                <text className="text-4xl font-bold font-lexend">Calendar</text>
            </div>

            <div className="flex overflow-x-auto mx-8 space-x-2 mb-4 scrollbar-hide">
                {users.map((user, idx) => {
                    const bgColor = labelColours[idx % labelColours.length];

                    return (
                        <button
                            key={user}
                            onClick={() => filterByUser(user)}
                            className="flex items-center rounded-full bg-teal-400/10 px-6 py-1 text-xs font-medium leading-5 text-selected"
                            style={{ backgroundColor: selectedUser === user ? bgColor : '#cdcdcd' }}
                        >
                            {capitalizeFirstLetter(user)}
                        </button>
                    );
                })}
            </div>

            <div className="pt-4">
                <div className="max-w-md px-4 mx-auto">
                    <div className="flex items-center justify-between mx-6">
                        <div className="flex flex-row">
                            <span className="text-xl font-medium mr-3">
                                {format(firstDayCurrentMonth, 'MMMM')}
                            </span>
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
                                key={idx}
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
                                    'py-1.5 relative'
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

                                <div className={`${getUnderline(day)} absolute w-[32px] bottom-0 left-[15px]`} />

                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-7">
                        <button onClick={syncCalendar}>
                            <SyncIcon fill="black" />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {modalState.open && (
                        <motion.div
                            className="max-w-[520px] mx-auto fixed bottom-0 left-0 right-0 rounded-t-[2.5rem] bg-black text-white font-poppins"
                            initial={{ y: "100%" }}
                            animate={{ y: "0%", height: modalState.expanded ? "56%" : "33%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                                {combineAndSortItems(filteredTasks, filteredEvents).filter(item => isSameDay(parseISO(item.dueDate || item.startDate), selectedDay)).length > 0 ? (
                                    combineAndSortItems(filteredTasks, filteredEvents).filter(item => isSameDay(parseISO(item.dueDate || item.startDate), selectedDay)).map(item => (
                                        <div key={item.id} className={`p-4 border-l-[8px] border-[1px] h-24 ${item.eventname ? 'border-purple-500' : 'border-blue-500'} bg-white shadow-md rounded-2xl`}>
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-[#7D8D9C] w-8 h-8 rounded-full mt-2 flex items-center justify-center">
                                                    <text className="text-base font-semibold">
                                                        {item.user?.fullname?.charAt(0)?.toUpperCase() || item.fullname?.charAt(0)?.toUpperCase()}
                                                    </text>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-black">{item.eventname || item.taskname}</h4>
                                                    <p className="text-sm text-black">{format(parseISO(item.dueDate || item.startDate), 'p')} - {format(parseISO(item.endDate || item.endDate), 'p')}</p>
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
        </div>
    );
}

export default Calendar;

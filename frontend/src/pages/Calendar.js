import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

import getUserProfile from "../services/User/getUserProfile";
import { getAllTasks } from "../services/Task/getTasks.js";
import { getHomeEvents } from "../services/Event/getEvents.js";
import { initGoogleApiClient, syncCalendarEvents } from '../services/Event/syncCalendar.js';

import TaskModal from "./TaskCard.js";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import SyncIcon from "../svgs/Calendar/Sync.js";
import CloseIconWhite from "../svgs/Calendar/CloseIconWhite.js";

let colClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

const labelColours = [
    "#7ABAE9", "#8CCDB2", "#AC8BC6", "#C57F7B", "#E0BDA9",
    "#DA70D6", "#8A2BE2", "#20B2AA", "#FF6347", "#4682B4"
];

const priorityColors = {
    High: "#C49191",
    Medium: "#D8AF8A",
    Low: "#9DB492",
};

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
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedUser, setSelectedUser] = useState('All');
    const [selectedTask, setSelectedTask] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedDay, setSelectedDay] = useState(startOfToday());
    const [currentMonth, setCurrentMonth] = useState(format(startOfToday(), 'MMM-yyyy'));
    const [modalState, setModalState] = useState({ open: false, expanded: false });

    let navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            getUserProfile()
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                    } else navigate("/");
                })
                .catch((error) => navigate("/"));
        } else {
            setUser(storedUser);
        }

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
            const fetchedTasks = await getAllTasks();
            const fetchedEvents = await getHomeEvents();

            const formattedTasks = fetchedTasks.map(task => {
                task.dueDate = calculateDueDate(task.startDate, task.frequency);
                task.endDate = new Date(new Date(task.startDate).getTime() + task.duration * 60 * 1000).toISOString();
                return task;
            });
            const formattedEvents = fetchedEvents.map(event => ({
                eventname: event.eventname,
                startDate: event.startDate,
                endDate: event.endDate,
                user: event.user,
            }));

            const uniqueTaskUsers = formattedTasks.map(task => task.username);
            const uniqueEventUsers = formattedEvents.map(event => event.user.username);

            const allUsers = ['All', ...new Set([...uniqueTaskUsers, ...uniqueEventUsers])];

            setTasks(formattedTasks);
            setFilteredTasks(formattedTasks);
            setEvents(formattedEvents);
            setFilteredEvents(formattedEvents);
            setUsers(allUsers);
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

            const updatedEvents = await getHomeEvents();

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

    const openTaskModal = async (task) => {
        setSelectedTask(task);
    };

    const closeTaskModal = () => {
        setSelectedTask(null);
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

        if (modalState.open && modalState.expanded)
            return 'bg-transparent h-1 w-[30px] rounded-lg'

        if (hasTasks && hasEvents) {
            return 'bg-gradient-to-r from-sky-500 to-purple-500 h-1 w-[30px] rounded-lg';
        } else if (hasTasks) {
            return 'bg-sky-500 h-1 w-[30px] rounded-lg';
        } else if (hasEvents) {
            return 'bg-purple-500 h-1 w-[30px] rounded-lg';
        }
        return 'h-1 w-full';
    };

    return (
        <div className="max-w-[520px] mx-auto h-full text-black">
            <div className="flex h-10 mb-2 mx-8">
                <text className="text-3xl font-bold font-lexend ml-10">
                    Calendar
                </text>
                <button onClick={syncCalendar} className="ml-2">
                    <SyncIcon />
                </button>
            </div>
            <div className="max-w-md px-4 mx-auto">
                <div className="flex flex-row mb-2">
                    <div className="flex flex-row ml-8">
                        <div className="w-2 h-2 bg-sky-500 rounded mt-2" />
                        <text className="text-md font-light ml-2">Tasks</text>
                    </div>
                    <div className="flex flex-row ml-3">
                        <div className="w-2 h-2 bg-purple-500 rounded mt-2" />
                        <text className="text-md font-light ml-2">Events</text>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ y: 0 }}
                animate={{ y: modalState.expanded && modalState.open ? -60 : 0 }}
                exit={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="mt-4">
                    <div className="max-w-md px-4 mx-auto z-10">
                        <div className="overflow-hidden mx-6">
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: modalState.expanded && modalState.open ? -60 : 0 }}
                                exit={{ y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="flex overflow-x-auto w-full space-x-2 mt-2"
                            >
                                {users.length === 0 ? (
                                    <button className="flex items-center rounded-full bg-gray-400/10 px-6 py-1 text-xs font-bold leading-5 text-gray-500" disabled>
                                        You
                                    </button>
                                ) : (
                                    (() => {
                                        const currentUserIndex = users.indexOf(user.username);
                                        let reorderedUsers = [...users];
                                        if (currentUserIndex !== -1) {
                                            reorderedUsers.splice(currentUserIndex, 1);
                                            reorderedUsers.splice(1, 0, user.username);
                                        }
                                        
                                        return reorderedUsers.map((usr, idx) => {
                                            const bgColor = labelColours[idx % labelColours.length];
                                            const strName = (usr === user.username ? "You" : usr);

                                            return (
                                                <button
                                                    key={usr}
                                                    onClick={() => filterByUser(usr)}
                                                    className="flex items-center rounded-full bg-teal-400/10 px-5 py-1 text-xs font-bold leading-5 text-selected"
                                                    style={{
                                                        backgroundColor: selectedUser === usr ? bgColor : '#E3E3E3',
                                                        color: selectedUser === usr ? "#fff" : "#000",
                                                        fontWeight: "500"
                                                    }}
                                                >
                                                    {capitalizeFirstLetter(strName)}
                                                </button>
                                            );
                                        });
                                    })()
                                )}
                            </motion.div>
                        </div>

                        <div className="flex items-center justify-between mx-6 mt-4">
                            <div className="flex flex-row">
                                <span className="text-xl font-medium mr-3">
                                    {format(firstDayCurrentMonth, 'MMMM')}
                                </span>
                                <text className="text-xl font-thin">
                                    {format(firstDayCurrentMonth, 'yyyy')}
                                </text>
                            </div>
                            <div className="flex flex-row z-20">
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

                        <div className="relative grid grid-cols-7 mt-4 text-xs font-semibold leading-6 text-center text-black">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, idx) => (
                                <div
                                    key={idx}
                                    className={classNames(
                                        modalState.open && modalState.expanded && getDay(selectedDay) === idx
                                            ? 'text-white z-10 relative'
                                            : 'text-black z-0'
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
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {modalState.open && (
                    <motion.div
                        className="max-w-[520px] mx-auto fixed bottom-0 left-0 right-0 rounded-t-[2.5rem] bg-black text-white font-poppins"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%", height: modalState.expanded ? "63%" : "40%" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={toggleExpandModal}
                    >
                        <div
                            className="flex justify-between items-center px-10 pt-4 cursor-pointer">
                            <h3 className="text-md">
                                {format(selectedDay, `eeee, `)}{dayWithSuffix} {format(selectedDay, 'MMMM')}
                            </h3>
                            <button onClick={closeModal}>
                                <CloseIconWhite />
                            </button>
                        </div>

                        <div className="rounded-t-[2.5rem] mt-5 space-y-4 bg-white h-full pt-10 pb-44 px-10 overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}>
                            {combineAndSortItems(filteredTasks, filteredEvents).filter(item => isSameDay(parseISO(item.dueDate || item.startDate), selectedDay)).length > 0 ? (
                                combineAndSortItems(filteredTasks, filteredEvents).filter(item => isSameDay(parseISO(item.dueDate || item.startDate), selectedDay)).map(item => (
                                    <div
                                        key={item.id}
                                        className={`p-4 border-l-[8px] border-[1px] h-24 bg-white shadow-md rounded-2xl ${item.taskname ? 'cursor-pointer' : ''}`}
                                        style={{ borderColor: item.taskname ? priorityColors[item.priority] : (item.eventname ? '#7742A0' : '#3176A8') }}
                                        onClick={() => {
                                            if (item.taskname)
                                                openTaskModal(item);
                                        }}>
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-[#7D8D9C] w-12 h-12 rounded-full mt-2 flex items-center justify-center">
                                                <text className="text-base text-lg font-semibold">
                                                    {
                                                        item.user?.fullname
                                                            ? item.user.fullname.split(' ')
                                                                .map(name => name.charAt(0).toUpperCase())
                                                                .join('')
                                                            : item.fullname.split(' ')
                                                                .map(name => name.charAt(0).toUpperCase())
                                                                .join('')
                                                    }
                                                </text>
                                            </div>
                                            <div>
                                                <h4 className="text-[14px] mt-2 font-bold text-black">{item.eventname || item.taskname}</h4>
                                                <p className="text-[12px] mt-1 text-black">{format(parseISO(item.dueDate || item.startDate), 'p')} - {format(parseISO(item.endDate || item.endDate), 'p')}</p>
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

            <TaskModal
                user={user}
                taskuser={selectedTask?.userId}
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={closeTaskModal}
            />
        </div>
    );
}

export default Calendar;

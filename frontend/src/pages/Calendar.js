import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

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
} from 'date-fns'

import getUserProfile from "../services/getUserProfile";

let colClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

const events = [
    {
        id: 1,
        name: 'Team Meeting',
        startDatetime: '2024-09-20T09:00',
        endDatetime: '2024-09-20T10:30',
    },
    {
        id: 2,
        name: 'Code Review',
        startDatetime: '2024-09-17T14:00',
        endDatetime: '2024-09-17T15:30',
    },
    {
        id: 3,
        name: 'Workshop',
        startDatetime: '2024-10-25T11:00',
        endDatetime: '2024-10-25T12:30',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Calendar() {
    const [user, setUser] = useState({});
    let navigate = useNavigate();

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

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    return (
        <div className="max-w-[520px] mx-auto h-full text-black">
            <div class="flex justify-between h-10 mb-6 mx-8">
                <text className="text-4xl font-bold font-lexend">Calendar</text>
            </div>

            <div className="pt-4">
                <div className="max-w-md px-4 mx-auto">
                    <div className="flex items-center justify-between mx-6">
                        <div className="flex flex-row">
                            <h2 className="text-xl font-medium mr-2">
                                {format(firstDayCurrentMonth, 'MMMM')}
                            </h2>
                            <h2 className="text-xl font-thin">
                                {format(firstDayCurrentMonth, 'yyyy')}
                            </h2>
                        </div>
                        <div class="flex flex-row">
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 p-1.5 text-[#111827] hover:text-gray-500"
                            >
                                <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 p-1.5 text-[#111827] hover:text-gray-500"
                            >
                                <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
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
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-red-500',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-900',
                                        !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                        isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-gray-900',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                        (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>

                                <div className="w-1 h-1 mx-auto mt-1">
                                    {events.some((event) =>
                                        isSameDay(parseISO(event.startDatetime), day)
                                    ) && (
                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div class="h-40"></div>
        </div>
    );
}

export default Calendar;


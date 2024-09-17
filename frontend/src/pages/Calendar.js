import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
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
} from 'date-fns';
import getUserProfile from "../services/getUserProfile";

const meetings = [
    {
      id: 1,
      name: 'Leslie Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-11T13:00',
      endDatetime: '2022-05-11T14:30',
    },
    {
      id: 2,
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-20T09:00',
      endDatetime: '2022-05-20T11:30',
    },
    {
      id: 3,
      name: 'Dries Vincent',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-20T17:00',
      endDatetime: '2022-05-20T18:30',
    },
    {
      id:45,
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-13T14:00',
      endDatetime: '2022-05-13T14:30',
    },
    {
      id: 5,
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-22T12:00',
      endDatetime: '2022-05-22T13:30',
    },
    {
      id: 6,
      name: 'Jane Smith',
      imageUrl:
        'https://images.unsplash.com/photo-1530577197743-7adf14294584?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-25T10:00',
      endDatetime: '2022-05-25T11:30',
    },
    {
      id: 7,
      name: 'Samuel Green',
      imageUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-05-30T15:00',
      endDatetime: '2022-05-30T16:30',
    },
    {
      id: 8,
      name: 'Nina Brown',
      imageUrl:
        'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      startDatetime: '2022-06-02T09:00',
      endDatetime: '2022-06-02T10:30',
    },
  ];
  
let colClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
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

    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    // Filter meetings for the selected day
    const filteredMeetings = meetings.filter(meeting =>
        isSameDay(parseISO(meeting.startDatetime), selectedDay)
    );

    function previousMonth() {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    }

    return (
        <div className="max-w-[520px] mx-auto h-full text-black font-poppins">
            <div className="flex justify-between h-10 mb-6 mx-8">
                <text className="text-4xl font-bold font-lexend">Calendar</text>
            </div>

            <div className="pt-4">
                <div className="max-w-md px-4 mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row">
                            <h2 className="text-xl mr-3">
                                {format(firstDayCurrentMonth, 'MMMM')}
                            </h2>
                            <h2 className="text-xl font-thin">
                                {format(firstDayCurrentMonth, 'yyyy')}
                            </h2>
                        </div>
                        <div className="flex flex-row">
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
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
                                    {meetings.some((meeting) =>
                                        isSameDay(parseISO(meeting.startDatetime), day)
                                    ) && (
                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Day Frame for selected day */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">
                        Events for {format(selectedDay, 'MMMM d, yyyy')}
                    </h3>
                    <div className="mt-4 space-y-4">
                        {filteredMeetings.length > 0 ? (
                            filteredMeetings.map(meeting => (
                                <div key={meeting.id} className="p-4 border-l-4 border-blue-500 bg-white shadow-md rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img src={meeting.imageUrl} alt={meeting.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="text-sm font-medium">{meeting.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {format(parseISO(meeting.startDatetime), 'h:mm a')} - {format(parseISO(meeting.endDatetime), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No events for this day</p>
                        )}
                    </div>
                </div>

            </div>
            <div className="h-40"></div>
        </div>
    );
}

export default Calendar;

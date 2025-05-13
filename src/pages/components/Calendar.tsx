"use client";
import Image from "next/image";
import EmptyEvents from "../assets/empty-events.svg";
import { useState, useEffect } from "react";
import axios from "axios";

interface Event {
  id: string;
  date: string;
  name: string;
  speaker: {
    name: string;
    role: string;
    photo_url: string;
  };
  watchlist_url: string;
}

export default function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("NOVEMBER");
  const [currentYear, setCurrentYear] = useState(2023);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://api.npoint.io/3ffc10b11b4dd82745be');
        setEvents(response.data);
        // Set initial month to October since events are in October
        setCurrentMonth('OCTOBER');
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const fontStyle = {
    fontFamily: "'Inter', sans-serif",
    fontFeatureSettings: "'tnum'"
  };
  const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];
  const years = Array.from({length: 10}, (_, i) => 2023 + i);
  return (
    <div className="relative z-10 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl mx-auto mt-6 sm:mt-10 md:mt-16 lg:mt-20 bg-white rounded-2xl shadow-lg">
      {/* MacOS Visual Elements langsung di background card */}
      <div className="relative h-8 bg-white rounded-t-2xl border border-b-0 flex items-center justify-center">
        {/* Bulatan macOS */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        {/* Title */}
        <span className="text-[10px] sm:text-xs text-gray-400 font-[Poppins] select-none">
          the rolling stones events 2023
        </span>
      </div>

      {/* Calendar Content dengan padding yang sesuai */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto max-w-[320px] sm:max-w-[360px]">
            {selectedEvent ? (
              <div className="w-full">
                <div className="text-black font-bold text-2xl mb-2">
                  AVAILABLE ON
                </div>
                <div className="text-[#FF002B] font-bold text-4xl mb-4">
                  {new Date(selectedEvent.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <Image 
                    src={selectedEvent.speaker.photo_url} 
                    width={48} 
                    height={48} 
                    className="rounded-full" 
                    alt={selectedEvent.speaker.name}
                  />
                  <div>
                    <p className="font-bold text-black text-lg">{selectedEvent.speaker.name}</p>
                    <p className="text-black">{selectedEvent.speaker.role}</p>
                  </div>
                </div>
                <h3 className="text-2xl text-black font-bold mb-4">{selectedEvent.name}</h3>
              
                <button 
                  onClick={() => window.open(selectedEvent.watchlist_url, '_blank')}
                  className="w-full bg-[#FF002B] text-white py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  JOIN WATCHLIST
                </button>
              </div>
            ) : (
              <>
                <Image src={EmptyEvents} className="w-full h-auto" alt="Image Calender"/>
                <p className="mt-2 sm:mt-3 text-center md:text-left text-[10px] sm:text-xs text-black font-normal">
              There are no events on this date
            </p>
              </>
            )}
          </div>
          <div className="flex-1 w-full max-w-[360px] sm:max-w-[400px] md:max-w-none">
            <h2 className="font-extrabold text-lg sm:text-xl mb-4 sm:mb-5 text-black">
              Pick a date and time
            </h2>
            <div className="flex items-center justify-between w-full max-w-[320px] sm:max-w-sm mb-4 sm:mb-5 text-black font-normal text-sm sm:text-base">
              <button
                aria-label="Previous month"
                className="text-black hover:text-red-600 transition-colors p-1"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 sm:px-4 py-1 font-[Poppins] transition-colors"
              >
                {currentMonth} {currentYear}
              </button>

              {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div style={fontStyle} className="bg-white rounded-3xl shadow-lg w-full max-w-lg p-8 sm:p-10">
                    {/* Year Navigation */}
                    <div className="flex items-center justify-between mb-8">
                      <button
                        aria-label="Previous year"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() => setCurrentYear(currentYear - 1)}
                      >
                        <svg
                          className="w-6 h-6 text-black"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      <h1 className="text-4xl font-extrabold text-[#FF002B] select-none">
                        {currentYear}
                      </h1>

                      <button
                        aria-label="Next year"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFCDD4] hover:bg-[#FFB6BC]"
                        onClick={() => setCurrentYear(currentYear + 1)}
                      >
                        <svg
                          className="w-6 h-6 text-[#FF002B]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>

                    {/* Month Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      {months.map((month) => {
                        let className =
                          "bg-gray-200 rounded-md py-3 font-extrabold text-black select-none";

                        if (month === currentMonth) {
                          className =
                            "bg-[#FF002B] rounded-md py-3 font-extrabold text-[#FFCDD4] select-none";
                        } else if (month === months[(months.indexOf(currentMonth) + 1) % 12]) {
                          className =
                            "bg-[#FFCDD4] rounded-md py-3 font-extrabold text-[#FF002B] select-none";
                        }

                        return (
                          <button
                            key={month}
                            type="button"
                            onClick={() => {
                              setCurrentMonth(month);
                              setShowModal(false);
                            }}
                            className={className}
                          >
                            {month}
                          </button>
                        );
                      })}
                    </div>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="w-full py-3 font-extrabold text-black rounded-full border border-black select-none hover:bg-gray-100 transition"
                    >
                      CLOSE
                    </button>
                  </div>
              </div>
              )}
              <button
                aria-label="Next month"
                className="text-black hover:text-red-600 transition-colors p-1"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-center border-collapse select-none">
              <thead>
                  <tr className="text-red-600 font-extrabold text-[10px] sm:text-xs md:text-sm">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <th key={d} className="pb-1 sm:pb-2">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
                <tbody className="text-[10px] sm:text-xs md:text-sm font-normal text-black">
                {[0, 1, 2, 3, 4, 5].map((week) => (
                  <tr key={week}>
                    {Array(7)
                      .fill(0)
                      .map((_, day) => {
                        const date = week * 7 + day - 1;
                        let className = "";
                        let content = date;

                          const currentDate = new Date(currentYear, months.indexOf(currentMonth), date);
                          const formattedDate = currentDate.toISOString();
                          const hasEvent = events.some(event => new Date(event.date).toDateString() === currentDate.toDateString());

                          if (hasEvent) {
                            className = "text-white font-bold bg-red-600 rounded-full w-5 h-5 sm:w-6 sm:h-6 mx-auto cursor-pointer";
                        }

                        return (
                          <td
                            key={day}
                              className={`py-1 sm:py-2 ${date < 1 || date > 30 ? "text-gray-400" : undefined}`}
                              onClick={() => {
                                if (date > 0 && date <= 30) {
                                  const clickedDate = new Date(currentYear, months.indexOf(currentMonth), date);
                                  const event = events.find(e => new Date(e.date).toDateString() === clickedDate.toDateString());
                                  setSelectedEvent(event || null);
                                  setSelectedDate(clickedDate.toISOString());
                            }
                              }}
                          >
                            {className ? (
                              <span
                                className={className}
                                style={{
                                  backgroundColor: className.includes(
                                    "bg-red-600"
                                  )
                                    ? undefined
                                    : "#f9c1c7",
                                }}
                              >
                                {date}
                              </span>
                            ) : date > 0 && date <= 30 ? (
                              date
                            ) : null}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

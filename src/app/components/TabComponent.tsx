'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

interface tabData {
  teamData: [];
  filterName: string;
}

function TabComponent({ teamData, filterName }: tabData) {
  const [teamInfo, setTeamInfo] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTeamInfo(teamData);
    setLoading(false);
  }, []);

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center ">
        <button
          className={`px-2 py-3 w-1/3 bg-slate-100 ${
            activeTab === 1 && 'bg-blue-400 text-blue-400'
          } duration-150 rounded-bl-xl`}
          onClick={() => setActiveTab(1)}
        >
          Attendence
        </button>

        <button
          className={`px-2 py-3 w-1/3 bg-slate-100 ${
            activeTab === 2 && 'bg-blue-400 text-blue-400'
          } duration-150`}
          onClick={() => setActiveTab(2)}
        >
          Schedule
        </button>
        <button
          className={`px-2 py-3 w-1/3 bg-slate-100 ${
            activeTab === 3 && 'bg-blue-400 text-blue-400'
          } duration-150 rounded-br-xl`}
          onClick={() => setActiveTab(3)}
        >
          Team
        </button>
      </div>
      {!loading && activeTab === 1 && (
        <div className="my-5 w-full bg-slate">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
              {
                title: 'Weekly off',
                daysOfWeek: ['3'],
                color: '#8d9aa6',
              },
              {
                title: 'Present',
                start: '2025-02-14',
                color: 'green',
              },
            ]}
            eventDisplay="list-item"
          />
        </div>
      )}
      {!loading && activeTab === 2 && (
        <div className="flex justify-center items-center flex-wrap py-5 min-h-80">
          <table className="w-[70%]">
            <thead className="bg-black text-white w-full">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Person</th>
                <th className="p-2">Topic</th>
                <th className="p-2">Urgency</th>
              </tr>
            </thead>
            <tbody>
              <tr className=" text-center border-x">
                <td className="border-b p-3">Gavin Cortez</td>
                <td className="border-b p-3">Team Leader</td>
                <td className="border-b p-3">San Francisco</td>
                <td className="border-b p-3">Important</td>
              </tr>
              <tr className=" text-center border-x">
                <td className="border-b p-3">Martena Mccray</td>
                <td className="border-b p-3">Post-Sales support</td>
                <td className="border-b p-3">Edinburgh</td>
                <td className="border-b p-3">Normal</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!loading && activeTab === 3 && (
        <div className="flex justify-center flex-wrap py-5">
          {teamInfo ? (
            teamInfo
              .filter((user: object) => user.fullName != filterName)
              .map((item: object) => {
                return (
                  <div
                    className="flex justify-around flex-wrap p-8 basis-[30%]"
                    key={item.empId}
                  >
                    <div className="flex flex-col justify-center items-center h-36 my-5 rounded-md bg-slate-300">
                      <p className=" text-lg capitalize">{item.fullName}</p>
                      <p className=" text-xs uppercase">{item.empId}</p>
                      <div className="w-[90%] text-center">
                        <p className=" text-sm">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Culpa tenetur perspiciatis Lorem ipsum dolor sit
                          amet consectetur adipisicing elit. Culpa tenetur
                          perspiciatis
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="flex justify-around items-center  p-8 w-[80%]">
              <p className="text-lg font-bold">No Members!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TabComponent;

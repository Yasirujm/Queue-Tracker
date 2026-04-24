"use client";
import { useState, useEffect, useRef } from "react";

type QueueItem = {
  id: string;
  tokenNumber: string;
  businessName: string;
  businessType: "Food" | "Health" | "Automobile" | "Bank" | "Government";
  estimatedTime: string;
  currentStatus: "Waiting" | "In Progress" | "Completed";
  waitingTime: string;
};

const LIVE_QUEUES: QueueItem[] = [
  { id: "1", tokenNumber: "A101", businessName: "Colombo General Hospital", businessType: "Health", estimatedTime: "15 min", currentStatus: "Waiting", waitingTime: "5 min" },
  { id: "2", tokenNumber: "B205", businessName: "KFC Express", businessType: "Food", estimatedTime: "8 min", currentStatus: "In Progress", waitingTime: "Now" },
  { id: "3", tokenNumber: "C312", businessName: "Toyota Service Center", businessType: "Automobile", estimatedTime: "30 min", currentStatus: "Waiting", waitingTime: "18 min" },
  { id: "4", tokenNumber: "D401", businessName: "People's Bank", businessType: "Bank", estimatedTime: "25 min", currentStatus: "Waiting", waitingTime: "12 min" },
  { id: "5", tokenNumber: "E109", businessName: "DMV Office", businessType: "Government", estimatedTime: "45 min", currentStatus: "Waiting", waitingTime: "25 min" },
  { id: "6", tokenNumber: "F502", businessName: "Dental Care Clinic", businessType: "Health", estimatedTime: "10 min", currentStatus: "In Progress", waitingTime: "Now" },
  { id: "7", tokenNumber: "G307", businessName: "Pizza Hut", businessType: "Food", estimatedTime: "12 min", currentStatus: "Waiting", waitingTime: "7 min" },
  { id: "8", tokenNumber: "H204", businessName: "Ceat Service Center", businessType: "Automobile", estimatedTime: "20 min", currentStatus: "Waiting", waitingTime: "10 min" },
];

export default function LiveQueueDisplay() {
  const [filter, setFilter] = useState<"All" | QueueItem["businessType"]>("All");
  const [filteredQueues, setFilteredQueues] = useState(LIVE_QUEUES);
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredQueues(LIVE_QUEUES);
    } else {
      setFilteredQueues(LIVE_QUEUES.filter(q => q.businessType === filter));
    }
  }, [filter]);

  const getStatusColor = (status: QueueItem["currentStatus"]) => {
    switch(status) {
      case "In Progress": return "bg-green-100 text-green-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      case "Waiting": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: QueueItem["businessType"]) => {
    const colors = {
      Food: "bg-orange-100 text-orange-800",
      Health: "bg-red-100 text-red-800",
      Automobile: "bg-blue-100 text-blue-800",
      Bank: "bg-green-100 text-green-800",
      Government: "bg-purple-100 text-purple-800",
    };
    return colors[type];
  };

  return (
    <section className="bg-white border rounded-xl shadow-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Queue Display</h2>
          <p className="text-sm text-gray-600">
            Updated: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => setFilter("All")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === "All" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {["Food", "Health", "Automobile", "Bank", "Government"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as QueueItem["businessType"])}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === type 
                  ? getTypeColor(type as QueueItem["businessType"])
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Queue Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Token No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estimated Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waiting Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredQueues.map((queue) => (
              <tr key={queue.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-16 h-10 bg-blue-600 text-white font-bold rounded-lg text-lg">
                    {queue.tokenNumber}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{queue.businessName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(queue.businessType)}`}>
                    {queue.businessType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(queue.currentStatus)}`}>
                    {queue.currentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {queue.estimatedTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      queue.waitingTime === 'Now' 
                        ? 'text-green-600 animate-pulse' 
                        : 'text-gray-900'
                    }`}>
                      {queue.waitingTime}
                    </span>
                    {queue.currentStatus === 'In Progress' && (
                      <span className="ml-2 inline-flex h-2 w-2 animate-ping rounded-full bg-green-400"></span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Total in Queue</div>
          <div className="text-2xl font-bold text-gray-900">{LIVE_QUEUES.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">In Progress</div>
          <div className="text-2xl font-bold text-gray-900">
            {LIVE_QUEUES.filter(q => q.currentStatus === 'In Progress').length}
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-sm text-yellow-600 font-medium">Waiting</div>
          <div className="text-2xl font-bold text-gray-900">
            {LIVE_QUEUES.filter(q => q.currentStatus === 'Waiting').length}
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Avg Wait Time</div>
          <div className="text-2xl font-bold text-gray-900">18 min</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Queues →
        </button>
      </div>
    </section>
  );
}
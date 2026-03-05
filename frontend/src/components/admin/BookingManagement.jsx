import React, { useEffect, useState } from "react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 Replace with your real API
  useEffect(() => {
    const data = [
      {
        _id: "BK-9021",
        user_name: "Rahul & Priya",
        package_name: "Royal Palace Package",
        destination_name: "Udaipur",
        event_date: "2026-01-10",
        guest_count: 200,
        total_price: 500000,
        status: "confirmed",
      },
      {
        _id: "BK-9025",
        user_name: "Aman & Sneha",
        package_name: "Beach Premium",
        destination_name: "Goa",
        event_date: "2026-02-15",
        guest_count: 150,
        total_price: 350000,
        status: "pending",
      },
    ];

    setBookings(data);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  // 🔎 Filter bookings based on search
  const filteredBookings = bookings.filter((booking) =>
    booking._id.toLowerCase().includes(search.toLowerCase()) ||
    booking.user_name.toLowerCase().includes(search.toLowerCase()) ||
    booking.package_name.toLowerCase().includes(search.toLowerCase()) ||
    booking.destination_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Booking Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage all wedding bookings from admin panel.
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700">
          Add Manual Booking
        </button>
      </div>

      {/* 🔎 Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <input
          type="text"
          placeholder="Search by Booking ID, User, Package, or Destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-500">Booking ID</th>
                <th className="px-5 py-4 font-semibold text-slate-500">User</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Package</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Destination</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Event Date</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Guests</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Total Price</th>
                <th className="px-5 py-4 font-semibold text-slate-500">Status</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50">

                    <td className="px-5 py-4 font-medium text-slate-600">
                      {booking._id}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {booking.user_name}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {booking.package_name}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {booking.destination_name}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {booking.event_date}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {booking.guest_count}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-900">
                      ₹{booking.total_price.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-semibold border ${getStatusStyle(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-slate-400">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default BookingManagement;
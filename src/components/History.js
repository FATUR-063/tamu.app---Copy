import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
    const storedHistory = JSON.parse(localStorage.getItem('guestHistory')) || [];

    // Gabungkan daftar tamu dan riwayat
    setHistory([...storedGuests, ...storedHistory]);
  }, []);

  const filteredHistory = history.filter((guest) =>
    filterDate ? guest.visitDate === filterDate : true
  );

  const sortedHistory = filteredHistory.sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.visitDate) - new Date(a.visitDate);
    } else {
      return new Date(a.visitDate) - new Date(b.visitDate);
    }
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Riwayat Tamu</h2>
      <div className="flex justify-between items-center mb-6">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <div className="space-x-4">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Kembali ke Daftar
          </Link>
        </div>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
            <th className="border border-gray-300 px-4 py-2">Jam</th>
            <th className="border border-gray-300 px-4 py-2">Nama</th>
            <th className="border border-gray-300 px-4 py-2">Keperluan</th>
            <th className="border border-gray-300 px-4 py-2">Nomor Telepon</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((guest, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{guest.visitDate}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.visitHour}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.name}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.purpose}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.phonenumber}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedHistory.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Tidak ada riwayat tamu untuk tanggal ini.</p>
      )}
    </div>
  );
}

export default History;

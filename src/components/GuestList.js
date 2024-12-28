// src/components/GuestList.js

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch('/guest.json');
        const jsonGuests = await response.json();
        const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
        const combinedGuests = [...jsonGuests, ...storedGuests].reduce((acc, current) => {
          if (!acc.find(guest => guest.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);
        setGuests(combinedGuests);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  const handleDelete = (id) => {
    const deletedGuest = guests.find(guest => guest.id === id);

    // Tambahkan ke riwayat jika status tamu adalah "Selesai" atau "Dibatalkan"
    if (deletedGuest && (deletedGuest.status === 'Selesai' || deletedGuest.status === 'Dibatalkan')) {
      const history = JSON.parse(localStorage.getItem('guestHistory')) || [];
      localStorage.setItem('guestHistory', JSON.stringify([...history, deletedGuest]));
    }

    // Hapus dari daftar tamu
    const updatedGuests = guests.filter(guest => guest.id !== id);
    setGuests(updatedGuests);
    localStorage.setItem('guests', JSON.stringify(updatedGuests));
  };

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(search.toLowerCase()) ||
    guest.purpose.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Daftar Tamu</h2>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari nama atau keperluan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
        />
        <div className="space-x-4">
          <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Tambah Tamu
          </Link>
          <Link to="/history" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Riwayat
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
            <th className="border border-gray-300 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((guest) => (
            <tr key={guest.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{guest.visitDate}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.visitHour}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.name}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.purpose}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.phonenumber}</td>
              <td className="border border-gray-300 px-4 py-2">{guest.status}</td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <Link to={`/edit/${guest.id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
                {(guest.status === 'Selesai' || guest.status === 'Dibatalkan') && (
                  <button
                    onClick={() => handleDelete(guest.id)}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default GuestList;
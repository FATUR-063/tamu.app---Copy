// src/components/AddGuest.js

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddGuest() {
  const [guest, setGuest] = useState({ name: '', purpose: '', visitHour: '', visitDate: '', phonenumber: '', status: 'Belum Ditentukan' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest({ ...guest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
    const newGuest = { ...guest, id: storedGuests.length + 1 };
    const updatedGuests = [...storedGuests, newGuest];
    localStorage.setItem('guests', JSON.stringify(updatedGuests));
    navigate('/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold mb-4">Tambah Tamu</h2>
      <div className="space-x-4">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Kembali Daftar
          </Link>
        </div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Nama:</label>
          <input
            type="text"
            name="name"
            value={guest.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Keperluan:</label>
          <input
            type="text"
            name="purpose"
            value={guest.purpose}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Nomor Telepon:</label>
          <input
            type="tel"
            name="phonenumber"
            value={guest.phonenumber}
            onChange={handleChange}
            pattern="^[+]?[(]?[0-9]{1,4}[)]?[-\\s./0-9]*$"
            maxLength="12"
            title="Nomor telepon dapat berisi angka, tanda hubung, spasi, atau tanda kurung."
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Jam Kunjungan:</label>
          <input
            type="time"
            name="visitHour"
            value={guest.visitHour}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Tanggal Kunjungan:</label>
          <input
            type="date"
            name="visitDate"
            value={guest.visitDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Status:</label>
          <select
            name="status"
            value={guest.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Belum Ditentukan">Belum Ditentukan</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
            <option value="Ditunda">Ditunda</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default AddGuest;
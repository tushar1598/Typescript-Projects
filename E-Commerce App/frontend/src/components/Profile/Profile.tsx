import { useState } from "react";
import { Patients } from "./Patients";

const Profile = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(Patients.length / limit);
  const paginatedPatients = Patients.slice((page - 1) * limit, page * limit);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Patient Details</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Age</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Disease</th>
              <th className="p-3">Admitted On</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPatients.map((patient, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="p-3">{(page - 1) * limit + index + 1}</td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3">{patient.gender}</td>
                <td className="p-3">{patient.disease}</td>
                <td className="p-3">
                  {new Date(patient.admittedOn).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;

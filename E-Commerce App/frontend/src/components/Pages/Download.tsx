import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Patients } from "../Profile/Patients";

const Download = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Patient Details", 14, 10);

    autoTable(doc, {
      startY: 20,
      head: [["#", "Name", "Age", "Gender", "Disease", "Admitted On"]],
      body: Patients.map((patient, index) => [
        index + 1,
        patient.name,
        patient.age,
        patient.gender,
        patient.disease,
        new Date(patient.admittedOn).toDateString(),
      ]),
    });

    doc.save("Patient_Details.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Download Patient Data</h2>
      <button
        onClick={generatePDF}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Download;

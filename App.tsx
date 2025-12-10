
import React, { useState, useRef, useCallback } from 'react';
import { CardData } from './types';
import FormField from './components/FormField';
import ImageUpload from './components/ImageUpload';
import IdCardPreview from './components/IdCardPreview';
import useIdCardGenerator from './hooks/useIdCardGenerator';

const initialCardData: CardData = {
  institutionName: 'Global Tech University',
  institutionAddress: '123 University Drive, Tech City',
  institutionWebsite: 'www.globaltech.edu',
  studentName: 'Jane Doe',
  studentId: 'GTU-2024-001',
  dob: '2002-08-15',
  course: 'B.Sc. Computer Science',
  address: '456 Innovation Ave, Silicon Valley',
  mobile: '+1 (555) 123-4567',
  email: 'jane.doe@globaltech.edu',
  issueDate: new Date().toISOString().split('T')[0],
  expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 4)).toISOString().split('T')[0],
  photoUrl: 'https://picsum.photos/200/250',
  logoUrl: 'https://picsum.photos/seed/logo/100',
  signatureUrl: '',
};

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const cardRef = useRef<HTMLDivElement>(null);
  const { downloadAsPng, downloadAsPdf } = useIdCardGenerator(cardRef);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageUpload = useCallback((name: keyof CardData, dataUrl: string) => {
    setCardData(prev => ({ ...prev, [name]: dataUrl }));
  }, []);

  const canGenerate = cardData.studentName && cardData.studentId && cardData.photoUrl && cardData.logoUrl;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Student ID Card Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Create professional student ID cards in seconds.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
            <form className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800 dark:text-gray-200">Institution Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Institution Name" name="institutionName" value={cardData.institutionName} onChange={handleChange} />
                  <FormField label="Institution Address" name="institutionAddress" value={cardData.institutionAddress} onChange={handleChange} optional />
                  <FormField label="Website URL" name="institutionWebsite" value={cardData.institutionWebsite} onChange={handleChange} optional />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-4 text-gray-800 dark:text-gray-200">Student Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Full Name" name="studentName" value={cardData.studentName} onChange={handleChange} required />
                  <FormField label="Student ID / Reg. No." name="studentId" value={cardData.studentId} onChange={handleChange} required />
                  <FormField label="Date of Birth" name="dob" value={cardData.dob} onChange={handleChange} type="date" />
                  <FormField label="Course / Department" name="course" value={cardData.course} onChange={handleChange} />
                  <FormField label="Address" name="address" value={cardData.address} onChange={handleChange} optional />
                  <FormField label="Mobile Number" name="mobile" value={cardData.mobile} onChange={handleChange} optional />
                  <FormField label="Email" name="email" value={cardData.email} onChange={handleChange} type="email" optional />
                  <FormField label="Issue Date" name="issueDate" value={cardData.issueDate} onChange={handleChange} type="date" />
                  <FormField label="Expiry Date" name="expiryDate" value={cardData.expiryDate} onChange={handleChange} type="date" />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold border-b-2 border-indigo-500 pb-2 mb-4 text-gray-800 dark:text-gray-200">Uploads</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <ImageUpload label="Student Photo" name="photoUrl" onUpload={handleImageUpload} required previewUrl={cardData.photoUrl} />
                  <ImageUpload label="Institution Logo" name="logoUrl" onUpload={handleImageUpload} required previewUrl={cardData.logoUrl} />
                  <ImageUpload label="Principal's Signature" name="signatureUrl" onUpload={handleImageUpload} optional previewUrl={cardData.signatureUrl} />
                </div>
              </section>
            </form>
          </div>

          {/* Preview & Download Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Live Preview</h2>
              <IdCardPreview ref={cardRef} data={cardData} />
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={downloadAsPng}
                  disabled={!canGenerate}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fa-solid fa-image"></i>
                  Download PNG
                </button>
                <button
                  onClick={downloadAsPdf}
                  disabled={!canGenerate}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  Download PDF
                </button>
              </div>
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                All data is processed on your device. Nothing is uploaded to any server.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

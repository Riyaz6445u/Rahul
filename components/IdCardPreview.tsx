
import React, { forwardRef } from 'react';
import { CardData } from '../types';

interface IdCardPreviewProps {
  data: CardData;
}

const IdCardPreview = forwardRef<HTMLDivElement, IdCardPreviewProps>(({ data }, ref) => {
  const { 
    institutionName, institutionAddress, studentName, studentId, dob, course, 
    issueDate, expiryDate, photoUrl, logoUrl, signatureUrl 
  } = data;

  return (
    <div className="w-full max-w-sm mx-auto aspect-[85.6/53.98] shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
        <div ref={ref} className="w-full h-full bg-white text-black p-4 flex flex-col font-sans text-[8px] leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Header */}
            <div className="flex items-center border-b-2 border-gray-300 pb-2 mb-2">
                {logoUrl && <img src={logoUrl} alt="Institution Logo" className="h-10 w-10 object-contain mr-2"/>}
                <div className="text-left">
                    <h2 className="font-extrabold text-[12px] uppercase text-blue-800">{institutionName || 'Institution Name'}</h2>
                    <p className="text-[7px] text-gray-600">{institutionAddress || 'Institution Address'}</p>
                </div>
            </div>

            {/* Body */}
            <div className="flex-grow flex gap-4">
                {/* Photo and Signature */}
                <div className="flex flex-col items-center justify-between w-1/3">
                    <div className="w-24 h-28 border-2 border-gray-300 p-0.5 rounded-md">
                        {photoUrl && <img src={photoUrl} alt="Student" className="w-full h-full object-cover"/>}
                    </div>
                     <div className="flex flex-col items-center mt-2">
                        {signatureUrl ? (
                            <img src={signatureUrl} alt="Signature" className="h-6 object-contain"/>
                        ) : (
                           <div className="h-6 w-full"></div>
                        )}
                        <hr className="w-20 border-t border-gray-500 mt-0.5"/>
                        <p className="text-[6px] font-semibold">Principal's Signature</p>
                    </div>
                </div>

                {/* Details */}
                <div className="w-2/3 space-y-1.5 pt-1">
                    <InfoRow label="Student Name" value={studentName} highlight />
                    <InfoRow label="Student ID" value={studentId} />
                    <InfoRow label="Course" value={course} />
                    <InfoRow label="Date of Birth" value={dob} />
                    <div className="flex justify-between">
                        <InfoRow label="Issue Date" value={issueDate} />
                        <InfoRow label="Expiry Date" value={expiryDate} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-auto pt-1">
                <p className="text-[7px] font-bold text-gray-700">{data.institutionWebsite || 'www.institution.edu'}</p>
                <div className="bg-blue-800 text-white font-bold text-[10px] py-1 -mx-4 mt-2">
                    STUDENT IDENTITY CARD
                </div>
            </div>
        </div>
    </div>
  );
});

interface InfoRowProps {
    label: string;
    value: string;
    highlight?: boolean;
}
const InfoRow: React.FC<InfoRowProps> = ({label, value, highlight}) => (
    <div>
        <p className="text-[6px] text-gray-500 uppercase">{label}</p>
        <p className={`font-bold ${highlight ? 'text-[10px] text-blue-900' : 'text-[9px]'}`}>{value || `Your ${label}`}</p>
    </div>
)

export default IdCardPreview;

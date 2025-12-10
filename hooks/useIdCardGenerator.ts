
import { RefObject, useCallback } from 'react';

const useIdCardGenerator = (cardRef: RefObject<HTMLDivElement>) => {
  const downloadAsPng = useCallback(() => {
    if (cardRef.current) {
      // Access html2canvas from the window object
      const html2canvas = (window as any).html2canvas;
      if (html2canvas) {
        html2canvas(cardRef.current, { scale: 4 }).then((canvas: HTMLCanvasElement) => {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'student-id-card.png';
          link.click();
        });
      } else {
        console.error('html2canvas library not found.');
      }
    }
  }, [cardRef]);

  const downloadAsPdf = useCallback(() => {
    if (cardRef.current) {
      const html2canvas = (window as any).html2canvas;
      // Access jsPDF from the window object
      const { jsPDF } = (window as any).jspdf;
      
      if (html2canvas && jsPDF) {
        html2canvas(cardRef.current, { scale: 4 }).then((canvas: HTMLCanvasElement) => {
          const imgData = canvas.toDataURL('image/png');
          
          // Standard ID-1 card dimensions in mm
          const cardWidth = 85.60;
          const cardHeight = 53.98;
          
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [cardWidth, cardHeight]
          });
          
          pdf.addImage(imgData, 'PNG', 0, 0, cardWidth, cardHeight);
          pdf.save('student-id-card.pdf');
        });
      } else {
        console.error('html2canvas or jsPDF library not found.');
      }
    }
  }, [cardRef]);

  return { downloadAsPng, downloadAsPdf };
};

export default useIdCardGenerator;

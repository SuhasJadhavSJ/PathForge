import html2pdf from "html2pdf.js";

export function exportRoadmapAsPDF(elementSelector = "#roadmap-print", filename = "pathforge-roadmap.pdf") {
  const element = document.querySelector(elementSelector);
  if (!element) throw new Error("Element not found");
  const opt = {
    margin: 0.5,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

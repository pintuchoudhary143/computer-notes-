/**
 * Robust, guaranteed print utility for AI Studio and web applications.
 * Uses an isolated, clean iframe to guarantee that printing never fails,
 * avoids browser popup blocking, and preserves high-fidelity colors and styles.
 */

export const printElementDirectly = (
  elementId: string, 
  title = 'Print Document', 
  isLandscape = false
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    // Fallback to standard print
    window.print();
    return;
  }

  // Remove any pre-existing print iframe
  const existingFrame = document.getElementById('rbse-print-iframe-sandbox');
  if (existingFrame) {
    existingFrame.remove();
  }

  // Create isolated invisible iframe
  const printFrame = document.createElement('iframe');
  printFrame.id = 'rbse-print-iframe-sandbox';
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';
  printFrame.style.opacity = '0';
  printFrame.style.pointerEvents = 'none';
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentWindow?.document;
  if (!frameDoc) {
    window.print();
    return;
  }

  // Harvest existing stylesheet links and style tags
  let styleHtml = '';
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(node => {
    styleHtml += node.outerHTML;
  });

  frameDoc.open();
  frameDoc.write(`
    <!DOCTYPE html>
    <html lang="hi">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        ${styleHtml}
        <style>
          @page {
            size: ${isLandscape ? 'A4 landscape' : 'A4 portrait'};
            margin: ${isLandscape ? '6mm' : '8mm'};
          }
          * {
            box-sizing: border-box;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: ${isLandscape ? '4px' : '8px'} !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-family: 'Noto Sans Devanagari', 'Inter', system-ui, -apple-system, sans-serif !important;
          }
          .no-print, button, .print-hidden {
            display: none !important;
          }
          table {
            border-collapse: collapse !important;
            width: 100% !important;
          }
          .page-break-after-always {
            page-break-after: always !important;
            break-after: page !important;
          }
          .luxury-marksheet-sheet {
            box-shadow: none !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        </style>
      </head>
      <body>
        <div class="print-container-root">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `);
  frameDoc.close();

  // Give fonts and styles 350ms to parse in the isolated frame, then trigger print
  setTimeout(() => {
    try {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
    } catch (e) {
      console.warn('Iframe print error, falling back to window.print():', e);
      window.print();
    }
  }, 350);
};

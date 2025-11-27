import '../App.css';
import { createRoot } from 'react-dom/client';
import Counter from './Counter';

export default function ListItem({id, name, isFirst, isLast, isNew, isDeleting, onDelete}) {

    function handleOpenCounter() {
      const width = 400;
      const height = 400;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height - 100) / 2;
      const newWindow = window.open('', 'Counter Window', `width=${width},height=${height}, top=${top}, left=${left}`);

      // Get all CSS as text
      const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${name}</title>
            <style>${styles}</style>
          </head>
          <body>
            <div id="counter-root"></div>
          </body>
        </html>
      `);

      // Wait for the document to be ready
      newWindow.document.close();

      const containerEl = newWindow.document.getElementById('counter-root');
      const root = createRoot(containerEl);
      root.render(<Counter projectName={name} />);
  
      newWindow.addEventListener('beforeunload', () => {
        root.unmount();
      });
    }

    return (
      <div className={`
              ${isFirst ? 'rounded-t-md' : ''}
              ${isLast ? 'rounded-b-md' : ''}
              ${isNew ? 'animate-[slideIn_0.5s_ease-out]' : ''}
              ${isDeleting ? 'animate-[fadeOut_0.5s_ease-out] opacity-0 scale-95' : ''}
              bg-white text-purple-300 p-4 m-2 flex flex-row justify-between transition-all`
              }>
          <div>
            {name}
          </div>
  
          <div>
            <button onClick={() => handleOpenCounter()} className='pr-2'>
                Play
            </button>
  
            <button onClick={() => onDelete(id)}>
                Delete
            </button>
          </div>
          <style>{`
            @keyframes slideIn {
              0% {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @keyframes fadeOut {
              0% {
                opacity: 1;
                transform: scale(1);
              }
              100% {
                opacity: 0;
                transform: scale(0.95) translateX(20px);
              }
            }
          `}</style>
      </div>
    )
}


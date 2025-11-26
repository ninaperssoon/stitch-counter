import '../App.css';
import { createRoot } from 'react-dom/client';
import Counter from './Counter';

export default function ListItem({id, name, isFirst, isLast, onDelete}) {

    function handleOpenCounter(id) {
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
            bg-white text-purple-300 p-4 m-2 flex flex-row justify-between`
            }>
        <div>
          {name}
        </div>

        <div>
          <button onClick={() => handleOpenCounter(id)} className='pr-2'>
              {/* <img src={playIcon} alt="Play" /> */}
              Play
          </button>

          <button onClick={() => onDelete(id)}>
              {/* <img src={deleteIcon} alt="Delete" /> */}
              Delete
          </button>
        </div>
        
    </div>
  )
}


import '../App.css';
import { useState } from 'react';

export default function Counter({projectName}) {
  const [count, setCount] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [rows, setRows] = useState([{
    id: 1, name: 'Varv ' + 1, stitches: currentRow
  }]);
  const [newRowId, setNewRowId] = useState(null);


  function handleCounterClick(value) {
    setCount(prevCount => {
      let newCount = prevCount;
      if (value === 'plus') {
        newCount = prevCount + 1;
      } else if (value === 'minus' && prevCount !== 0) {
        newCount = prevCount - 1;
      }
      // Update the stitch count in the last row (if any)
      if (rows.length > 0) {
        setRows(prevRows =>
          prevRows.map((row, idx) =>
            idx === prevRows.length - 1
              ? { ...row, stitches: newCount }
              : row
          )
        );
      }
      return newCount;
    });
  };

  // Animation-pop for new rows

  function handleNewRow () {
    const newId = rows.length + 1;
    setNewRowId(newId);
    setCount(0);
    setRows([...rows, { id: newId, name: 'Varv ' + newId, stitches: currentRow }]);
    
    // Remove the highlight after animation completes
    setTimeout(() => {
      setNewRowId(null);
    }, 600);
  };


  return (
    <div className='flex items-center justify-center flex-col h-dvh'>
      <h1>
        {projectName}
      </h1>

      <div className='flex flex-row'>
        <button onClick={() => handleCounterClick('minus')}>
          -
        </button>
        <p> {count} </p>
        <button onClick={() => handleCounterClick('plus')}>
          +
        </button>
      </div>

      <div className='flex flex-row'>
        <button onClick={() => handleNewRow()} disabled={count === 0}>
          Nytt varv
        </button>
      </div>

      <div className='bg-purple-300 p-2 rounded-md mt-4 w-5/6 text-purple-300'>
        <div className='max-h-[175px] overflow-y-auto'>
          {rows.length === 0 ? (
            <div className="text-white text-center p-4">
              Klicka på "Nytt varv" för att lägga till ditt första varv!
            </div>
          ) : (
            rows.slice().reverse().map((row, i, arr) => {
              const isFirst = i === 0;
              const isLast = i === arr.length - 1;
              const isNewRow = row.id === newRowId;

              let rowClasses = '';
              if (isFirst) {
                rowClasses += 'rounded-t-md ';
              }
              if (isLast) {
                rowClasses += 'rounded-b-md ';
              }
              if (isNewRow) {
                rowClasses += 'animate-[slideIn_0.5s_ease-out] ';
              }
              
              return (
                <div key={row.id} className={`${rowClasses} flex justify-between p-4 bg-white m-2`}>
                  <span>{row.name}</span>
                  <span>{row.stitches} maskor</span>
                </div>
              );
            })
          )}
        </div>
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
      `}
      </style>
    </div>
    
    
  )
}


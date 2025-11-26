import '../App.css';
import ListItem from './ListItem';
import { useState } from 'react';

export default function Projects() {
    const [myList, setMyList] = useState([
        { id: 1, name: 'Projekt 1' },
        { id: 2, name: 'Projekt 2' },
        { id: 3, name: 'Projekt 3' }
      ]);
    
    function handleCreateProject() {
        const projectName = prompt('Vad heter det nya projektet?');
        if (!projectName || projectName.trim() === '') {
            alert('Du måste ange ett projektnamn');
            return;
        }       
        setMyList([...myList, { id: myList.length + 1, name: projectName }]);   
    };
    
    function handleDeleteProject(id) {
        setMyList(myList.filter(item => item.id !== id));
    }

    return (
        <div>
            <div className='flex flex-row justify-between'>
                <h1>
                    Påbörjade projekt
                </h1>
                <button onClick={handleCreateProject}>
                    + Skapa ny
                </button>
            </div>
            
            <div className='bg-purple-300 p-2 rounded-md mt-4'>
                {myList.map((item, i) =>
                    <ListItem 
                        key={item.id}
                        id={item.id}
                        name={item.name} 
                        isFirst={i === 0}
                        isLast={i === myList.length - 1}
                        onDelete={handleDeleteProject}
                    />
                )}
            </div>
            
        </div>
        
    )
}


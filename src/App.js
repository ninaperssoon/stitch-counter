import './App.css';
import Projects from './components/Projects';
import Statistics from './components/Statistics';

export default function App() {
  return (

    <div className="grid grid-cols-[2fr_1fr] gap-4 p-10 mt-10" >
    
      <Projects />

      <Statistics />

    </div>
    
  )
}

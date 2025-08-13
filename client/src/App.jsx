import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:4000';



function App() {
   const [characters,setChacters] = useState([]);
   const [isLoading,setLoading] = useState(false);
   const [error, setError] = useState(null);



   useEffect(()=>{
    const fetchPost = async ()=>{
      setLoading(true); 
      try{
           const response = await fetch(`${BASE_URL}`);
 
        if(!response.ok){
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        if(data.characters !== null){
            setChacters(data.characters)
        }else{
          throw new Error("Unsupported data format");
          
        }
   

      }catch (errors){
        setError(errors.message);
        console.error('Error',errors);
      }
   
      setLoading(false);
    };

    fetchPost();
   },[]);

   if(isLoading){
    return  <div className='flex items-center justify-center h-screen'><div className='text-3xl'>Loading...</div></div>

   }
   if(error){
    return <div className='flex items-center justify-center h-screen'><div className='text-3xl'>Error</div></div>

   }
  
  return (
    <>
    <div>
      <h1>Marvel HEROS</h1>
    <ul>
      {characters.map((character)=>{
        return <li key={character.name}>{character.name}</li>
      })}
    </ul>
    </div>
    </>
  )
}

export default App

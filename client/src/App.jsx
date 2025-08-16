import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:4000';

function App() {
   const [characters,setChacters] = useState([]);
   const [isLoading,setLoading] = useState(false);
   const [error, setError] = useState(null);

    const fetchPost = async ()=>{
      setLoading(true); 
      setError(null);
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
      }finally{
          setLoading(false);
      }
      
    };


      useEffect(() => {
     fetchPost();
   }, []);

   if(isLoading){
    return  <div className='flex items-center justify-center h-screen'><div className='h-[40px] w-[40px] border-4 rounded-full border-blue-800 animate-spin border-t-transparent'></div></div>

   }
   if(error){
    return (
      <div className='flex items-center justify-center h-screen flex-col'>
        <div className='text-3xl text-red-600 mb-4'>Error!!!</div>
        <div className='text-lg text-gray-600 mb-4'>{error}</div>
        <button 
          onClick={fetchPost}
          className='px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700'
        >
          RETRY
        </button>
      </div>
    );
   }
  
  
  return (
    <>
    <div>
      <h1 className='text-center text-5xl text-white p-4 bg-red-600'>Marvel HEROS</h1>
  
  
  <table className="table-auto border-collapse border border-gray-300 w-full">
  <thead>
    <tr className="bg-blue-900 text-white">
      <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Nom réel</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Univers</th>
      <th className="border border-gray-300 px-4 py-2 "><button className='bg-green-600 hover:scale-115 transition-transform duration-300 px-5 py-2 rounded-3xl text-white'>ADD<span className='text-xl'>+</span></button></th>
    </tr>
  </thead>
  <tbody>
    {characters.map((character) => (
      <tr key={character.id} className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">{character.id}</td>
        <td className="border border-gray-300 px-4 py-2">{character.name}</td>
        <td className="border border-gray-300 px-4 py-2">{character.realName}</td>
        <td className="border border-gray-300 px-4 py-2">{character.universe}</td>
        <div className='flex flex-col'>
        <button className='bg-blue-900 text-white p-2 border transition-opacity hover:opacity-80 duration-300'>
          Edit
        </button>
        <button className='bg-red-600 text-white p-2 border transition-opacity hover:opacity-80 duration-300'>
         Delete
        </button> 
        </div>
      </tr>
    ))}
  </tbody>
</table>
    </div>
    </>
  )
}

export default App

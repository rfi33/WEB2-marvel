import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:4000';

function App() {
   const [characters,setChacters] = useState([]);
   const [isLoading,setLoading] = useState(false);
   const [error, setError] = useState(null);
      const [newCharacter, setNewCharacter] = useState({
     name: '',
     realName: '',
     universe: ''
   });
    const [showAddForm, setShowAddForm] = useState(false);

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

       const addCharacter = async () => {
     if (!newCharacter.name || !newCharacter.realName) return;

     try {
       const response = await fetch(`${BASE_URL}/create`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(newCharacter)
       });

       if (response.ok) {
         setNewCharacter({ name: '', realName: '', universe: '' });
         setShowAddForm(false);
         fetchPost();
       }
     } catch (error) {
       console.error('Error adding character:', error);
     }
   };

    const deleteCharacter = async (id) => {
      try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, { method: 'DELETE' });

        if(response.ok){
          fetchPost();
        }
      } catch (error) {
        console.error('Error deleting character:',error)
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
   {showAddForm && (
          <div className="bg-gray-100 p-4 border-b">
            <h3 className="text-xl font-bold  text-center text-gray-800">Add new heros</h3>
            <div className="flex justify-center pt-4 gap-3 items-center">
              <input
                type="text"
                placeholder="Hero's Name"
                value={newCharacter.name}
                onChange={(e) => setNewCharacter({newCharacter, name: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Real name"
                value={newCharacter.realName}
                onChange={(e) => setNewCharacter({newCharacter, realName: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Universe"
                value={newCharacter.universe}
                onChange={(e) => setNewCharacter({newCharacter, universe: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={addCharacter}
                  className="px-4 py-2 bg-green-600 text-white hover:opacity-80 rounded transition-opacity duration-150"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-amber-500 text-white rounded hover:opacity-80 transition-opacity duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
  
  <table className="table-auto border-collapse border border-gray-300 w-full">
  <thead>
    <tr className="bg-blue-900 text-white">
      <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Nom réel</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Univers</th>
      <th className="border border-gray-300 px-4 py-2 "><button 
      onClick={()=> setShowAddForm(true)}
      className='bg-green-600 hover:scale-115 transition-transform duration-300 px-5 py-2 rounded-3xl text-white'>ADD<span className='text-xl'>+</span></button></th>
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
        <button onClick={()=>deleteCharacter(character.id)} className='bg-red-600 text-white p-2 border transition-opacity hover:opacity-80 duration-300'>
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

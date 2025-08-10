import { useEffect, useState } from 'react'

const BASE_URL = 'characters.json';



function App() {
   const [posts,setPosts] = useState([]);
   const [isLoading,setLoading] = useState(false);
   const [error, setError] = useState(null);



   useEffect(()=>{
    const fetchPost = async ()=>{
      setLoading(true);

      try{
           const response = await fetch(`${BASE_URL}/posts`);
      const posts = await response.json();
      setPosts(posts);
      }catch (errors){
        setError(errors);
      }
   
      setLoading(false);
    };

    fetchPost();
   },[]);

   if(isLoading){
    return <div>Loading...</div>
   }
   if(error){
    return <div>Error</div>
   }
  
  return (
    <>
    <div>
      <h1>Marvel HEROS</h1>
    <ul>
      {posts.map((post)=>{
        return <li key={post.id}>{post.id}</li>
      })}
    </ul>
    </div>
    </>
  )
}

export default App

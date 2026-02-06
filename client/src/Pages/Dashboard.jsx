import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { useAppContext } from '../context/authContext';

function Dashboard() {
    const info=useAppContext();
    // const [user,setUser]=useState(null);
//     useEffect(()=>{
//         api.get("/api/users/current")
//          .then(res => setUser(res.data.user))
//       .catch(() => console.log("Unauthorized"));
//   }, []);
  return (
    <div>
      <h2>Dashboard</h2>
      {info.user && <p>Welcome {info.user.email}</p>}
    </div>
  );
}

export default Dashboard

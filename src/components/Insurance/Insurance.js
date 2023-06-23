import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Insurance.css';
import { generateId } from '../../utils/utils';

const AdminPanel = ({ userName }) => {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [updatedPlanName, setUpdatedPlanName] = useState('');
  const [updatedPlanPrice, setUpdatedPlanPrice] = useState('');

  const fetchSelectedPlans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/selected-plans');
      setSelectedPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSelectedPlans();
  }, []);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setUpdatedPlanName(plan.planName);
    setUpdatedPlanPrice(plan.planPrice);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/selected-plans/${editingPlan.id}`, {
        id: generateId(),
        userObjectId: editingPlan.userObjectId || editingPlan.user,
        petObjectId: editingPlan.petObjectId || editingPlan.pet,
        planName: updatedPlanName,
        planPrice: updatedPlanPrice,
      });
      setEditingPlan(null);
      setUpdatedPlanName('');
      setUpdatedPlanPrice('');
      fetchSelectedPlans();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (plan) => {
    try {
      await axios.delete(`http://localhost:5000/api/selected-plans/${plan.id}`);
      fetchSelectedPlans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="title">Admin Panel - Selected Plans</h2>
      <table className="selected-plans-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Object ID</th>
            <th>Pet Object ID</th>
            <th>Plan Name</th>
            <th>Plan Price</th>
            {/* <th>Edit</th> */}
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
  {selectedPlans.map((plan) => (
    <tr key={plan.id}>
      <td>{plan.id}</td>
      <td>{plan.userObjectId}</td>
      <td>{plan.petObjectId}</td>
      <td>
        {editingPlan && editingPlan.id === plan.id ? (
          <input
            type="text"
            value={updatedPlanName}
            onChange={(e) => setUpdatedPlanName(e.target.value)}
          />
        ) : (
          plan.planName
        )}
      </td>
      <td>
        {editingPlan && editingPlan.id === plan.id ? (
          <input
            type="text"
            value={updatedPlanPrice}
            onChange={(e) => setUpdatedPlanPrice(e.target.value)}
          />
        ) : (
          plan.planPrice
        )}
      </td>
      {/* <td>
        {editingPlan && editingPlan.id === plan.id ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={() => handleEdit(plan)}>Edit</button>
        )}
      </td> */}
      <td>
        <button onClick={() => handleDelete(plan)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Insurance.css';
// import { generateId } from '../../utils/utils';

// const AdminPanel = ({ userName }) => {
//   const [selectedPlans, setSelectedPlans] = useState([]);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [updatedPlanName, setUpdatedPlanName] = useState('');
//   const [updatedPlanPrice, setUpdatedPlanPrice] = useState('');

//   const fetchSelectedPlans = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/selected-plans');
//       setSelectedPlans(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchSelectedPlans();
//   }, []);

//   const handleEdit = (plan) => {
//     setEditingPlan(plan);
//     setUpdatedPlanName(plan.planName);
//     setUpdatedPlanPrice(plan.planPrice);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/selected-plans/${editingPlan.id}`, {
//         id: generateId(),
//         user: editingPlan.user,
//         planName: updatedPlanName,
//         planPrice: updatedPlanPrice,
//       });
//       setEditingPlan(null);
//       setUpdatedPlanName('');
//       setUpdatedPlanPrice('');
//       fetchSelectedPlans();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (plan) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/selected-plans/${plan.id}`);
//       fetchSelectedPlans();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="title">Admin Panel - Selected Plans</h2>
//       <table className="selected-plans-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Plan Name</th>
//             <th>Plan Price</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {selectedPlans && selectedPlans.map((plan) => (
//             <tr key={plan.id}>
//               <td>{plan.id}</td>
//               <td>
//                 {editingPlan && editingPlan.id === plan.id ? (
//                   <input
//                     type="text"
//                     value={updatedPlanName}
//                     onChange={(e) => setUpdatedPlanName(e.target.value)}
//                   />
//                 ) : (
//                   plan.planName
//                 )}
//               </td>
//               <td>
//                 {editingPlan && editingPlan.id === plan.id ? (
//                   <input
//                     type="text"
//                     value={updatedPlanPrice}
//                     onChange={(e) => setUpdatedPlanPrice(e.target.value)}
//                   />
//                 ) : (
//                   plan.planPrice
//                 )}
//               </td>
//               <td>
//                 {editingPlan && editingPlan.id === plan.id ? (
//                   <button onClick={handleUpdate}>Save</button>
//                 ) : (
//                   <button onClick={() => handleEdit(plan)}>Edit</button>
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(plan)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPanel;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Insurance.css';

// const AdminPanel = ({ userName }) => {
//   const [selectedPlans, setSelectedPlans] = useState([]);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [updatedPlanName, setUpdatedPlanName] = useState('');
//   const [updatedPlanPrice, setUpdatedPlanPrice] = useState('');

//   const fetchSelectedPlans = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/selected-plans');
//       setSelectedPlans(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchSelectedPlans();
//   }, []);

//   const handleEdit = (plan) => {
//     setEditingPlan(plan);
//     setUpdatedPlanName(plan.planName);
//     setUpdatedPlanPrice(plan.planPrice);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/selected-plans/${editingPlan.id}`, {
//         id: editingPlan.id,
//         user: editingPlan.user,
//         planName: updatedPlanName,
//         planPrice: updatedPlanPrice,
//       });
//       setEditingPlan(null);
//       setUpdatedPlanName('');
//       setUpdatedPlanPrice('');
//       fetchSelectedPlans();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (plan) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/selected-plans/${plan.id}`);
//       fetchSelectedPlans();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="title">Admin Panel - Selected Plans</h2>
//       <table className="selected-plans-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Plan Name</th>
//             <th>Plan Price</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {selectedPlans && selectedPlans.map((plan) => (
//             <tr key={plan.id}>
//               <td>{plan.id}</td>
//               <td>
//                 {editingPlan && editingPlan.id === plan.id ? (
//                   <input
//                     type="text"
//                     value={updatedPlanName}
//                     onChange={(e) => setUpdatedPlanName(e.target.value)}
//                   />
//                 ) : (
//                   plan.planName
//                 )}
//               </td>
//               <td>
//                 {editingPlan && editingPlan.id === plan.id ? (
//                   <input
//                     type="text"
//                     value={updatedPlanPrice}
//                     onChange={(e) => setUpdatedPlanPrice(e.target.value)}
//                   />
//                 ) : (
//                   plan.planPrice
//                 )}
//               </td>
//               <td>
//                 {editingPlan && editingPlan.id === plan.id ? (
//                   <button onClick={handleUpdate}>Save</button>
//                 ) : (
//                   <button onClick={() => handleEdit(plan)}>Edit</button>
//                 )}
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(plan)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedPlans.map((plan) => (
//         <Link key={plan.id} to={`/checkout/${plan.id}`}>
//           <button>Select Plan {plan.id}</button>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default AdminPanel;
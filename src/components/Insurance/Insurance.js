// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Insurance.css';

// const AdminPanel = () => {
//   const [selectedPlans, setSelectedPlans] = useState([]);

//   useEffect(() => {
//     const fetchSelectedPlans = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/selected-plans');
//         setSelectedPlans(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSelectedPlans();
//   }, []);

//   const handleEdit = (planId) => {
//     // Logic for editing a selected plan
//     console.log(`Editing plan with ID: ${planId}`);
//   };

//   const handleDelete = async (planId) => {
//     try {
//       // Delete the selected plan
//       await axios.delete(`http://localhost:5000/api/selected-plans/${planId}`);
//       // Remove the deleted plan from the state
//       setSelectedPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));
//       console.log(`Deleted plan with ID: ${planId}`);
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
//             <th>User</th>
//             <th>Plan Name</th>
//             <th>Plan Price</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {selectedPlans.map((plan) => (
//             <tr key={plan.id}>
//               <td>{plan.user}</td>
//               <td>{plan.planName}</td>
//               <td>{plan.planPrice}</td>
//               <td>
//                 <button onClick={() => handleEdit(plan.id)}>Edit</button>
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(plan.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Insurance.css';

const AdminPanel = ({ userName }) => {
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [updatedPlanName, setUpdatedPlanName] = useState('');
  const [updatedPlanPrice, setUpdatedPlanPrice] = useState('');

  const fetchSelectedPlans = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/selected-plans'
      );
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
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/selected-plans/${editingPlan.id}`,
        {
          user: editingPlan.user,
          planName: updatedPlanName,
          planPrice: updatedPlanPrice,
        }
      );
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
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/selected-plans/${plan.id}`
      );
      fetchSelectedPlans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="title">Admin Panel - Selected Plans</h2>
      <div></div>
      <table className="selected-plans-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan Name</th>
            <th>Plan Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {selectedPlans.map((plan, index) => (
            <tr key={index}>
              <td>{plan.id}</td>
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
              <td>
                {editingPlan && editingPlan.id === plan.id ? (
                  <button onClick={handleUpdate}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(plan)}>Edit</button>
                )}
              </td>
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

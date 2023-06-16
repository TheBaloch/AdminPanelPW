// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';

// const LoginForm = ({ handleUpdate }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (email !== '' && password !== '') {
//       if (email === 'admin@petsworld.com') {
//         try {
//           const response = await axios.post(
//             'http://localhost:5000/admin/verify',
//             {
//               email,
//               pass: password,
//             }
//           );
//           localStorage.setItem('admin', JSON.stringify(response.data));
//           setEmail('');
//           setPassword('');
//           handleUpdate();
//         } catch (error) {
//           console.error('Error during doctor login:', error);
//         }
//       } else {
//         try {
//           const response = await axios.post(
//             'http://localhost:5000/api/doctors/login',
//             {
//               email,
//               pass: password,
//             }
//           );
//           localStorage.setItem('doctor', JSON.stringify(response.data));
//           setEmail('');
//           setPassword('');
//           handleUpdate();
//         } catch (error) {
//           console.error('Error during doctor login:', error);
//         }
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <div
//         className="card"
//         style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
//       >
//         <div className="card-header">
//           <div className="logo-container">
//             <img className="logo" src="./img/logo.png" alt="Logo" />
//           </div>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="button-container">
//               <button type="submit" className="btn btn-primary">
//                 Sign-In
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
//import DeleteForever from '@mui/icons-material/DeleteForever';
//import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Typography from '@mui/joy/Typography';

const LoginForm = ({ handleUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      if (email === 'admin@petsworld.com') {
        try {
          const response = await axios.post(
            'http://localhost:5000/admin/verify',
            {
              email,
              pass: password,
            }
          );
          localStorage.setItem('admin', JSON.stringify(response.data));
          setEmail('');
          setPassword('');
          handleUpdate();
        } catch (error) {
          console.error('Error during doctor login:', error);
        }
      } else {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/doctors/login',
            {
              email,
              pass: password,
            }
          );
          localStorage.setItem('doctor', JSON.stringify(response.data));
          setEmail('');
          setPassword('');
          handleUpdate();
        } catch (error) {
          console.error('Error during doctor login:', error);
        }
      }
    }
  };

  return (
    <div className="login-container">
      {/* <div
        className="card"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <div className="card-header">
          <div className="logo-container">
            <img className="logo" src="./img/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="card-body">
          
        </div>
      </div> */}
      <React.Fragment>
        {/* <Button
          variant="outlined"
          color="secondary"
          endDecorator={<DeleteForever />}
          onClick={() => setOpen(true)}
        >
          Log In
        </Button> */}
        <Modal open={true}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
          >
            <Typography
              id="alert-dialog-modal-title"
              component="h2"
              // startDecorator={<WarningRoundedIcon />}
            >
              <div
                style={{ display: 'flex', justifyContent: 'center' }}
                className="logo-container"
              >
                <img
                  style={{ display: 'flex', justifyContent: 'center' }}
                  className="logo"
                  src="./img/logo.png"
                  alt="Logo"
                />
              </div>
              {/* <h2 style={{ display: "flex", justifyContent: "center" }}>
                Login
              </h2> */}
            </Typography>
            <Divider />
            <Typography
              id="alert-dialog-modal-description"
              textColor="text.tertiary"
            >
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <Button variant="solid" color="danger" type="submit">
                    login
                  </Button>
                </div>
              </form>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                pt: 1,
              }}
            ></Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default LoginForm;

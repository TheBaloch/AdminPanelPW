import React from 'react';
import { useState } from 'react';
import './DoctorsLogin.css';
import Navigation from './Navigation/Navigation';
import Profile from './Page/Profile/Profile';
import Appointments from './Page/Appointments/Appointments';
import Pending from './Page/Appointments/Pending';
import Approved from './Page/Appointments/Approved';
import Rejected from './Page/Appointments/Rejected';

export default function DoctorsLogin({ handleLogout }) {
  const [doctor, setDoctor] = useState(() => {
    try {
      const storedDoctor = localStorage.getItem('doctor');
      return storedDoctor ? JSON.parse(storedDoctor) : null;
    } catch (error) {
      console.error('Error parsing stored doctor:', error);
      return null;
    }
  });

  const handleUpdate = () => {
    setDoctor(JSON.parse(localStorage.getItem('doctor')));
  };

  const [selectedComponent, setSelectedComponent] = useState('dashboard');

  const handleSidebarSelection = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <div>Home</div>;
      case 'Appointments':
        return <Appointments />;
      case 'profile':
        return <Profile handleUpdate={handleUpdate} />;
      case 'Pending':
        return <Pending />;
      case 'Approved':
        return <Approved />;
      case 'Rejected':
        return <Rejected />;
      case 'temp':
        return <div>NuN</div>;
      default:
        return null;
    }
  };

  if (doctor)
    return (
      <div>
        <div className="nav navbar bg-secondary shadow">
          <div>
            <h3>
              Dr. {doctor.f_name} {doctor.l_name}{' '}
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEfUlEQVR4nO2Xa0xbZRjHDyogPb0CpVcoVMA4jXEfvMXED7olmug+iR/WTjtjmJiQcimFDWoZjg1wjHtJh4zAhF40MxqdjG5rymlLVxqg0NIWO24bkkw/ODPddMzHvIdtWeIsp3DcB+M/+acfzvO8z+9/3vek52DY/6KgfOtqTnqddzv2npMVuxISEj8481T+0KWnt1kDSRidyreuavM/X4X0Rj+RWGQbiVWbuM+mSCo6C7mmy8h+zAoP0waSZ1k5n2f5AfiN/nNJRbaeWLXJ+87uTCqy/fjY4CVAlvevZNEGkju0YkcJ80yXVVR75CeXAVnWt5BNG4h8cNlOpvtsiTJITv8S5PQv0guSM7BkJxMOUAfJ7lsAZHpB+pfsKKFsYIEyiKx3HkjTCZJ9YtF+Ox1lkKyei4As66YRRPbp/Ln1hNG9lBr08FCm8XtAFhkv0vfUyHqilvWEUR2V+uzOeZm0ew6khsif0ublFNpAMo9HSzKNUcg0zk2jtBvVSwzhSklXBCSd4YlYdSyF9fFH91hf5BVYOZRA5IZohtQw9wuZsjvSEKtW2h55TtIZvibpCIOoI1R4vxq20prLUJqcuNIMpBXm6wylqRLT6zcMiUkMkUIyZVcExJ3hYXFX6E1xx2x+liEizzBE5JK22RfE7aEGUfvsb+L2EIjagnZMb3/kbwsVfs1gKM1zCID5jgU475+Ce4BKKN0ZSXu4VNwRuokG3XXbLIjuuHXdwpbASJZhmne/NXCFSY2Gpn74Fbx84WfYGfodtvXOkCAMpfkqVmCl9kcpbJl5QtgaPC5qDS6IWoJ/iFqCIGwJguBY4IqgOTgsODb9NgaQ8E/9uMJsREPzOnwkBPKrgevA3GMhYdC2YfFKcDSgEjYHQNgcsFPtwZXmg2igsMoGO2ZvkCDPn1m5vT2mNcoH914JjvpVgk9mIKPJTxkkefegHFeYr6HBGeXfgazBBey9X9w5I33YZsRv8qsyGv3o9YAyCBJTMfQWOg93Dyl5PkznOe9+yd0cyJFJFf/IFPAPT8UFgpSiOCllq21LHPUIMIuHm9Cb3aYgkPiHJlXphychvX4ibhAkbq3Py6sdh9SDvgJsK0qrn9iddmgC0up8rs308/TeKe5HXuDqvbu2BvKx75XUOh+k1o4vxt8NCVyd5ydOzQVg67zPbgmEWT/B5+nH13j6cWDVjOXF08upcW3nVHuAfcBzI61ioy8DKgvqvA6uzgscnccQTx97v3uAvX8MmFXub7YMgcSudr+GknEOeG5yqt07MApiVYztYmmdt1iVLmBq3C9hdIlVNWZB6VhV7qusKtcbsWqZFe4Cpob4lVnhBFxDxPw0iVsivY/B0jqdKCFL6wJc6zzF0BKvpxZ72Og6R23nssqcu/By4ltcQwBeTgCjjLBhxaeTMdpVfDoZ1ziNzHLiFq4h05ID8XJijfwtQ8NHkdcYpaOtWKEvEfs3xVA7n0kpdfSmlDmuMEpHYd0OSFE7VhlqhxEvIZ7EHrQ4RQQvuYSQo6154MOx/6L+AtoBSKziBpWOAAAAAElFTkSuQmCC"
                alt="s"
              />
            </h3>
          </div>
          <button onClick={handleLogout} className="btn btn-sm">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEHUlEQVR4nO3Y3U9bZRwH8COrMEdLoRRYxwZuAhtkZtdTfLnwUt3+EC6eCy82aNcxRluKpS3dkE0RoTExxumfsKjLbkwWoTLeoS09fRusdF1MTCRf8zznlJ7DPKXn4VKf5HvNJ9/f73lOiiD8fzjOBw9hePvb3QattCkzcXgEJww8DuHCTL6rJ/wy2x1+ie5wARdmCzg/8wJd39Dk0TmdR8fXu3hriiaHc1/lcPbL53jzPs0O2u/toG1yG2e+oHmG0xPP0Ho3m20NZDt1Y3pmC31KhASREJ3Tu/sQilBCKEIJoQgZglN3srCNZ/r0NxMuEK02JEgJIUFKCCWk9a4CEsrAFkwT/ZiZAilCpDbymm2UGQtDnLqTYZCT4xk082C6ZvJEuw31WNomy4wlVISk0RJMo9kvcmCm84RvSdUQ2sY+JJCClQfTMZ0n3Et6oI2WYIpBmvwpWH08mKkc0V5SNaRcG02+OKzuVVhHo7COJWHhwZybyhHeJZXakMfiWUWLZw6nA4uweNZh8XJiznKOhSKksSTR6FrGpR8T+CS2h/aJFZiHFj7TjWm/nyOHvh2hNGzjKZwM0iTREkjS24KmMZoErL4ELMNLuPRTAleTwKexPXR/F7unHzO5TcqNxTYWRcvIMprdi2hySbEOP0Xj7aewDC1IufUH6m/O72MYaGvvryspfKgLc2Zym2gu6XiKQc7PbqD3UQ69j56zvPurOu/8IuWjyJ/7GJorIgpXRfRWjpnYJq8uqXxbginWxPuPd1V/RE8YKIHLFWFaJ7JEc0kDSTaS9x7nuDEy6EFlmFCWaL6kfpHtxlEwupqxhbJE6+2gt4ViOqfXVLshZQeXaX4u5cg7YwulidbbwV5S9xq7MQ2D9MZEYGaZR51zHqYbczA6aH5H7cATXHwQP9ptsgXTRAmh35UipNEnwvK5CMtoHA3eOOpHYjB7aKKoc0dhcm3COCyl1hHBxR8kDH34usKb+t+Z5mCaqD5wY2pIw2iCpd67BfPIFuo8cRaTOwajK4ba4SjLCfs8er6P4ePo37D5F1A98ET/C9zsF4lyLBQhQUoIJcTkVkNO3KbZxBv2CIyO39DomkONYwHVzjX93yarXyQH21BCKMI8om7D6JLboIghKcedy6gZiKDavojqm+swcGF8Imn0qcdS761gLDLk+K0NlprBdYZ43bnGYnBwYCw+kZRvIy63cWAsMqRmUA0x3KBZRZVjhQPjFUnFS7o/lmIbGwyhhBxzrLJU9XNgzN4tcnAsmkuq0YYEkRH2FRaBF2Muu6TR0pIe1oZ9Ba8N0CxD6F/Sj6nzxPu4l1SGVNlLEKF/uRj9vyhNI1udJlc8o2csxSV9tQ0515cywrXVDoHrOGEwu2MN/xZBmWtamVfH+ZDvvxDCf/38A04eGCHo3zDjAAAAAElFTkSuQmCC"
              alt="l"
            />
          </button>
        </div>
        <div
          style={{ height: '38.67rem', display: 'flex' }}
          className="container-fluid"
        >
          <div style={{ width: '14rem', position: 'sticky', top: 0 }}>
            {<Navigation handleSelection={handleSidebarSelection} />}
          </div>
          <div
            style={{
              width: '84%',
              height: 'auto',
              background: '#f9fafe',
              overflow: 'auto',
            }}
          >
            <div className="content">{renderSelectedComponent()}</div>
          </div>
        </div>
      </div>
    );
}

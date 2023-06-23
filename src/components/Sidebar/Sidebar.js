// import React from "react";
import React, { useState } from 'react';
import './Sidebar.css';

// import { AiFillMedicineBox } from "react-icons/ai";

const Sidebar = ({ handleSelection, handleLogout }) => {
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    handleSelection(buttonName);
  };

  return (
    <div className="sidebar">
      <img
        style={{ height: '80px', width: '280px' }}
        alt=""
        src={'./img/logo.png'}
      ></img>

      <ul className="sideBar-ul">
        {/* <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
          </svg>

          <button
            className={`button_custon ${
              selectedButton === 'dashboard' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('dashboard')}
          >
            Dashboard
          </button>
        </li> */}
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAACgklEQVR4nOWT30taYRjHz8X2b2x/hPeF0JWBgWAX2dVW1FLPppZORbwyFi5bjLky8aKLEaOLsSk1VpNYtXRqecxzptJZzLJVUNpPQuQZz9l86ZRNL05XO/CB9zzv9/184fAeivr7RBSKpmRbm00KIgpFE3X5WZLL76c7OwsHTidIAavRbH9pablHClbkclmepg/PR0ZACvI0fYhOUhBVKAZ4g6FScDhACniDoYJOQR5ubr6T7e7mz6emQEoyPT18TCa7SyWUyqdHfn9F6oLjiYlKorXVSq2qVPtbNhvcBqsq1T7FqNWS3Z6DK6CbYjWaTdENsNmh6HKJbsUPowlO3G7yjmucXc7gmbzdLpqhm1pvb2ergzOPB9a0esgZ+0mo5HJB7EEX7FitZIZrnJUGB8ksZzBBUksLjuqMUatZKq5UGtjevvK+wwGcTg/c1ySkng1D3myBPbsdUlo9ZPg9YExm2LHZBDnTb4Hv/C6k+nRC5qfZDOtDHuCW14DT0YAu9pG2HFMqHwtXdex1iE2/mxVEuSMQwKJ0aB6yv07+zA7KkJ5bAnZ+WVjjDPcww64w5Bw60OUbC6bJjzY8zcSrgeloAQLhzWus7V4I+4v8cc19BM9WPeisWWD0xcD5dksE7WMgnC0K+ygamMxdyyB4tm6BObAK7pmiCMtkRlSAsqsZBM/+BwV6bwSejCdEPPQs/bNgLn0G3s+lxgrqEahR8Om2C9z1PtHLIJda3L6ARhid3bixwOhPkBw6SYF3JsuFNk6hEYY+ZG8soH1xkkMnKRh9z2U+8qfQCO5g9sYfTeeNkhw6SYEzEOlwTn4zN4Lx1eLzLs9CqBa9LxbekGwg0oHy35VycKbwIrFyAAAAAElFTkSuQmCC"
            alt="p"
          />
          <button
            className={`button_custon ${
              selectedButton === 'products' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('products')}
          >
            Products
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZ0lEQVR4nO2Ra0xTdxjGz9wlQaill39pwQIFimaDhQRddpFtcZvxg7sgFhVKoQwVMtCYhSnTrAanVgWUi4BcpFwVtjEoFVfut9XNSwxLcBYQ5CLoEK3ABhPps/wPko0wP7BP++CbPMmb87y/533POQzzrP5XpdEwS9pCxKsaQoW+jUrisRjWEErETSGiNyhrVDrYLhi4Eifxa40kE83bCRrDCRrDROYyBfP8nN8WQXyaI0hlQ7iosU5Fimq2CuX0OZ25FCv5pmkbQVMEQUMYsTapJf7zw7czL7ZGiUbbDzrDtMsRP3++HKYYyYxRQWJZf4/4q6YIYm3ZQdD0KUG9iqA5jCRRrzXKIe7ql04zl76QwrRTgmv7nWEMFN3/53FMW7iAc/2Ia/dU69uYvrgOj0zvYdy4Go0h4pz6cMGKlh1k8kaCGy7FStnlHUdkMCrIVOU64mGKFudO1L/GMpSlGZf3uvToN0iWznuLkTJvMx2wXvXHzOUPMdXqh46jrrtqgwXv3kxzn5hq8cMj0/usaN9xWDamX0/WdKe57qSzlKHs9MUPMFTkdWPBP5io8/nlzx/XYubyBkz/tB6TzW9h7LznJ9XB/OWj5T7TNNh65WNWtB8ueXWqcq3I4cEPHgF0ljKUpRnjdT7XFix4WC0v/qNhNaZa1mCy+U2M1Xg9fljlJgfDPDdR68sumLnyESvaj9X6TlJuTO+ycrzW+zFlKEszLNUe+QsXlDsKRipc+8YurIDFIMcDvZt6zhs3elkoTL8zFe3Hjd735vzRKtdtlvNyUHakUtZrMTjz5oXbqMqc7EJLEvcdDLlrLpShPc/DSsJy67gqnT+j0SyxGGTa8Rpv/N6wihXtHxhk8dSzU5f4C9UFde06Dytl98Ur7yxTFiTwVTonNpwbWuzLURWOclWFEKtzoI6LxprP4mEffAa84FzYB2WfVSgUL/WVyxtG9TLc18vQ95287h2N5oVlocU6rqoIXFUB/GK+hnpvNMShmSzHC8qx8IOzXme4Sp3ZXqmDvTJvzgAvKBv8rafB35IJ6Z4qeFcMdcaWp1uv58tAtbss3SovGTA7xF5gubljZrmsJ2wG+IHpZmahkQnB5nQINp+Ce4IJXoZ7eFk/glcqhhFVmovIc7nwLB2E29lhyIqGIIlv+5vbkjHLBqZBGJgKoSIFzNMMx5hSrPz+N3h+exfysjtwPzcMWckQXAtvwzl/ENK8ATjlDkCS1Q9hZCmElFWkQKhIBtl0EiTgBEQBiWAEgal3/82Q7jfOXlk8BJeC23DWDWL5mQE45vRDcroPDhm3QE71QpjaA+HuapBNJ0ACkiDamAjRxoRZ+R9/yDytpPkDB6R5g+yVjtn9EGf2QZR+CyStF4KUHvBO3IR9YjeWHe8C56j5ALPYEmfd0tArReyVveAn94CXdBPchG5wjnXBTtuJpYfMrGwO/YcFJLnTnXey+7B9QpeWc6xLy9F2aW2PmLU2hxbKNv5X70UveFbMk/oLGXHSF/MViQIAAAAASUVORK5CYII="
            alt="U"
          />
          <button
            className={`button_custon ${
              selectedButton === 'users' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('users')}
          >
            Users
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAADH0lEQVR4nM2QXUhTYRjHrZvSuso7L4KCbiSimNEHKpQmSuo0mlNJt0k72/zYpOk8o+xsHj+mOwpF3RVKIVNTs01CQsGL8E5murkPdZ1z3OaOaRgYampvvKMja7k5ycAHfvDwnuf9/877REUdtnJ3abMogwane7BT/0VAdmmaSAP209PbAKjuOhq8rzh24BKqWzu+aNKDRRPhZ2lAH/9PgbOdj85RXdoXLoOWy54t9OtQVsAYiXm6pzUannuMWAzVjT2lDdqqfUlcnbWrdA8O17JJvWlIgmcAgCOMSX930Ug8/GrUnWZnSYPGDFfo6W8C7j48MtHCK+UJd1/jFvvXC++aM8PNe/oarTsvNBF4xC9hBvU1jFG/vGgk+sfosWjMYp3UWKbXcZsT4HYnwG2O7Xq7k35ssYmYwZZ0xkR4GBMxHvjCfZXGYn+J2xz+cILygrZ5H9DNkqDe7gStpJfGADi671CmtPSiG0EGF6TSDz6JZKjJPEHC4FbaC3D7DNBO24FujvLLINbH2JAHQUY9CDLilUga9hT4ZLIL82Lx2qZKBYBa7YeY+OSXsNTbZ3Z6iFOj/cLObqMo2KyqagkrcYvFAz8CBLtKHKElflD0G8Cw0Cv0IsjIHxeCJLo5EmAWa3gJBMNOhpZIJMPL1arvPJ6I7pVVWoMlBOUBTbPkrpIOcfncpEI5EbGEmy/efluh/LjbutqCYCVlxaXMsKJqNCIJHJpSVjs21Op12JvbO2bUzcT0HbTWHczws+cu3wPlGpzbqEHJbRRd2VPik0rbV1U1jpVq1edA5Nm57svJt4CfpNQptndIZa7g2S0UNQMMi4kKV+m5xbbcQhkIhJOY4mWDE5JT69g+NatgJadACgLJzkcSovaqjFyhhS9UAL5Q0csXyt2w5ySmzO8mSeMWLsHveUL5k993AE9UER+5RKB4zRcqXJFJFHWHT3Kbd5/DE8g5vHvlZ/JK5Odhf+1Gxs0riWkcyKXrqXFsn8kVpMDv+SVlcf47AjlHIBAcDxmeU1QWWyiqPHtQ5BSVxf4lyRNUXOULFbyDAubtubaDrF+o+SlZ8HD4iAAAAABJRU5ErkJggg=="
            alt="D"
          />
          <button
            className={`button_custon ${
              selectedButton === 'doctors' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('doctors')}
          >
            Doctors
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC1klEQVR4nO1VW08TQRSuGl+Mr4gY2e22RSOJTzwbr/EHeHkyEfWHGBMlxAc0Bi9ACJYoAuFiIuVSaKHAFgq1gI0JQTSo2LoLAZUyuxhqP3MGSnYpLRd9ZJKT3Tkzc8585/v2rMWyO/73UGLIntFxS2UoUjWU86eOm99jOPTPwWeWkKdoaGjt9idcHhkp5pUTCkO9qsOxowQqwxWVgakaUFpeheq65hQjP62rDLqi4dr2EGi4qjAkeAANaHR1YWTyK9xyEM761+iQh/m8oaVzJYkG8P0Ml7dcoiSCpHX4Bvmze3AEvcEwvAMhk3/NGBZVHfZNkxAHpoMbBdMy+BnqMieIIVth+GM81NbtR2lZVSrpHpn7W72yKQk/v4jDaZOQLLeKQk2u9wagsMR6f2F6JAzFyY2h8c/49vM3Hj6pwLPKF2ntweMyvn8iMofownKyZEXrY+9dNQt9aFOzi2hu82J04gsvlRFJo6uTl6mhxW1C6hsOIxCe4O+0PjXHKg3x91kKCgr22wThnF0Uz1Y4X9V4/G/54Q+RefQMjZmSeAdCXF2kMmMSQkGJaE5onr9srJZypVN2UTwjiqKZH1XHjRXyEmhydW2NE9/Kek9gFOPTs0n/9bScUC9SGOKT0Xn0h95vK0lkYXlVBIhHF5CVWcbUizRw+O09AyivqkFnf5DX2jf0jouBSkbzLjnI12kf8ReNxYn02pSgkiQdy8nJOWAomYN/uRvcevrHEh49rcRH9deGqBSGmKLDZgi/x3bUdpK/EEmSIF3IE8UTNKfmSL3IPza+phhnbRPvYe2+AJ9XOGvQ4unnKNx9Q8nedYkCEtk2QTjvsFov5mflHzShOp6be4QU4bBaT98tLrnzxt2nk9ooUPhTxHRrkjpdgNbafQG96H7JbVIoKdUhCPl02Yy8GEpnp15EZKYpT5w4WFeinQ1SC5c3w73VPyM9CzdV0e6w7GD8BQ+2BuLkW4trAAAAAElFTkSuQmCC"
            alt=""
          />
          <button
            className={`button_custon ${
              selectedButton === 'buyandsell' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('buyandsell')}
          >
            Buy and sell
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAADLElEQVR4nK2Ub0gTcRjHpVe+iQIJfNm7XkT5wjajFwkl6a0tBNtumHrdtu78i1upm/9SNx3+aejUdOemTqU2pziz2Ubq7EWILxSiICaUlYTWG4uwAgOfuJ/b4f5oLvfAl+O+d/f9/O55fndxcTEsHtGdmKIwJ1+8zZyLZW5Q8UhGw5cxwJMxH+L2qxSi9zSfZBz/K56Mec1C+DLTFvLkjDgMwicZ1e5NsRFPxoyFQXgk440phDStBgGSKeYEn2S2Ywnhy0w7vNyuBA6SRAyevEAyaZeVk6VptS+Xj6orld4BNu+SzHI8rGXCB75MUdsKHFXCVp9t3x0WgKhGPsPUq99I5hffuYdti1ucf6fvI/I09nXO657ZPDyk2rEBS58Aybn8i4N4fX84v2hwDXla51fOYxfxb4h2Ift6uR2kSgOQKh1QFS2gbBoAYY0nNhCBWCHBpPk/MJyCXJyCLJwCOU4De85KoGiAEvNbUNvWkSSd71BgXu8q5xX6wREhmIRSYDi1Ewh8jtOwgNOwhNMg9nsYC8q5CyL9UvSDT5cqzmISajsQxEqHUwhg3eNhAZBcGz0kA6dGQ4NYFeA0CCL4GE7B/cFFyO1ZRYFsi7pmNpFqx7+EQ1IJIj4Dp34KpHTwaqU0CLMLQN/dD/2OKRgYcyG1MSOQRZZCjWH48INPF+efYUPFMhW09g6BurEdNHoj1BtMkFdUCWOeeRhyesDh9sKQ043Oi6v0aNcdGnJNQicFIDbXLFgn3GBxPEXAm3IlPBweg+FJD/KHnR6wjE5BTpEGpIX1kOdvV7F1DXrmviE1TERo19XMogR2V90qVIPDPQ/26TmwTc+CrsOM2pZfoUWrZ+xP0FHd1LHbTrolusFjUnrJOGhHIQERJVUorLq5K8jvGRnfnVfFaHSQew2G+r1BrDT+FbNDD71WpusEUfOb6CB1dXXHOq32jb1B7ExYyNDEsxCIF1SG8XlRm099kG60rqSFffEllcZTXdbR9YMgNtcsNBrNloj/pMMW+0YN7X0dpscTWy09Vg5ic82AwfzofY2hW3AkQGgRhWWJGVL5+fImQypBEPFHCfsL2/BthUcqrcwAAAAASUVORK5CYII="
            alt="d"
          />
          <button
            className={`button_custon ${
              selectedButton === 'daycare' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('daycare')}
          >
            Day Care
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAADj0lEQVR4nO2VbUxTZxTHTwGHxmUflkWdRpMtLEom05ih8YXpcCZq1ZlNE+MUv8iyZYnRQAuFbbWLm+tdoLfEMggiBjTcllYFtNIQqS2CmRMKEhXju0SDqIvL5qDL2v9y7m3vbIQ6Bx93kicn59znOb97Xu5zif6XMRdA897hU1kr7Kd/XuX0PZ5Q5PSS2bGO/aOOvdHhSFxR59u2qs7Xu9bVijWuVsyvaQYJdmWZ7T0kSFlk9Ca9cPCVbndypuTdue5Ia58tcBX9vw+i8uItLD7Vi3fP3cebJ3owfl/jUzDpBn17aBftKprw/OiAZpm9JW+10zdQ0X0djwaD6H8yhB967yOj+xcs6HpqBR5hZvMVTCxrUkC7K0E68R7ll+yIW8blknc/l2RTw1kEBn7FN5f7sTgSXOu7AUtxLQ4ZS2GxSLIdBc5quYaX9zWA9CKDQHqrOCxgfo37Fa3LH9S6WrHIdy3mrQ0HPPjj/Q0ILflQXU8yN8JQ5YnZ99bxLmjyS0B6yxDlVE98BpLh8LzBWSw/0hZz8JMT3Qgu/UgJ/kUBWFizPbTsY2x298Tsf2l3hZJNoW36M5ClXm/Sapc/mFp5EumdD9VDR/XFCmDlZoS/NMsQ1myz35VvUfemdzyAJs/KkMcj9mWqrb5DI9jxtu+mejCQlYtQdi6GE/Z3bstV96Z6LkV6IvpHni6ztIcnZarznHrQ/9nXCGm3IlxdB7ScUaK3nJHtkHYL/J8b1b1TDngUSL5VGBnyfW0qQ8aJR5HeoZRsT2m92uxwjkkpV45J9ZnKG9RSJX31I0hnCZNBnE1xRbA3MmjGsYB8eFHnA5zNVhodWpuFsO2grNluzy7EwoDyMtNqvEoWOmtTfICcjSONBCmYUOTEO219coAl5wdQvrcKd9Zvx18Z62Vdtveg7Ofnad7rSDCUcBZ/kq543vMhcm/sBZwNXx3zfuqP/dK7Ytfc9r5/xjZXNNG/Fh4/QaqOgua23x0WMMd/G8mm/dGJqiejMYFeSKzuZDJLxxmUWORCStOlGEBKfQcSC21RQDMZq8bTfxK+wgV7RfS2nVTbhjT/LbxW1hhpsgjKE6vp0/JxNGrhf4Yg/SbDjJH668RBKijNozGV7xwpZJaqqMB2gfRWiQzls8YWQJRMRK8S0WQiej2i2Wb/qIWDZRLRmjiLn08aDYQnZiYRLSSiD/jPHAnMmm328/O4k/U3/33gVJOuMi8AAAAASUVORK5CYII="
            alt="I"
          />

          <button
            className={`button_custon ${
              selectedButton === 'insurance' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('insurance')}
          >
            Insurance
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAADF0lEQVR4nL2Vf0gTYRjHFwWZLbbbtIhQjEKKhJJFGVjzP/sjwX5oW1GJP0AqizR3+I9GURItZkvbbiSKYJBERspuzenWNhPEwAzqDymcRi7EZmkUJH3jvW23m56bFPXCl3t4n+f5ft737r07ieR/D5hkRXzcLE2GiRqBmXonKpJrliaL9UabNiZLwVDZwSLKFWmQd8BMIY6eROqDvcSLeApXnQYT1crFZqqBXGdurtr9rWHNi7DmzCmDU4P3/UQkFuZIrbCXeBHPCKBOkgDLunThNgP1kpzP9RKENX03BR8n/ZxILMyRWmEv8SKeEQAjTQJDlQaTsl3k+vVWwgHhKmebd7wMA0gszJFaYS/xIp7xHnaO8F7Pt2VgevghJxJHPQeTjNtBbEMPXQyvbhj9dKYYAEySeCwAoKNgJbx0J7y6xyReCOiDlwa8dK0owBxDYYCHTg15gMTRAK/OGUpc+WPAAJ3GAwbotNgARq5eNoCRq5cH8FQB9qJXsBbmcS+fiTLAJGdiizKgbcNasIc3wnbiAVznYwDspwHXBcB2cgpdhRlxT0a4F5IVYDUjcFb8gv0U4K5aAtBTBLgvAe5KgNUMLTK6J1MRLZq3aorhKJ3hVk4AnuolAM8rAfuZ4BYdJQF0Hy+ImCuyoFdOQq/0w0zt4+efHkoEq5mAVwc4zwG9ZXEesqMUcFUEV8Fqx2A9uBomxR4YqVloNoOTUTEHRrGX62O1RjjP/oBHBzwLrT72KaoGHKFV9JZ/h1VbCwOVC6NiBMWp4ERiMtdVsAm2k36u1nUxuIOlTxF9g0+G5a4CrFqWyxuUDTzAoAx+NdmjOegpCyzq8+hGMVSXGA3gXnMd+/cA3Sz6a8RPoIc1H/nprfGFNe++/OFLd0knZ3Z7y1aUb8/EtfVaNFFXydzrR5W5AVuFb6LvOq+3PXqLuvFT5GcjHPst4xCThADaVfloV22DJSkdZnkemcu2jLeK9/jEf50LCzP0b3gAfysJpF2VHwZk3hlFVtP7ZQKY8TExRQFa1Alo2SkPAnx6sfpsy9gxUcC/GL8BXYnF+rwZQV8AAAAASUVORK5CYII="
            alt="dc"
          />
          <button
            className={`button_custon ${
              selectedButton === 'orders' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('orders')}
          >
            Orders
          </button>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="25px"
            height="25px"
          >
            <circle cx="24" cy="24" r="20" fill="#4dd0e1" />
            <path
              fill="#fff"
              d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659l-6.083-6.084c-0.879-0.878-0.879-2.303,0-3.182 c0.878-0.879,2.304-0.879,3.182,0l6.083,6.084c0.879,0.878,0.879,2.303,0,3.182C23.643,30.47,23.067,30.69,22.491,30.69z"
            />
            <path
              fill="#fff"
              d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659c-0.879-0.878-0.879-2.303,0-3.182l9.539-9.539 c0.878-0.879,2.304-0.879,3.182,0c0.879,0.878,0.879,2.303,0,3.182l-9.539,9.539C23.643,30.47,23.067,30.69,22.491,30.69z"
            />
          </svg>
          <button
            className={`button_custon ${
              selectedButton === 'orders' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('verification')}
          >
            Verification
          </button>
        </li>
      </ul>
      <button className="btn btn-primary m-4 mt-5" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

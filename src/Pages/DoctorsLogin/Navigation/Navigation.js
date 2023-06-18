// import React from "react";
import React, { useState } from 'react';
import './Navigation.css';

// import { AiFillMedicineBox } from "react-icons/ai";

const Navigation = ({ handleSelection }) => {
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    handleSelection(buttonName);
  };

  return (
    <div className="side">
      <ul className="sideBar-ul">
        <li>
          <svg
            onClick={() => handleButtonClick('Home')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="30px"
            height="30px"
          >
            <path fill="#E8EAF6" d="M42 39L6 39 6 23 24 6 42 23z" />
            <path fill="#C5CAE9" d="M39 21L34 16 34 9 39 9zM6 39H42V44H6z" />
            <path
              fill="#B71C1C"
              d="M24 4.3L4 22.9 6 25.1 24 8.4 42 25.1 44 22.9z"
            />
            <path fill="#D84315" d="M18 28H30V44H18z" />
            <path fill="#01579B" d="M21 17H27V23H21z" />
            <path
              fill="#FF8A65"
              d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"
            />
          </svg>

          <button
            className={`button_custon ${
              selectedButton === 'dashboard' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('Home')}
          >
            Home
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADmUlEQVR4nO2WW0ybZRjHH6PeaOKVXniYd3qhF154iJELE5IFZRwqlm1STltFLG3ZxBZhlEURcGxMp25lbEFcUGtYXCiTdIy14NKg6DxQFGfUtFt64Cvtvvd9E8gunH/zfpFkGyFl/bob45P8kub7mvzyf5738BH9X+uo5eXlDUKIZyVLS0sP0M0uxthGIcQ3QghczcLCwk/xePy5myIVQrg453+f/zWMAz1DsNV2arzfM4Tfzkcg383Nze3PqZRzXiWTnRj2o6LYiZOtNlz4wKIx2mrVno0cD2jpx8fHm3MijcVidzDGlOngLLa94AQ/+iowdC3siAW1Bie+ng5BURS1tLR0g26xEMIok9i3d+HnfZZV0hVm91rQaN6jpR4YGGjXLeacv5NOX0J5oWNN6QrG5x24lFbh8/lOENFtehMfiEUXUGtoziiuMTgRjykIBAI+IrpLb+ImzjmMhU5cHlxbKt+VFzrl6obH4xkiojv1Jn5Ezq23cxAeh31N8aeORrzbfUybsclkaiKiW0hvLS4uTskWVpW1YXy3bZX0VLsN1S+6EI8rmJ+fnyWipyhXR2QqlVIjkRgcDb14uawZh2yv4aC1CeYyJ5zW/bgQicmtxPPz8+t1t/nqikajDyuKEpetlCfVl6NBDflbPksmk6KkpKSRiO6jXJUQ4h4hxDHO+RXGOL7/bl6TjnzxFc5O/YjFZFqTR6PRX8Lh8NM5kTLGnuScx+T+PNp/EoZN7dhS3gNT1SFUVh9GxUvvoahgF9p3fQQ5ClVV/wqFQq16pU8IIdiff1zEVuPbqDAdhP2N09jpmrqGHW2TqDF/jNJCFwJnzmnpZ2ZmurOSCiHu5pxflNKy4t3Ybvl8lfB6Gl4fg6HoTZwamwZj7IrX663JRjyUSqVRubUbZosno3QFq8OnjWMu9DsSiUSqvr7+/nVLGWOPy/v1iHtUa+96pSuYLcMwV+/TTjG/3z94I2k/SySSKC5og71l4obFks3GvThz+lttb+fl5T24rvtXCLHk+WQClVXurKRaautx2Bs+1BZaf39/S0Yx57xY/rmuthev7BjJWrzTNYmigjYoSgrBYHCCiG7PJO5UVYZNG1tgaRrTVmq2yHafnfoB4XA4QkT3ZhIflof9NlMPTJu79LGlC5P+c/IrNE1Ej2YSP6Oq6uXrP2H14PV6h4nooYxz7ujoeMztdr/V19e3Ry91dXW2f6/JWzOK/9P1D/n3hrKt3eWGAAAAAElFTkSuQmCC"
            alt="profile"
            onClick={() => handleButtonClick('profile')}
          />
          <button
            className={`button_custon ${
              selectedButton === 'users' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('profile')}
          >
            My Profile
          </button>
          {/* <button
            className="button_custon"
            onClick={() => handleSelection("products")}
          >
            Products
          </button> */}
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAYAAAAfrhY5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJ0lEQVR4nO3We0xTVxwH8EIfF1omAspLoQ9hMybLMpfpJm6JWZZl+38xgrr5BgQ1OtwWZ6rODeRRUEcZtZQCBQQ1OuceyBAQzRyCsmW0tBTa0paC2StAYjZNvsu5t6W3tLS4P/aXJzlJ/7n3c36/7znnlsN5OgKM1/pmVq/rm97A+Q+DPPd678yLT/bU7j4+59CAlJPbmZZxZ9qa0Tv9SPDxzVWcAz0yMqkcMtvnzGsyapt3RuW3rsronXqccWfKSr1bn0ZtrpdydlfzQ8MFA4awgvsIy+vCmu7fsf7uDAR518HdfxvcfT3g5XWDt7cT/NwO8LPbIdjTBsHub0HtugZqx1VEbL8C0VYd/dzazgcQbqyBcHMThJk6ffAFHBoUcw7/DH+8Ddz9t8DLvwleXhf4e2+An/MD+NnXIdjzPYPvZOFb5uBZTRBl6hCRqRPPj394X8I5PICwgnsIy+/G81cdeLnzN/By2sDdx8JzGVzgwXex8G1XEJlZjzU3HuCFSyMQbtRAmNUIUWYDqI21knltgfyXlTT+wT2EHewFN68DvLx2cPN7vPhegneAn9MOQTZp+Xegdn0DaufXiNj+FSK2XUbE1laIsuog3KSlYRrf1ICo9y6unBePqRhaH1ZA8H6EH7qL8IM/IfzAj4HzzvHk7cZ3ePHI9y8hcusFCLe0MHln6SDaVI+og+3r58XTL07I0lonsKLFhRXnXZA1j0Oqc0LS4IS4zoFUrQMptXYsrxnDMrUNySorklRWJFZbkFBlQYJyFPFnRxB/xoylp4expHwYcQoTYktNiCkxIlphlM2LP3fZJXn20iTSL0zCswhZswvSpnFIdOMQNziRWu9EitaB5bV2LKuxI1k9hqRzY0istiHhSxvilVYsrbRgyRcWxJ0ZRezpUcSUj2CxYgTR5RZJcPziJNJbJ5DWMsFUT+BGFlxHYAeWaViwyg1XWbGUoAo94ipMDFzhhsvMofH0CyyYVN1IqnZCXO9Eap2DqVrjrvrcGJJUNrpqGq604FW1HqN/PMQn7TbElBmxuJyBF5WaEV1oCII3uyR0u88HaLcHZrdb5Wm3FfGVFqyr0ePBzD/wjNXKX7FYYUZ0qRmLSoZD4yvYOXvarR1DisbGwJpAOVuwVj2IiWkvXNs/iZhiA1N1yTCeKV4Ifp7JmW432eU1oyi7Mw55tx3JqhH/nJWkYoNPxdW9LsQU62fbTeCoUyZQwXBxs0vik3OdHUe77LMvLb7tRFKVeTbnBKUFGZoAcAkLLiHwMERFC8Cl7Jy1drzdYsLU349nX37qlgOJlcP0uZ4Lq3onEFui98mZrrrIBFHhAnAJ+1jRO9uGt5qN+OvhI+8Cehx4JUDGsaUEdu9uD3yKgYWfGxeA61jHqpY5VslqK95p9u3ADOs3U/Ggz7GahYsYOPIzIyh5CFzcEOA8k01WbcGbDUb8yeoAGdr+ScSRVhNY4Z+zsNBEwxEnh0LgtS5J0OuzyoI36oZmF0DDpXrv9VnmnzNd9UkjqE8XgKeEvD5HsUFrwEdtVsSVGXyuT592e2BSNYFPLATX+l+fCZ7rU2llfTDMDMzOmd1uD0zafWIIguOG0PhyTYDrs8rq/VqddeMVnq9ViJzdMP9YCDxRPS5+4s9kkJzpdh83QHDMAJ5cD86Rwfn/w71U3cdPVo/p/XKudLf7rBt+gpwJzJfrwT2qH6T/HQcbZAEJKqs0XmmTzZ3RCjKN/rPQKKPmTjlrHhmScuSdvKDw08H5n8a/+x31YoD5P/8AAAAASUVORK5CYII="
            alt="apt"
            onClick={() => handleButtonClick('Appointments')}
          />

          <button
            className={`button_custon ${
              selectedButton === 'products' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('Appointments')}
          >
            Appointments
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnklEQVR4nO2WSUwTURiAJ9Fop0UTt8STCCUeXOPJ5WJiIva9guIWFdTEi/HgEjVuKIFgNdEIvNcWRahaPXhgM2GiEm2USBRQUSAxtuygLEKBwk2j/OYfOkqclpmKN/2TP3kz773/e9u/CMJ/EQTBwBIWGJmFqg4jfd1UA6drDdySIjJ6DBXbhpyENdg36cMTGTkkMjoqMnIQv4126wqR0zsGTgdETiGUGhjx4xgTsyyfBJhmyQYZHTUyUi1y8h2/Z+cmQWLJOThbUQA5NUWyYhv/zXImBReBY4l7hiNpTsRgAyel43cz//p2cL4uhd7BfhgZGQmp2Od4VQILC1KUBbSYmHVpROBZzqS28WAjt8pGw0F/X0CKdDF4/DRgyt64RBc0/dnduLm521R3aLJboe5Toy748MgwpFYUKHPborhlniZY8la2JZaeh13SBTj97Abkvr4PkvcFNHQ16YKOh++RLinH7p4Qanvp3tI3NAD+wGBEEEXf1L4F1y33z++ewT6Izk+WH5yRW1aGBZe8r2jpHugD/1Dk4Lr6ekjeu1+Gj/9vf1U8tmtGboeEHn7Ip9d3No629n2C4d+MBgIB8Pv9EUOVXaOroZ+HDDJplTcPvO9qgabeDtXkvHwXJG7ZDs5redDR2akbqmhCybngXVtWq8AZle7rL9sbwNfbrpro9fngdGoaxNNNYN28DbKYHaqqq8Hj8WhCUfGRyu5lp7tV4NQKl/TAVwUfetrCGqhvaID0TBus30AgOiYWomPNUP74ieb9Y4QLhtUTKvBRj1Ny15VD7UevpqHnzyshJtYMseY48DVq+3Z2TeEYmJPjKnCKZHNerroHjxqrdb3id9knZdUz9tTTvDFwDtmpAscXnjxwxOMAVlOky1i3K0NWPWMnfFyLC9On0eIz33HQ5yH/XwNruhOK2bWnOc61D/Jry/4amNcEAwint4RwEmWnW3EQpraJUqBeMO52Qf5ujFrfNFOkyEgzwneWZcqB/k/BODe5zBYMl/SmoCUzr1jMIqdfcQKmtnDw3iKnrOGgWJkEY3Rr1NWEuZpgedfZlkQDI19wIiZ1PDI9r1c53mTJFnkhoMg0B1kkcupFA5jaMMtMtADsw4ck3+nY8TZHDFUECzZM4kqxh26B7oaxF8MgRiRsW4tTfxV7jHzDFzwzK362MFkxOcgyzKfBEjZ0ectJP46JuMDTJYU7pmD0wSzzs6DHdg5dhX36jAj/qPwAyxhpmIeHvi4AAAAASUVORK5CYII="
            alt="pen"
            onClick={() => handleButtonClick('Pending')}
          />
          <button
            className={`button_custon ${
              selectedButton === 'doctors' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('Pending')}
          >
            Pending
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJElEQVR4nO2W20vTYRzGB/4VoSRkQ43otKhMtAwtS6SoRDQnSWHBHHkoYVdddJFBdOlNB0KzdIZpOo8ttdTUFHNmalgeNjd3cgf329z0tyfen6ZL95u/bXTn8we8H77f93mf5+XxdsRB4mGEiRQr4lsKV97NYSqM979UMIHQojEI8keXE8Xf6UcixbLjtmIZud9cuDHkdOQMOEuE/Y7EzF5KkNZDhQYNTANC7v7Ey8Ix2p0/RkM8SkM0soINqAs5g05kf11CVr8DGb12pHdT7itd1Is0KUICBhdPQFI47gZnaI8dV7spXP5sQ2qnVRIQ9N4k+AXjtC0Q6MVPi0jtsNpSOix8v9ZbzExKU0FAceGjFefkFiqpzSzhtHbmTgNcryc0WW5BUpsZZ1pMONW08Hxb9/plJC/Q83Izkj+Y16Gnm02IazTScU26XazgOz8QExS01YgHfRrc71EjQaZbgy4gVmbEyffGGHbwKOKDgT4Z1MINgHYDRZ1ziJMZGeiJegOOvdPFsYKZcPAG7XdwhhJZnSvIbFZtQOv0OFKrK/ERg56JtArN6jKhdMSAnE4tZ+j1llnENujXoYJaPQ7V6BwHpYatqUaydzNU+GURjdMW5sApyxKE7fMBQQ/X6HDgrRb7pZq8LeBchUu8+U6v9VghmzKvHQv8Ni8hQ64ODFo9jyhvYNIyTOBvMlJauxGNHvAZixPpLWo8HtAyJiJadK4gZxtodJXGwZfOei8Q0jLe3HtJrkfrzOrKibSUy69Jo6s0iKxUP2R1dXafPZ7NvSktWtT/2pjcj0kRWakB/80c+3MS9tljfMXg2aZ51E2a/Ibufa1GRIWKPUBIiZM+9ZW9CQ1qlA7pIGxWcobueaWid5dPs0cmESlxX4HPxKDMgNgGA0foHMLLVE99QpmppQghJZ7abqW8Qteyl+OkVHiZUsLz5zdCSjxZbrEFAbWFVii5fwQ8RUo8MChZrzKwr8/ftZMSJ33qx6R0eLnymV/rZRMp8eMNesHRWkMiaRkS+J6JFFmpLuFXqBIjKtSCbd0bjEjL7KvWiKKqNCLWGNwR71/9AcQI8o7Ip7deAAAAAElFTkSuQmCC"
            alt="v"
            onClick={() => handleButtonClick('Approved')}
          />
          <button
            className={`button_custon ${
              selectedButton === 'daycare' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('Approved')}
          >
            Approved
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQklEQVR4nN3WWU8TURgGYP6Fd3otqFWEyg5BohfGBKMmcqeAgMqO26UmmLglaoyRC6PiFnGBrgPdoMu0w7SUaYtFBKrAlIIKSuAHvGaO1jAMMWekNzrJm0wmme+Z850lk5b2L10Pnr3Z0tmlf/bklfFp5yvD5pQV9p0v1XIXSy5I8Z4rIrFcqbzV03Gd0XXcZF52dU+96LH4u/R2/9tuw5Tp4R2GeXSXcVw7ecvTVnBhdVwtOVpq2HuuaCHQfhiRjiaEpdxvhOvxDXQZ7Hht6sdbsxN9JvOY1cyMGWxeGB0czP08fM9vQ7jXAOFePQl3qRyu1vwFevh8MRIhJ1ZWVn5nPDYNnYWFweaDyTEI8wCPXmcAFncQVlaA3RfGlDgne2d2eADOljyoGTHmRnyyIl8XvkGITiIUjSH8PobI2EeMfJjCu/FpRCdmMDopYvHbkuydRITFQHMuPcyeLcTciFdW5G9C4KYcetjTVpAyuF8N7G7NTwk8G2HhaNxDD7ta85GIpAAOs7A3aOlhZ0ueAl5eXkYiFMFsKEzuVz+fCQQhBoKy50nYVp+tAm7OJfMjKyKEsVRRje9HjyPOBwhCUC+H+eIDSOTuRzwQXAN7YFUDDzTlKGBxWCDoUlk5Fg9WQOR4iL5Bgs5vzUE8uxRx/5ASPpNFD/evA0ujEwf9BF3M24/PZeUyVGQ5RavjYQ8sp3fTw47GPWRFrl0spLWDfnzedwhfNIUEnZVQF6tAk3DfqUx62N6gJQtjPVhq8XzJQYJ+yiyBtfgIYk7v+nDIg141sK0+m8zPn1BppNaiw3BvygK7dS9innVaHXKDqdu1MVgcGpbN6bTbiwmXl6BJ/BMfVMDm2p30sPVMFpmf1UVm/EM/t8wvNLmdkjgZNReQf6wE12joYcvp3QqYLCw+gGmOVxwgEjjp8ytaLcGmkzvo4b5TmZgYjWz4yJRqGNXAvSmEDdXb6WGmblfKYH3VNhVw7c6UwOOjEegqM+hhc40GUYHfMBwd5tXBphoNOP0TCIKwofh0nepgY/WOBaa5GLbLFbJYLx+TxXLpzzE1Fkow/e+tsUqj1VdvazdUZVzVrc0J+vRUprd3V6XT/9Cn/c/XD7W5twW9rx8gAAAAAElFTkSuQmCC"
            alt="r"
            onClick={() => handleButtonClick('Rejected')}
          />

          <button
            className={`button_custon ${
              selectedButton === 'insurance' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('Rejected')}
          >
            Rejected
          </button>
        </li>
        <li>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaUlEQVR4nGNgGFHAfn89h/GRxjKjww2ndHaUbVBYlHZKYXFaqfz8eA6qWGB0tN7J6EjjTeMjjf9BWHdH+QHFxWn/wXhR6g35JWmOZBlsdaST1/hoo7fxkcbNMMOxWgLFCotTNyktTPfSWpXFg9dgw6PNsUaHGx+D8ZGGP+iG47MEbtmi1N8Ki9IeKy5Ke6ywMCMWS7A0ZOMymFhLFJHxkpRsTEuONKRS0xKFJSmp1LNkfsr/0A1tYJo2lsxP+b/g4u7/INB3Yi0oteG3xPhwQzyGoYcb/hsfasBuyXyEBX///fuft2v6f8VFyCkuLR4zdR1qdEY2zOhg/f/WS+v+917ZDGajWIJmQdGemSi+AGGlRSlOGJbo7q+X0diQt199fd4BEHZbX3v6379/YIPmXdr5WH1VzkGQuMrU2I1rz+97DrHg7//arbNuy/WEHZDrC0fCEftVZkXLYM0r/DWOhwVqnP6DcbXj/4r1k/7DQP+eJf8FKx3+Lz+2DW5B7pT6/xLR5v8lYlCxeIz5IawWgC2pdkyEWwK1qGrDZLhFZx9e+0/IAjCONsWMDzgIDWUWqHY6g24Rso/+ErBAPNr8NMgc3JaAfFPraCxQ4/QLm0V//v79X76s7zZOC2LMf0rFWhritQBnsEEtUmn0/y+Ub3cAaxDFmP/DH0xYgEC1Yw2GRTVO/4UKsFsiHmNWSZIFcItqnXIEqh3/ErDkn0S0eREDJYC/2tmFv9rpOTZLxKPNXolHm3kzUANw17uK8dc4bgdbUmh7CGrJPuEIKykGqoL6eibBasdMkTzbqxKxphkM9QxM1LVgKAAAa67FPYoTvhEAAAAASUVORK5CYII="
            alt="i"
            onClick={() => handleButtonClick('temp')}
          />
          <button
            className={`button_custon ${
              selectedButton === 'orders' ? 'selected' : ''
            }`}
            onClick={() => handleButtonClick('temp')}
          >
            Insurance
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

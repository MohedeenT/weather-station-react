import {useImmer} from 'use-immer'
import './main.css';

function App() {

  const api = {

    key: "1b8f188b20eaafac60c2577c77602fb4",
  
    base: "https://api.openweathermap.org/data/2.5/"
  
  }

  const [state,setState] = useImmer({
      query:'',
      weather:{}
  })

  const weatherGetter = ()=>{
    fetch(`${api.base}weather?q=${state.query}&units=metric&APPID=${api.key}`)

        .then(res => res.json())

        .then(result => {

          setState(draft=>{
            draft.query = ''
            draft.weather = result
          })

          console.log(result);

        });
  }

  const search = e => {

    if (e.key === "Enter") {

      weatherGetter()

    }

  }
  const dateBuilder = d => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];




    let day = days[d.getDay()];

    let date = d.getDate();

    let month = months[d.getMonth()];

    let year = d.getFullYear();




    return `${day} ${date} ${month} ${year}`;

  };


  return (
    <div className={(typeof state.weather?.main != "undefined") ? ((state.weather?.main.temp > 16) ? 'app warm' : 'app') : 'app'}>

    <main>

        <div className="search-box">

          <input

            type="text"

            className="search-bar"

            placeholder="Search..."

            onChange={e => setState(draft=>{draft.query = e.target.value})}

            value={state.query}

            onKeyDown={search}

          />

          <button
          onClick={()=>{
            weatherGetter()
          }}
          >search</button>

        </div>

      {(typeof state.weather.main != "undefined") ? (

        <div>

          <div className="location-box">

            <div className="location">{state.weather.name}, {state.weather.sys.country}</div>

            <div className="date">{dateBuilder(new Date())}</div>

          </div>

          <div className="weather-box">

            <div className="temp">

              {Math.round(state.weather.main.temp)}°c

          </div>

            <div className="weather">{state.weather.weather[0].main}</div>

          </div>

        </div>

      ) : ('')}

    </main>

  </div>
  );
}

export default App;

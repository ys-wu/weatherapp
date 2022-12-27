import React from 'react';
import ReactDOM from 'react-dom';

import { Divider, Table } from 'antd';

const baseURL = process.env.ENDPOINT;

// Helsinki, FI
const defaultCoords = {
  latitude: 60.1674881,
  longitude: 24.9427473,
};

const columns = [
  {
    title: 'DateTime',
    dataIndex: 'datetime',
    key: 'datetime',
  },
  {
    title: 'Weather',
    dataIndex: 'icon',
    key: 'icon',
    render: (icon) => <img alt="icon" src={`/img/${icon}.svg`} />,
  },
  {
    title: 'Temperature',
    dataIndex: 'temp',
    key: 'temp',
    render: (temp) => (
      <div>
        <span>{`${temp}`}</span>
        <sup>o</sup>
      </div>
    ),
  },
];

const fetchWeatherFromApi = async (coords, type) => {
  const response = await fetch(`${baseURL}/${type}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coords),
  });

  return response.ok ? response.json() : null;
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null,
      forecast: null,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        await this.fectchData(coords);
      },

      async (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        await this.fectchData(defaultCoords);
      },
    );
  }

  async fectchData(coords) {
    const currentData = await (fetchWeatherFromApi(coords, 'current'));
    const forecastData = await fetchWeatherFromApi(coords, 'forecast');

    this.setState({
      current: currentData,
      forecast: forecastData,
    });
  }

  render() {
    const { current, forecast } = this.state;

    return (
      <div>
        {
          !current
            ? (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '50px',
                  marginBottom: '50px',
                }}
              >
                Connecting...
              </div>
            )
            : (
              <>
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '50px',
                    marginBottom: '50px',
                  }}
                >
                  <img
                    id="icon"
                    style={{
                      // marginTop: '40px',
                      marginBottom: '40px',
                    }}
                    alt="icon"
                    src={`/img/${current.icon}.svg`}
                  />

                  <div
                    id="location"
                    style={{
                      fontSize: '20px',
                      // marginTop: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    {`${current.city}, ${current.country}`}
                  </div>

                  <div>
                    <span id="description">
                      {current.description}
                    </span>
                    &nbsp;&nbsp;
                    <span id="temp">{current.temp}</span>
                    <sup>o</sup>
                    &nbsp;&nbsp;L:
                    <span id="tempMin">{current.tempMin}</span>
                    <sup>o</sup>
                    &nbsp;&nbsp;H:
                    <span id="tempMax">{current.tempMax}</span>
                    <sup>o</sup>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '50px',
                    marginBottom: '50px',
                  }}
                >
                  <Divider orientation="left" plain>
                    120-HOURS FORECAST
                  </Divider>

                  <Table
                    columns={columns}
                    dataSource={forecast}
                  />
                </div>
              </>
            )
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);

function convertTo12HrFormat(dateString) 
{
    var date = new Date(dateString);
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    var strTime = date.toLocaleString('en-US', options);
    return strTime;
}

document.addEventListener('DOMContentLoaded', function () 
{
    var api = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/28143?apikey=EpuOWdOMq1YXEPDk9xIFxPAimgt0qSL3';
    var loadingElement = document.getElementById('loading');
    var weatherContainer = document.getElementById('weather-container');

    loadingElement.style.display = 'block';
    weatherContainer.style.display = 'none';

    fetch(api)
        .then(res => res.json())
        .then(data => {
            loadingElement.style.display = 'none';
            weatherContainer.style.display = 'block';

            var headline = data.Headline;
            document.getElementById('headline-text').textContent = headline.Text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            document.getElementById('headline-category').textContent = headline.Category.charAt(0).toUpperCase() + headline.Category.slice(1);
            document.getElementById('headline-effective-date').textContent = convertTo12HrFormat(headline.EffectiveDate);

            var dailyForecast = data.DailyForecasts[0];
            document.getElementById('forecast-date').textContent = convertTo12HrFormat(dailyForecast.Date);
            document.getElementById('forecast-temperature').textContent = dailyForecast.Temperature.Minimum.Value + '°F - ' + dailyForecast.Temperature.Maximum.Value + '°F';
            document.getElementById('forecast-day').textContent = dailyForecast.Day.IconPhrase;
            document.getElementById('forecast-night').textContent = dailyForecast.Night.IconPhrase;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            loadingElement.style.display = 'none';
            weatherContainer.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
            weatherContainer.style.display = 'block';
        });
});
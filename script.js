
        const urlParams = new URLSearchParams(window.location.search);
        const symbol = urlParams.get('symbol');
        const startDate = urlParams.get('startDate');
        const numOfDays = urlParams.get('numOfDays');
        const apiKey = 'NEYWVJO49TY6GY4L'; // edhr ki API key apni vali dalna


        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const dates = Object.keys(data['Time Series (Daily)']).reverse().slice(0, numOfDays);
                const closingPrices = dates.map(date => parseFloat(data['Time Series (Daily)'][date]['4. close']));


                const layout = {
                    title: `Real-Time Stock Graph for ${symbol}`,
                    xaxis: {
                        title: 'Date'
                    },
                    yaxis: {
                        title: 'Price (USD)'
                    }
                };
                const trace = {
                    x: dates,
                    y: closingPrices,
                    type: 'scatter',
                    mode: 'lines+markers'
                };
                Plotly.newPlot('graph', [trace], layout);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
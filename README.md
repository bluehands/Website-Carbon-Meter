# Website Carbon Meter

Tracks the carbon emissions of a website as live metrics. Based on [CO2.js](https://github.com/thegreenwebfoundation/co2.js) and and the [actual grid carbon intensity](https://github.com/bluehands/Carbon-Aware-Computing).

## How it works

This project is based on [CO2.js](https://github.com/thegreenwebfoundation/co2.js) from the [Green Web Foundation](https://www.thegreenwebfoundation.org/) which correlates the number of transferred bytes of a Website into the carbon emissions. With the aim of the Performance API the transferred bytes are collected.

There are two stages. First after loading of the site, all resources are collected and counted. In the second stage, all background activities are monitored and also counted. Currently all requests from **fetch** and **XmlHttpRequest** are observed.

The total number of emissions is stored in the session cache of the browser and is available as long the browser tab is not closed.

To get the total number and the last request, consumer have to provide a callback function.

To calculate the carbon emissions, the electric energy has to multiplied by the grid carbon intensity. The current intensity is downloaded from the [Carbon-Aware-Computing project](https://github.com/bluehands/Carbon-Aware-Computing) as a efficient json file. The file contains the forecast for the next 24h and is updated several times a day. The file is cached from the browser and additionally in the local storage of the website.

## How to use

The project is in an early stage - no packages are currently provided (coming soon). See the sample project [cafe-website](./cafe-website/).

* copy the carbon.js in your script directory
* Consume the CarbonMeter (Simple example)
  * Add an element into your html file to report the carbon
  ```html
  <p id="carbon-emissions">Carbon emissions: Session NA (Last request NA)</p>
  ``` 
  * Add the following script in your html file
  ```html
    <script type="module">
        import { CarbonMeter } from './js/carbon.js';

        let cm = new CarbonMeter('de');
        cm.onMetering(
            (sessionTotalCo2, lastRequestCo2) => {
                let msg = `Carbon emissions: Session ${sessionTotalCo2.toFixed(2)}g (Last request ${lastRequestCo2.toFixed(2)}g)`;
                document.getElementById("carbon-emissions").innerText = msg;
            }
        );
        cm.start();
    </script>
    ```
   * Load some data in background (script for onclick)
   ```javascript
   function loadData() {
        setTimeout(() => {
            fromFetch();
            fromXHR();
            fromJQuery();
        }, 1);
    }
    function fromFetch() {
        let size = Math.floor(Math.random() * 100000);
        let response = fetch(`https://randomnumberswebapi.azurewebsites.net/api/randomnumbers?length=${size}`)
        response.then(r => {
            r.json().then(j => {
                //console.log(j);
            })
        },
            e => {
                console.log(e);
            });
    }
    function fromXHR() {
        let size = Math.floor(Math.random() * 100000);
        let request = new XMLHttpRequest();
        request.open("GET", `https://randomnumberswebapi.azurewebsites.net/api/randomnumbers?length=${size}`);
        request.addEventListener('load', function (event) {
            if (request.status >= 200 && request.status < 300) {
                //console.log(request.responseText);
            } else {
                console.warn(request.statusText, request.responseText);
            }
        });
        request.send();
    }
    function fromJQuery() {
        let size = Math.floor(Math.random() * 100000);
        $.ajax({
            url: `https://randomnumberswebapi.azurewebsites.net/api/randomnumbers?length=${size}`,
            type: 'GET',
            dataType: 'json', 
            success: function (res) {
                //console.log(res);
            }
        });
    }
   ```

## Limitation

### CORS

The [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) of the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) respects the CORS-Settings **Timing-Allow-Origin** to measure the performance and transferred bytes of backgroud requests. If the CORS-Timing is not set, the collected transferred bytes of fetch and XmlHttpRequest is zero.

### Supported Regions

The Carbon-Aware-Computing projects supports only the Grid Carbon Intensity for regions in Europe. For other regions WattTime or ElectricyMap must be used.

In respect of sustainable computing not all European countries are actively provided. To get a list of active regions use
```bash
curl -X GET "https://forecast.carbon-aware-computing.com/locations" -H  "accept: application/json"
```
If a region is not active, just drop a mail to [am@bluehands.de] (mailto:am@bluehands.de) to activated it.

### Same region for hosting, network and device

There is currently no autodetection of the browser location and the script assumes that the browser is in the same grid region as the website and API host.

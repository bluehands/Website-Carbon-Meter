import tgwf from '@tgwf/co2';

export default class CarbonMeter {

    #listner = (totalEmission, estimatedCO2) => { };
    #location = 'de';
    #co2 = undefined;
    #totalEmissionsCacheEntry = new CacheEntry(window.sessionStorage, "carbonMeter.totalEmission", Number.MAX_SAFE_INTEGER);
    #carbonIntensityCacheEntry;
    #forecastDataCacheEntry;

    constructor(location) {
        if (location) {
            this.#location = location;
            console.info(`CarbonMeter: Choose '${location}' for gathering grid carbon intensity`);
        }
        this.#co2 = new tgwf.co2({ model: "swd", version: 4 });
        let tenMinutes = 600000;
        let fourHours = 14400000;
        this.#carbonIntensityCacheEntry = new CacheEntry(window.sessionStorage, `carbonMeter.${location}.carbonIntensity`, tenMinutes);
        this.#forecastDataCacheEntry = new CacheEntry(window.localStorage, `carbonMeter.${location}.forecastData`, fourHours);
    }

    start() {
        setTimeout(() => {
            this.#startMetering();
        }, 1);
    }

    /**
     * Registers a listener function to handle metering data.
     *
     * @param {function(number, number): void} listnerFunc - The listener function that will be called with the total CO2 emissions and the estimated CO2 emissions for the current metering event.
     */
    onMetering(listnerFunc) {
        this.#listner = listnerFunc;

    }

    async #startMetering() {
        await this.#getEmissionsFromBrowserRessources();
        await this.#observerEmissionsFromBackgroundTransfer();
    }

    async #observerEmissionsFromBackgroundTransfer() {
        let carbonIntensity = await this.#getCarbonIntensity();
        const observer = new PerformanceObserver((list) => {
            setTimeout(() => {                
                for (const entry of list.getEntries()) {
                    if (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "img" || entry.initiatorType === "script" ) {
                        let bytesSent = entry.transferSize;
                        this.#calculateAndReportEmissions("From Background",bytesSent, carbonIntensity);
                        console.debug(`${entry.initiatorType}: Count ${bytesSent} bytes in background from ${entry.name}`);
                    }
                }
            }, 1);

        });

        observer.observe({
            entryTypes: ["resource"]
        });
    }
    async #getEmissionsFromBrowserRessources() {
        let carbonIntensity = await this.#getCarbonIntensity();
        let bytesSent = this.#getTransferSize();
        this.#calculateAndReportEmissions("From Browser", bytesSent, carbonIntensity);
    }
    #calculateAndReportEmissions(context, bytesTransfered, carbonIntensity) {
        let result = this.#co2.perByteTrace(
            bytesTransfered,
            false,
            {
                gridIntensity: {
                    device: carbonIntensity,
                    dataCenter: carbonIntensity,
                    networks: carbonIntensity,
                }
            }
        )        
        let estimatedCO2 = parseFloat(result.co2.toFixed(2));
        console.debug(`Report: ${context}, Bytes transfered: ${bytesTransfered}, Grid intensity: ${carbonIntensity}, Carbon: ${estimatedCO2}`);
        this.#reportEmissions(estimatedCO2);
    }
    #reportEmissions(estimatedCO2) {
        let totalEmission = parseFloat(this.#totalEmissionsCacheEntry.getItem());

        if (totalEmission) {
            totalEmission += estimatedCO2;
        }
        else {
            totalEmission = estimatedCO2;
        }
        this.#totalEmissionsCacheEntry.setItem(totalEmission);
        if (this.#listner) {
            this.#listner(totalEmission, estimatedCO2);
        }

    }
    #getTransferSize = () => {
        let totalTransferSize = 0;

        performance.getEntriesByType('resource').map((resource) => {
            const data = resource.toJSON();
            totalTransferSize += data.transferSize;
            console.debug(`Count ${data.transferSize} bytes in browser from ${data.name}`);
        });
        performance.getEntriesByType('navigation').map((resource) => {
            const data = resource.toJSON();
            totalTransferSize += data.transferSize;
            console.debug(`Count ${data.transferSize} bytes in browser from ${data.name}`);
        });

        return totalTransferSize;
    };
    #calculateCarbonIntensityFromForecast(forecastJson) {
        let forecast = JSON.parse(forecastJson);
        let start = forecast.Start;
        let intervall = forecast.Interval;
        let ratings = forecast.Ratings;
        let now = Date.now();
        let currentIndex = Math.round((now - start) / intervall);
        if (currentIndex >= 0 && currentIndex < ratings.length) {
            let rating = ratings[currentIndex];
            console.debug(`Current Grid CO2 Intensity: ${rating}`);
            return rating;
        }
        return null;
    }
    async #getCarbonIntensity() {
        let carbonIntensity = parseFloat(this.#carbonIntensityCacheEntry.getItem());
        if (carbonIntensity === undefined || Number.isNaN(carbonIntensity)) {
            let forecastDataJson = this.#forecastDataCacheEntry.getItem();
            if (forecastDataJson === undefined) {
                let forecastData = await this.#getForcastFromServer();
                forecastDataJson = JSON.stringify(forecastData)
                this.#forecastDataCacheEntry.setItem(forecastDataJson);
            }
            carbonIntensity = this.#calculateCarbonIntensityFromForecast(forecastDataJson);
            if (carbonIntensity) {
                this.#carbonIntensityCacheEntry.setItem(carbonIntensity);
            }
        }
        return carbonIntensity;

    }
    async #getForcastFromServer() {
        let forecast = await this.#fetchData(this.#location);
        return forecast;
    }
    async #fetchData(location) {
        let response = await fetch(`https://carbonawarecomputing.blob.core.windows.net/forecasts/${location}.min.json`);
        let data = await response.json();
        return data;

    }
}

class CacheEntry {
    #keyName;
    #dueKeyName;
    #due;
    #cacheProvider;
    constructor(cacheProvider, keyName, dueInMiliSeconds) {
        this.#due = dueInMiliSeconds;
        this.#keyName = keyName;
        this.#dueKeyName = keyName + ".Updated"
        this.#cacheProvider = cacheProvider;
    }

    getItem() {
        let item = this.#cacheProvider.getItem(this.#keyName);
        if (item) {
            let lastUpdate = parseInt(this.#cacheProvider.getItem(this.#dueKeyName));
            if (lastUpdate + this.#due > Date.now()) {
                return item;
            }
        }
        return undefined;
    }
    setItem(value) {
        this.#cacheProvider.setItem(this.#keyName, value);
        this.#cacheProvider.setItem(this.#dueKeyName, Date.now());
    }

}
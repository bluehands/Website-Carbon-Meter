import tgwf from 'https://cdn.skypack.dev/@tgwf/co2';

export class CarbonMeter {

    #listner = undefined;
    #location = 'de';
    #co2 = undefined;
    #totalEmissionsCacheEntry = new ChacheEntry(window.sessionStorage, "carbonMeter.totalEmission", Number.MAX_SAFE_INTEGER);
    #carbonIntensityCacheEntry;
    #forecastDataCacheEntry;

    constructor(location) {
        if (location) {
            this.#location = location;
        }
        this.#co2 = new tgwf.co2();
        let tenMinutes = 600000;
        let fourHours = 14400000;
        this.#carbonIntensityCacheEntry = new ChacheEntry(window.sessionStorage, `carbonMeter.${location}.carbonIntensity`, tenMinutes);
        this.#forecastDataCacheEntry = new ChacheEntry(window.localStorage, `carbonMeter.${location}.forecastData`, fourHours);
    }

    start() {
        setTimeout(() => {
            this.#startMetering();
        }, 1);
    }
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
                    if (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest") {
                        let j = entry.toJSON();
                        let bytesSent = j.transferSize;
                        this.#calculateAndReportEmissions(bytesSent, carbonIntensity);
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
        this.#calculateAndReportEmissions(bytesSent, carbonIntensity);
    }
    #calculateAndReportEmissions(bytesTransfered, carbonIntensity) {
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
        });

        return totalTransferSize;
    };
    #calculateCarbonIntensityFromForecast(forecast) {
        let start = forecast.Start;
        let intervall = forecast.Interval;
        let ratings = forecast.Ratings;
        let now = Date.now();
        let currentIndex = Math.round((now - start) / intervall);
        if (currentIndex >= 0 && currentIndex < ratings.length) {
            return ratings[currentIndex];
        }
        return null;
    }
    async #getCarbonIntensity() {
        let carbonIntensity = parseFloat(this.#carbonIntensityCacheEntry.getItem());
        if (carbonIntensity === undefined) {
            let forecastData = this.#forecastDataCacheEntry.getItem();
            if (forecastData === undefined) {
                forecastData = this.#getForcastFromServer();
                this.#forecastDataCacheEntry.setItem(forecastData);
            }
            carbonIntensity = this.#calculateCarbonIntensityFromForecast(forcast);
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

class ChacheEntry {
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

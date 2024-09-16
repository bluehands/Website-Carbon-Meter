// node_modules/@tgwf/co2/dist/esm/1byte.js
var CO2_PER_KWH_IN_DC_GREY = 519;
var CO2_PER_KWH_NETWORK_GREY = 475;
var CO2_PER_KWH_IN_DC_GREEN = 0;
var KWH_PER_BYTE_IN_DC = 72e-12;
var FIXED_NETWORK_WIRED = 429e-12;
var FIXED_NETWORK_WIFI = 152e-12;
var FOUR_G_MOBILE = 884e-12;
var KWH_PER_BYTE_FOR_NETWORK = (FIXED_NETWORK_WIRED + FIXED_NETWORK_WIFI + FOUR_G_MOBILE) / 3;
var OneByte = class {
  constructor(options) {
    this.options = options;
    this.KWH_PER_BYTE_FOR_NETWORK = KWH_PER_BYTE_FOR_NETWORK;
  }
  perByte(bytes, green) {
    if (bytes < 1) {
      return 0;
    }
    if (green) {
      const Co2ForDC = bytes * KWH_PER_BYTE_IN_DC * CO2_PER_KWH_IN_DC_GREEN;
      const Co2forNetwork = bytes * KWH_PER_BYTE_FOR_NETWORK * CO2_PER_KWH_NETWORK_GREY;
      return Co2ForDC + Co2forNetwork;
    }
    const KwHPerByte = KWH_PER_BYTE_IN_DC + KWH_PER_BYTE_FOR_NETWORK;
    return bytes * KwHPerByte * CO2_PER_KWH_IN_DC_GREY;
  }
};
var byte_default = OneByte;

// node_modules/@tgwf/co2/dist/esm/constants/file-size.js
var GIGABYTE = 1e3 * 1e3 * 1e3;
var file_size_default = {
  GIGABYTE
};

// node_modules/@tgwf/co2/dist/esm/data/average-intensities.min.js
var data = { "AFG": 132.53, "AFRICA": 559.42, "ALB": 24.29, "DZA": 634.61, "ASM": 611.11, "AGO": 174.73, "ATG": 611.11, "ARG": 394.62, "ARM": 264.54, "ABW": 561.22, "ASEAN": 554.5, "ASIA": 591.19, "AUS": 570.35, "AUT": 110.81, "AZE": 671.39, "BHS": 660.1, "BHR": 904.62, "BGD": 678.11, "BRB": 605.51, "BLR": 441.74, "BEL": 138.11, "BLZ": 225.81, "BEN": 584.07, "BTN": 23.33, "BOL": 489.14, "BIH": 600, "BWA": 847.91, "BRA": 105.51, "BRN": 893.91, "BGR": 335.33, "BFA": 467.53, "BDI": 250, "CPV": 558.14, "KHM": 417.71, "CMR": 305.42, "CAN": 161.43, "CYM": 642.86, "CAF": 0, "TCD": 628.57, "CHL": 353.52, "CHN": 585.82, "COL": 214.88, "COM": 642.86, "COG": 700, "COD": 24.46, "COK": 250, "CRI": 26.46, "CIV": 393.89, "HRV": 204.96, "CUB": 637.61, "CYP": 534.32, "CZE": 449.72, "DNK": 151.65, "DJI": 692.31, "DMA": 529.41, "DOM": 580.78, "ECU": 150.69, "EGY": 570.13, "SLV": 116.54, "GNQ": 591.84, "ERI": 631.58, "EST": 416.67, "SWZ": 172.41, "ETH": 24.64, "EU": 243.83, "EUROPE": 327.69, "FLK": 500, "FRO": 404.76, "FJI": 288.46, "FIN": 79.16, "FRA": 56.04, "GUF": 217.82, "PYF": 442.86, "G20": 482.92, "G7": 361.52, "GAB": 491.6, "GMB": 666.67, "GEO": 167.02, "DEU": 380.95, "GHA": 484, "GRC": 336.57, "GRL": 178.57, "GRD": 640, "GLP": 500, "GUM": 622.86, "GTM": 328.27, "GIN": 236.84, "GNB": 625, "GUY": 640.35, "HTI": 567.31, "HND": 282.27, "HKG": 699.5, "HUN": 204.19, "ISL": 27.68, "IND": 705.13, "IDN": 675.93, "IRN": 665.15, "IRQ": 688.81, "IRL": 290.81, "ISR": 582.93, "ITA": 330.72, "JAM": 555.56, "JPN": 512.81, "JOR": 540.92, "KAZ": 830.41, "KEN": 83.33, "KIR": 666.67, "XKX": 894.65, "KWT": 649.2, "KGZ": 147.29, "LAO": 265.51, "LATIN AMERICA AND CARIBBEAN": 260.28, "LVA": 123.2, "LBN": 599.01, "LSO": 20, "LBR": 227.85, "LBY": 818.69, "LTU": 160.07, "LUX": 105.26, "MAC": 448.98, "MDG": 436.44, "MWI": 66.67, "MYS": 605.83, "MDV": 611.77, "MLI": 408, "MLT": 459.14, "MTQ": 523.18, "MRT": 464.71, "MUS": 632.48, "MEX": 475.36, "MIDDLE EAST": 660.46, "MDA": 648.5, "MNG": 771.8, "MNE": 417.07, "MSR": 1e3, "MAR": 662.64, "MOZ": 135.65, "MMR": 483.57, "NAM": 59.26, "NRU": 750, "NPL": 24.44, "NLD": 267.62, "NCL": 660.58, "NZL": 110.89, "NIC": 265.12, "NER": 670.89, "NGA": 516.23, "NORTH AMERICA": 356.01, "PRK": 389.59, "MKD": 565.35, "NOR": 30.08, "OCEANIA": 507.63, "OECD": 360.53, "OMN": 564.69, "PAK": 463.66, "PSE": 516.13, "PAN": 161.68, "PNG": 507.25, "PRY": 24.31, "PER": 251.74, "POL": 661.93, "PRT": 165.55, "PRI": 678.74, "QAT": 602.59, "REU": 572.82, "ROU": 240.58, "RUS": 436.28, "RWA": 316.33, "KNA": 636.36, "LCA": 666.67, "SPM": 600, "VCT": 529.41, "WSM": 473.68, "STP": 642.86, "SAU": 706.79, "SEN": 511.6, "SRB": 636.06, "SYC": 564.52, "SLE": 50, "SGP": 474, "SVK": 116.77, "SVN": 231.28, "SLB": 700, "SOM": 578.95, "ZAF": 729.67, "KOR": 441.65, "SSD": 629.03, "ESP": 174.05, "LKA": 509.78, "SDN": 263.16, "SUR": 349.28, "SWE": 40.7, "CHE": 34.84, "SYR": 701.66, "TWN": 639.53, "TJK": 116.86, "TZA": 339.25, "THA": 560.74, "PHL": 601.1, "TGO": 443.18, "TON": 625, "TTO": 681.53, "TUN": 564.62, "TUR": 464.59, "TKM": 1306.03, "TCA": 653.85, "UGA": 44.53, "UKR": 259.69, "ARE": 561.14, "GBR": 237.59, "USA": 385.98, "URY": 112.65, "UZB": 1167.6, "VUT": 571.43, "VEN": 185.8, "VNM": 409.8, "VGB": 647.06, "VIR": 632.35, "WORLD": 485.99, "YEM": 566.1, "ZMB": 111.97, "ZWE": 297.87 };
var type = "average";
var average_intensities_min_default = { data, type };

// node_modules/@tgwf/co2/dist/esm/constants/index.js
var KWH_PER_GB = 0.81;
var END_USER_DEVICE_ENERGY = 0.52;
var NETWORK_ENERGY = 0.14;
var DATACENTER_ENERGY = 0.15;
var PRODUCTION_ENERGY = 0.19;
var GLOBAL_GRID_INTENSITY = average_intensities_min_default.data["WORLD"];
var RENEWABLES_GRID_INTENSITY = 50;
var FIRST_TIME_VIEWING_PERCENTAGE = 0.75;
var RETURNING_VISITOR_PERCENTAGE = 0.25;
var PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;

// node_modules/@tgwf/co2/dist/esm/helpers/index.js
var formatNumber = (num) => parseFloat(num.toFixed(2));
function parseOptions(options) {
  var _a, _b, _c, _d, _e, _f;
  if (typeof options !== "object") {
    throw new Error("Options must be an object");
  }
  const adjustments = {};
  if (options == null ? void 0 : options.gridIntensity) {
    adjustments.gridIntensity = {};
    const { device, dataCenter, network } = options.gridIntensity;
    if (device || device === 0) {
      if (typeof device === "object") {
        if (!average_intensities_min_default.data[(_a = device.country) == null ? void 0 : _a.toUpperCase()]) {
          console.warn(`"${device.country}" is not a valid country. Please use a valid 3 digit ISO 3166 country code. 
See https://developers.thegreenwebfoundation.org/co2js/data/ for more information. 
Falling back to global average grid intensity.`);
          adjustments.gridIntensity["device"] = {
            value: GLOBAL_GRID_INTENSITY
          };
        }
        adjustments.gridIntensity["device"] = {
          country: device.country,
          value: parseFloat(average_intensities_min_default.data[(_b = device.country) == null ? void 0 : _b.toUpperCase()])
        };
      } else if (typeof device === "number") {
        adjustments.gridIntensity["device"] = {
          value: device
        };
      } else {
        adjustments.gridIntensity["device"] = {
          value: GLOBAL_GRID_INTENSITY
        };
        console.warn(`The device grid intensity must be a number or an object. You passed in a ${typeof device}. 
Falling back to global average grid intensity.`);
      }
    }
    if (dataCenter || dataCenter === 0) {
      if (typeof dataCenter === "object") {
        if (!average_intensities_min_default.data[(_c = dataCenter.country) == null ? void 0 : _c.toUpperCase()]) {
          console.warn(`"${dataCenter.country}" is not a valid country. Please use a valid 3 digit ISO 3166 country code. 
See https://developers.thegreenwebfoundation.org/co2js/data/ for more information.  
Falling back to global average grid intensity.`);
          adjustments.gridIntensity["dataCenter"] = {
            value: GLOBAL_GRID_INTENSITY
          };
        }
        adjustments.gridIntensity["dataCenter"] = {
          country: dataCenter.country,
          value: parseFloat(average_intensities_min_default.data[(_d = dataCenter.country) == null ? void 0 : _d.toUpperCase()])
        };
      } else if (typeof dataCenter === "number") {
        adjustments.gridIntensity["dataCenter"] = {
          value: dataCenter
        };
      } else {
        adjustments.gridIntensity["dataCenter"] = {
          value: GLOBAL_GRID_INTENSITY
        };
        console.warn(`The data center grid intensity must be a number or an object. You passed in a ${typeof dataCenter}. 
Falling back to global average grid intensity.`);
      }
    }
    if (network || network === 0) {
      if (typeof network === "object") {
        if (!average_intensities_min_default.data[(_e = network.country) == null ? void 0 : _e.toUpperCase()]) {
          console.warn(`"${network.country}" is not a valid country. Please use a valid 3 digit ISO 3166 country code. 
See https://developers.thegreenwebfoundation.org/co2js/data/ for more information.  Falling back to global average grid intensity. 
Falling back to global average grid intensity.`);
          adjustments.gridIntensity["network"] = {
            value: GLOBAL_GRID_INTENSITY
          };
        }
        adjustments.gridIntensity["network"] = {
          country: network.country,
          value: parseFloat(average_intensities_min_default.data[(_f = network.country) == null ? void 0 : _f.toUpperCase()])
        };
      } else if (typeof network === "number") {
        adjustments.gridIntensity["network"] = {
          value: network
        };
      } else {
        adjustments.gridIntensity["network"] = {
          value: GLOBAL_GRID_INTENSITY
        };
        console.warn(`The network grid intensity must be a number or an object. You passed in a ${typeof network}. 
Falling back to global average grid intensity.`);
      }
    }
  }
  if ((options == null ? void 0 : options.dataReloadRatio) || options.dataReloadRatio === 0) {
    if (typeof options.dataReloadRatio === "number") {
      if (options.dataReloadRatio >= 0 && options.dataReloadRatio <= 1) {
        adjustments.dataReloadRatio = options.dataReloadRatio;
      } else {
        adjustments.dataReloadRatio = PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD;
        console.warn(`The dataReloadRatio option must be a number between 0 and 1. You passed in ${options.dataReloadRatio}. 
Falling back to default value.`);
      }
    } else {
      adjustments.dataReloadRatio = PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD;
      console.warn(`The dataReloadRatio option must be a number. You passed in a ${typeof options.dataReloadRatio}. 
Falling back to default value.`);
    }
  }
  if ((options == null ? void 0 : options.firstVisitPercentage) || options.firstVisitPercentage === 0) {
    if (typeof options.firstVisitPercentage === "number") {
      if (options.firstVisitPercentage >= 0 && options.firstVisitPercentage <= 1) {
        adjustments.firstVisitPercentage = options.firstVisitPercentage;
      } else {
        adjustments.firstVisitPercentage = FIRST_TIME_VIEWING_PERCENTAGE;
        console.warn(`The firstVisitPercentage option must be a number between 0 and 1. You passed in ${options.firstVisitPercentage}. 
Falling back to default value.`);
      }
    } else {
      adjustments.firstVisitPercentage = FIRST_TIME_VIEWING_PERCENTAGE;
      console.warn(`The firstVisitPercentage option must be a number. You passed in a ${typeof options.firstVisitPercentage}. 
Falling back to default value.`);
    }
  }
  if ((options == null ? void 0 : options.returnVisitPercentage) || options.returnVisitPercentage === 0) {
    if (typeof options.returnVisitPercentage === "number") {
      if (options.returnVisitPercentage >= 0 && options.returnVisitPercentage <= 1) {
        adjustments.returnVisitPercentage = options.returnVisitPercentage;
      } else {
        adjustments.returnVisitPercentage = RETURNING_VISITOR_PERCENTAGE;
        console.warn(`The returnVisitPercentage option must be a number between 0 and 1. You passed in ${options.returnVisitPercentage}. 
Falling back to default value.`);
      }
    } else {
      adjustments.returnVisitPercentage = RETURNING_VISITOR_PERCENTAGE;
      console.warn(`The returnVisitPercentage option must be a number. You passed in a ${typeof options.returnVisitPercentage}. 
Falling back to default value.`);
    }
  }
  return adjustments;
}
function getApiRequestHeaders(comment = "") {
  return { "User-Agent": `co2js/${"0.15.0"} ${comment}` };
}

// node_modules/@tgwf/co2/dist/esm/sustainable-web-design.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var SustainableWebDesign = class {
  constructor(options) {
    this.options = options;
  }
  energyPerByteByComponent(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const energyUsage = transferedBytesToGb * KWH_PER_GB;
    return {
      consumerDeviceEnergy: energyUsage * END_USER_DEVICE_ENERGY,
      networkEnergy: energyUsage * NETWORK_ENERGY,
      productionEnergy: energyUsage * PRODUCTION_ENERGY,
      dataCenterEnergy: energyUsage * DATACENTER_ENERGY
    };
  }
  co2byComponent(energyByComponent, carbonIntensity = GLOBAL_GRID_INTENSITY, options = {}) {
    let deviceCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let networkCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let dataCenterCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let globalEmissions = GLOBAL_GRID_INTENSITY;
    if (options == null ? void 0 : options.gridIntensity) {
      const { device, network, dataCenter } = options.gridIntensity;
      if ((device == null ? void 0 : device.value) || (device == null ? void 0 : device.value) === 0) {
        deviceCarbonIntensity = device.value;
      }
      if ((network == null ? void 0 : network.value) || (network == null ? void 0 : network.value) === 0) {
        networkCarbonIntensity = network.value;
      }
      if ((dataCenter == null ? void 0 : dataCenter.value) || (dataCenter == null ? void 0 : dataCenter.value) === 0) {
        dataCenterCarbonIntensity = dataCenter.value;
      }
    }
    if (carbonIntensity === true) {
      dataCenterCarbonIntensity = RENEWABLES_GRID_INTENSITY;
    }
    const returnCO2ByComponent = {};
    for (const [key, value] of Object.entries(energyByComponent)) {
      if (key.startsWith("dataCenterEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * dataCenterCarbonIntensity;
      } else if (key.startsWith("consumerDeviceEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * deviceCarbonIntensity;
      } else if (key.startsWith("networkEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * networkCarbonIntensity;
      } else {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * globalEmissions;
      }
    }
    return returnCO2ByComponent;
  }
  perByte(bytes, carbonIntensity = false, segmentResults = false, options = {}) {
    if (bytes < 1) {
      bytes = 0;
    }
    const energyBycomponent = this.energyPerByteByComponent(bytes, options);
    if (typeof carbonIntensity !== "boolean") {
      throw new Error(`perByte expects a boolean for the carbon intensity value. Received: ${carbonIntensity}`);
    }
    const co2ValuesbyComponent = this.co2byComponent(energyBycomponent, carbonIntensity, options);
    const co2Values = Object.values(co2ValuesbyComponent);
    const co2ValuesSum = co2Values.reduce((prevValue, currentValue) => prevValue + currentValue);
    if (segmentResults) {
      return __spreadProps(__spreadValues({}, co2ValuesbyComponent), { total: co2ValuesSum });
    }
    return co2ValuesSum;
  }
  perVisit(bytes, carbonIntensity = false, segmentResults = false, options = {}) {
    const energyBycomponent = this.energyPerVisitByComponent(bytes, options);
    if (typeof carbonIntensity !== "boolean") {
      throw new Error(`perVisit expects a boolean for the carbon intensity value. Received: ${carbonIntensity}`);
    }
    const co2ValuesbyComponent = this.co2byComponent(energyBycomponent, carbonIntensity, options);
    const co2Values = Object.values(co2ValuesbyComponent);
    const co2ValuesSum = co2Values.reduce((prevValue, currentValue) => prevValue + currentValue);
    if (segmentResults) {
      return __spreadProps(__spreadValues({}, co2ValuesbyComponent), { total: co2ValuesSum });
    }
    return co2ValuesSum;
  }
  energyPerByte(bytes) {
    const energyByComponent = this.energyPerByteByComponent(bytes);
    const energyValues = Object.values(energyByComponent);
    return energyValues.reduce((prevValue, currentValue) => prevValue + currentValue);
  }
  energyPerVisitByComponent(bytes, options = {}, firstView = FIRST_TIME_VIEWING_PERCENTAGE, returnView = RETURNING_VISITOR_PERCENTAGE, dataReloadRatio = PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD) {
    if (options.dataReloadRatio || options.dataReloadRatio === 0) {
      dataReloadRatio = options.dataReloadRatio;
    }
    if (options.firstVisitPercentage || options.firstVisitPercentage === 0) {
      firstView = options.firstVisitPercentage;
    }
    if (options.returnVisitPercentage || options.returnVisitPercentage === 0) {
      returnView = options.returnVisitPercentage;
    }
    const energyBycomponent = this.energyPerByteByComponent(bytes);
    const cacheAdjustedSegmentEnergy = {};
    const energyValues = Object.values(energyBycomponent);
    for (const [key, value] of Object.entries(energyBycomponent)) {
      cacheAdjustedSegmentEnergy[`${key} - first`] = value * firstView;
      cacheAdjustedSegmentEnergy[`${key} - subsequent`] = value * returnView * dataReloadRatio;
    }
    return cacheAdjustedSegmentEnergy;
  }
  energyPerVisit(bytes) {
    let firstVisits = 0;
    let subsequentVisits = 0;
    const energyBycomponent = Object.entries(this.energyPerVisitByComponent(bytes));
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("first") > 0) {
        firstVisits += val;
      }
    }
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("subsequent") > 0) {
        subsequentVisits += val;
      }
    }
    return firstVisits + subsequentVisits;
  }
  emissionsPerVisitInGrams(energyPerVisit, carbonintensity = GLOBAL_GRID_INTENSITY) {
    return formatNumber(energyPerVisit * carbonintensity);
  }
  annualEnergyInKwh(energyPerVisit, monthlyVisitors = 1e3) {
    return energyPerVisit * monthlyVisitors * 12;
  }
  annualEmissionsInGrams(co2grams, monthlyVisitors = 1e3) {
    return co2grams * monthlyVisitors * 12;
  }
  annualSegmentEnergy(annualEnergy) {
    return {
      consumerDeviceEnergy: formatNumber(annualEnergy * END_USER_DEVICE_ENERGY),
      networkEnergy: formatNumber(annualEnergy * NETWORK_ENERGY),
      dataCenterEnergy: formatNumber(annualEnergy * DATACENTER_ENERGY),
      productionEnergy: formatNumber(annualEnergy * PRODUCTION_ENERGY)
    };
  }
};
var sustainable_web_design_default = SustainableWebDesign;

// node_modules/@tgwf/co2/dist/esm/co2.js
var CO2 = class {
  constructor(options) {
    this.model = new sustainable_web_design_default();
    if ((options == null ? void 0 : options.model) === "1byte") {
      this.model = new byte_default();
    } else if ((options == null ? void 0 : options.model) === "swd") {
      this.model = new sustainable_web_design_default();
    } else if (options == null ? void 0 : options.model) {
      throw new Error(`"${options.model}" is not a valid model. Please use "1byte" for the OneByte model, and "swd" for the Sustainable Web Design model.
See https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.`);
    }
    this._segment = (options == null ? void 0 : options.results) === "segment";
  }
  perByte(bytes, green = false) {
    return this.model.perByte(bytes, green, this._segment);
  }
  perVisit(bytes, green = false) {
    var _a;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      return this.model.perVisit(bytes, green, this._segment);
    } else {
      throw new Error(`The perVisit() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`);
    }
  }
  perByteTrace(bytes, green = false, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    let adjustments = {};
    if (options) {
      adjustments = parseOptions(options);
    }
    return {
      co2: this.model.perByte(bytes, green, this._segment, adjustments),
      green,
      variables: {
        description: "Below are the variables used to calculate this CO2 estimate.",
        bytes,
        gridIntensity: {
          description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate.",
          network: (_c = (_b = (_a = adjustments == null ? void 0 : adjustments.gridIntensity) == null ? void 0 : _a.network) == null ? void 0 : _b.value) != null ? _c : GLOBAL_GRID_INTENSITY,
          dataCenter: green ? RENEWABLES_GRID_INTENSITY : (_f = (_e = (_d = adjustments == null ? void 0 : adjustments.gridIntensity) == null ? void 0 : _d.dataCenter) == null ? void 0 : _e.value) != null ? _f : GLOBAL_GRID_INTENSITY,
          production: GLOBAL_GRID_INTENSITY,
          device: (_i = (_h = (_g = adjustments == null ? void 0 : adjustments.gridIntensity) == null ? void 0 : _g.device) == null ? void 0 : _h.value) != null ? _i : GLOBAL_GRID_INTENSITY
        }
      }
    };
  }
  perVisitTrace(bytes, green = false, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      let adjustments = {};
      if (options) {
        adjustments = parseOptions(options);
      }
      return {
        co2: this.model.perVisit(bytes, green, this._segment, adjustments),
        green,
        variables: {
          description: "Below are the variables used to calculate this CO2 estimate.",
          bytes,
          gridIntensity: {
            description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate.",
            network: (_d = (_c = (_b = adjustments == null ? void 0 : adjustments.gridIntensity) == null ? void 0 : _b.network) == null ? void 0 : _c.value) != null ? _d : GLOBAL_GRID_INTENSITY,
            dataCenter: green ? RENEWABLES_GRID_INTENSITY : (_g = (_f = (_e = adjustments == null ? void 0 : adjustments.gridIntensity) == null ? void 0 : _e.dataCenter) == null ? void 0 : _f.value) != null ? _g : GLOBAL_GRID_INTENSITY,
            production: GLOBAL_GRID_INTENSITY,
            device: (_j = (_i = (_h = adjustments == null ? void 0 : adjustments.gridIntensity) == null ? void 0 : _h.device) == null ? void 0 : _i.value) != null ? _j : GLOBAL_GRID_INTENSITY
          },
          dataReloadRatio: (_k = adjustments == null ? void 0 : adjustments.dataReloadRatio) != null ? _k : 0.02,
          firstVisitPercentage: (_l = adjustments == null ? void 0 : adjustments.firstVisitPercentage) != null ? _l : 0.75,
          returnVisitPercentage: (_m = adjustments == null ? void 0 : adjustments.returnVisitPercentage) != null ? _m : 0.25
        }
      };
    } else {
      throw new Error(`The perVisitDetailed() method is not supported in the model you are using. Try using perByte() instead.
See https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js.`);
    }
  }
};
var co2_default = CO2;

// node_modules/@tgwf/co2/dist/esm/hosting-json.js
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_hosting_json = __commonJS({
  "src/hosting-json.js"(exports, module) {
    async function check3(domain, db) {
      if (typeof domain === "string") {
        return checkInJSON(domain, db);
      } else {
        return checkDomainsInJSON(domain, db);
      }
    }
    function checkInJSON(domain, db) {
      if (db.indexOf(domain) > -1) {
        return true;
      }
      return false;
    }
    function greenDomainsFromResults2(greenResults) {
      const entries = Object.entries(greenResults);
      const greenEntries = entries.filter(([key, val]) => val.green);
      return greenEntries.map(([key, val]) => val.url);
    }
    function checkDomainsInJSON(domains, db) {
      let greenDomains = [];
      for (let domain of domains) {
        if (db.indexOf(domain) > -1) {
          greenDomains.push(domain);
        }
      }
      return greenDomains;
    }
    function find(domain, db) {
      if (typeof domain === "string") {
        return findInJSON(domain, db);
      } else {
        return findDomainsInJSON(domain, db);
      }
    }
    function findInJSON(domain, db) {
      if (db.indexOf(domain) > -1) {
        return domain;
      }
      return {
        url: domain,
        green: false
      };
    }
    function findDomainsInJSON(domains, db) {
      const result = {};
      for (let domain of domains) {
        result[domain] = findInJSON(domain, db);
      }
      return result;
    }
    module.exports = {
      check: check3,
      greenDomainsFromResults: greenDomainsFromResults2,
      find
    };
  }
});
var hosting_json_default = require_hosting_json();

// node_modules/@tgwf/co2/dist/esm/hosting-api.js
function check(domain, optionsOrAgentId) {
  const options = typeof optionsOrAgentId === "string" ? { userAgentIdentifier: optionsOrAgentId } : optionsOrAgentId;
  if ((options == null ? void 0 : options.db) && options.verbose) {
    throw new Error("verbose mode cannot be used with a local lookup database");
  }
  if (typeof domain === "string") {
    return checkAgainstAPI(domain, options);
  } else {
    return checkDomainsAgainstAPI(domain, options);
  }
}
async function checkAgainstAPI(domain, options = {}) {
  const req = await fetch(`https://api.thegreenwebfoundation.org/greencheck/${domain}`, {
    headers: getApiRequestHeaders(options.userAgentIdentifier)
  });
  if (options == null ? void 0 : options.db) {
    return hosting_json_default.check(domain, options.db);
  }
  const res = await req.json();
  return options.verbose ? res : res.green;
}
async function checkDomainsAgainstAPI(domains, options = {}) {
  try {
    const apiPath = "https://api.thegreenwebfoundation.org/v2/greencheckmulti";
    const domainsString = JSON.stringify(domains);
    const req = await fetch(`${apiPath}/${domainsString}`, {
      headers: getApiRequestHeaders(options.userAgentIdentifier)
    });
    const allGreenCheckResults = await req.json();
    return options.verbose ? allGreenCheckResults : greenDomainsFromResults(allGreenCheckResults);
  } catch (e) {
    return options.verbose ? {} : [];
  }
}
function greenDomainsFromResults(greenResults) {
  const entries = Object.entries(greenResults);
  const greenEntries = entries.filter(([key, val]) => val.green);
  return greenEntries.map(([key, val]) => val.url);
}
var hosting_api_default = {
  check
};

// node_modules/@tgwf/co2/dist/esm/hosting.js
function check2(domain, optionsOrAgentId) {
  return hosting_api_default.check(domain, optionsOrAgentId);
}
var hosting_default = {
  check: check2
};

// node_modules/@tgwf/co2/dist/esm/data/marginal-intensities-2021.min.js
var data2 = { "AFG": "414", "ALB": "0", "DZA": "528", "ASM": "753", "AND": "188", "AGO": "1476", "AIA": "753", "ATG": "753", "ARG": "478", "ARM": "390", "ABW": "753", "AUS": "808", "AUT": "242", "AZE": "534", "AZORES (PORTUGAL)": "753", "BHS": "753", "BHR": "726", "BGD": "528", "BRB": "749", "BLR": "400", "BEL": "252", "BLZ": "403", "BEN": "745", "BMU": "753", "BTN": "0", "BOL": "604", "BES": "753", "BIH": "1197", "BWA": "1486", "BRA": "284", "VGB": "753", "BRN": "681", "BGR": "911", "BFA": "753", "BDI": "414", "KHM": "1046", "CMR": "659", "CAN": "372", "CYM": "753", "CPV": "753", "CAF": "188", "TCD": "753", "CHANNEL ISLANDS (U.K)": "753", "CHL": "657", "CHN": "899", "COL": "410", "COM": "753", "COD": "0", "COG": "659", "COK": "753", "CRI": "108", "CIV": "466", "HRV": "294", "CUB": "559", "CUW": "876", "CYP": "751", "CZE": "902", "DNK": "362", "DJI": "753", "DMA": "753", "DOM": "601", "ECU": "560", "EGY": "554", "SLV": "547", "GNQ": "632", "ERI": "915", "EST": "1057", "SWZ": "0", "ETH": "0", "FLK": "753", "FRO": "753", "FJI": "640", "FIN": "267", "FRA": "158", "GUF": "423", "PYF": "753", "GAB": "946", "GMB": "753", "GEO": "289", "DEU": "650", "GHA": "495", "GIB": "779", "GRC": "507", "GRL": "264", "GRD": "753", "GLP": "753", "GUM": "753", "GTM": "798", "GIN": "753", "GNB": "753", "GUY": "847", "HTI": "1048", "HND": "662", "HUN": "296", "ISL": "0", "IND": "951", "IDN": "783", "IRN": "592", "IRQ": "1080", "IRL": "380", "IMN": "436", "ISR": "394", "ITA": "414", "JAM": "711", "JPN": "471", "JOR": "529", "KAZ": "797", "KEN": "574", "KIR": "753", "PRK": "754", "KOR": "555", "XKX": "1145", "KWT": "675", "KGZ": "217", "LAO": "1069", "LVA": "240", "LBN": "794", "LSO": "0", "LBR": "677", "LBY": "668", "LIE": "151", "LTU": "211", "LUX": "220", "MDG": "876", "MADEIRA (PORTUGAL)": "663", "MWI": "489", "MYS": "551", "MDV": "753", "MLI": "1076", "MLT": "520", "MHL": "753", "MTQ": "753", "MRT": "753", "MUS": "700", "MYT": "753", "MEX": "531", "FSM": "753", "MDA": "541", "MCO": "158", "MNG": "1366", "MNE": "899", "MSR": "753", "MAR": "729", "MOZ": "234", "MMR": "719", "NAM": "355", "NRU": "753", "NPL": "0", "NLD": "326", "NCL": "779", "NZL": "246", "NIC": "675", "NER": "772", "NGA": "526", "NIU": "753", "MKD": "851", "MNP": "753", "NOR": "47", "OMN": "479", "PAK": "592", "PLW": "753", "PSE": "719", "PAN": "477", "PNG": "597", "PRY": "0", "PER": "473", "PHL": "672", "POL": "828", "PRT": "389", "PRI": "596", "QAT": "503", "REU": "772", "ROU": "489", "RUS": "476", "RWA": "712", "SHN": "753", "KNA": "753", "LCA": "753", "MAF": "753", "SPM": "753", "VCT": "753", "WSM": "753", "SMR": "414", "STP": "753", "SAU": "592", "SEN": "870", "SRB": "1086", "SYC": "753", "SLE": "489", "SGP": "379", "SXM": "753", "SVK": "332", "SVN": "620", "SLB": "753", "SOM": "753", "ZAF": "1070", "SSD": "890", "ESP": "402", "LKA": "731", "SDN": "736", "SUR": "1029", "SWE": "68", "CHE": "48", "SYR": "713", "TWN": "484", "TJK": "255", "TZA": "531", "THA": "450", "TLS": "753", "TGO": "859", "TON": "753", "TTO": "559", "TUN": "468", "TUR": "376", "TKM": "927", "TCA": "753", "TUV": "753", "UGA": "279", "UKR": "768", "ARE": "556", "GBR": "380", "USA": "416", "URY": "174", "UZB": "612", "VUT": "753", "VEN": "711", "VNM": "560", "VIR": "650", "YEM": "807", "ZMB": "416", "ZWE": "1575", "MEMO:  EU 27": "409" };
var type2 = "marginal";
var year = "2021";
var marginal_intensities_2021_min_default = { data: data2, type: type2, year };

// node_modules/@tgwf/co2/dist/esm/index.js
var src_default = { co2: co2_default, hosting: hosting_default, averageIntensity: average_intensities_min_default, marginalIntensity: marginal_intensities_2021_min_default };

// code/carbon.js
var CarbonMeter = class {
  #listner = void 0;
  #location = "de";
  #co2 = void 0;
  #totalEmissionsCacheEntry = new ChacheEntry(window.sessionStorage, "carbonMeter.totalEmission", Number.MAX_SAFE_INTEGER);
  #carbonIntensityCacheEntry;
  #forecastDataCacheEntry;
  constructor(location) {
    if (location) {
      this.#location = location;
    }
    this.#co2 = new src_default.co2();
    let tenMinutes = 6e5;
    let fourHours = 144e5;
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
          networks: carbonIntensity
        }
      }
    );
    let estimatedCO2 = parseFloat(result.co2.toFixed(2));
    this.#reportEmissions(estimatedCO2);
  }
  #reportEmissions(estimatedCO2) {
    let totalEmission = parseFloat(this.#totalEmissionsCacheEntry.getItem());
    if (totalEmission) {
      totalEmission += estimatedCO2;
    } else {
      totalEmission = estimatedCO2;
    }
    this.#totalEmissionsCacheEntry.setItem(totalEmission);
    if (this.#listner) {
      this.#listner(totalEmission, estimatedCO2);
    }
  }
  #getTransferSize = () => {
    let totalTransferSize = 0;
    performance.getEntriesByType("resource").map((resource) => {
      const data3 = resource.toJSON();
      totalTransferSize += data3.transferSize;
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
    if (carbonIntensity === void 0) {
      let forecastData = this.#forecastDataCacheEntry.getItem();
      if (forecastData === void 0) {
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
    let data3 = await response.json();
    return data3;
  }
};
var ChacheEntry = class {
  #keyName;
  #dueKeyName;
  #due;
  #cacheProvider;
  constructor(cacheProvider, keyName, dueInMiliSeconds) {
    this.#due = dueInMiliSeconds;
    this.#keyName = keyName;
    this.#dueKeyName = keyName + ".Updated";
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
    return void 0;
  }
  setItem(value) {
    this.#cacheProvider.setItem(this.#keyName, value);
    this.#cacheProvider.setItem(this.#dueKeyName, Date.now());
  }
};
var carbon_default = CarbonMeter;
export {
  CarbonMeter,
  carbon_default as default
};
//# sourceMappingURL=carbon.js.map

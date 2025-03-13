"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAQICNData = exports.fetchGIOSData = exports.fetchAirlyData = void 0;
exports.MapContainer = MapContainer;
var react_1 = require("react");
var react_leaflet_1 = require("react-leaflet");
var leaflet_1 = require("leaflet");
require("leaflet/dist/leaflet.css");
var spinner_1 = require("@/components/ui/spinner");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
// Funkcja pomocnicza do kolorowania markerów
var getAQIColor = function (aqi) {
    if (aqi <= 50)
        return '#00E400';
    if (aqi <= 100)
        return '#FFFF00';
    if (aqi <= 150)
        return '#FF7E00';
    if (aqi <= 200)
        return '#FF0000';
    if (aqi <= 300)
        return '#8F3F97';
    return '#7E0023';
};
function MapContainer() {
    var _this = this;
    var _a = (0, react_1.useState)([]), stations = _a[0], setStations = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(0), retryCount = _d[0], setRetryCount = _d[1];
    var _e = (0, react_1.useState)(null), lastUpdate = _e[0], setLastUpdate = _e[1];
    var MAX_RETRIES = 3;
    var RETRY_DELAY = 2000;
    var REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
    var fetchHistoricalData = (0, react_1.useCallback)(function (stationId, token) { return __awaiter(_this, void 0, void 0, function () {
        var now, threeDaysAgo, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    now = new Date();
                    threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
                    return [4 /*yield*/, fetch("https://api.waqi.info/feed/".concat(stationId, "/history/?token=").concat(token, "&start=").concat(threeDaysAgo.toISOString(), "&end=").concat(now.toISOString()))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data.status === 'ok' && Array.isArray(data.data)) {
                        return [2 /*return*/, data.data.map(function (item) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                                return ({
                                    timestamp: item.time.iso,
                                    values: {
                                        pm25: ((_a = item.iaqi.pm25) === null || _a === void 0 ? void 0 : _a.v) || 0,
                                        pm10: ((_b = item.iaqi.pm10) === null || _b === void 0 ? void 0 : _b.v) || 0,
                                        o3: ((_c = item.iaqi.o3) === null || _c === void 0 ? void 0 : _c.v) || 0,
                                        no2: ((_d = item.iaqi.no2) === null || _d === void 0 ? void 0 : _d.v) || 0,
                                        so2: ((_e = item.iaqi.so2) === null || _e === void 0 ? void 0 : _e.v) || 0,
                                        co: ((_f = item.iaqi.co) === null || _f === void 0 ? void 0 : _f.v) || 0,
                                        humidity: ((_g = item.iaqi.h) === null || _g === void 0 ? void 0 : _g.v) || 0,
                                        pressure: ((_h = item.iaqi.p) === null || _h === void 0 ? void 0 : _h.v) || 0,
                                        temperature: ((_j = item.iaqi.t) === null || _j === void 0 ? void 0 : _j.v) || 0,
                                        wind: ((_k = item.iaqi.w) === null || _k === void 0 ? void 0 : _k.v) || 0
                                    }
                                });
                            })];
                    }
                    return [2 /*return*/, []];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching historical data:', error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    var fetchData = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var AQICN_TOKEN_1, stations_1, stationData, validStations, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (retryCount >= MAX_RETRIES) {
                        setError('Maximum retry attempts reached. Please try again later.');
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    AQICN_TOKEN_1 = import.meta.env.VITE_AQICN_TOKEN || '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
                    stations_1 = [
                        { id: '@2677', name: 'Gdańsk-Jasień' },
                        { id: '@2685', name: 'Gdańsk-Stogi' },
                        { id: '@2684', name: 'Gdańsk-Wrzeszcz' },
                        { id: '@2683', name: 'Gdańsk-Śródmieście' },
                        { id: '@2682', name: 'Gdańsk-Nowy Port' },
                        { id: '@2687', name: 'Gdynia-Pogórze' },
                        { id: '@2686', name: 'Gdynia-Śródmieście' },
                        { id: '@2688', name: 'Sopot' },
                        { id: '@2679', name: 'Gdańsk Nowy Port' }
                    ];
                    return [4 /*yield*/, Promise.all(stations_1.map(function (station) { return __awaiter(_this, void 0, void 0, function () {
                            var response, data, history_1, error_2;
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            return __generator(this, function (_l) {
                                switch (_l.label) {
                                    case 0:
                                        _l.trys.push([0, 5, , 6]);
                                        return [4 /*yield*/, fetch("https://api.waqi.info/feed/".concat(station.id, "/?token=").concat(AQICN_TOKEN_1))];
                                    case 1:
                                        response = _l.sent();
                                        if (!response.ok) {
                                            throw new Error("HTTP error! status: ".concat(response.status));
                                        }
                                        return [4 /*yield*/, response.json()];
                                    case 2:
                                        data = _l.sent();
                                        if (!(data.status === 'ok' && data.data)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, fetchHistoricalData(station.id, AQICN_TOKEN_1)];
                                    case 3:
                                        history_1 = _l.sent();
                                        return [2 /*return*/, {
                                                id: "aqicn-".concat(data.data.idx),
                                                stationName: station.name,
                                                region: station.name.split(' ')[0],
                                                coordinates: data.data.city.geo,
                                                measurements: {
                                                    aqi: data.data.aqi,
                                                    pm25: ((_a = data.data.iaqi.pm25) === null || _a === void 0 ? void 0 : _a.v) || 0,
                                                    pm10: ((_b = data.data.iaqi.pm10) === null || _b === void 0 ? void 0 : _b.v) || 0,
                                                    o3: ((_c = data.data.iaqi.o3) === null || _c === void 0 ? void 0 : _c.v) || 0,
                                                    no2: ((_d = data.data.iaqi.no2) === null || _d === void 0 ? void 0 : _d.v) || 0,
                                                    so2: ((_e = data.data.iaqi.so2) === null || _e === void 0 ? void 0 : _e.v) || 0,
                                                    co: ((_f = data.data.iaqi.co) === null || _f === void 0 ? void 0 : _f.v) || 0,
                                                    humidity: ((_g = data.data.iaqi.h) === null || _g === void 0 ? void 0 : _g.v) || 0,
                                                    pressure: ((_h = data.data.iaqi.p) === null || _h === void 0 ? void 0 : _h.v) || 0,
                                                    temperature: ((_j = data.data.iaqi.t) === null || _j === void 0 ? void 0 : _j.v) || 0,
                                                    wind: ((_k = data.data.iaqi.w) === null || _k === void 0 ? void 0 : _k.v) || 0,
                                                    timestamp: data.data.time.iso,
                                                },
                                                history: history_1,
                                                source: 'AQICN'
                                            }];
                                    case 4: return [2 /*return*/, null];
                                    case 5:
                                        error_2 = _l.sent();
                                        console.error("Error fetching data for station ".concat(station.name, ":"), error_2);
                                        return [2 /*return*/, null];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    stationData = _a.sent();
                    validStations = stationData.filter(function (station) { return station !== null; });
                    if (validStations.length === 0) {
                        throw new Error('No valid station data received');
                    }
                    setStations(validStations);
                    setError(null);
                    setLastUpdate(new Date());
                    setRetryCount(0);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error fetching air quality data:', err_1);
                    setRetryCount(function (prev) { return prev + 1; });
                    if (retryCount < MAX_RETRIES) {
                        setTimeout(fetchData, RETRY_DELAY);
                    }
                    else {
                        setError('Failed to load air quality data. Please try again later.');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [retryCount, fetchHistoricalData]);
    (0, react_1.useEffect)(function () {
        fetchData();
        var interval = setInterval(fetchData, REFRESH_INTERVAL);
        return function () { return clearInterval(interval); };
    }, [fetchData]);
    if (isLoading) {
        return (<div className="h-[600px] w-full flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <spinner_1.Spinner className="w-8 h-8"/>
        <p className="text-muted-foreground">Ładowanie danych o jakości powietrza...</p>
      </div>);
    }
    if (error) {
        return (<div className="h-[600px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <alert_1.Alert variant="destructive" className="max-w-md">
          <lucide_react_1.AlertCircle className="h-4 w-4"/>
          <alert_1.AlertTitle>Błąd</alert_1.AlertTitle>
          <alert_1.AlertDescription>{error}</alert_1.AlertDescription>
        </alert_1.Alert>
      </div>);
    }
    return (<div className="h-[600px] w-full rounded-lg overflow-hidden">
      <react_leaflet_1.MapContainer center={[54.372158, 18.638306]} zoom={11} className="h-full w-full">
        <react_leaflet_1.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
        <react_leaflet_1.TileLayer url="https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png" attribution='Air Quality Tiles &copy; <a href="https://waqi.info">WAQI.info</a>' opacity={0.6}/>
        {stations.map(function (station) { return (<react_leaflet_1.Marker key={station.id} position={station.coordinates} icon={leaflet_1.default.divIcon({
                className: 'custom-marker',
                html: "\n                <div style=\"\n                  background-color: ".concat(getAQIColor(station.measurements.aqi), ";\n                  width: 30px;\n                  height: 30px;\n                  border-radius: 50%;\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                  color: white;\n                  font-weight: bold;\n                  border: 2px solid white;\n                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);\n                \">\n                  ").concat(station.measurements.aqi, "\n                </div>\n              ")
            })}/>); })}
      </react_leaflet_1.MapContainer>
    </div>);
}
exports.default = MapContainer;
var fetchAirlyData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var AIRLY_API_KEY, response, installations, allStations, _i, installations_1, installation, measurementsResponse, measurements, error_3, error_4;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
    return __generator(this, function (_1) {
        switch (_1.label) {
            case 0:
                AIRLY_API_KEY = import.meta.env.VITE_AIRLY_API_KEY;
                if (!AIRLY_API_KEY)
                    return [2 /*return*/, []];
                _1.label = 1;
            case 1:
                _1.trys.push([1, 11, , 12]);
                return [4 /*yield*/, fetch('https://airapi.airly.eu/v2/installations/nearest?lat=54.372158&lng=18.638306&maxDistanceKM=30&maxResults=100', {
                        headers: { 'apikey': AIRLY_API_KEY }
                    })];
            case 2:
                response = _1.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                installations = _1.sent();
                allStations = [];
                _i = 0, installations_1 = installations;
                _1.label = 4;
            case 4:
                if (!(_i < installations_1.length)) return [3 /*break*/, 10];
                installation = installations_1[_i];
                _1.label = 5;
            case 5:
                _1.trys.push([5, 8, , 9]);
                return [4 /*yield*/, fetch("https://airapi.airly.eu/v2/measurements/installation?installationId=".concat(installation.id), {
                        headers: { 'apikey': AIRLY_API_KEY }
                    })];
            case 6:
                measurementsResponse = _1.sent();
                return [4 /*yield*/, measurementsResponse.json()];
            case 7:
                measurements = _1.sent();
                allStations.push({
                    id: "airly-".concat(installation.id),
                    stationName: ((_a = installation.address) === null || _a === void 0 ? void 0 : _a.description) || 'Stacja Airly',
                    region: ((_b = installation.address) === null || _b === void 0 ? void 0 : _b.city) || 'Unknown',
                    lat: ((_c = installation.location) === null || _c === void 0 ? void 0 : _c.latitude) || 0,
                    lng: ((_d = installation.location) === null || _d === void 0 ? void 0 : _d.longitude) || 0,
                    pm25: (_h = (_g = (_f = (_e = measurements === null || measurements === void 0 ? void 0 : measurements.current) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f.find(function (v) {
                        return v.name.toUpperCase() === 'PM25';
                    })) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : 0,
                    pm10: (_m = (_l = (_k = (_j = measurements === null || measurements === void 0 ? void 0 : measurements.current) === null || _j === void 0 ? void 0 : _j.values) === null || _k === void 0 ? void 0 : _k.find(function (v) {
                        return v.name.toUpperCase() === 'PM10';
                    })) === null || _l === void 0 ? void 0 : _l.value) !== null && _m !== void 0 ? _m : 0,
                    timestamp: ((_o = measurements === null || measurements === void 0 ? void 0 : measurements.current) === null || _o === void 0 ? void 0 : _o.tillDateTime) || new Date().toISOString(),
                    additionalData: {
                        aqi: (_s = (_r = (_q = (_p = measurements === null || measurements === void 0 ? void 0 : measurements.current) === null || _p === void 0 ? void 0 : _p.indexes) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.value) !== null && _s !== void 0 ? _s : 0,
                        temperature: (_w = (_v = (_u = (_t = measurements === null || measurements === void 0 ? void 0 : measurements.current) === null || _t === void 0 ? void 0 : _t.values) === null || _u === void 0 ? void 0 : _u.find(function (v) {
                            return v.name.toUpperCase() === 'TEMPERATURE';
                        })) === null || _v === void 0 ? void 0 : _v.value) !== null && _w !== void 0 ? _w : null,
                        humidity: (_0 = (_z = (_y = (_x = measurements === null || measurements === void 0 ? void 0 : measurements.current) === null || _x === void 0 ? void 0 : _x.values) === null || _y === void 0 ? void 0 : _y.find(function (v) {
                            return v.name.toUpperCase() === 'HUMIDITY';
                        })) === null || _z === void 0 ? void 0 : _z.value) !== null && _0 !== void 0 ? _0 : null,
                        source: 'Airly'
                    }
                });
                return [3 /*break*/, 9];
            case 8:
                error_3 = _1.sent();
                console.error("Error fetching Airly measurements:", error_3);
                return [3 /*break*/, 9];
            case 9:
                _i++;
                return [3 /*break*/, 4];
            case 10: return [2 /*return*/, allStations];
            case 11:
                error_4 = _1.sent();
                console.error('Error fetching Airly installations:', error_4);
                return [2 /*return*/, []];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.fetchAirlyData = fetchAirlyData;
var fetchGIOSData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, stations, trojmiastoStations, processedStations, _i, trojmiastoStations_1, station, sensorResponse, sensorData, getLatestValidValue, calculateAQI, pm25Value, pm10Value, timestamp, error_5, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                return [4 /*yield*/, fetch('https://api.gios.gov.pl/pjp-api/rest/station/findAll')];
            case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                stations = _b.sent();
                trojmiastoStations = stations.filter(function (station) {
                    return station.city.name.includes('Gdańsk') ||
                        station.city.name.includes('Gdynia') ||
                        station.city.name.includes('Sopot');
                });
                processedStations = [];
                _i = 0, trojmiastoStations_1 = trojmiastoStations;
                _b.label = 3;
            case 3:
                if (!(_i < trojmiastoStations_1.length)) return [3 /*break*/, 9];
                station = trojmiastoStations_1[_i];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 7, , 8]);
                return [4 /*yield*/, fetch("https://api.gios.gov.pl/pjp-api/rest/data/getData/".concat(station.id))];
            case 5:
                sensorResponse = _b.sent();
                return [4 /*yield*/, sensorResponse.json()];
            case 6:
                sensorData = _b.sent();
                getLatestValidValue = function (values) {
                    if (!Array.isArray(values))
                        return 0;
                    var validValues = values.filter(function (v) { return v && v.value !== null && !isNaN(v.value); });
                    return validValues.length > 0 ? validValues[0].value : 0;
                };
                calculateAQI = function (pm25, pm10) {
                    var pm25Index = (pm25 * 100) / 25; // 25 µg/m³ is the WHO guideline
                    var pm10Index = (pm10 * 100) / 50; // 50 µg/m³ is the WHO guideline
                    return Math.max(pm25Index, pm10Index);
                };
                pm25Value = getLatestValidValue(sensorData.values);
                pm10Value = getLatestValidValue(sensorData.values);
                timestamp = ((_a = sensorData.values[0]) === null || _a === void 0 ? void 0 : _a.date) || new Date().toISOString();
                processedStations.push({
                    id: "gios-".concat(station.id),
                    stationName: station.stationName,
                    region: station.city.name,
                    lat: parseFloat(station.gegrLat),
                    lng: parseFloat(station.gegrLon),
                    pm25: pm25Value,
                    pm10: pm10Value,
                    timestamp: timestamp,
                    additionalData: {
                        aqi: calculateAQI(pm25Value, pm10Value),
                        source: 'GIOS'
                    }
                });
                return [3 /*break*/, 8];
            case 7:
                error_5 = _b.sent();
                console.error("Error fetching GIO\u015A sensor data for station ".concat(station.stationName, ":"), error_5);
                return [3 /*break*/, 8];
            case 8:
                _i++;
                return [3 /*break*/, 3];
            case 9: return [2 /*return*/, processedStations];
            case 10:
                error_6 = _b.sent();
                console.error('Error fetching GIOŚ stations:', error_6);
                return [2 /*return*/, []];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.fetchGIOSData = fetchGIOSData;
var fetchAQICNData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var AQICN_TOKEN, stations, processedData, _i, stations_2, station, response, data, error_7, error_8;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                AQICN_TOKEN = '5a1271b20fbbb9c972814a7b8d31512e061e83e6';
                stations = [
                    { id: '@237496', name: 'Gdańsk Wrzeszcz' },
                    { id: '@62983', name: 'Gdynia' },
                    { id: '@63286', name: 'Sopot' }
                ];
                _e.label = 1;
            case 1:
                _e.trys.push([1, 9, , 10]);
                processedData = [];
                _i = 0, stations_2 = stations;
                _e.label = 2;
            case 2:
                if (!(_i < stations_2.length)) return [3 /*break*/, 8];
                station = stations_2[_i];
                _e.label = 3;
            case 3:
                _e.trys.push([3, 6, , 7]);
                return [4 /*yield*/, fetch("https://api.waqi.info/feed/".concat(station.id, "/?token=").concat(AQICN_TOKEN))];
            case 4:
                response = _e.sent();
                return [4 /*yield*/, response.json()];
            case 5:
                data = _e.sent();
                if (data.status === 'ok') {
                    processedData.push({
                        id: "aqicn-".concat(data.data.idx),
                        stationName: station.name,
                        region: station.name.split(' ')[0],
                        lat: data.data.city.geo[0],
                        lng: data.data.city.geo[1],
                        pm25: ((_a = data.data.iaqi.pm25) === null || _a === void 0 ? void 0 : _a.v) || 0,
                        pm10: ((_b = data.data.iaqi.pm10) === null || _b === void 0 ? void 0 : _b.v) || 0,
                        timestamp: data.data.time.iso,
                        additionalData: {
                            aqi: data.data.aqi,
                            temperature: (_c = data.data.iaqi.t) === null || _c === void 0 ? void 0 : _c.v,
                            humidity: (_d = data.data.iaqi.h) === null || _d === void 0 ? void 0 : _d.v
                        }
                    });
                }
                return [3 /*break*/, 7];
            case 6:
                error_7 = _e.sent();
                console.error("Error fetching AQICN data for station ".concat(station.name, ":"), error_7);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/, processedData];
            case 9:
                error_8 = _e.sent();
                console.error('Error in AQICN data fetching:', error_8);
                return [2 /*return*/, []];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.fetchAQICNData = fetchAQICNData;
file_content >
    IMPORTANT;
For;
any;
future;
changes;
to;
this;
file, use;
the;
final_file_content;
shown;
above;
reference.This;
content;
reflects;
the;
current;
state;
of;
the;
file, including;
any;
auto - formatting(e.g.);
if (you)
    used;
single;
quotes;
but;
the;
formatter;
converted;
them;
to;
double;
quotes;
Always;
base;
your;
SEARCH / REPLACE;
operations;
on;
this;
final;
version;
to;
ensure;
accuracy.
;
New;
problems;
detected;
after;
saving;
the;
file: src / components / pomerania / map / MapContainer.tsx
    - [ts, Error];
Line;
6;
Cannot;
find;
var '@/components/ui/spinner';
(function ('@/components/ui/spinner') {
})('@/components/ui/spinner' || ('@/components/ui/spinner' = {}));
or;
its;
corresponding;
-[ts, Error];
Line;
179;
A;
s;
type.
    Property;
'source';
is;
missing in type;
'AirQualityData';
but;
required in type;
'{ id: string; stationName: string; region: string; coordinates: any; measurements: { aqi: any; pm25: any; pm10: any; o3: any; no2: any; so2: any; co: any; humidity: any; pressure: any; temperature: any; wind: any; timestamp: any; }; history: any; source: string; }'.
    - [ts, Error];
Line;
321;
Object;
literal;
may;
only;
specify;
known;
properties, and;
'source';
does;
not;
exist in type;
'AdditionalData'.
    - [ts, Error];
Line;
385;
Object;
literal;
may;
only;
specify;
known;
properties, and;
'source';
does;
not;
exist in type;
'AdditionalData'.
    - [ts, Error];
Line;
420;
Type;
'string';
is;
not;
assignable;
to;
type;
'"Sopot" | "Gdańsk" | "Gdynia"'.;
#;
VSCode;
Visible;
Files;
src / components / pomerania / map / MapContainer.tsx;
#;
VSCode;
Open;
Tabs;
src / components / AirQualityMap.tsx;
src / api / airQuality.ts;
src / components / pomerania / map / MapContainer.tsx;
#;
Current;
Time;
3 / 9 / 2025, 7;
53;
59;
PM(Europe / Warsaw, UTC + 1, 0);
#;
Current;
Mode;
ACT;
MODE;
environment_details >
;

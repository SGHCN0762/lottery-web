const BASE_PATH = 'civil-servant-exam';
const BASE_URL = import.meta.env.BASE_URL;

const PROVINCE_XINGCE_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-provice-exam-xingce@v1.0.0/';
const PROVINCE_SHENLUN_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-provice-exam-shenlun@v1.0.0/';
const COUNTRY_XINGCE_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-country-exam-xingce@v1.0.0/';
const COUNTRY_SHENLUN_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-country-exam-shenlun@v1.0.0/';

const PROVINCE_XINGCE_JSON_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-provice-exam-xingce-json@v1.0.0/';
const PROVINCE_SHENLUN_JSON_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-provice-exam-shenlun-json@v1.0.0/';
const COUNTRY_XINGCE_JSON_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-country-exam-xingce-json@v1.0.0/';
const COUNTRY_SHENLUN_JSON_CDN_URL =
  'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-country-exam-shenlun-json@v1.0.0/';

const getFullUrl = path => `${BASE_URL}${path}`;

const getProvinceXingceUrl = fileName =>
  `${PROVINCE_XINGCE_CDN_URL}${encodeURIComponent(fileName)}`;
const getProvinceShenlunUrl = fileName =>
  `${PROVINCE_SHENLUN_CDN_URL}${encodeURIComponent(fileName)}`;
const getCountryXingceUrl = fileName => `${COUNTRY_XINGCE_CDN_URL}${encodeURIComponent(fileName)}`;
const getCountryShenlunUrl = fileName =>
  `${COUNTRY_SHENLUN_CDN_URL}${encodeURIComponent(fileName)}`;

const getProvinceXingceJsonUrl = fileName =>
  `${PROVINCE_XINGCE_JSON_CDN_URL}${encodeURIComponent(fileName)}`;
const getProvinceShenlunJsonUrl = fileName =>
  `${PROVINCE_SHENLUN_JSON_CDN_URL}${encodeURIComponent(fileName)}`;
const getCountryXingceJsonUrl = fileName =>
  `${COUNTRY_XINGCE_JSON_CDN_URL}${encodeURIComponent(fileName)}`;
const getCountryShenlunJsonUrl = fileName =>
  `${COUNTRY_SHENLUN_JSON_CDN_URL}${encodeURIComponent(fileName)}`;

export {
  BASE_PATH,
  BASE_URL,
  getFullUrl,
  getProvinceXingceUrl,
  getProvinceShenlunUrl,
  getCountryXingceUrl,
  getCountryShenlunUrl,
  getProvinceXingceJsonUrl,
  getProvinceShenlunJsonUrl,
  getCountryXingceJsonUrl,
  getCountryShenlunJsonUrl,
};

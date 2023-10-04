const add_ordinals = (numb) => {
  var str = `${numb}`.trim().toString().slice(-1),
    ord = '';
  switch (str) {
    case '1':
      ord = 'st';
      break;
    case '2':
      ord = 'nd';
      break;
    case '3':
      ord = 'rd';
      break;
    default:
      ord = 'th';
      break;
  }
  return `${numb}` + ord;
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getFormattedDate = (date, prefomattedDate = false, hideYear = false) => {
  const day = add_ordinals(date.getDate());
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10th January at 10:20
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  // 10th January 2017. at 10:20
  return `${day}. ${month} ${year} at ${hours}:${minutes}`;
};

const timeAgo = (dateParam) => {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return 'now';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today'); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
};

const removeStrAtIndex = (str, subStr, idx) =>
  str.slice(str.lastIndexOf(subStr, idx) + 1);

const currentMilliseconds = () => Date.now();

const isArray = (myArray) => Array.isArray(myArray);

const isANumber = (theNumber) => {
  if (!isset(() => theNumber)) return false;
  return Number(theNumber) !== Number.NaN;
};

/**
 * Check to see if a value is set
 *
 * @param {Function} accessor Function that returns value to check<br/><br/><strong>Example:</strong><br/> isset(() => someValueToCheck)
 *
 * @return boolean|boolean
 */
const isset = (accessor) => {
  try {
    const obj = accessor();
    return typeof obj !== 'undefined' && obj !== null;
  } catch (e) {
    return false;
  }
};
const getType = (checkedVar) => typeof checkedVar;
const isObject = (checkedVar) => getType(checkedVar) === 'object';
const isString = (checkedVar) => getType(checkedVar) === 'string';
const strlpad = (str, padString, length) => {
  str = str.trim();
  while (str.length < length) str = padString + str;
  return str;
};

/**
 * Determine if the provided variable is empty and return true, and false if otherwise
 * First determine if value is null or of type {undefined} then is considered empty else continue.
 * If it's {String} confirm that the length is less tha 1 else check if it's a number and confirm if the number is lesser than or equal to 0
 * else return false
 *
 * @param checkedVar {String|Number} Variable to check for emptiness, string or unsigned integers only as empty numbers are numbers less than or equal to 0
 * @returns {boolean}
 */
const empty = (checkedVar) => {
  if (checkedVar == null) return true;
  else if (!isset(() => checkedVar)) return true;
  else if (isObject(checkedVar)) return Object.keys(checkedVar).length === 0;
  else if (isArray(checkedVar)) return checkedVar.length < 1;
  else if (getType(checkedVar) === 'string')
    return checkedVar.trim().length < 1;
  else if (getType(checkedVar) === 'number') return checkedVar <= 0;
  else if (getType(checkedVar) === 'function') return empty(checkedVar());

  return false;
};

const equalsIgnoreCase = (str1, str2) => {
  if (getType(str1) !== 'string' || getType(str2) !== 'string') return false;
  return str1.toLowerCase() === str2.toLowerCase();
};

const today = () => new Date();

// eslint-disable-next-line no-useless-escape
const isValidEmail = (email) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
// eslint-disable-next-line no-useless-escape
const isValidPhone = (phone) =>
  /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/.test(
    phone
  );

//@see https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
const strongPasswordRegEx = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);
const mediumPasswordRegEx = new RegExp(
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);
// eslint-disable-next-line no-useless-escape
const isValidPassword = (password) => mediumPasswordRegEx.test(password);

const ucwords = (str) => {
  if (!isset(() => str)) return '';
  str = str.toLowerCase();
  // eslint-disable-next-line no-useless-escape
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function ($1) {
    return $1.toUpperCase();
  });
};

const ucfirst = (str) => {
  if (!isset(() => str)) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const arrayToCommaString = (arr) => arr.join(', ');
const arrayToCommaSeparated = (arr) => arr.join(',');

const arrayValues = (arr) => {
  const temp = [];
  for (let [key, value] of Object.entries(arr)) {
    if (!empty(key)) temp.push(Number(value));
  }
  return temp;
};
const arrayIdValues = (arr) => {
  const temp = [];
  for (let [key, value] of Object.entries(arr)) {
    if (!empty(key)) temp.push(Number(value.id));
  }
  return temp;
};

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const isWorkingDay = (day, month, fullYear) => {
  month = month - 1; //January = 0, and December = 11
  const d = new Date(fullYear, month, day);
  return d.getDay() >= 1 && d.getDay() <= 6; //Sunday = 0 and Saturday = 6
};

/**
 * PHP-like print_r() & var_dump() equivalent for JavaScript Object
 *
 * @author Faisalman <movedpixel@gmail.com>
 * @license http://www.opensource.org/licenses/mit-license.php
 * @link http://gist.github.com/879208
 */
const print_r = function (obj, t) {
  // define tab spacing
  const tab = t || '';

  // check if it's array
  const isArr =
    Object.prototype.toString.call(obj) === '[object Array]' ? true : false;

  // use {} for object, [] for array
  let str = isArr ? 'Array\n' + tab + '[\n' : 'Object\n' + tab + '{\n';

  // walk through it's properties
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let val1 = obj[prop];
      let val2 = '';
      const type = Object.prototype.toString.call(val1);
      switch (type) {
        // recursive if object/array
        case '[object Array]':
        case '[object Object]':
          val2 = print_r(val1, tab + '\t');
          break;

        case '[object String]':
          val2 = "'" + val1 + "'";
          break;

        default:
          val2 = val1;
      }
      str += tab + '\t' + prop + ' => ' + val2 + ',\n';
    }
  }

  // remove extra comma for last property
  str = str.substring(0, str.length - 2) + '\n' + tab;

  return isArr ? str + ']' : str + '}';
};

const generateUserID = () => {
  const date = new Date();
  return [
    date.getFullYear(),
    date.getDate(),
    date.getHours(),
    date.getMilliseconds(),
  ].join('');
};

const titleToSlug = (title) => {
  let slug;

  // convert to lower case
  slug = title.toLowerCase();

  // remove special characters
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ''
  );
  // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

  // replace spaces with dash symbols
  slug = slug.replace(/ /gi, '-');

  // remove consecutive dash symbols
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');

  // remove the unwanted dash symbols at the beginning and the end of the slug
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

const current_time_milliseconds = () => {
  return '' + new Date().getMilliseconds();
};
const updateUserAuthState = (res) => {
  if (isset(() => res.email)) {
    console.log('Logout Attempt: ', res);
    localStorage.setItem('user', JSON.stringify(res));
  } else {
    localStorage.removeItem('user');
  }
};
const getUserAuthState = (res) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    user = null;
  }
  return user;
};
const updatePublishedAt = (post, cb) => {
  if (post.published) {
    post.publishedAt = new Date();
  } else {
    post.publishedAt = null;
  }
  cb(null, post);
};

const getGenders = () => [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Prefer not to share', label: 'Prefer not to share' },
];

const getMicTypes = () => [
  { value: 'Built in Microphone', label: 'Built in Microphone' },
  { value: 'USB/External Microphone', label: 'USB/External Microphone' },
  { value: 'Studio Quality in Microphone', label: 'Studio Quality Microphone' },
];

const getTimeZonesOnly = () => [
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmara',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Douala',
  'Africa/El_Aaiun',
  'Africa/Freetown',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Juba',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Kigali',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Lome',
  'Africa/Luanda',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Malabo',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Mogadishu',
  'Africa/Monrovia',
  'Africa/Nairobi',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Porto-Novo',
  'Africa/Sao_Tome',
  'Africa/Tripoli',
  'Africa/Tunis',
  'Africa/Windhoek',
  'America/Adak',
  'America/Anchorage',
  'America/Anguilla',
  'America/Antigua',
  'America/Araguaina',
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Catamarca',
  'America/Argentina/Cordoba',
  'America/Argentina/Jujuy',
  'America/Argentina/La_Rioja',
  'America/Argentina/Mendoza',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Salta',
  'America/Argentina/San_Juan',
  'America/Argentina/San_Luis',
  'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia',
  'America/Aruba',
  'America/Asuncion',
  'America/Atikokan',
  'America/Bahia',
  'America/Bahia_Banderas',
  'America/Barbados',
  'America/Belem',
  'America/Belize',
  'America/Blanc-Sablon',
  'America/Boa_Vista',
  'America/Bogota',
  'America/Boise',
  'America/Cambridge_Bay',
  'America/Campo_Grande',
  'America/Cancun',
  'America/Caracas',
  'America/Cayenne',
  'America/Cayman',
  'America/Chicago',
  'America/Chihuahua',
  'America/Costa_Rica',
  'America/Creston',
  'America/Cuiaba',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Dawson',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Detroit',
  'America/Dominica',
  'America/Edmonton',
  'America/Eirunepe',
  'America/El_Salvador',
  'America/Fort_Nelson',
  'America/Fortaleza',
  'America/Glace_Bay',
  'America/Godthab',
  'America/Goose_Bay',
  'America/Grand_Turk',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guatemala',
  'America/Guayaquil',
  'America/Guyana',
  'America/Halifax',
  'America/Havana',
  'America/Hermosillo',
  'America/Indiana/Indianapolis',
  'America/Indiana/Knox',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Tell_City',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Inuvik',
  'America/Iqaluit',
  'America/Jamaica',
  'America/Juneau',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Kralendijk',
  'America/La_Paz',
  'America/Lima',
  'America/Los_Angeles',
  'America/Lower_Princes',
  'America/Maceio',
  'America/Managua',
  'America/Manaus',
  'America/Marigot',
  'America/Martinique',
  'America/Matamoros',
  'America/Mazatlan',
  'America/Menominee',
  'America/Merida',
  'America/Metlakatla',
  'America/Mexico_City',
  'America/Miquelon',
  'America/Moncton',
  'America/Monterrey',
  'America/Montevideo',
  'America/Montserrat',
  'America/Nassau',
  'America/New_York',
  'America/Nipigon',
  'America/Nome',
  'America/Noronha',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/Ojinaga',
  'America/Panama',
  'America/Pangnirtung',
  'America/Paramaribo',
  'America/Phoenix',
  'America/Port-au-Prince',
  'America/Port_of_Spain',
  'America/Porto_Velho',
  'America/Puerto_Rico',
  'America/Punta_Arenas',
  'America/Rainy_River',
  'America/Rankin_Inlet',
  'America/Recife',
  'America/Regina',
  'America/Resolute',
  'America/Rio_Branco',
  'America/Santarem',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/Sao_Paulo',
  'America/Scoresbysund',
  'America/Sitka',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Swift_Current',
  'America/Tegucigalpa',
  'America/Thule',
  'America/Thunder_Bay',
  'America/Tijuana',
  'America/Toronto',
  'America/Tortola',
  'America/Vancouver',
  'America/Whitehorse',
  'America/Winnipeg',
  'America/Yakutat',
  'America/Yellowknife',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/DumontDUrville',
  'Antarctica/Macquarie',
  'Antarctica/Mawson',
  'Antarctica/McMurdo',
  'Antarctica/Palmer',
  'Antarctica/Rothera',
  'Antarctica/Syowa',
  'Antarctica/Troll',
  'Antarctica/Vostok',
  'Arctic/Longyearbyen',
  'Asia/Aden',
  'Asia/Almaty',
  'Asia/Amman',
  'Asia/Anadyr',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Atyrau',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Barnaul',
  'Asia/Beirut',
  'Asia/Bishkek',
  'Asia/Brunei',
  'Asia/Chita',
  'Asia/Choibalsan',
  'Asia/Colombo',
  'Asia/Damascus',
  'Asia/Dhaka',
  'Asia/Dili',
  'Asia/Dubai',
  'Asia/Dushanbe',
  'Asia/Famagusta',
  'Asia/Gaza',
  'Asia/Hebron',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Hovd',
  'Asia/Irkutsk',
  'Asia/Jakarta',
  'Asia/Jayapura',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Kathmandu',
  'Asia/Khandyga',
  'Asia/Kolkata',
  'Asia/Krasnoyarsk',
  'Asia/Kuala_Lumpur',
  'Asia/Kuching',
  'Asia/Kuwait',
  'Asia/Macau',
  'Asia/Magadan',
  'Asia/Makassar',
  'Asia/Manila',
  'Asia/Muscat',
  'Asia/Nicosia',
  'Asia/Novokuznetsk',
  'Asia/Novosibirsk',
  'Asia/Omsk',
  'Asia/Oral',
  'Asia/Phnom_Penh',
  'Asia/Pontianak',
  'Asia/Pyongyang',
  'Asia/Qatar',
  'Asia/Qyzylorda',
  'Asia/Riyadh',
  'Asia/Sakhalin',
  'Asia/Samarkand',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Srednekolymsk',
  'Asia/Taipei',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Asia/Tehran',
  'Asia/Thimphu',
  'Asia/Tokyo',
  'Asia/Tomsk',
  'Asia/Ulaanbaatar',
  'Asia/Urumqi',
  'Asia/Ust-Nera',
  'Asia/Vientiane',
  'Asia/Vladivostok',
  'Asia/Yakutsk',
  'Asia/Yangon',
  'Asia/Yekaterinburg',
  'Asia/Yerevan',
  'Atlantic/Azores',
  'Atlantic/Bermuda',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Atlantic/Faroe',
  'Atlantic/Madeira',
  'Atlantic/Reykjavik',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Broken_Hill',
  'Australia/Currie',
  'Australia/Darwin',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/Lindeman',
  'Australia/Lord_Howe',
  'Australia/Melbourne',
  'Australia/Perth',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Astrakhan',
  'Europe/Athens',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Busingen',
  'Europe/Chisinau',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Istanbul',
  'Europe/Jersey',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Kirov',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Minsk',
  'Europe/Monaco',
  'Europe/Moscow',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Podgorica',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Samara',
  'Europe/San_Marino',
  'Europe/Sarajevo',
  'Europe/Saratov',
  'Europe/Simferopol',
  'Europe/Skopje',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Tirane',
  'Europe/Ulyanovsk',
  'Europe/Uzhgorod',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Volgograd',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Zaporozhye',
  'Europe/Zurich',
  'Indian/Antananarivo',
  'Indian/Chagos',
  'Indian/Christmas',
  'Indian/Cocos',
  'Indian/Comoro',
  'Indian/Kerguelen',
  'Indian/Mahe',
  'Indian/Maldives',
  'Indian/Mauritius',
  'Indian/Mayotte',
  'Indian/Reunion',
  'Pacific/Apia',
  'Pacific/Auckland',
  'Pacific/Bougainville',
  'Pacific/Chatham',
  'Pacific/Chuuk',
  'Pacific/Easter',
  'Pacific/Efate',
  'Pacific/Enderbury',
  'Pacific/Fakaofo',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Galapagos',
  'Pacific/Gambier',
  'Pacific/Guadalcanal',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Kiritimati',
  'Pacific/Kosrae',
  'Pacific/Kwajalein',
  'Pacific/Majuro',
  'Pacific/Marquesas',
  'Pacific/Midway',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Norfolk',
  'Pacific/Noumea',
  'Pacific/Pago_Pago',
  'Pacific/Palau',
  'Pacific/Pitcairn',
  'Pacific/Pohnpei',
  'Pacific/Port_Moresby',
  'Pacific/Rarotonga',
  'Pacific/Saipan',
  'Pacific/Tahiti',
  'Pacific/Tarawa',
  'Pacific/Tongatapu',
  'Pacific/Wake',
  'Pacific/Wallis',
  'UTC',
];
const getTimeZones = () => [
  { value: 'Africa/Abidjan', label: 'Africa/Abidjan' },
  { value: 'Africa/Accra', label: 'Africa/Accra' },
  { value: 'Africa/Addis_Ababa', label: 'Africa/Addis_Ababa' },
  { value: 'Africa/Algiers', label: 'Africa/Algiers' },
  { value: 'Africa/Asmara', label: 'Africa/Asmara' },
  { value: 'Africa/Bamako', label: 'Africa/Bamako' },
  { value: 'Africa/Bangui', label: 'Africa/Bangui' },
  { value: 'Africa/Banjul', label: 'Africa/Banjul' },
  { value: 'Africa/Bissau', label: 'Africa/Bissau' },
  { value: 'Africa/Blantyre', label: 'Africa/Blantyre' },
  { value: 'Africa/Brazzaville', label: 'Africa/Brazzaville' },
  { value: 'Africa/Bujumbura', label: 'Africa/Bujumbura' },
  { value: 'Africa/Cairo', label: 'Africa/Cairo' },
  { value: 'Africa/Casablanca', label: 'Africa/Casablanca' },
  { value: 'Africa/Ceuta', label: 'Africa/Ceuta' },
  { value: 'Africa/Conakry', label: 'Africa/Conakry' },
  { value: 'Africa/Dakar', label: 'Africa/Dakar' },
  { value: 'Africa/Dar_es_Salaam', label: 'Africa/Dar_es_Salaam' },
  { value: 'Africa/Djibouti', label: 'Africa/Djibouti' },
  { value: 'Africa/Douala', label: 'Africa/Douala' },
  { value: 'Africa/El_Aaiun', label: 'Africa/El_Aaiun' },
  { value: 'Africa/Freetown', label: 'Africa/Freetown' },
  { value: 'Africa/Gaborone', label: 'Africa/Gaborone' },
  { value: 'Africa/Harare', label: 'Africa/Harare' },
  { value: 'Africa/Johannesburg', label: 'Africa/Johannesburg' },
  { value: 'Africa/Juba', label: 'Africa/Juba' },
  { value: 'Africa/Kampala', label: 'Africa/Kampala' },
  { value: 'Africa/Khartoum', label: 'Africa/Khartoum' },
  { value: 'Africa/Kigali', label: 'Africa/Kigali' },
  { value: 'Africa/Kinshasa', label: 'Africa/Kinshasa' },
  { value: 'Africa/Lagos', label: 'Africa/Lagos' },
  { value: 'Africa/Libreville', label: 'Africa/Libreville' },
  { value: 'Africa/Lome', label: 'Africa/Lome' },
  { value: 'Africa/Luanda', label: 'Africa/Luanda' },
  { value: 'Africa/Lubumbashi', label: 'Africa/Lubumbashi' },
  { value: 'Africa/Lusaka', label: 'Africa/Lusaka' },
  { value: 'Africa/Malabo', label: 'Africa/Malabo' },
  { value: 'Africa/Maputo', label: 'Africa/Maputo' },
  { value: 'Africa/Maseru', label: 'Africa/Maseru' },
  { value: 'Africa/Mbabane', label: 'Africa/Mbabane' },
  { value: 'Africa/Mogadishu', label: 'Africa/Mogadishu' },
  { value: 'Africa/Monrovia', label: 'Africa/Monrovia' },
  { value: 'Africa/Nairobi', label: 'Africa/Nairobi' },
  { value: 'Africa/Ndjamena', label: 'Africa/Ndjamena' },
  { value: 'Africa/Niamey', label: 'Africa/Niamey' },
  { value: 'Africa/Nouakchott', label: 'Africa/Nouakchott' },
  { value: 'Africa/Ouagadougou', label: 'Africa/Ouagadougou' },
  { value: 'Africa/Porto-Novo', label: 'Africa/Porto-Novo' },
  { value: 'Africa/Sao_Tome', label: 'Africa/Sao_Tome' },
  { value: 'Africa/Tripoli', label: 'Africa/Tripoli' },
  { value: 'Africa/Tunis', label: 'Africa/Tunis' },
  { value: 'Africa/Windhoek', label: 'Africa/Windhoek' },
  { value: 'America/Adak', label: 'America/Adak' },
  { value: 'America/Anchorage', label: 'America/Anchorage' },
  { value: 'America/Anguilla', label: 'America/Anguilla' },
  { value: 'America/Antigua', label: 'America/Antigua' },
  { value: 'America/Araguaina', label: 'America/Araguaina' },
  {
    value: 'America/Argentina/Buenos_Aires',
    label: 'America/Argentina/Buenos_Aires',
  },
  {
    value: 'America/Argentina/Catamarca',
    label: 'America/Argentina/Catamarca',
  },
  { value: 'America/Argentina/Cordoba', label: 'America/Argentina/Cordoba' },
  { value: 'America/Argentina/Jujuy', label: 'America/Argentina/Jujuy' },
  {
    value: 'America/Argentina/La_Rioja',
    label: 'America/Argentina/La_Rioja',
  },
  { value: 'America/Argentina/Mendoza', label: 'America/Argentina/Mendoza' },
  {
    value: 'America/Argentina/Rio_Gallegos',
    label: 'America/Argentina/Rio_Gallegos',
  },
  { value: 'America/Argentina/Salta', label: 'America/Argentina/Salta' },
  {
    value: 'America/Argentina/San_Juan',
    label: 'America/Argentina/San_Juan',
  },
  {
    value: 'America/Argentina/San_Luis',
    label: 'America/Argentina/San_Luis',
  },
  { value: 'America/Argentina/Tucuman', label: 'America/Argentina/Tucuman' },
  { value: 'America/Argentina/Ushuaia', label: 'America/Argentina/Ushuaia' },
  { value: 'America/Aruba', label: 'America/Aruba' },
  { value: 'America/Asuncion', label: 'America/Asuncion' },
  { value: 'America/Atikokan', label: 'America/Atikokan' },
  { value: 'America/Bahia', label: 'America/Bahia' },
  { value: 'America/Bahia_Banderas', label: 'America/Bahia_Banderas' },
  { value: 'America/Barbados', label: 'America/Barbados' },
  { value: 'America/Belem', label: 'America/Belem' },
  { value: 'America/Belize', label: 'America/Belize' },
  { value: 'America/Blanc-Sablon', label: 'America/Blanc-Sablon' },
  { value: 'America/Boa_Vista', label: 'America/Boa_Vista' },
  { value: 'America/Bogota', label: 'America/Bogota' },
  { value: 'America/Boise', label: 'America/Boise' },
  { value: 'America/Cambridge_Bay', label: 'America/Cambridge_Bay' },
  { value: 'America/Campo_Grande', label: 'America/Campo_Grande' },
  { value: 'America/Cancun', label: 'America/Cancun' },
  { value: 'America/Caracas', label: 'America/Caracas' },
  { value: 'America/Cayenne', label: 'America/Cayenne' },
  { value: 'America/Cayman', label: 'America/Cayman' },
  { value: 'America/Chicago', label: 'America/Chicago' },
  { value: 'America/Chihuahua', label: 'America/Chihuahua' },
  { value: 'America/Costa_Rica', label: 'America/Costa_Rica' },
  { value: 'America/Creston', label: 'America/Creston' },
  { value: 'America/Cuiaba', label: 'America/Cuiaba' },
  { value: 'America/Curacao', label: 'America/Curacao' },
  { value: 'America/Danmarkshavn', label: 'America/Danmarkshavn' },
  { value: 'America/Dawson', label: 'America/Dawson' },
  { value: 'America/Dawson_Creek', label: 'America/Dawson_Creek' },
  { value: 'America/Denver', label: 'America/Denver' },
  { value: 'America/Detroit', label: 'America/Detroit' },
  { value: 'America/Dominica', label: 'America/Dominica' },
  { value: 'America/Edmonton', label: 'America/Edmonton' },
  { value: 'America/Eirunepe', label: 'America/Eirunepe' },
  { value: 'America/El_Salvador', label: 'America/El_Salvador' },
  { value: 'America/Fort_Nelson', label: 'America/Fort_Nelson' },
  { value: 'America/Fortaleza', label: 'America/Fortaleza' },
  { value: 'America/Glace_Bay', label: 'America/Glace_Bay' },
  { value: 'America/Godthab', label: 'America/Godthab' },
  { value: 'America/Goose_Bay', label: 'America/Goose_Bay' },
  { value: 'America/Grand_Turk', label: 'America/Grand_Turk' },
  { value: 'America/Grenada', label: 'America/Grenada' },
  { value: 'America/Guadeloupe', label: 'America/Guadeloupe' },
  { value: 'America/Guatemala', label: 'America/Guatemala' },
  { value: 'America/Guayaquil', label: 'America/Guayaquil' },
  { value: 'America/Guyana', label: 'America/Guyana' },
  { value: 'America/Halifax', label: 'America/Halifax' },
  { value: 'America/Havana', label: 'America/Havana' },
  { value: 'America/Hermosillo', label: 'America/Hermosillo' },
  {
    value: 'America/Indiana/Indianapolis',
    label: 'America/Indiana/Indianapolis',
  },
  { value: 'America/Indiana/Knox', label: 'America/Indiana/Knox' },
  { value: 'America/Indiana/Marengo', label: 'America/Indiana/Marengo' },
  {
    value: 'America/Indiana/Petersburg',
    label: 'America/Indiana/Petersburg',
  },
  { value: 'America/Indiana/Tell_City', label: 'America/Indiana/Tell_City' },
  { value: 'America/Indiana/Vevay', label: 'America/Indiana/Vevay' },
  { value: 'America/Indiana/Vincennes', label: 'America/Indiana/Vincennes' },
  { value: 'America/Indiana/Winamac', label: 'America/Indiana/Winamac' },
  { value: 'America/Inuvik', label: 'America/Inuvik' },
  { value: 'America/Iqaluit', label: 'America/Iqaluit' },
  { value: 'America/Jamaica', label: 'America/Jamaica' },
  { value: 'America/Juneau', label: 'America/Juneau' },
  {
    value: 'America/Kentucky/Louisville',
    label: 'America/Kentucky/Louisville',
  },
  {
    value: 'America/Kentucky/Monticello',
    label: 'America/Kentucky/Monticello',
  },
  { value: 'America/Kralendijk', label: 'America/Kralendijk' },
  { value: 'America/La_Paz', label: 'America/La_Paz' },
  { value: 'America/Lima', label: 'America/Lima' },
  { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
  { value: 'America/Lower_Princes', label: 'America/Lower_Princes' },
  { value: 'America/Maceio', label: 'America/Maceio' },
  { value: 'America/Managua', label: 'America/Managua' },
  { value: 'America/Manaus', label: 'America/Manaus' },
  { value: 'America/Marigot', label: 'America/Marigot' },
  { value: 'America/Martinique', label: 'America/Martinique' },
  { value: 'America/Matamoros', label: 'America/Matamoros' },
  { value: 'America/Mazatlan', label: 'America/Mazatlan' },
  { value: 'America/Menominee', label: 'America/Menominee' },
  { value: 'America/Merida', label: 'America/Merida' },
  { value: 'America/Metlakatla', label: 'America/Metlakatla' },
  { value: 'America/Mexico_City', label: 'America/Mexico_City' },
  { value: 'America/Miquelon', label: 'America/Miquelon' },
  { value: 'America/Moncton', label: 'America/Moncton' },
  { value: 'America/Monterrey', label: 'America/Monterrey' },
  { value: 'America/Montevideo', label: 'America/Montevideo' },
  { value: 'America/Montserrat', label: 'America/Montserrat' },
  { value: 'America/Nassau', label: 'America/Nassau' },
  { value: 'America/New_York', label: 'America/New_York' },
  { value: 'America/Nipigon', label: 'America/Nipigon' },
  { value: 'America/Nome', label: 'America/Nome' },
  { value: 'America/Noronha', label: 'America/Noronha' },
  {
    value: 'America/North_Dakota/Beulah',
    label: 'America/North_Dakota/Beulah',
  },
  {
    value: 'America/North_Dakota/Center',
    label: 'America/North_Dakota/Center',
  },
  {
    value: 'America/North_Dakota/New_Salem',
    label: 'America/North_Dakota/New_Salem',
  },
  { value: 'America/Ojinaga', label: 'America/Ojinaga' },
  { value: 'America/Panama', label: 'America/Panama' },
  { value: 'America/Pangnirtung', label: 'America/Pangnirtung' },
  { value: 'America/Paramaribo', label: 'America/Paramaribo' },
  { value: 'America/Phoenix', label: 'America/Phoenix' },
  { value: 'America/Port-au-Prince', label: 'America/Port-au-Prince' },
  { value: 'America/Port_of_Spain', label: 'America/Port_of_Spain' },
  { value: 'America/Porto_Velho', label: 'America/Porto_Velho' },
  { value: 'America/Puerto_Rico', label: 'America/Puerto_Rico' },
  { value: 'America/Punta_Arenas', label: 'America/Punta_Arenas' },
  { value: 'America/Rainy_River', label: 'America/Rainy_River' },
  { value: 'America/Rankin_Inlet', label: 'America/Rankin_Inlet' },
  { value: 'America/Recife', label: 'America/Recife' },
  { value: 'America/Regina', label: 'America/Regina' },
  { value: 'America/Resolute', label: 'America/Resolute' },
  { value: 'America/Rio_Branco', label: 'America/Rio_Branco' },
  { value: 'America/Santarem', label: 'America/Santarem' },
  { value: 'America/Santiago', label: 'America/Santiago' },
  { value: 'America/Santo_Domingo', label: 'America/Santo_Domingo' },
  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo' },
  { value: 'America/Scoresbysund', label: 'America/Scoresbysund' },
  { value: 'America/Sitka', label: 'America/Sitka' },
  { value: 'America/St_Barthelemy', label: 'America/St_Barthelemy' },
  { value: 'America/St_Johns', label: 'America/St_Johns' },
  { value: 'America/St_Kitts', label: 'America/St_Kitts' },
  { value: 'America/St_Lucia', label: 'America/St_Lucia' },
  { value: 'America/St_Thomas', label: 'America/St_Thomas' },
  { value: 'America/St_Vincent', label: 'America/St_Vincent' },
  { value: 'America/Swift_Current', label: 'America/Swift_Current' },
  { value: 'America/Tegucigalpa', label: 'America/Tegucigalpa' },
  { value: 'America/Thule', label: 'America/Thule' },
  { value: 'America/Thunder_Bay', label: 'America/Thunder_Bay' },
  { value: 'America/Tijuana', label: 'America/Tijuana' },
  { value: 'America/Toronto', label: 'America/Toronto' },
  { value: 'America/Tortola', label: 'America/Tortola' },
  { value: 'America/Vancouver', label: 'America/Vancouver' },
  { value: 'America/Whitehorse', label: 'America/Whitehorse' },
  { value: 'America/Winnipeg', label: 'America/Winnipeg' },
  { value: 'America/Yakutat', label: 'America/Yakutat' },
  { value: 'America/Yellowknife', label: 'America/Yellowknife' },
  { value: 'Antarctica/Casey', label: 'Antarctica/Casey' },
  { value: 'Antarctica/Davis', label: 'Antarctica/Davis' },
  { value: 'Antarctica/DumontDUrville', label: 'Antarctica/DumontDUrville' },
  { value: 'Antarctica/Macquarie', label: 'Antarctica/Macquarie' },
  { value: 'Antarctica/Mawson', label: 'Antarctica/Mawson' },
  { value: 'Antarctica/McMurdo', label: 'Antarctica/McMurdo' },
  { value: 'Antarctica/Palmer', label: 'Antarctica/Palmer' },
  { value: 'Antarctica/Rothera', label: 'Antarctica/Rothera' },
  { value: 'Antarctica/Syowa', label: 'Antarctica/Syowa' },
  { value: 'Antarctica/Troll', label: 'Antarctica/Troll' },
  { value: 'Antarctica/Vostok', label: 'Antarctica/Vostok' },
  { value: 'Arctic/Longyearbyen', label: 'Arctic/Longyearbyen' },
  { value: 'Asia/Aden', label: 'Asia/Aden' },
  { value: 'Asia/Almaty', label: 'Asia/Almaty' },
  { value: 'Asia/Amman', label: 'Asia/Amman' },
  { value: 'Asia/Anadyr', label: 'Asia/Anadyr' },
  { value: 'Asia/Aqtau', label: 'Asia/Aqtau' },
  { value: 'Asia/Aqtobe', label: 'Asia/Aqtobe' },
  { value: 'Asia/Ashgabat', label: 'Asia/Ashgabat' },
  { value: 'Asia/Atyrau', label: 'Asia/Atyrau' },
  { value: 'Asia/Baghdad', label: 'Asia/Baghdad' },
  { value: 'Asia/Bahrain', label: 'Asia/Bahrain' },
  { value: 'Asia/Baku', label: 'Asia/Baku' },
  { value: 'Asia/Bangkok', label: 'Asia/Bangkok' },
  { value: 'Asia/Barnaul', label: 'Asia/Barnaul' },
  { value: 'Asia/Beirut', label: 'Asia/Beirut' },
  { value: 'Asia/Bishkek', label: 'Asia/Bishkek' },
  { value: 'Asia/Brunei', label: 'Asia/Brunei' },
  { value: 'Asia/Chita', label: 'Asia/Chita' },
  { value: 'Asia/Choibalsan', label: 'Asia/Choibalsan' },
  { value: 'Asia/Colombo', label: 'Asia/Colombo' },
  { value: 'Asia/Damascus', label: 'Asia/Damascus' },
  { value: 'Asia/Dhaka', label: 'Asia/Dhaka' },
  { value: 'Asia/Dili', label: 'Asia/Dili' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai' },
  { value: 'Asia/Dushanbe', label: 'Asia/Dushanbe' },
  { value: 'Asia/Famagusta', label: 'Asia/Famagusta' },
  { value: 'Asia/Gaza', label: 'Asia/Gaza' },
  { value: 'Asia/Hebron', label: 'Asia/Hebron' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Asia/Ho_Chi_Minh' },
  { value: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong' },
  { value: 'Asia/Hovd', label: 'Asia/Hovd' },
  { value: 'Asia/Irkutsk', label: 'Asia/Irkutsk' },
  { value: 'Asia/Jakarta', label: 'Asia/Jakarta' },
  { value: 'Asia/Jayapura', label: 'Asia/Jayapura' },
  { value: 'Asia/Jerusalem', label: 'Asia/Jerusalem' },
  { value: 'Asia/Kabul', label: 'Asia/Kabul' },
  { value: 'Asia/Kamchatka', label: 'Asia/Kamchatka' },
  { value: 'Asia/Karachi', label: 'Asia/Karachi' },
  { value: 'Asia/Kathmandu', label: 'Asia/Kathmandu' },
  { value: 'Asia/Khandyga', label: 'Asia/Khandyga' },
  { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
  { value: 'Asia/Krasnoyarsk', label: 'Asia/Krasnoyarsk' },
  { value: 'Asia/Kuala_Lumpur', label: 'Asia/Kuala_Lumpur' },
  { value: 'Asia/Kuching', label: 'Asia/Kuching' },
  { value: 'Asia/Kuwait', label: 'Asia/Kuwait' },
  { value: 'Asia/Macau', label: 'Asia/Macau' },
  { value: 'Asia/Magadan', label: 'Asia/Magadan' },
  { value: 'Asia/Makassar', label: 'Asia/Makassar' },
  { value: 'Asia/Manila', label: 'Asia/Manila' },
  { value: 'Asia/Muscat', label: 'Asia/Muscat' },
  { value: 'Asia/Nicosia', label: 'Asia/Nicosia' },
  { value: 'Asia/Novokuznetsk', label: 'Asia/Novokuznetsk' },
  { value: 'Asia/Novosibirsk', label: 'Asia/Novosibirsk' },
  { value: 'Asia/Omsk', label: 'Asia/Omsk' },
  { value: 'Asia/Oral', label: 'Asia/Oral' },
  { value: 'Asia/Phnom_Penh', label: 'Asia/Phnom_Penh' },
  { value: 'Asia/Pontianak', label: 'Asia/Pontianak' },
  { value: 'Asia/Pyongyang', label: 'Asia/Pyongyang' },
  { value: 'Asia/Qatar', label: 'Asia/Qatar' },
  { value: 'Asia/Qyzylorda', label: 'Asia/Qyzylorda' },
  { value: 'Asia/Riyadh', label: 'Asia/Riyadh' },
  { value: 'Asia/Sakhalin', label: 'Asia/Sakhalin' },
  { value: 'Asia/Samarkand', label: 'Asia/Samarkand' },
  { value: 'Asia/Seoul', label: 'Asia/Seoul' },
  { value: 'Asia/Shanghai', label: 'Asia/Shanghai' },
  { value: 'Asia/Singapore', label: 'Asia/Singapore' },
  { value: 'Asia/Srednekolymsk', label: 'Asia/Srednekolymsk' },
  { value: 'Asia/Taipei', label: 'Asia/Taipei' },
  { value: 'Asia/Tashkent', label: 'Asia/Tashkent' },
  { value: 'Asia/Tbilisi', label: 'Asia/Tbilisi' },
  { value: 'Asia/Tehran', label: 'Asia/Tehran' },
  { value: 'Asia/Thimphu', label: 'Asia/Thimphu' },
  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
  { value: 'Asia/Tomsk', label: 'Asia/Tomsk' },
  { value: 'Asia/Ulaanbaatar', label: 'Asia/Ulaanbaatar' },
  { value: 'Asia/Urumqi', label: 'Asia/Urumqi' },
  { value: 'Asia/Ust-Nera', label: 'Asia/Ust-Nera' },
  { value: 'Asia/Vientiane', label: 'Asia/Vientiane' },
  { value: 'Asia/Vladivostok', label: 'Asia/Vladivostok' },
  { value: 'Asia/Yakutsk', label: 'Asia/Yakutsk' },
  { value: 'Asia/Yangon', label: 'Asia/Yangon' },
  { value: 'Asia/Yekaterinburg', label: 'Asia/Yekaterinburg' },
  { value: 'Asia/Yerevan', label: 'Asia/Yerevan' },
  { value: 'Atlantic/Azores', label: 'Atlantic/Azores' },
  { value: 'Atlantic/Bermuda', label: 'Atlantic/Bermuda' },
  { value: 'Atlantic/Canary', label: 'Atlantic/Canary' },
  { value: 'Atlantic/Cape_Verde', label: 'Atlantic/Cape_Verde' },
  { value: 'Atlantic/Faroe', label: 'Atlantic/Faroe' },
  { value: 'Atlantic/Madeira', label: 'Atlantic/Madeira' },
  { value: 'Atlantic/Reykjavik', label: 'Atlantic/Reykjavik' },
  { value: 'Atlantic/South_Georgia', label: 'Atlantic/South_Georgia' },
  { value: 'Atlantic/St_Helena', label: 'Atlantic/St_Helena' },
  { value: 'Atlantic/Stanley', label: 'Atlantic/Stanley' },
  { value: 'Australia/Adelaide', label: 'Australia/Adelaide' },
  { value: 'Australia/Brisbane', label: 'Australia/Brisbane' },
  { value: 'Australia/Broken_Hill', label: 'Australia/Broken_Hill' },
  { value: 'Australia/Currie', label: 'Australia/Currie' },
  { value: 'Australia/Darwin', label: 'Australia/Darwin' },
  { value: 'Australia/Eucla', label: 'Australia/Eucla' },
  { value: 'Australia/Hobart', label: 'Australia/Hobart' },
  { value: 'Australia/Lindeman', label: 'Australia/Lindeman' },
  { value: 'Australia/Lord_Howe', label: 'Australia/Lord_Howe' },
  { value: 'Australia/Melbourne', label: 'Australia/Melbourne' },
  { value: 'Australia/Perth', label: 'Australia/Perth' },
  { value: 'Australia/Sydney', label: 'Australia/Sydney' },
  { value: 'Europe/Amsterdam', label: 'Europe/Amsterdam' },
  { value: 'Europe/Andorra', label: 'Europe/Andorra' },
  { value: 'Europe/Astrakhan', label: 'Europe/Astrakhan' },
  { value: 'Europe/Athens', label: 'Europe/Athens' },
  { value: 'Europe/Belgrade', label: 'Europe/Belgrade' },
  { value: 'Europe/Berlin', label: 'Europe/Berlin' },
  { value: 'Europe/Bratislava', label: 'Europe/Bratislava' },
  { value: 'Europe/Brussels', label: 'Europe/Brussels' },
  { value: 'Europe/Bucharest', label: 'Europe/Bucharest' },
  { value: 'Europe/Budapest', label: 'Europe/Budapest' },
  { value: 'Europe/Busingen', label: 'Europe/Busingen' },
  { value: 'Europe/Chisinau', label: 'Europe/Chisinau' },
  { value: 'Europe/Copenhagen', label: 'Europe/Copenhagen' },
  { value: 'Europe/Dublin', label: 'Europe/Dublin' },
  { value: 'Europe/Gibraltar', label: 'Europe/Gibraltar' },
  { value: 'Europe/Guernsey', label: 'Europe/Guernsey' },
  { value: 'Europe/Helsinki', label: 'Europe/Helsinki' },
  { value: 'Europe/Isle_of_Man', label: 'Europe/Isle_of_Man' },
  { value: 'Europe/Istanbul', label: 'Europe/Istanbul' },
  { value: 'Europe/Jersey', label: 'Europe/Jersey' },
  { value: 'Europe/Kaliningrad', label: 'Europe/Kaliningrad' },
  { value: 'Europe/Kiev', label: 'Europe/Kiev' },
  { value: 'Europe/Kirov', label: 'Europe/Kirov' },
  { value: 'Europe/Lisbon', label: 'Europe/Lisbon' },
  { value: 'Europe/Ljubljana', label: 'Europe/Ljubljana' },
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'Europe/Luxembourg', label: 'Europe/Luxembourg' },
  { value: 'Europe/Madrid', label: 'Europe/Madrid' },
  { value: 'Europe/Malta', label: 'Europe/Malta' },
  { value: 'Europe/Mariehamn', label: 'Europe/Mariehamn' },
  { value: 'Europe/Minsk', label: 'Europe/Minsk' },
  { value: 'Europe/Monaco', label: 'Europe/Monaco' },
  { value: 'Europe/Moscow', label: 'Europe/Moscow' },
  { value: 'Europe/Oslo', label: 'Europe/Oslo' },
  { value: 'Europe/Paris', label: 'Europe/Paris' },
  { value: 'Europe/Podgorica', label: 'Europe/Podgorica' },
  { value: 'Europe/Prague', label: 'Europe/Prague' },
  { value: 'Europe/Riga', label: 'Europe/Riga' },
  { value: 'Europe/Rome', label: 'Europe/Rome' },
  { value: 'Europe/Samara', label: 'Europe/Samara' },
  { value: 'Europe/San_Marino', label: 'Europe/San_Marino' },
  { value: 'Europe/Sarajevo', label: 'Europe/Sarajevo' },
  { value: 'Europe/Saratov', label: 'Europe/Saratov' },
  { value: 'Europe/Simferopol', label: 'Europe/Simferopol' },
  { value: 'Europe/Skopje', label: 'Europe/Skopje' },
  { value: 'Europe/Sofia', label: 'Europe/Sofia' },
  { value: 'Europe/Stockholm', label: 'Europe/Stockholm' },
  { value: 'Europe/Tallinn', label: 'Europe/Tallinn' },
  { value: 'Europe/Tirane', label: 'Europe/Tirane' },
  { value: 'Europe/Ulyanovsk', label: 'Europe/Ulyanovsk' },
  { value: 'Europe/Uzhgorod', label: 'Europe/Uzhgorod' },
  { value: 'Europe/Vaduz', label: 'Europe/Vaduz' },
  { value: 'Europe/Vatican', label: 'Europe/Vatican' },
  { value: 'Europe/Vienna', label: 'Europe/Vienna' },
  { value: 'Europe/Vilnius', label: 'Europe/Vilnius' },
  { value: 'Europe/Volgograd', label: 'Europe/Volgograd' },
  { value: 'Europe/Warsaw', label: 'Europe/Warsaw' },
  { value: 'Europe/Zagreb', label: 'Europe/Zagreb' },
  { value: 'Europe/Zaporozhye', label: 'Europe/Zaporozhye' },
  { value: 'Europe/Zurich', label: 'Europe/Zurich' },
  { value: 'Indian/Antananarivo', label: 'Indian/Antananarivo' },
  { value: 'Indian/Chagos', label: 'Indian/Chagos' },
  { value: 'Indian/Christmas', label: 'Indian/Christmas' },
  { value: 'Indian/Cocos', label: 'Indian/Cocos' },
  { value: 'Indian/Comoro', label: 'Indian/Comoro' },
  { value: 'Indian/Kerguelen', label: 'Indian/Kerguelen' },
  { value: 'Indian/Mahe', label: 'Indian/Mahe' },
  { value: 'Indian/Maldives', label: 'Indian/Maldives' },
  { value: 'Indian/Mauritius', label: 'Indian/Mauritius' },
  { value: 'Indian/Mayotte', label: 'Indian/Mayotte' },
  { value: 'Indian/Reunion', label: 'Indian/Reunion' },
  { value: 'Pacific/Apia', label: 'Pacific/Apia' },
  { value: 'Pacific/Auckland', label: 'Pacific/Auckland' },
  { value: 'Pacific/Bougainville', label: 'Pacific/Bougainville' },
  { value: 'Pacific/Chatham', label: 'Pacific/Chatham' },
  { value: 'Pacific/Chuuk', label: 'Pacific/Chuuk' },
  { value: 'Pacific/Easter', label: 'Pacific/Easter' },
  { value: 'Pacific/Efate', label: 'Pacific/Efate' },
  { value: 'Pacific/Enderbury', label: 'Pacific/Enderbury' },
  { value: 'Pacific/Fakaofo', label: 'Pacific/Fakaofo' },
  { value: 'Pacific/Fiji', label: 'Pacific/Fiji' },
  { value: 'Pacific/Funafuti', label: 'Pacific/Funafuti' },
  { value: 'Pacific/Galapagos', label: 'Pacific/Galapagos' },
  { value: 'Pacific/Gambier', label: 'Pacific/Gambier' },
  { value: 'Pacific/Guadalcanal', label: 'Pacific/Guadalcanal' },
  { value: 'Pacific/Guam', label: 'Pacific/Guam' },
  { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu' },
  { value: 'Pacific/Kiritimati', label: 'Pacific/Kiritimati' },
  { value: 'Pacific/Kosrae', label: 'Pacific/Kosrae' },
  { value: 'Pacific/Kwajalein', label: 'Pacific/Kwajalein' },
  { value: 'Pacific/Majuro', label: 'Pacific/Majuro' },
  { value: 'Pacific/Marquesas', label: 'Pacific/Marquesas' },
  { value: 'Pacific/Midway', label: 'Pacific/Midway' },
  { value: 'Pacific/Nauru', label: 'Pacific/Nauru' },
  { value: 'Pacific/Niue', label: 'Pacific/Niue' },
  { value: 'Pacific/Norfolk', label: 'Pacific/Norfolk' },
  { value: 'Pacific/Noumea', label: 'Pacific/Noumea' },
  { value: 'Pacific/Pago_Pago', label: 'Pacific/Pago_Pago' },
  { value: 'Pacific/Palau', label: 'Pacific/Palau' },
  { value: 'Pacific/Pitcairn', label: 'Pacific/Pitcairn' },
  { value: 'Pacific/Pohnpei', label: 'Pacific/Pohnpei' },
  { value: 'Pacific/Port_Moresby', label: 'Pacific/Port_Moresby' },
  { value: 'Pacific/Rarotonga', label: 'Pacific/Rarotonga' },
  { value: 'Pacific/Saipan', label: 'Pacific/Saipan' },
  { value: 'Pacific/Tahiti', label: 'Pacific/Tahiti' },
  { value: 'Pacific/Tarawa', label: 'Pacific/Tarawa' },
  { value: 'Pacific/Tongatapu', label: 'Pacific/Tongatapu' },
  { value: 'Pacific/Wake', label: 'Pacific/Wake' },
  { value: 'Pacific/Wallis', label: 'Pacific/Wallis' },
  { value: 'UTC', label: 'UTC' },
];
export {
  getMicTypes,
  titleToSlug,
  generateUserID,
  print_r,
  strlpad,
  current_time_milliseconds,
  currentMilliseconds,
  removeStrAtIndex,
  isWorkingDay,
  daysInMonth,
  arrayIdValues,
  arrayValues,
  arrayToCommaSeparated,
  arrayToCommaString,
  groupBy,
  ucfirst,
  ucwords,
  isset,
  empty,
  isArray,
  isANumber,
  today,
  getType,
  isObject,
  isValidEmail,
  isValidPhone,
  isString,
  equalsIgnoreCase,
  isValidPassword,
  strongPasswordRegEx,
  mediumPasswordRegEx,
  getUserAuthState,
  updateUserAuthState,
  updatePublishedAt,
  getGenders,
  getTimeZonesOnly,
  getTimeZones,
  add_ordinals,
  MONTH_NAMES,
  getFormattedDate,
  timeAgo,
};

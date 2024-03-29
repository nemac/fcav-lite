import { isLeapYear } from './utils'

const wmsBaseUrl = 'https://fswms.nemac.org/'
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
const day = String(date.getDate()).padStart(2, '0');

export const config = {
  agolApiKey: 'AAPK961d021a9f344f7c95eaadbeb6c6f39ajXC7QTZMufrPPCzqo0NN_ta6FKKzOb8GDutDr1ipDWZMVMPT-Mgy4CNcnKIXJTdu',
  mapCenter: [37.0902, -95.7129],
  mapZoom: 6,
  projectName: 'New FCAV',
  monthDay: `${month}${day}`, // current month and day
  yearMonthDay: `${year}${month}${day}`, // current year, month, and day
  leapYear: isLeapYear(year), // checks if leap year
  dateStart: '0103',
  nonLeapYearDays: [
    '0108',
    '0116',
    '0124',
    '0201',
    '0209',
    '0217',
    '0225',
    '0305',
    '0313',
    '0321',
    '0329',
    '0406',
    '0414',
    '0422',
    '0430',
    '0508',
    '0516',
    '0524',
    '0601',
    '0609',
    '0617',
    '0625',
    '0703',
    '0711',
    '0719',
    '0727',
    '0804',
    '0812',
    '0820',
    '0828',
    '0905',
    '0913',
    '0921',
    '0929',
    '1007',
    '1015',
    '1023',
    '1031',
    '1108',
    '1116',
    '1124',
    '1202',
    '1210',
    '1218',
    '1226',
  ],
  leapYearDays: [
    '0108',
    '0116',
    '0124',
    '0201',
    '0209',
    '0217',
    '0225',
    '0304',
    '0312',
    '0320',
    '0328',
    '0405',
    '0413',
    '0421',
    '0429',
    '0507',
    '0515',
    '0523',
    '0531',
    '0608',
    '0616',
    '0624',
    '0702',
    '0710',
    '0718',
    '0726',
    '0803',
    '0811',
    '0819',
    '0827',
    '0904',
    '0912',
    '0920',
    '0928',
    '1006',
    '1014',
    '1022',
    '1030',
    '1107',
    '1115',
    '1123',
    '1201',
    '1209',
    '1217',
    '1225',
  ],
  wmsLayers: [
    {
      name: 'From Seasonal Progress Adaptive Baseline "Normal',
      url: wmsBaseUrl.concat('forwarn3'),
      layer: `FW3_adaptivebaseline_allyr_`,
      dayStart:'0108',
      yearStart: '2021'
    },
    {
      name: 'Early Detect From 8-day Two-Year Maximum Baseline "Normal',
      url: wmsBaseUrl.concat('forwarn3'),
      layer: 'FW3_ED_',
      dayStart:'0108',
      yearStart: '2021'
    }

  ]
}

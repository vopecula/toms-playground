export const PLANET = {
  Mercury: 'Mercury',
  Venus: 'Venus',
  Earth: 'Earth',
  Mars: 'Mars',
  Jupiter: 'Jupiter',
  Saturn: 'Saturn',
  Uranus: 'Uranus',
  Neptune: 'Neptune',
  Pluto: 'Pluto',
  Sun: 'Sun'
}

const secsPerDay = 24 * 60 * 60

export default {
  [PLANET.Mercury]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (88 * secsPerDay),
    radius: 2440,
    distanceFromSun: 3.5,
    texture: '2k_mercury.jpeg'
  } ,
  [PLANET.Venus]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (225 * secsPerDay),
    radius: 6052,
    distanceFromSun: 6.7,
    texture: '2k_venus_atmosphere.jpeg'
  },
  [PLANET.Earth]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (365 * secsPerDay),
    radius: 6371,
    distanceFromSun: 9.3,
    texture: '2k_earth_daymap.jpeg'
  },
  [PLANET.Mars]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (687 * secsPerDay),
    radius: 3390,
    distanceFromSun: 14.2,
    texture: '2k_mars.jpeg'
  },
  [PLANET.Jupiter]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (4346 * secsPerDay),
    radius: 69911,
    distanceFromSun: 48.4,
    texture: '2k_jupiter.jpeg'
  },
  [PLANET.Saturn]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (7825 * secsPerDay),
    radius: 58232,
    distanceFromSun: 88.9,
    texture: '2k_saturn.jpeg'
  },
  [PLANET.Uranus]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (30681 * secsPerDay),
    radius: 25362,
    distanceFromSun: 179,
    texture: '2k_uranus.jpeg'
  },
  [PLANET.Neptune]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (60193 * secsPerDay),
    radius: 24622,
    distanceFromSun: 288,
    texture: '2k_neptune.jpeg'
  },
  [PLANET.Pluto]: {
    angularVelocityAroundSunInSec: (Math.PI * 2) / (120000 * secsPerDay),
    radius: 1188.3,
    distanceFromSun: 367,
    texture: '2k_pluto.jpeg'
  },
}
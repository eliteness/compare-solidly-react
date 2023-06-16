import {
  totallerAllTime,
  totallerOng,
  totallerPrev,
  totallerYearAdj
} from '../utils/helper';

export const socials = [
  {
    name: 'twitter',
    icon: 'https://ftm.guru/icons/twitter.svg',
    url: 'https://twitter.com/ftm1337'
  },
  {
    name: 'discord',
    icon: 'https://ftm.guru/icons/discord.svg',
    url: 'https://discord.gg/QpyfMarNrV'
  },
  {
    name: 'defillma',
    icon: 'https://ftm.guru/icons/defillama.svg',
    url: 'https://defillama.com/protocol/guru-network-dao'
  },
  {
    name: 'defiwars',
    icon: 'https://ftm.guru/icons/defiwars.svg',
    url: 'https://defiwars.xyz/projects/gurunetwork'
  },
  {
    name: 'cmc',
    icon: 'https://ftm.guru/icons/cmc.svg',
    url: 'https://coinmarketcap.com/currencies/elite-1337'
  }
];

const decayFactors = {
  0: { value: '0.00%' },
  1: { value: '-1.00%' },
  2: { value: '-0.50%' },
  3: { value: '-1.00%' },
  4: { value: '-1.00%' },
  5: { value: '-1.00%' },
  6: { value: '-1.00%' }
};

export const metrics = [
  {
    metricName: { title: 'Start of Epoch 1' },
    value: (dataSet) =>
      new Date(dataSet['startDate'])?.toDateString().substring(4)
  },
  {
    metricName: { title: 'Age' },
    value: (dataSet) => `${dataSet?.currentEpoch} Epochs`
  },
  {
    metricName: { title: 'Blockchain Network' },
    value: (dataSet) => dataSet.volumes.chains[0] ?? 'BS. Chain'
  },
  {
    metricName: { title: 'Ticker (Symbol)' },
    value: (dataSet) => `$${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: { title: 'Spot Trading Price' },
    value: (dataSet) => `$${dataSet.current_price.toFixed(4)}`
  },
  {
    metricName: { title: 'Circulating Supply' },
    value: (dataSet) =>
      `${dataSet.circulating_supply.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} ${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: { title: 'Circulating Market Cap' },
    value: (dataSet) =>
      `$${(dataSet.circulating_supply * dataSet.current_price).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      )}`
  },
  {
    metricName: { title: 'veToken Total Supply' },
    keyName: 'veTotal',
    value: (dataSet) =>
      `${dataSet.veTotal.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} ve${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: { title: 'veToken Market Cap' },
    value: (dataSet) =>
      `$${(dataSet.veTotal * dataSet.current_price).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: { title: 'Fully Diluted Supply' },
    value: (dataSet) =>
      `${dataSet.total_supply.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} ${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: { title: 'Fully Diluted Valuation' },
    value: (dataSet) =>
      `$${(dataSet.total_supply * dataSet.current_price).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      )}`
  },
  {
    metricName: { title: 'Supply Locked in ve' },
    value: (dataSet) =>
      `${dataSet.veLocked.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} ${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: {
      title: 've: Apparent Locking Rate',
      subText: ['veLocked / (CircSupply + veLocked)']
    },
    value: (dataSet) =>
      `${(
        (dataSet.veLocked / (dataSet.circulating_supply + dataSet.veLocked)) *
        100
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}%`
  },
  {
    metricName: {
      title: 've: Absolute Locking Rate',
      subText: ['Total Supply of ve / Fully Diluted Supply']
    },
    value: (dataSet) =>
      `${((dataSet.veTotal / dataSet.total_supply) * 100).toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}%`
  },
  {
    metricName: {
      title: 've: Effective Locking Rate',
      subText: ['veTotalSupply / (CircSupply + veLocked)']
    },
    value: (dataSet) =>
      `${(
        (dataSet.veTotal / (dataSet.circulating_supply + dataSet.veLocked)) *
        100
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}%`
  },
  {
    metricName: {
      title: 've: Max Locked ve',
      subText: ['% of locks at full ve-power']
    },
    value: (dataSet) =>
      `${((dataSet.veTotal / dataSet.veLocked) * 100).toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}%`
  },
  {
    metricName: {
      title: 'Minted Supply: Current Week',
      subText: [
        'To be minted this Thursday.',
        'Includes inflation from Rebases.'
      ]
    },
    value: (dataSet) =>
      `${dataSet.mintThisWeek.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} ${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: {
      title: 'Minted Supply: This Year',
      subText: [
        'Newly minted in next 52 Weeks.',
        'Includes inflation from Rebases.'
      ]
    },
    value: (dataSet) =>
      `${dataSet.mintThisYear.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })} ${dataSet.symbol.toUpperCase()}`
  },
  {
    metricName: {
      title: 'Minted Supply: Decay Factor',
      subText: ['Decrease between consecutive mints.']
    },
    value: (dataSet) => decayFactors[dataSet.CSN].value
  },
  {
    metricName: {
      title: 'Absolute Inflation',
      subText: [
        'Total Supply increase in next 52 Weeks.',
        'Includes inflation from Rebases.'
      ]
    },
    value: (dataSet) =>
      `${(dataSet.mintInflationAbsolute * 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}%`
  },
  {
    metricName: {
      title: 'Effective Inflation',
      subText: [
        'Annual increase in veToken Supply (Locked) & Circulating supply from minting.'
      ]
    },
    value: (dataSet) =>
      `${(dataSet.mintInflationEffective * 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}%`
  },
  {
    metricName: {
      title: 'Minted Supply: This Week',
      subText: [
        'To be minted this Thursday.',
        'Includes inflation from Rebases.'
      ]
    },
    value: (dataSet) =>
      `$${dataSet.mintThisWeekUSD.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: {
      title: 'Minted Supply: This Year',
      subText: [
        'Newly minted in next 52 Weeks.',
        'Includes inflation from Rebases.'
      ]
    },
    value: (dataSet) =>
      `$${dataSet.mintThisYearUSD.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: { title: 'Volumes: All Time Total' },
    value: (dataSet) =>
      `$${totallerAllTime(dataSet.volumes.totalDataChart).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      )}`
  },
  {
    metricName: {
      title: 'Volumes: Daily Average',
      subText: ['Most recent 365-day average']
    },
    value: (dataSet) =>
      `$${(
        dataSet.volumeAllTime / dataSet.volumes.totalDataChart.length
      ).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: { title: 'Volumes: Registered Yesterday' },
    value: (dataSet) =>
      `$${dataSet.volumes.total24h.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: {
      title: 'Volumes: Curr. Epoch',
      subText: ['This Thursday till Yesterday']
    },
    value: (dataSet) =>
      `$${totallerOng(dataSet.volumes.totalDataChart).toLocaleString(
        undefined,
        { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      )}`
  },
  {
    metricName: {
      title: 'Volumes: Prev. Epoch',
      subText: ['This Thursday till Yesterday']
    },
    value: (dataSet) =>
      `$${totallerPrev(dataSet.volumes.totalDataChart).toLocaleString(
        undefined,
        { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      )}`
  },
  {
    metricName: {
      title: 'Fees: All Time Total',
      subText: ['Cummulative Total since launch']
    },
    value: (dataSet) =>
      `$${totallerAllTime(dataSet.fees.totalDataChart).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      )}`
  },
  {
    metricName: {
      title: 'Fees: Daily Average',
      subText: ['Most recent 365-day average']
    },
    value: (dataSet) =>
      `$${(dataSet.feesYearAdj / 365).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
  },
  {
    metricName: { title: 'Fees: Registered Yesterday' },
    value: (dataSet) =>
      `$${dataSet.fees.total24h.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: {
      title: 'Fees: Curr. Epoch',
      subText: ['This Thursday till Yesterday']
    },
    value: (dataSet) =>
      `$${totallerOng(dataSet.fees.totalDataChart).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: {
      title: 'Fees: Prev. Epoch',
      subText: ['Prev. Thursday till Prev. Wednesday']
    },
    value: (dataSet) =>
      `$${totallerPrev(dataSet.fees.totalDataChart).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`
  },
  {
    metricName: {
      title: 'Fees: Past 1 Year',
      subText: ['Cummulative Total, extrapolated if <1yr.']
    },
    value: (dataSet) =>
      `$${totallerYearAdj(dataSet.fees.totalDataChart).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      )}`
  },
  {
    metricName: {
      title: 'Fees to FDV Ratio',
      subText: ['Previous Epoch, Annualized']
    },
    value: (dataSet) =>
      `$${(
        dataSet.feesYearAdj /
        (dataSet.total_supply * dataSet.current_price)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })}`
  },
  {
    metricName: {
      title: 'Fees per $1 of veToken',
      subText: ['Previous Epoch, Annualized']
    },
    value: (dataSet) =>
      `$${(
        ((dataSet.feesEpochPrevious / 7) * 365) /
        (dataSet.veTotal * dataSet.current_price)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })}`
  },
  {
    metricName: {
      title: 'Voting APR: Fees Component',
      subText: ['Previous Epoch']
    },
    value: (dataSet) =>
      `${(
        (((dataSet.feesEpochPrevious / 7) * 365) /
          (dataSet.veTotal * dataSet.current_price)) *
        100
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}%`
  },
  {
    metricName: {
      title: 'Fees per $1 of veToken',
      subText: ['Past 1 Year, extrapolated if <1yr.']
    },
    value: (dataSet) =>
      `$${(
        dataSet.feesYearAdj /
        (dataSet.veTotal * dataSet.current_price)
      ).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })}`
  },
  {
    metricName: {
      title: 'Voting APR: Fees Component',
      subText: ['Past 1 Year, extrapolated if <1yr.']
    },
    value: (dataSet) =>
      `$${(
        (dataSet.feesYearAdj / (dataSet.veTotal * dataSet.current_price)) *
        100
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
  }
];

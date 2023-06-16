// import styles from './app.module.css';
import { Fragment, useMemo, useState } from 'react';
import './app.css';
import data from '/public/newData.json';
import Table from './components/Table/Table';
import {
  SortableColumnCell,
  TableHeaderCell,
  TableRowCell
} from './components/Table/TableComponents';
import { metrics, socials } from './constants/global';

function App() {
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  let [active, setActive] = useState(null);

  const tableData = useMemo(
    () =>
      metrics.map(({ metricName, value }, i) => ({
        metricsDex: metricName,
        curve: value(data[0], i) ?? '-',
        velodrome: value(data[1], i) ?? '-',
        equalizer: value(data[2], i) ?? '-',
        thena: value(data[3], i) ?? '-',
        ramses: value(data[4], i) ?? '-',
        equilibre: value(data[5], i) ?? '-',
        chronos: value(data[6], i) ?? '-'
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        id: 'metricsDex',
        header: TableHeaderCell('Metrics Dex'),
        accessorKey: 'metricsDex',
        cell: (value) => (
          <SortableColumnCell
            value={value}
            active={active}
            setActive={setActive}
          />
        )
      },
      {
        id: 'curve',
        header: TableHeaderCell('Curve', data[0].image),
        accessorKey: 'curve',
        cell: TableRowCell
      },
      {
        id: 'velodrome',
        header: TableHeaderCell('Velodrome', data[1].image),
        accessorKey: 'velodrome',
        cell: TableRowCell
      },
      {
        id: 'equalizer',
        header: TableHeaderCell('Equalizer', data[2].image),
        accessorKey: 'equalizer',
        cell: TableRowCell
      },
      {
        id: 'thena',
        header: TableHeaderCell('Thena', data[3].image),
        accessorKey: 'thena',
        cell: TableRowCell
      },
      {
        id: 'ramses',
        header: TableHeaderCell('Ramses', data[4].image),
        accessorKey: 'ramses',
        cell: TableRowCell
      },
      {
        id: 'equilibre',
        header: TableHeaderCell('Équilibre', data[5].image),
        accessorKey: 'equilibre',
        cell: TableRowCell
      },
      {
        id: 'chronos',
        header: TableHeaderCell('Chronos', data[6].image),
        accessorKey: 'chronos',
        cell: TableRowCell
      }
    ],
    [active]
  );

  // useEffect(() => {
  //   const table = document.querySelector(".table-wrapper");
  //   const tableFauxHead = document.querySelector(".faux-head");
  //   const tableHead = document.querySelector(".table-head");

  //   const stickyHeader = () => {
  //     const currStickyPos = table.getBoundingClientRect().top;

  //     const headerCells = tableHead.children[0].children;
  //     const fauxHeaderCells = tableFauxHead.children[0].children;

  //     const fauxHeaderCellWidths = Array.from(fauxHeaderCells).map(
  //       (cell) => cell.clientWidth
  //     );

  //     if (currStickyPos <= 0) {
  //       tableHead.classList.add("sticky");
  //       tableHead.style.width = `${table.scrollWidth}px`;
  //       tableFauxHead.style.display = `table-header-group`;

  //       Array.from(headerCells).forEach(
  //         (cell, index) =>
  //           (cell.style.flex = `1 0 ${fauxHeaderCellWidths[index]}px`)
  //       );
  //     } else {
  //       tableHead.classList.remove("sticky");
  //       tableFauxHead.style.height = `0px`;
  //       tableFauxHead.style.display = `none`;
  //       tableHead.style.transform = "unset";
  //     }
  //   };

  //   const syncScroll = (e) => {
  //     const currStickyPos = table.getBoundingClientRect().top;

  //     if (currStickyPos <= 0) {
  //       tableHead.style.transform = `translate3D(-${e.currentTarget.scrollLeft}px, 0, 0)`;
  //     } else {
  //       tableHead.style.transform = "unset";
  //     }
  //   };

  //   window.addEventListener("scroll", stickyHeader, { passive: true });
  //   window.addEventListener("resize", stickyHeader, { passive: true });
  //   document
  //     .querySelector(".overflow-container")
  //     .addEventListener("scroll", syncScroll, {
  //       passive: true,
  //     });

  //   return () => {
  //     window.removeEventListener("scroll", stickyHeader);
  //     window.removeEventListener("resize", stickyHeader);
  //   };
  // }, []);

  return (
    <Fragment>
      <div className='container text-center my-5'>
        <div className='mb-4 flex gap-3 justify-center items-center'>
          <div className='icon' />
          <h1 className='text-4xl font-bold'>Solidly Forks</h1>
        </div>

        <div>
          <h2 className='text-2xl font-bold'>
            Comparision of the Best Solidly Visions!
          </h2>

          <p className='text-zinc-700 text-xl mt-2'>
            eliteness.network/compare-solidly
          </p>
        </div>
      </div>

      <div className='container mt-6 mb-12'>
        <Table
          columns={columns}
          data={tableData}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
        />
      </div>

      <div className='container my-10 mt-auto'>
        <div className='text-center mb-10'>
          <p className='text-lg'>
            Share this page for greater visibility and help us make the Data
            presented richer with your precious feedback! <br /> Are we missing
            something interesting? Jump into our{' '}
            <a
              href='https://discord.gg/QpyfMarNrV'
              target='_blank'
              rel='noreferrer'
              className='underline text-blue-600'
            >
              Discord
            </a>{' '}
            to help us with your suggestions.
          </p>
        </div>

        <div className='flex items-end lg:justify-between justify-center gap-6 flex-wrap text-center lg:text-left'>
          <div>
            <a
              href='https://eliteness.network'
              target='_blank'
              rel='noreferrer'
              className='text-2xl mb-1 block'
            >
              eliteness.network
            </a>

            <p>An Explorer for Guru Network products & services.</p>
            <div className='flex items-center justify-center lg:justify-start gap-3 mt-4'>
              {socials.map(({ name, url, icon }) => (
                <a
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  key={name}
                  className='block'
                >
                  <img
                    src={icon}
                    className={`${name === 'cmc' ? 'cmc' : ''} social-icon`}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className='max-w-none lg:max-w-[40%]'>
            <a
              href='https://ftm.guru'
              target='_blank'
              rel='noreferrer'
              className='font-bold'
            >
              Powered by Guru Network, CoinGecko, DefiLlama & various public
              blockchains & their valuable node service providers. 🦾
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

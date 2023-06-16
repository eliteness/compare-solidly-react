/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';

export const TableHeaderCell = (value, image) => (
  <h3 className='text-xl flex justify-start items-center min-w-max'>
    {image && (
      <img src={image} alt='logo' className='w-6 h-6 mr-2 ml-2 inline-block' />
    )}
    <span>{value}</span>
  </h3>
);

export const TableRowCell = (value) => (
  <p
    className={
      value.row.id === '38' || value.row.id === '20' ? 'font-bold text-lg' : ''
    }
  >
    {value.getValue()}
  </p>
);

let months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
];

export const SortableColumnCell = ({ value, active, setActive }) => {
  let [sort, setSort] = useState({
    sortBy: active !== value.cell.id ? 'default' : 'ASC'
  });

  useEffect(() => {
    if (active !== value.cell.id) {
      setSort({ sortBy: 'default' });
    }
  }, [active, value.cell.id]);

  const clickHandler = useCallback(() => {
    const row = { ...value.row.original };
    delete row.metricsDex;

    const reA = /[^a-zA-Z]/g;
    const reN = /[^0-9]/g;

    function sortAlphaNum(a, b) {
      const aA = row[a].replace(reA, '');
      const bA = row[b].replace(reA, '');

      if (sort.sortBy === 'default') {
        //Date check
        if (months.includes(row[a].toLowerCase().substring(0, 3))) {
          return Date.parse(row[a]) - Date.parse(row[b]);
        }

        if (aA === bA) {
          const aN = parseInt(row[a].replace(reN, ''), 10);
          const bN = parseInt(row[b].replace(reN, ''), 10);

          return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
          return aA > bA ? 1 : -1;
        }
      } else if (sort.sortBy === 'ASC') {
        //Date check
        if (months.includes(row[a].toLowerCase().substring(0, 3))) {
          return Date.parse(row[b]) - Date.parse(row[a]);
        }

        if (aA === bA) {
          const aN = parseInt(row[a].replace(reN, ''), 10);
          const bN = parseInt(row[b].replace(reN, ''), 10);
          return aN === bN ? 0 : aN < bN ? 1 : -1;
        } else {
          return aA < bA ? 1 : -1;
        }
      }
    }

    setActive(value.cell.id);

    setSort(({ sortBy }) => ({
      sortBy:
        sortBy === 'default' ? 'ASC' : sortBy === 'ASC' ? 'DSC' : 'default'
    }));

    const sortedRow = Object.keys(row).sort(sortAlphaNum);
    value.table.setColumnOrder(['metricsDex', ...sortedRow]);
  }, [setActive, sort.sortBy, value.cell.id, value.row.original, value.table]);

  return (
    <div
      onClick={clickHandler}
      className='cursor-pointer select-none flex items-start gap-2'
    >
      <div>
        <p
          className={
            value.row.id === '38' || value.row.id === '20'
              ? 'font-bold text-lg'
              : ''
          }
        >
          {value.getValue()?.title}
        </p>

        {/* subText */}
        {value?.getValue()?.subText?.map((subText) => (
          <p key={subText} className='text-xs font-medium text-gray-700 italic'>
            {subText}
          </p>
        ))}
      </div>

      {/* sort icon */}
      {active === value.cell.id && (
        <span className='text-neutral-600'>
          {sort.sortBy === 'ASC' ? '▲' : sort.sortBy === 'DSC' ? '▼' : ''}
        </span>
      )}
    </div>
  );
};

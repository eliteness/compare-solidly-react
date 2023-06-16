/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import './table.css';
import { Fragment, useEffect, useState } from 'react';

const Table = ({
  data,
  columns,
  columnOrder,
  setColumnOrder,
  columnVisibility,
  setColumnVisibility
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      columnVisibility
    },
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
  });

  useEffect(() => {
    const dropDownHandler = (e) => {
      setShowDropDown(false);
      e.stopPropagation();
    };

    window.addEventListener('click', dropDownHandler);

    return () => window.removeEventListener('click', dropDownHandler);
  }, []);

  return (
    <Fragment>
      <div className='mb-3 flex justify-between items-center gap-x-4 gap-y-3'>
        <p className='font-bold'>Note: Click on the metric to sort</p>

        <div className='relative'>
          <button
            id='dropdownDefaultButton'
            data-dropdown-toggle='dropdown'
            className='text-black bg-white hover:bg-teal-50 focus:ring-2 focus:outline-none focus:ring-teal-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center whitespace-nowrap'
            type='button'
            onClick={(e) => {
              setShowDropDown((prev) => !prev);
              e.stopPropagation();
            }}
          >
            Select DEXs{' '}
            <svg
              className='w-4 h-4 ml-2'
              aria-hidden='true'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              ></path>
            </svg>
          </button>

          <div
            id='dropdown'
            className={`${
              showDropDown ? 'block' : 'hidden'
            } z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 absolute top-11`}
          >
            <ul
              className='py-2 text-sm text-black'
              aria-labelledby='dropdownDefaultButton'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {tableInstance
                .getAllLeafColumns()
                .slice(1)
                .map((column) => {
                  return (
                    <li
                      key={column.id}
                      className='block px-4 py-2 hover:bg-teal-100'
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <label
                        className='flex items-center gap-2 cursor-pointer'
                        id='column-selection-option'
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <input
                          {...{
                            type: 'checkbox',
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler()
                          }}
                          disabled={
                            Object.values(columnVisibility).filter(
                              (col) => !col
                            ).length >= 5 &&
                            (columnVisibility[column.id] ?? true)
                          }
                        />{' '}
                        {column.id.charAt(0).toUpperCase() + column.id.slice(1)}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>

      <div className='pr-1 pb-1 overflow-container'>
        <table className='table-wrapper'>
          {/* <thead className="faux-head hidden">
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead> */}

          <thead className='table-head'>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {tableInstance.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Table;

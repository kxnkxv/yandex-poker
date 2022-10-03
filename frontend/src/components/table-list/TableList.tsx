import React, { FC } from 'react'

// Images
import Arrow from 'images/arrow.svg'
import { Link } from 'react-router-dom'

// Styles
import './TableList.css'

const TablesList: FC = () => {
  return (
    <div>
      <table className='w-full table-auto table-list'>
        <thead>
          <tr className='bg-blue uppercase h-10 border-2 border-dark-blue text-left '>
            <th />
            <th>
              Table name
              <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
            </th>
            <th>
              Game
              <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
            </th>
            <th>
              Stakes
              <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
            </th>
            <th>
              Plrs
              <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
            </th>
            <th className='w-28'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
            <td>
              <div className='bg-cyan w-1 h-10 rounded-r-sm'></div>
            </td>
            <td>Run it Twice Table</td>
            <td>NL Holdem</td>
            <td>1/2</td>
            <td>6/6</td>
            <td className='text-right'>
              <Link
                className='bg-light-blue rounded float-center text-sm px-3 h-9 inline-flex items-center whitespace-nowrap'
                to='/tables/1'
              >
                Join game
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TablesList

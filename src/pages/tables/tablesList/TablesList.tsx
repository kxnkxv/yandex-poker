import React from 'react'
import Arrow from 'Images/arrow.svg'

export interface ITablesListProps {
  id: number
  name: string
  game: string
  stakes: string
  plrs: number
}

const TablesList = (props: { tables: any }) => {
  return (
    <div>
      <table className='w-full table-auto'>
        <tr className='bg-blue uppercase h-10 border-2 border-dark-blue text-left'>
          <th></th>
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
        <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
          <td>
            <div className='bg-cyan w-1 h-10 rounded-r-sm'></div>
          </td>
          <td>Run it Twice Table</td>
          <td>NL Holdem</td>
          <td>1/2</td>
          <td>6/6</td>
          <td>
            <button className='bg-light-blue rounded uppercase w-28 h-8 float-center'>
              Join game
            </button>
          </td>
        </tr>
        <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
          <td>
            <div className='bg-cyan w-1 h-10 rounded-r-sm'></div>
          </td>
          <td>Razz 1/2</td>
          <td>NL Holdem</td>
          <td>1/2</td>
          <td>6/9</td>
          <td>
            <button className='bg-light-blue rounded uppercase w-28 h-8 float-center'>
              Join game
            </button>
          </td>
        </tr>
        <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
          <td>
            <div className='bg-cyan w-1 h-10 rounded-r-sm'></div>
          </td>
          <td>Rake Free Table</td>
          <td>NL Holdem</td>
          <td>5/10</td>
          <td>10/10</td>
          <td>
            <button className='bg-light-blue rounded uppercase w-28 h-8 float-center'>
              Join game
            </button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default TablesList

import React from 'react'

//Images
import Cup from './img/cup.svg'
import Arrow from 'Images/arrow.svg'

//Types
import { TProps } from './types'

const Results: TProps = () => {
  return (
    <>
      <div className='flex justify-between items-center h-11 bg-magenta  p-5 uppercase border-2 border-dark-blue'>
        <h4>Top results</h4>
        <img className='w-14 h-14 mb-5' src={Cup} alt='cup' />
      </div>
      <table className='w-full table-auto'>
        <tr className='bg-blue h-10 border-2 border-dark-blue text-left'>
          <th />
          <th>
            Player
            <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
          </th>
          <th>
            Win
            <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
          </th>
        </tr>
        <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
          <td />
          <td>User name</td>
          <td>$1000</td>
        </tr>
        <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
          <td />
          <td>User name</td>
          <td>$50000</td>
        </tr>
      </table>
    </>
  )
}

export default Results

import HearderMenu from '../../features/components/header-menu/HeaderMenu'
import React from 'react'
import Button from '../../features/ui/button/Button'
import Banner from '../../images/banner.png'
import Cup from '../../images/cup.png'
import TablesList from './tablesList/TablesList'

export interface ITableProps {
  tableId?: number
}

const Tables = (props: ITableProps) => {
  return (
    <div>
      <HearderMenu />
      <div className='container flex justify-between max-w-full p-4'>
        <section className='grid justify-between mb-5 md:px-0'>
          <div className='inline-block'>
            <div className='flex justify-between'>
              <div>
                <h1>Available tables</h1>
              </div>
              <div>
                <Button clicked={undefined}>Create a table</Button>
              </div>
            </div>
            <TablesList tables={undefined}></TablesList>
          </div>
        </section>
        <section className='inline-block justify-end mb-5 md:order-2'>
          <img className='h-20 mb-5' src={Banner} alt='user photo' />
          <div className='flex justify-between items-center h-11 bg-magenta opacity-70 pl-4 mb-1 uppercase'>
            <h4>Top results</h4>
            <img className='w-14 h-14 mb-5' src={Cup} alt='cup' />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Tables

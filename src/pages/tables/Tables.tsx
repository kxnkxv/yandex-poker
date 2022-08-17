import HearderMenu from 'Features/components/header-menu/HeaderMenu'
import React, { useState } from 'react'
import Button from 'Features/ui/button/Button'
import Banner from 'Images/banner.svg'
import Cup from 'Images/cup.svg'
import TablesList from './tablesList/TablesList'
import Arrow from 'Images/arrow.svg'
import Modal from 'Features/ui/modal/Modal'
import Input from 'Features/ui/input/Input'

export type ITableProps = {
  tableId?: number
}

const Tables = (props: ITableProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const createTable = () => {
    console.log("created")
  }

  const openModal = () => {
    setIsModalOpened(true)
  }

  const closeModal = () => {
    setIsModalOpened(false)
  }

  return (
    <div className='p-5 w-full'>
      <HearderMenu />
      <div className='w-full grid grid-cols-4 gap-5'>
        <div className='col-span-3 justify-between mb-5 md:px-0'>
          <div className='inline-block w-full'>
            <div className='flex justify-between mb-5'>
              <div>
                <h1>Available tables</h1>
              </div>
              <div>
                <Button clicked={openModal}>Create a table</Button>
              </div>
            </div>
            <Modal title='Create table' open={isModalOpened} closeHandle={closeModal}>
              <div className='grid gap-1 mb-5 grid-cols-1'>
              <div className='grid grid-cols-2 p-5 gap-0'>
                  <Input className='bg-magenta mb-5' label='Table name' />
                  <Input className='bg-magenta mb-5' label='Game type' />
                  <Input className='bg-magenta mb-5' label='Bets' />
                  <Input className='bg-magenta mb-5' label='Players'/>
             </div>
                <Button clicked={createTable}>Create</Button>
              </div>
            </Modal>
            <TablesList tables={null}></TablesList>
          </div>
        </div>
        <div className='inline-block w-72'>
          <img className='h-20 w-80 mb-5' src={Banner} alt='user photo' />
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
        </div>
      </div>
    </div>
  )
}

export default Tables

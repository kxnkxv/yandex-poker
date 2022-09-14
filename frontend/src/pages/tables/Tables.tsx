import React, { FC, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import HearderMenu from 'components/header/Header'
import Button from 'components/ui/button/Button'
import TablesList from 'components/table-list'
import Modal from 'components/ui/modal/Modal'
import Input from 'components/ui/input/Input'
import Results from 'components/results'

// Images
import Banner from 'images/banner.svg'

const Tables: FC = (props) => {
  useDocumentTitle('Available tables')

  const [isModalOpened, setIsModalOpened] = useState(false)

  const createTable = () => {
    console.log('created')
  }

  /* const openModal = () => {
    setIsModalOpened(true)
  } */

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
                <Button>Create a table</Button>
              </div>
            </div>
            <Modal title='Create table' open={isModalOpened} closeHandle={closeModal}>
              <div className='grid gap-1 mb-5 grid-cols-1'>
                <div className='grid grid-cols-2 p-5 gap-0'>
                  <Input className='bg-magenta mb-5' label='Table name' />
                  <Input className='bg-magenta mb-5' label='Game type' />
                  <Input className='bg-magenta mb-5' label='Bets' />
                  <Input className='bg-magenta mb-5' label='Players' />
                </div>
                <Button onClick={createTable}>Create</Button>
              </div>
            </Modal>
            <TablesList />
          </div>
        </div>
        <div className='inline-block'>
          <a>
            <img className='w-full mb-5' src={Banner} alt='user photo' />
          </a>
          <Results />
        </div>
      </div>
    </div>
  )
}

export default Tables

import React, { useState } from 'react'
import useDocumentTitle from 'Hooks/useDocumentTitle'

//Components
import HearderMenu from 'Components/header/Header'
import Button from 'Components/ui/button/Button'
import TablesList from './tablesList/TablesList'
import Modal from 'Components/ui/modal/Modal'
import Input from 'Components/ui/input/Input'
import Results from 'Components/results'

//Images
import Banner from 'Images/banner.svg'

//Types
import { TProps } from './types'

const Tables: TProps = (props) => {
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

import HearderMenu from '../../features/components/header-menu/HeaderMenu'
import React from 'react'

export interface ITableProps {
  tableId?: number
}

const Tables = (props: ITableProps) => {
  return (
    <div className=''>
      <HearderMenu/>
      <p>Table component</p>
    </div>
  )
}

export default Tables

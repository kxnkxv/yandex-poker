import HeaderMenu from '../../features/components/header-menu/HeaderMenu'
import React from 'react'

export type ITableProps = {
  tableId?: number
}

const Tables = (props: ITableProps) => {
  return (
    <div className=''>
      <HeaderMenu />
      <p>Table component</p>
    </div>
  )
}

export default Tables

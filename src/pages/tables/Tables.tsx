import HeaderMenu from '../../features/components/header-menu/HeaderMenu'
import React, { useEffect } from 'react'

export type ITableProps = {
  tableId?: number
}

const Tables = (props: ITableProps) => {
  //Set page title
  useEffect(() => {
    document.title = 'Tables'
  }, [])

  return (
    <div className=''>
      <HeaderMenu />
      <p>Table component</p>
    </div>
  )
}

export default Tables

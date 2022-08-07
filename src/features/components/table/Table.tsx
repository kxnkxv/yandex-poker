import React from 'react'

export interface ITableProps {
  tableId?: number
}

const Table = (props: ITableProps) => {
  return (
    <div className='mx-10 border border-purple-500'>
      <p>Table component</p>
    </div>
  )
}

export default Table

import React from 'react'
import Modal from '../../../features/ui/modal/Modal'
import { Link } from 'react-router-dom'

export interface ITablesListProps {
  id?: number
  name: string
  game: string
  stakes: string
  plrs: number
}

const TablesList = (props: { tables: any }) => {
  const { tables } = props

  if (!tables || tables.length === 0) return <Modal><p>No tables, sorry</p></Modal>
  return (
    <div className='flex justify-between'>
      {tables.map((table: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; game: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; stakes: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; plrs: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
        return (
          <Modal key={table.id}>
            <h4>{table.name}</h4>
            <h4>{table.game}</h4>
            <h4>{table.stakes}</h4>
            <h4>{table.plrs}</h4>
            <Link to={`/tables/${table.id}`}>Profile</Link>
          </Modal>
        )
      })}
    </div>
  )
}

export default TablesList

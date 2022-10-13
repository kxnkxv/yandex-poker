import React, { FC } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import HearderMenu from 'components/header/Header'
import Arrow from 'images/arrow.svg'
import { Link } from 'react-router-dom'

const Forum: FC = () => {
  useDocumentTitle('Forum')

  return (
    <div className='p-5 w-full'>
      <HearderMenu />
      <div className='w-full grid grid-cols-4 gap-5'>
        <div className='col-span-3 justify-between mb-5 md:px-0'>
          <div>
            <h1>Forum</h1>
          </div>
          <table className='w-full table-auto table-list'>
            <thead>
              <tr className='bg-blue h-10 border-2 border-dark-blue text-left pl-3'>
                <th>
                  Topic
                  <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
                </th>
                <th className='w-28'>
                  Replies
                  <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
                </th>
                <th className='w-28'>
                  Activity
                  <img className='h-4 pl-1 inline' src={Arrow} alt='user photo' />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
                <td>
                  <Link to='/forum/1' className='underline'>
                    <b>👋 Introduce yourself!</b>
                  </Link>
                  <p className='mt-5 opacity-70'>
                    Say hi and let the community know where you’re from, what you do, and anything
                    else fun you’d like to share. 🙂
                  </p>
                </td>
                <td>14</td>
                <td>04.10.2022</td>
              </tr>
              <tr className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'>
                <td>
                  <Link to='/forum/2' className='underline mb-5'>
                    <b>Welcome and Forum Guidelines</b>
                  </Link>
                  <p className='mt-5 opacity-70'>
                    Hi there and welcome to our brand new support forum. This is a place for our
                    community (that’s you) to connect with each other, ask and answer each other’s
                    questions, share feedback, and more! To help you get the most o…
                    <Link to='/forum/2' className='underline'>
                      read more
                    </Link>
                  </p>
                </td>
                <td>8</td>
                <td>04.10.2022</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='inline-block'>sdsdf</div>
      </div>
    </div>
  )
}

export default Forum

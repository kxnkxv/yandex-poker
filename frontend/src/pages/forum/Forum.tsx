import React, { FC, useEffect, useState } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import HearderMenu from 'components/header/Header'
import Arrow from 'images/arrow.svg'
import { Link } from 'react-router-dom'
import Modal from 'components/ui/modal/Modal'
import Input from 'components/ui/input'
import Button from 'components/ui/button'
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'core/store'
import { createTopic, getTopics } from './TopicSlice'
import Loader from 'components/loader/Loader'

const Forum: FC = () => {
  useDocumentTitle('Forum')
  const dispatch = useDispatch<AppDispatch>()
  const { topics: topicsList, isPending } = useSelector((state: RootState) => state.topic)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onBlur',
  })
  const { errors } = useFormState({
    control,
  })

  useEffect(() => {
    dispatch(getTopics())
  }, [])

  const [isModalOpened, setIsModalOpened] = useState(false)

  const openModal = () => {
    setIsModalOpened(true)
    reset()
  }
  const onSubmit: SubmitHandler<{ name: string; description: string }> = (data) => {
    dispatch(createTopic(data)).then(() => {
      setIsModalOpened(false)
    })
  }

  const closeModal = () => {
    setIsModalOpened(false)
  }

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
              {isPending ? (
                <Loader />
              ) : topicsList.length !== 0 ? (
                topicsList?.map((topic) => (
                  <tr
                    key={topic.id}
                    className='bg-blue h-10 border-2 border-dark-blue hover:bg-magenta'
                  >
                    <td>
                      <Link to={`/forum/${topic.id}`} className='underline'>
                        <b>{topic.name}</b>
                      </Link>
                      <p className='mt-5 opacity-70'>{topic.description}</p>
                    </td>
                    <td>{topic.commentCount}</td>
                    <td>{topic.createDate.split('T')[0]}</td>
                  </tr>
                ))
              ) : (
                <>
                  <h2>Hi friend👋. Do you want to create a topic? Then hit the button.</h2>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className='inline-block'>
          <Button pending={isPending} className='btn-red' onClick={openModal}>
            Create topic
          </Button>
        </div>

        <Modal title='Create a new topic' open={isModalOpened} closeHandle={closeModal}>
          <div className='grid gap-5 mb-5'>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name='name'
                  rules={{
                    required: 'The field is required',
                    validate: (value: string) => {
                      if (!value.trim()) {
                        return 'The field must not contain a space'
                      }
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className='form-control'
                      label='Topic name'
                      error={errors.name}
                    />
                  )}
                />
                <div>
                  <Controller
                    control={control}
                    name='description'
                    rules={{
                      validate: (value: string) => {
                        if (!value.trim()) {
                          return 'The field must not contain a space'
                        }
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <label className='form-label'>Description:</label>
                        <textarea
                          {...field}
                          className='form-control'
                          rows={5}
                          style={{ resize: 'none' }}
                          ref={field.ref}
                        />
                        {!!errors.description && (
                          <span className='text-red'>{errors.description.message}</span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className='grid grid-cols-2 gap-5 mt-5'>
                  <Button className='btn-light-blue' pending={isPending}>
                    Create
                  </Button>
                  <Button className='btn-red' onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Forum

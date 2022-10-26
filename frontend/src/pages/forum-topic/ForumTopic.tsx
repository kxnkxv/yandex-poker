import React, { FC, useEffect } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import HearderMenu from 'components/header/Header'

// Styles
import './ForumTopic.css'

// Photo
import Avatars from 'pages/account-edit/Avatars'

import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form'
import Input from 'components/ui/input'
import Button from 'components/ui/button'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'core/store'
import Back from 'images/back.svg'
import { Link, useParams } from 'react-router-dom'
import { getTopic } from '../forum/TopicSlice'
import { createMessage, getMessages, resetMessage } from './commentTopicSlice'
import Loader from '@/components/loader/Loader'

const ForumTopic: FC = () => {
  useDocumentTitle('Forum')
  const { topicId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (topicId) {
      dispatch(getTopic({ topicId }))
      dispatch(getMessages({ topicId }))
    }
    return () => {
      dispatch(resetMessage())
    }
  }, [])
  const topic = useSelector((state: RootState) => state.topic.topic)
  const user = useSelector((state: RootState) => state.auth.user)
  const { messages, isPending } = useSelector((state: RootState) => state.comment)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      text: '',
    },
    mode: 'onBlur',
  })

  const { errors } = useFormState({
    control,
  })

  const onSubmit: SubmitHandler<{ text: string }> = (data) => {
    if (topicId) {
      dispatch(createMessage({ ...data, topicId }))
      reset()
    }
  }

  return (
    <div className='p-5 w-full'>
      <HearderMenu />
      <div className='w-full grid grid-cols-4 gap-5'>
        <div className='col-span-3 justify-between mb-5 md:px-0'>
          <div>
            <h1 className='mb-5'>
              <Link className='btn-nav mr-5' to='/forum'>
                <img src={Back} alt='Back' />
              </Link>
              {topic !== null ? topic.name : 'No data available'}
            </h1>
          </div>
          <div className='topic-messages'>
            <div className='topic-message'>
              <div className='topic-avatar'>
                <img src={Avatars[topic ? topic.author.img_link : 1].image} width={50} />
              </div>
              <div className='topic-text'>
                <b>Admin</b>
                <p className='mb-5'>{topic !== null ? topic.description : ''}</p>
              </div>
              <div className='topic-date'>
                {topic !== null ? topic.createDate.split('T')[0] : ''}
              </div>
            </div>

            {/* Comment form */}
            <div className='comment-form'>
              <form onSubmit={handleSubmit(onSubmit)} data-testid='form-login'>
                {/* Comment text */}
                <div className='grid gap-6 mb-5 grid-cols-5'>
                  <div className='col-span-4'>
                    <Controller
                      control={control}
                      name='text'
                      render={({ field }) => (
                        <Input
                          {...field}
                          className='form-control'
                          error={errors.text}
                          placeholder='Your comment'
                          autocomplete='off'
                        />
                      )}
                      rules={{
                        required: 'The field is required',
                        validate: (value: string) => {
                          if (!value.trim()) {
                            return 'The field must not contain a space'
                          }
                        },
                      }}
                    />
                  </div>
                  <div className='mb-5'>
                    <Button className='btn-red' pending={isPending}>
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div className='topic-comments'>
              <div className='mb-5'>
                <b>Comments:</b>
              </div>
              {isPending ? (
                <Loader />
              ) : messages.length !== 0 ? (
                messages.map((message) => (
                  <div className='topic-message' key={message.id}>
                    <div className='topic-avatar'>
                      <img
                        src={
                          Avatars[
                            message.author !== undefined ? message.author.img_link : user.img_link
                          ].image
                        }
                        width={50}
                      />
                    </div>
                    <div className='topic-text'>
                      <b>{message.author !== undefined ? message.author.login : user.login}</b>
                      <p className='mb-5'>{message.text}</p>
                    </div>
                    <div className='topic-date'>{message.date.split('T')[0]}</div>
                  </div>
                ))
              ) : (
                <>
                  <h2>
                    Hi friend👋. There are no messages in this thread. If you want to create a
                    message, click on
                  </h2>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumTopic

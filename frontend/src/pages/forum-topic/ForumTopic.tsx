import React, { FC } from 'react'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import HearderMenu from 'components/header/Header'

// Styles
import './ForumTopic.css'

//Demo
import Avatar0 from 'images/avatars/0.png'
import Avatar1 from 'images/avatars/1.png'

import { Controller, useForm, useFormState } from 'react-hook-form'
import Input from 'components/ui/input'
import Button from 'components/ui/button'
import { checkAuth, login } from 'pages/login/LoginSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'core/store'
import Back from 'images/back.svg'
import { Link } from 'react-router-dom'

const ForumTopic: FC = () => {
  useDocumentTitle('Forum')

  const dispatch = useDispatch<AppDispatch>()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      login: '',
    },
    mode: 'onBlur',
  })

  const { errors } = useFormState({
    control,
  })

  const onSubmit = (data: any) => {
    dispatch(login(data))
      .unwrap()
      .then(() => dispatch(checkAuth()))
      .catch(() => {})
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
              👋 Introduce yourself!
            </h1>
          </div>
          <div className='topic-messages'>
            <div className='topic-message'>
              <div className='topic-avatar'>
                <img src={Avatar1} width={50} />
              </div>
              <div className='topic-text'>
                <b>Admin</b>
                <p className='mb-5'>
                  Say hi and let the community know where you’re from, what you do, and anything
                  else fun you’d like to share. 🙂
                </p>
              </div>
              <div className='topic-date'>05.10.2022</div>
            </div>

            {/* Comment form */}
            <div className='comment-form'>
              <form onSubmit={handleSubmit(onSubmit)} data-testid='form-login'>
                {/* Comment text */}
                <div className='grid gap-6 mb-5 grid-cols-5'>
                  <div className='col-span-4'>
                    <Controller
                      control={control}
                      name='login'
                      render={({ field }) => (
                        <Input
                          {...field}
                          className='form-control'
                          error={errors.login}
                          placeholder='Your comment'
                          autocomplete='off'
                        />
                      )}
                    />
                  </div>
                  <div className='mb-5'>
                    <Button>Send</Button>
                  </div>
                </div>
              </form>
            </div>

            <div className='topic-comments'>
              <div className='mb-5'>
                <b>Comments:</b>
              </div>
              <div className='topic-message'>
                <div className='topic-avatar'>
                  <img src={Avatar0} width={50} />
                </div>
                <div className='topic-text'>
                  <b>ionetek</b>
                  <p className='mb-5'>Здорова, бандиты!</p>
                </div>
                <div className='topic-date'>05.10.2022</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumTopic

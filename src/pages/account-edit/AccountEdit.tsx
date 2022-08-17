import React, { FC, useState } from 'react'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import {
  emailValidation,
  loginValidation,
  nameValidation,
  phoneValidation,
} from 'Utils/validation/validation'
import Avatars from './Avatars' // Mock data
import useDocumentTitle from 'Hooks/useDocumentTitle'

//Components
import Input from 'Components/ui/input/Input'
import Modal from 'Components/ui/modal/Modal'

//Images
import backArrowIcon from './img/backArrowIcon.svg'

//Styles
import './AccountEdit.css'

//Types
import { TAccountEditData } from './types'

const AccountEdit: FC = () => {
  useDocumentTitle('Edit account')

  const [currentAvatar, setCurrentAvatar] = useState(Avatars[0].image)

  const { handleSubmit, control, register, setValue } = useForm({
    defaultValues: {
      avatar: currentAvatar,
      first_name: '',
      second_name: '',
      email: '',
      login: '',
      phone: '',
    },
    mode: 'onBlur',
  })

  const [isModalOpened, setIsModalOpened] = useState(false)

  const openModal = () => {
    setIsModalOpened(true)
  }

  const closeModal = () => {
    setIsModalOpened(false)
  }

  const changeAvatar = (image: string) => {
    setCurrentAvatar(image)
    setValue('avatar', image)
    closeModal()
  }

  const { errors } = useFormState({
    control,
  })

  const onSubmit: SubmitHandler<TAccountEditData> = (data) => console.log(data)

  return (
    <div className='main-wrapper pt-28'>
      <div className='container mx-auto max-w-md'>
        <div className='nav-header'>
          <a className='btn-nav'>
            <img src={backArrowIcon} alt='Back' />
          </a>
        </div>
        <h1 className='mb-5 text-center'>Account edit</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar */}
          <div className='w-full text-center'>
            <div className='profile-avatar mx-auto mb-5 inline-block'>
              <a onClick={openModal} className='cursor-pointer'>
                <img src={currentAvatar} alt='Username' />
              </a>
            </div>
          </div>
          {/* Change avatar modal */}
          <Modal title='Change avatar' open={isModalOpened} closeHandle={closeModal}>
            <div className='grid gap-5 mb-5 grid-cols-5'>
              {Avatars.map((avatar) => (
                <div key={avatar.id}>
                  <input
                    {...register('avatar')}
                    type='radio'
                    value={avatar.id}
                    className='hidden'
                    onChange={() => changeAvatar(avatar.image)}
                    checked={currentAvatar === avatar.image}
                    id={'avatar' + avatar.id}
                  />
                  <label
                    className='profile-avatar mx-auto inline-block cursor-pointer'
                    htmlFor={'avatar' + avatar.id}
                  >
                    <a>
                      <img src={avatar.image} alt='Username' />
                    </a>
                  </label>
                </div>
              ))}
            </div>
          </Modal>
          <div className='grid gap-5 mb-5 md:grid-cols-2'>
            {/* Firstname */}
            <div>
              <Controller
                control={control}
                name='first_name'
                rules={nameValidation}
                render={({ field }) => (
                  <Input
                    {...field}
                    className='form-control'
                    label='First name'
                    error={errors.first_name}
                  />
                )}
              />
            </div>

            {/* Second name */}
            <div>
              <Controller
                control={control}
                name='second_name'
                rules={nameValidation}
                render={({ field }) => (
                  <Input
                    {...field}
                    className='form-control'
                    label='Second name'
                    error={errors.second_name}
                  />
                )}
              />
            </div>
          </div>

          {/* E-mail*/}
          <div className='mb-5'>
            <Controller
              control={control}
              name='email'
              rules={emailValidation}
              render={({ field }) => (
                <Input {...field} className='form-control' label='Email' error={errors.email} />
              )}
            />
          </div>

          {/* Login */}
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div>
              <Controller
                control={control}
                name='login'
                rules={loginValidation}
                render={({ field }) => (
                  <Input {...field} className='form-control' label='Login' error={errors.login} />
                )}
              />
            </div>

            {/* Phone */}
            <div>
              <Controller
                control={control}
                name='phone'
                rules={phoneValidation}
                render={({ field }) => (
                  <Input {...field} className='form-control' label='Phone' error={errors.phone} />
                )}
              />
            </div>
          </div>
          <div className='text-center'>
            <button className='btn-red inline-block'>Confirm</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountEdit

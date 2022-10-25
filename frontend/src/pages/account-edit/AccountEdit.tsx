import React, { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import {
  emailValidation,
  loginValidation,
  nameValidation,
  phoneValidation,
} from 'utils/validation/validation'
import Avatars from './Avatars' // Mock data
import useDocumentTitle from 'hooks/useDocumentTitle'
import { editUser } from './AccountEditSlice'

// Components
import Input from 'components/ui/input/Input'
import Modal from 'components/ui/modal/Modal'
import Button from 'components/ui/button/Button'

// Images
import backArrowIcon from './img/backArrowIcon.svg'

// Styles
import './AccountEdit.css'

// Types
import { TAccountEditData } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'core/store'
import callbackHandler from 'utils/callback-handler/callbackHandler'
import { userSelector } from 'core/store/selectors/user'
import Button from '@/components/ui/button/Button'

const AccountEdit: FC = () => {
  useDocumentTitle('Edit account')

  const user = useSelector(userSelector)
  const loading = useSelector((state: RootState) => state.auth.isPending)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [currentAvatar, setCurrentAvatar] = useState(user.img_link)

  const { handleSubmit, control, register, setValue } = useForm({
    defaultValues: {
      // Из-за технических ограничений вынуждены прокидывать id аватарки
      // через поле img_link, добавив строку 'avatar', чтобы бэкенд не ругался
      img_link: Number(currentAvatar),
      first_name: user.first_name,
      second_name: user.second_name,
      email: user.email,
      login: user.login,
      phone: user.phone,
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

  const changeAvatar = (img_link_id: number) => {
    setCurrentAvatar(img_link_id)
    setValue('img_link', img_link_id)
    closeModal()
  }

  const { errors, isSubmitting } = useFormState({
    control,
  })

  const onSubmit: SubmitHandler<TAccountEditData> = (data: TAccountEditData) => {
    dispatch(editUser({ ...data, img_link: Number(data.img_link) }))
      .unwrap()
      .then(() => {
        callbackHandler('Information updated')
        navigate('/account')
      })
  }

  return (
    <div className='main-wrapper pt-28'>
      <div className='container mx-auto max-w-md'>
        <div className='nav-header'>
          <Link className='btn-nav' to='/account'>
            <img src={backArrowIcon} alt='Back' />
          </Link>
        </div>
        <h1 className='mb-5 text-center'>Account edit</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar */}
          <div className='w-full text-center'>
            <div className='profile-avatar mx-auto mb-5 inline-block'>
              <a onClick={openModal} className='cursor-pointer'>
                <img src={Avatars[currentAvatar].image} alt='Username' />
              </a>
            </div>
          </div>
          {/* Change avatar modal */}
          <Modal title='Change avatar' open={isModalOpened} closeHandle={closeModal}>
            <div className='grid gap-5 mb-5 grid-cols-5'>
              {Avatars.map((avatar) => (
                <div key={avatar.id}>
                  <input
                    {...register('img_link')}
                    type='radio'
                    value={avatar.id}
                    className='hidden'
                    onChange={() => changeAvatar(avatar.id)}
                    checked={currentAvatar == avatar.id}
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
            <Button pending={isSubmitting} className='btn-red'>
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountEdit

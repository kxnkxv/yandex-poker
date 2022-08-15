import React, { FC, useEffect } from 'react'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import {
  emailValidation,
  loginValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
} from '../../utils/validation/validation'
import { Link } from 'react-router-dom'
import Input from '../../features/ui/input/Input'
import Button from '../../features/ui/button/Button'

interface ISignUpForm {
  first_name: string
  second_name: string
  email: string
  login: string
  phone: string
  password: string
}

const Registration: FC = () => {
  //Set page title
  useEffect(() => {
    document.title = 'Registration'
  }, [])

  const { handleSubmit, control } = useForm<ISignUpForm>({
    defaultValues: {
      first_name: '',
      second_name: '',
      email: '',
      login: '',
      phone: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const { errors } = useFormState({
    control,
  })

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => console.log(data)

  return (
    <div className='main-wrapper items-center gradient-bottom'>
      <div className='container mx-auto max-w-md'>
        <h1 className='mb-5 text-center'>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-5 mb-5 md:grid-cols-2'>
            {/* Firstname*/}
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

          {/* Password */}
          <div className='mb-5'>
            <Controller
              control={control}
              name='password'
              rules={passwordValidation}
              render={({ field }) => (
                <Input
                  {...field}
                  className='form-control'
                  label='Password'
                  error={errors.password}
                />
              )}
            />
          </div>
          <Button>Register</Button>
          <div className='text-center mb-5'>
            <Link to='/' className='text-white underline'>
              I have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration

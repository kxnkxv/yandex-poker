import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import { loginValidation, passwordValidation } from 'utils/validation/validation'
import { login } from 'pages/login/LoginSlice'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from 'core/store'
import useDocumentTitle from 'hooks/useDocumentTitle'

// Components
import Input from 'components/ui/input/Input'
import Button from 'components/ui/button/Button'

// Types
import { TSignInForm } from './types'

const Login: FC = () => {
  useDocumentTitle('Login')

  const dispatch = useDispatch<AppDispatch>()

  const { handleSubmit, control } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const { errors } = useFormState({
    control,
  })

  const { isPending } = useSelector((state: RootState) => state.auth)

  const onSubmit: SubmitHandler<TSignInForm> = (data) => {
    dispatch(login(data))
  }

  return (
    <div className='main-wrapper items-center gradient-bottom'>
      <div className='container mx-auto max-w-md'>
        <h1 className='mb-5 text-center'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} data-testid='form-login'>
          {/* Login */}
          <div className='grid gap-6 mb-5'>
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
                    type='password'
                  />
                )}
              />
            </div>
          </div>
          <div className='mb-5'>
            <Button className='btn-red' pending={isPending}>Login</Button>
          </div>
          <div className='text-center mb-5'>
            <Link to='/register' className='text-white underline'>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

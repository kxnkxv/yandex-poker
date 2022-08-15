import React, { FC } from 'react'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import { loginValidation, passwordValidation } from '../../utils/validation/validation'
import { Link } from 'react-router-dom'
import Input from '../../features/ui/input/Input'
import Button from '../../features/ui/button/Button'

type ISignInForm = {
  login: string
  password: string
}

const Login: FC = () => {
  const { handleSubmit, control } = useForm<ISignInForm>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const { errors } = useFormState({
    control,
  })

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data)

  return (
    <div className='main-wrapper items-center gradient-bottom'>
      <div className='container mx-auto max-w-md'>
        <h1 className='mb-5 text-center'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  />
                )}
              />
            </div>
          </div>
          <Button clicked={undefined}>Login</Button>
          <div className='text-center mb-5'>
            <Link to='/register' className='text-white underline'>
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

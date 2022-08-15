import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form'
import { loginValidation, passwordValidation } from 'Utils/validation/validation'
import { checkAuth, login } from 'Pages/login/LoginSlice'
import { Link } from 'react-router-dom'
import Input from 'Features/ui/input/Input'
import Button from 'Features/ui/button/Button'
import { AppDispatch } from 'Core/store'

const Login: FC = () => {
  //Set page title
  useEffect(() => {
    document.title = 'Login'
  }, [])

  const dispatch = useDispatch<AppDispatch>()

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

  const onSubmit: SubmitHandler<ISignInForm> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => dispatch(checkAuth()))
      .catch(() => {})
  }

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
                    type='password'
                  />
                )}
              />
            </div>
          </div>
          <div className='mb-5'>
            <Button>Login</Button>
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

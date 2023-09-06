"use client"

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./input";
import Button from "./button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then(() => signIn('credentials', {
          ...data,
          redirect: false,
        }))
        .then((callback) => {
          if (callback?.error) {
            console.log("error")
          }

          if (callback?.ok) {
            router.push('/profile')
          }
        })
        .catch(() => console.log('error'))
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            console.log('error');
          }

          if (callback?.ok) {
            router.push('/profile')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <div className="mt-8 mx-auto w-full md:w-1/3">
      <div className="bg-white px-4 py-8 shadow rounded-lg w-full">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              label="ユーザーネーム"
              register={register}
              disabled={isLoading}
              errors={errors}
              required
              id="name"
            />
          )}
          <Input
            label="メールアドレス"
            register={register}
            disabled={isLoading}
            errors={errors}
            required
            id="email"
            type="email" />
          <Input
            label="パスワード"
            register={register}
            disabled={isLoading}
            errors={errors}
            required
            id="password"
            type="password" />
          <div>
            <Button fullWidth type="submit" disabled={isLoading}>
              {variant === "LOGIN" ? 'ログイン' : '会員登録'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-2 justify-center text-sm px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? '初めてですか?' : 'すでにアカウントを持っていますか?'}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === 'LOGIN' ? '会員登録' : 'ログイン'}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthForm

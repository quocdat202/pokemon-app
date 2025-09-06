'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { form } from 'framer-motion/client'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
interface LoginFormProps {
  onLogin: (username: string, password: string) => void
  loading: boolean
  error: string | null
}
interface LoginFormValues {
  username: string
  password: string
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading, error }) => {
  const form = useForm<LoginFormValues>()

  const onSubmit = useCallback(
    (value: LoginFormValues) => {
      onLogin(value.username, value.password)
    },
    [onLogin]
  )

  const handleReset = useCallback(() => {
    form.reset()
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>Enter your username to proceed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your password to proceed</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm

import React from 'react';
import { cn } from '../lib/utils';

import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';

interface LoginFormProps {
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

export const LoginForm = forwardRef<HTMLDivElement, LoginFormProps>(
  ({ className }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={className}>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-lg font-medium text-pink-700">
              Электронная почта
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-lg font-medium text-pink-700">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <Button variant={'default'} className='bg-pink-700'>Войти</Button>
        </form>
      </div>
    );
  }
);

"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast({
        title: "Success!",
        description: "You've been successfully logged in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-8">Welcome Back</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{`${errors.email.message}`}</p>
              )}
            </div>
            <div>
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{`${errors.password.message}`}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <p className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
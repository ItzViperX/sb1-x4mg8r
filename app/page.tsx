"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-2xl mx-auto"
      >
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to Our Secure Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Experience seamless authentication and protected content with Next.js and Firebase
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/login">
              Login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
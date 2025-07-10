
'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SignupFormComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup
    if (email && password) {
      signup(email);
    }
  };

  return (
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-primary" />
            회원가입
          </CardTitle>
          <CardDescription>
            새 계정을 생성하려면 정보를 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg">
              계정 생성
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="underline text-primary">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
  );
}


export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Suspense fallback={<Skeleton className="h-[450px] w-full max-w-sm" />}>
        <SignupFormComponent />
      </Suspense>
    </div>
  );
}

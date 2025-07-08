'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const reason = searchParams.get('reason');
    if (reason === 'unauthenticated') {
      toast({
        variant: 'default',
        title: '로그인 필요',
        description: '로그인 후에 이용해 주세요.',
      });
    }
  }, [searchParams, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, password is not validated in this version.
    if (email && password) {
      const success = login(email);
      if (!success) {
        toast({
          variant: "destructive",
          title: "로그인 실패",
          description: "계정이 존재하지 않습니다. 먼저 회원가입을 진행해주세요.",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <LogIn className="w-8 h-8 text-primary" />
            로그인
          </CardTitle>
          <CardDescription>
            이메일과 비밀번호를 입력하여 로그인하세요.
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
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg">
              로그인
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="underline text-primary">
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

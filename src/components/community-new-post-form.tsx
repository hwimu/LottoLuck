
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { Post } from './community-post-card';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  numbers: z.string().refine(
    (value) => {
      const numbers = value.split(',').map(n => n.trim()).filter(n => n);
      if (numbers.length !== 6) return false;
      return numbers.every(n => {
        const num = parseInt(n, 10);
        return !isNaN(num) && num >= 1 && num <= 45;
      });
    },
    '1부터 45 사이의 숫자 6개를 쉼표로 구분하여 입력해주세요.'
  ),
  content: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface NewPostFormProps {
  onSubmit: (post: Post) => void;
}

export function NewPostForm({ onSubmit }: NewPostFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numbers: '',
      content: '',
    },
  });

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "오류",
        description: "로그인이 필요합니다.",
      });
      return;
    }

    const newPost: Post = {
      id: new Date().toISOString() + Math.random(),
      author: user.email,
      numbers: data.numbers.split(',').map(n => parseInt(n.trim(), 10)),
      content: data.content,
      votes: 0,
      voters: [],
      comments: [],
      date: new Date().toISOString(),
    };
    onSubmit(newPost);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 py-4">
        <FormField
          control={form.control}
          name="numbers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>예측 번호 6개</FormLabel>
              <FormControl>
                <Input placeholder="예: 1, 12, 23, 34, 40, 45" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>의견 (선택)</FormLabel>
              <FormControl>
                <Textarea placeholder="예측에 대한 의견이나 분석을 자유롭게 공유해보세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          공유하기
        </Button>
      </form>
    </Form>
  );
}

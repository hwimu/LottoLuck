
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
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '의견을 입력해주세요.'),
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
      title: '',
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
      title: data.title,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="게시물 제목을 입력하세요." {...field} />
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
              <FormLabel>의견</FormLabel>
              <FormControl>
                <Textarea placeholder="의견을 자유롭게 공유해보세요." {...field} />
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


'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export interface Post {
  id: string;
  author: string;
  title: string;
  content: string;
  votes: number;
  voters: string[];
  comments: Comment[];
  date: string;
}

interface Comment {
  author: string;
  text: string;
  date: string;
}

interface PostCardProps {
  post: Post;
  onUpdate: (post: Post) => void;
  currentUserEmail: string;
}

export function PostCard({ post, onUpdate, currentUserEmail }: PostCardProps) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();
  
  const hasVoted = post.voters?.includes(currentUserEmail);

  const handleVote = () => {
    const updatedPost = { ...post };
    if (hasVoted) {
      updatedPost.votes -= 1;
      updatedPost.voters = updatedPost.voters.filter(voter => voter !== currentUserEmail);
    } else {
      updatedPost.votes += 1;
      updatedPost.voters = [...(updatedPost.voters || []), currentUserEmail];
    }
    onUpdate(updatedPost);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      author: user.email,
      text: newComment,
      date: new Date().toISOString(),
    };
    
    const updatedPost = { ...post, comments: [...post.comments, comment] };
    onUpdate(updatedPost);
    setNewComment('');
  };

  return (
    <Card className="shadow-lg border w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl font-bold">
                    {post.title}
                </CardTitle>
                 <p className="text-sm text-muted-foreground pt-1">
                    작성자: {post.author.split('@')[0]}
                </p>
            </div>
          <p className="text-sm text-muted-foreground text-right shrink-0">
            {new Date(post.date).toLocaleDateString('ko-KR')}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-0">
        <CardDescription className="text-base text-foreground bg-muted p-4 rounded-lg whitespace-pre-wrap">{post.content}</CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 p-6 pt-0">
        <div className="flex items-center gap-4">
          <Button variant={hasVoted ? "default" : "outline"} onClick={handleVote} size="sm">
            <ThumbsUp className={`mr-2 h-4 w-4 ${hasVoted ? '' : ''}`} />
            추천 ({post.votes})
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            댓글 ({post.comments.length})
          </Button>
        </div>
        {showComments && (
          <div className="w-full space-y-4 pt-4 border-t mt-4">
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {post.comments.length > 0 ? post.comments.map((comment, index) => (
                    <div key={index} className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-semibold">{comment.author.split('@')[0]}</p>
                        <p className="text-sm text-foreground">{comment.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(comment.date).toLocaleString('ko-KR')}</p>
                    </div>
                )) : <p className="text-sm text-muted-foreground">아직 댓글이 없습니다.</p>}
            </div>
            <form onSubmit={handleAddComment} className="flex gap-2 w-full">
              <Input
                type="text"
                placeholder="댓글을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button type="submit">등록</Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

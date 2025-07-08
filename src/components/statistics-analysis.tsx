"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { analyzeLottoStatistics, type AnalyzeLottoStatisticsOutput } from "@/ai/flows/analyze-lotto-statistics";
import { LottoBall } from "./lotto-ball";
import { Sparkles } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  pastWinningNumbers: z.string().min(1, "과거 당첨 번호를 입력해주세요."),
});

type FormData = z.infer<typeof FormSchema>;

export function StatisticsAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeLottoStatisticsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pastWinningNumbers: "8, 12, 17, 25, 33, 41, 6, 22, 29, 30, 31, 38, 4, 15, 16, 21, 27, 43",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeLottoStatistics(data);
      setAnalysisResult(result);

      // Save to history
      const newHistoryEntry = {
        date: new Date().toLocaleDateString('ko-KR'),
        combinations: [result.recommendedNumbers.split(',').map(n => parseInt(n.trim(), 10))],
      };
      
      const existingHistoryString = localStorage.getItem('lottoHistory');
      const existingHistory = existingHistoryString ? JSON.parse(existingHistoryString) : [];
      const updatedHistory = [newHistoryEntry, ...existingHistory];
      localStorage.setItem('lottoHistory', JSON.stringify(updatedHistory));

    } catch (error) {
      console.error("Error analyzing statistics:", error);
      toast({
        variant: "destructive",
        title: "분석 오류",
        description: "통계 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl border-primary/20 border">
      <CardHeader className="p-8">
        <CardTitle className="flex items-center gap-3 text-3xl font-bold">
          <Sparkles className="text-primary w-8 h-8" />
          AI 통계 분석
        </CardTitle>
        <CardDescription className="text-lg pt-1">과거 당첨 번호를 입력하여 AI의 분석과 추천 번호를 받아보세요.</CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pastWinningNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">과거 당첨 번호 (쉼표로 구분)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="예: 8, 12, 17, 25, 33, 41"
                      className="resize-none h-32 text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full h-14 text-xl" disabled={isLoading}>
              {isLoading ? "분석 중..." : "분석 시작"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || analysisResult) && (
        <CardFooter className="flex flex-col items-start gap-6 p-8 pt-0 mt-6 border-t">
          {isLoading && (
            <div className="w-full space-y-6 animate-pulse pt-6">
              <h3 className="font-semibold text-xl">AI 분석 결과</h3>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <div className="flex flex-wrap gap-4 mt-2">
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="w-14 h-14 rounded-full" />
              </div>
            </div>
          )}
          {analysisResult && (
            <div className="space-y-6 w-full pt-6">
              <h3 className="font-semibold text-xl">AI 분석 결과</h3>
              <div>
                <h4 className="font-semibold mb-2 text-lg">분석 요약</h4>
                <p className="text-base text-muted-foreground p-4 bg-muted rounded-lg">{analysisResult.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">AI 추천 번호</h4>
                <div className="flex flex-wrap gap-4">
                  {analysisResult.recommendedNumbers.split(',').map((num) => (
                    <LottoBall key={num} number={num.trim()} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

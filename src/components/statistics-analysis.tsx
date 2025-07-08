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
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="text-primary w-7 h-7" />
          AI 통계 분석
        </CardTitle>
        <CardDescription>과거 당첨 번호를 입력하여 AI의 분석과 추천 번호를 받아보세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pastWinningNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>과거 당첨 번호 (쉼표로 구분)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="예: 8, 12, 17, 25, 33, 41"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "분석 중..." : "분석 시작"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || analysisResult) && (
        <CardFooter className="flex flex-col items-start gap-4 mt-4">
          {isLoading && (
            <div className="w-full space-y-4 animate-pulse">
              <h3 className="font-semibold text-lg">AI 분석 결과</h3>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            </div>
          )}
          {analysisResult && (
            <div className="space-y-4 w-full">
              <h3 className="font-semibold text-lg">AI 분석 결과</h3>
              <div>
                <h4 className="font-semibold mb-2">분석 요약</h4>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">{analysisResult.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI 추천 번호</h4>
                <div className="flex flex-wrap gap-2">
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

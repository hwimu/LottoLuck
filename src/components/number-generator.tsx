"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateLottoNumbers, type GenerateLottoNumbersOutput } from "@/ai/flows/generate-lotto-numbers";
import { LottoBall } from "./lotto-ball";
import { Cpu } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const numberStringRegex = /^\s*(\d{1,2}\s*,\s*)*\d{1,2}\s*$/;

const FormSchema = z.object({
  numCombinations: z.coerce.number().min(1, "최소 1개 이상의 조합을 생성해야 합니다.").max(10, "최대 10개까지만 생성할 수 있습니다."),
  preferredNumbers: z.string().optional().refine((val) => !val || val.trim() === '' || numberStringRegex.test(val), { message: "숫자와 쉼표만 사용 가능합니다. 예: 7, 14, 21" }),
  excludedNumbers: z.string().optional().refine((val) => !val || val.trim() === '' || numberStringRegex.test(val), { message: "숫자와 쉼표만 사용 가능합니다. 예: 1, 45" }),
});

type FormData = z.infer<typeof FormSchema>;

type HistoryEntry = {
  date: string;
  combinations: number[][];
};


export function NumberGenerator() {
  const [generatedNumbers, setGeneratedNumbers] = useState<GenerateLottoNumbersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numCombinations: 5,
      preferredNumbers: "",
      excludedNumbers: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedNumbers(null);
    
    const parseNumbers = (nums?: string): number[] => {
      if (!nums || nums.trim() === '') return [];
      return nums.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n) && n >= 1 && n <= 45);
    };

    try {
      const result = await generateLottoNumbers({
        numCombinations: data.numCombinations,
        preferredNumbers: parseNumbers(data.preferredNumbers),
        excludedNumbers: parseNumbers(data.excludedNumbers),
      });
      setGeneratedNumbers(result);

      try {
        const today = new Date().toLocaleDateString('ko-KR');
        const newCombinations = result.combinations;
        
        const existingHistoryJSON = localStorage.getItem('lottoHistory');
        const existingHistory: HistoryEntry[] = existingHistoryJSON ? JSON.parse(existingHistoryJSON) : [];

        const todayEntryIndex = existingHistory.findIndex(entry => entry.date === today);

        let updatedHistory: HistoryEntry[];

        if (todayEntryIndex > -1) {
          const todayEntry = existingHistory[todayEntryIndex];
          todayEntry.combinations = [...newCombinations, ...todayEntry.combinations];
          updatedHistory = [...existingHistory];
        } else {
          updatedHistory = [{ date: today, combinations: newCombinations }, ...existingHistory];
        }

        const limitedHistory = updatedHistory.slice(0, 100);
        
        localStorage.setItem('lottoHistory', JSON.stringify(limitedHistory));
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }

    } catch (error) {
      console.error("Error generating numbers:", error);
      toast({
        variant: "destructive",
        title: "생성 오류",
        description: "번호 생성 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Cpu className="text-primary w-7 h-7" />
          AI 맞춤 번호 생성
        </CardTitle>
        <CardDescription>원하는 번호를 포함하거나 제외하여 맞춤형 로또 번호를 생성하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="numCombinations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>생성할 조합 수</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>포함할 번호 (선택)</FormLabel>
                  <FormControl>
                    <Input placeholder="쉼표로 구분. 예: 7, 14" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excludedNumbers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제외할 번호 (선택)</FormLabel>
                  <FormControl>
                    <Input placeholder="쉼표로 구분. 예: 1, 45" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold" disabled={isLoading}>
              {isLoading ? "생성 중..." : "🍀 행운 번호 생성"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || generatedNumbers) && (
        <CardFooter className="flex flex-col items-start gap-4 mt-4">
            {isLoading && Array.from({ length: form.getValues('numCombinations') || 3 }).map((_, i) => (
                <div key={i} className="flex gap-2 p-2 w-full animate-pulse">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                </div>
            ))}
          {generatedNumbers && (
            <div className="space-y-3 w-full">
                <h3 className="font-semibold text-lg">AI 추천 조합</h3>
                {generatedNumbers.combinations.map((combo, index) => (
                    <div key={index} className="flex flex-wrap gap-2 p-3 rounded-lg bg-muted">
                        {combo.map((num) => (
                            <LottoBall key={`${index}-${num}`} number={num} />
                        ))}
                    </div>
                ))}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

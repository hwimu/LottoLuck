import { Header } from "@/components/header";
import { StatisticsAnalysis } from "@/components/statistics-analysis";

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
            <div className="w-full max-w-4xl">
                <StatisticsAnalysis />
            </div>
        </div>
      </main>
      <footer className="py-8 mt-16 text-center text-muted-foreground text-sm border-t">
        © {new Date().getFullYear()} LottoLuck. All rights reserved.
      </footer>
    </div>
  );
}

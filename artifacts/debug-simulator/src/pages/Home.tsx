import { useGetPlatforms, useGetSelfHealingData, useGetAutomationPipeline, useGetPlatformsComparison } from "@workspace/api-client-react";
import DebugSimulator from "@/components/DebugSimulator";

export default function Home() {
  const { data: platforms, isLoading: platformsLoading } = useGetPlatforms();
  const { data: selfHealingData, isLoading: selfHealingLoading } = useGetSelfHealingData();
  const { data: pipelineData, isLoading: pipelineLoading } = useGetAutomationPipeline();
  const { data: comparisonData, isLoading: comparisonLoading } = useGetPlatformsComparison();

  if (platformsLoading || selfHealingLoading || pipelineLoading || comparisonLoading) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-foreground font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary text-sm uppercase tracking-widest">Initializing Simulator...</p>
        </div>
      </div>
    );
  }

  if (!platforms || !selfHealingData || !pipelineData || !comparisonData) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-foreground font-mono">
        <p className="text-destructive uppercase tracking-widest">Failed to load platform data</p>
      </div>
    );
  }

  return <DebugSimulator platforms={platforms} selfHealingData={selfHealingData} pipelineData={pipelineData} comparisonData={comparisonData} />;
}

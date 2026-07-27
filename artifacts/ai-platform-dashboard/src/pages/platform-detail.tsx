import { useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  useGetPlatforms,
  useGetPlatformsComparison,
  useGetPlatformFeatures,
  useGetSelfHealingData,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, X } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import AppNav from "@/components/AppNav";

export default function PlatformDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { data: platforms = [] } = useGetPlatforms();
  const { data: comparisons = [] } = useGetPlatformsComparison();
  const { data: features = [] } = useGetPlatformFeatures();
  const { data: selfHealing = [] } = useGetSelfHealingData();

  const platform = platforms.find((p) => p.id === id);
  const comparison = comparisons.find((c) => c.platform === platform?.name);
  const feature = features.find((f) => f.platform === platform?.name);
  const healing = selfHealing.find((s) => s.platform === platform?.name);

  const gridColor = isDark ? "rgba(255,255,255,0.08)" : "#e5e5e5";
  const tickColor = isDark ? "#98999C" : "#71717a";

  if (!platform && platforms.length > 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AppNav isDark={isDark} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Platform not found.</p>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-primary hover:underline"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const radarData = comparison
    ? [
        { metric: "Autonomy", value: comparison.autonomy },
        { metric: "Code Quality", value: comparison.codeQuality },
        { metric: "Infrastructure", value: comparison.infrastructure },
        { metric: "Self-Healing", value: comparison.selfHealing },
        { metric: "Deploy Ease", value: comparison.deploymentEase },
        { metric: "Collaboration", value: comparison.collaboration },
      ]
    : [];

  const featureList = feature
    ? [
        { label: "Auto Testing", value: feature.autoTesting },
        { label: "Self-Healing", value: feature.selfHealing },
        { label: "CI/CD Integration", value: feature.ciCdIntegration },
        { label: "Multi-Agent", value: feature.multiAgent },
        { label: "Infra Provisioning", value: feature.infraProvisioning },
        { label: "One-Click Deploy", value: feature.oneClickDeploy },
        { label: "No-Code Interface", value: feature.noCodeInterface },
        { label: "Open Source", value: feature.openSource },
        { label: "Multi-Model", value: feature.multiModel },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <AppNav isDark={isDark} />
      <div className="px-3 py-4 sm:px-6 sm:pb-10 max-w-[1000px] mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {!platform ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 w-full rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex flex-wrap items-start gap-3 mb-1">
                <h1 className="text-[28px] sm:text-[34px] font-bold leading-tight">
                  {platform.name}
                </h1>
                {platform.openSource && (
                  <Badge variant="secondary" className="mt-2">Open Source</Badge>
                )}
                {platform.selfHosted && (
                  <Badge variant="outline" className="mt-2">Self-Hosted</Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                {platform.company} · {platform.type}
              </p>
              <p className="text-base leading-relaxed">{platform.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">Automation Level</div>
                  <div className="text-2xl font-bold" style={{ color: "#0079F2" }}>
                    {platform.automationLevel}
                    <span className="text-sm font-normal text-muted-foreground">/10</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all"
                      style={{
                        width: `${platform.automationLevel * 10}%`,
                        backgroundColor: "#0079F2",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">Deployment Type</div>
                  <div className="text-base font-semibold">{platform.deploymentType}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-2">Key Differentiator</div>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {platform.keyDifferentiator}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {radarData.length > 0 && (
                <Card>
                  <CardHeader className="px-4 pt-4 pb-2">
                    <CardTitle className="text-base">Capability Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={260}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke={gridColor} />
                        <PolarAngleAxis
                          dataKey="metric"
                          tick={{ fontSize: 11, fill: tickColor }}
                        />
                        <PolarRadiusAxis
                          domain={[0, 10]}
                          tick={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDark ? "#18181b" : "#fff",
                            borderColor: isDark ? "#27272a" : "#e4e4e7",
                            fontSize: 12,
                          }}
                        />
                        <Radar
                          name={platform.name}
                          dataKey="value"
                          stroke="#0079F2"
                          fill="#0079F2"
                          fillOpacity={0.4}
                          isAnimationActive={false}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {featureList.length > 0 && (
                <Card>
                  <CardHeader className="px-4 pt-4 pb-2">
                    <CardTitle className="text-base">Feature Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                      {featureList.map(({ label, value }) => (
                        <div key={label} className="flex items-center gap-2 text-sm">
                          {value ? (
                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-green-500" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <X className="w-3 h-3 text-muted-foreground" />
                            </div>
                          )}
                          <span className={value ? "text-foreground" : "text-muted-foreground"}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {healing && (
              <Card>
                <CardHeader className="px-4 pt-4 pb-2">
                  <CardTitle className="text-base">Self-Healing Debug Loop</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Loop Structure", value: healing.loopStructure },
                      { label: "Error Detection", value: healing.errorDetection },
                      { label: "Patching Method", value: healing.patchingMethod },
                      { label: "Stopping Condition", value: healing.stoppingCondition },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-3 rounded-lg border bg-card">
                        <div className="text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="text-sm leading-relaxed">{value || "N/A"}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

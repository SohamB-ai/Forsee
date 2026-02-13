"use client";

import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

interface RecommendedActionProps {
  action: string;
}

export function RecommendedAction({ action }: RecommendedActionProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
      <div className="p-3 rounded-full bg-primary/10 text-primary mt-1 hidden sm:flex">
        <Wrench className="h-6 w-6" />
      </div>
      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <Wrench className="h-5 w-5 sm:hidden text-primary" />
            Recommended Action
          </h3>
          <p className="text-muted-foreground">{action}</p>
        </div>

        {/* Decision Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-black/20 p-4 rounded-lg border border-white/5">
          <div>
            <h4 className="font-semibold text-white mb-2">Why this action?</h4>
            <ul className="space-y-1 text-gray-400 list-disc list-inside">
              <li>Failure cluster match: <span className="text-purple-300">87%</span></li>
              <li>RUL fell below safety buffer</li>
              <li>Degradation velocity &gt; threshold</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-300 mb-2">If delayed 7 days:</h4>
            <ul className="space-y-1 text-gray-400 list-disc list-inside">
              <li>Failure probability: <span className="text-red-400">42%</span></li>
              <li>Est. collateral cost: <span className="text-red-400">+$38,000</span></li>
            </ul>
          </div>
        </div>

        <Button variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10">
          Generate Work Order
        </Button>
      </div>
    </div>
  );
}

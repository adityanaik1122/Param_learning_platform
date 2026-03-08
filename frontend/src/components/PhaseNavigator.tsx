import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ChevronRight, Trophy, BookOpen, Brain, Code, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';

interface Phase {
  id: number;
  title: string;
  topics: string[];
  completedLessons: number;
  totalLessons: number;
}

interface PhaseNavigatorProps {
  phases: Phase[];
  currentPhase: number;
  onPhaseSelect: (phaseId: number) => void;
}

const phaseIcons = [
  Code,      // Phase 0: Python
  Brain,     // Phase 1: ML Intro
  BookOpen,  // Phase 2: Math
  Code,      // Phase 3: Python Engineering
  Rocket,    // Phase 4: Classical ML
  Trophy     // Phase 5+
];

export function PhaseNavigator({ phases, currentPhase, onPhaseSelect }: PhaseNavigatorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Learning Phases</h2>
        <Badge variant="outline">
          {phases.filter(p => p.completedLessons === p.totalLessons).length} / {phases.length} Complete
        </Badge>
      </div>
      
      {phases.map((phase, index) => {
        const Icon = phaseIcons[index] || BookOpen;
        const progress = phase.totalLessons > 0 
          ? (phase.completedLessons / phase.totalLessons) * 100 
          : 0;
        const isComplete = phase.completedLessons === phase.totalLessons && phase.totalLessons > 0;
        const isCurrent = phase.id === currentPhase;
        
        return (
          <Card
            key={phase.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              isCurrent && "ring-2 ring-primary shadow-lg",
              isComplete && "border-green-500/50 bg-green-50/30 dark:bg-green-950/10"
            )}
            onClick={() => onPhaseSelect(phase.id)}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    isComplete && "bg-green-500 text-white",
                    isCurrent && !isComplete && "bg-primary text-primary-foreground",
                    !isCurrent && !isComplete && "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm truncate">{phase.title}</h3>
                    <ChevronRight className={cn(
                      "h-4 w-4 shrink-0 transition-transform",
                      isCurrent && "translate-x-1"
                    )} />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {phase.completedLessons} / {phase.totalLessons} lessons completed
                  </p>
                  
                  <Progress value={progress} className="h-1.5" />
                  
                  {phase.topics.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {phase.topics.slice(0, 2).map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {phase.topics.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{phase.topics.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

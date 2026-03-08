import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, Circle, Lock, PlayCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModuleCardProps {
  title: string;
  description: string;
  moduleNumber: number;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  progress: number;
  onClick: () => void;
  topics?: string[];
}

export function ModuleCard({
  title,
  description,
  moduleNumber,
  isCompleted,
  isLocked,
  isCurrent,
  progress,
  onClick,
  topics = []
}: ModuleCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-[1.02]",
        isCurrent && "ring-2 ring-primary shadow-lg",
        isLocked && "opacity-60 cursor-not-allowed",
        isCompleted && "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                isCompleted && "bg-green-500 text-white",
                isCurrent && "bg-primary text-primary-foreground",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : isLocked ? (
                <Lock className="h-5 w-5" />
              ) : isCurrent ? (
                <PlayCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">
                Module {moduleNumber}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {isCompleted ? 'Completed' : isLocked ? 'Locked' : isCurrent ? 'In Progress' : 'Not Started'}
              </CardDescription>
            </div>
          </div>
          {isCompleted && (
            <Badge variant="success" className="ml-2">
              ✓ Done
            </Badge>
          )}
          {isCurrent && !isCompleted && (
            <Badge variant="default" className="ml-2">
              Current
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <h3 className="font-semibold text-sm line-clamp-2">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        
        {topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {topics.slice(0, 3).map((topic, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{topics.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {!isCompleted && !isLocked && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

interface LessonContentPanelProps {
  title: string;
  description: string;
  moduleNumber: number;
  totalModules: number;
  isCompleted: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onMarkComplete: () => void;
}

export function LessonContentPanel({
  title,
  description,
  moduleNumber,
  totalModules,
  isCompleted,
  onPrevious,
  onNext,
  onMarkComplete
}: LessonContentPanelProps) {
  return (
    <Card className="h-full flex flex-col border-0 shadow-none">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  Module {moduleNumber} of {totalModules}
                </Badge>
                {isCompleted && (
                  <Badge variant="success" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="p-6 prose prose-sm max-w-none dark:prose-invert">
            <MarkdownRenderer content={description} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button
            variant={isCompleted ? "outline" : "default"}
            size="sm"
            onClick={onMarkComplete}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </>
            ) : (
              <>
                Mark as Complete
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!onNext}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

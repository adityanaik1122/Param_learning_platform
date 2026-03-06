import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Play, RotateCcw, Copy, Check, Terminal, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface CodeEditorPanelProps {
  code: string;
  output: string;
  error: string;
  image: string | null;
  isRunning: boolean;
  onCodeChange: (value: string | undefined) => void;
  onRun: () => void;
  onReset: () => void;
}

export function CodeEditorPanel({
  code,
  output,
  error,
  image,
  isRunning,
  onCodeChange,
  onRun,
  onReset
}: CodeEditorPanelProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'image'>('output');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Editor Section */}
      <Card className="flex-1 flex flex-col border-0 shadow-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Code Editor</CardTitle>
              <Badge variant="outline" className="text-xs">Python</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="h-8"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onRun}
                disabled={isRunning}
                className="h-8"
              >
                <Play className="h-3.5 w-3.5 mr-1" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={onCodeChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
            }}
          />
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="h-64 flex flex-col border-t-2 border-primary/20 shadow-none">
        <CardHeader className="pb-2">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="output" className="text-xs">
                <Terminal className="h-3.5 w-3.5 mr-1" />
                Console Output
                {error && <Badge variant="destructive" className="ml-2 h-4 px-1 text-xs">Error</Badge>}
              </TabsTrigger>
              <TabsTrigger value="image" className="text-xs" disabled={!image}>
                <ImageIcon className="h-3.5 w-3.5 mr-1" />
                Visualization
                {image && <Badge variant="success" className="ml-2 h-4 px-1 text-xs">Ready</Badge>}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="output" className="h-full m-0 p-4">
              <ScrollArea className="h-full">
                {error ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-semibold text-sm">Error</span>
                    </div>
                    <pre className="text-xs text-destructive bg-destructive/10 p-3 rounded-md overflow-x-auto">
                      {error}
                    </pre>
                  </div>
                ) : output ? (
                  <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Run your code to see output here</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="image" className="h-full m-0 p-4">
              {image ? (
                <ScrollArea className="h-full">
                  <img
                    src={image}
                    alt="Output visualization"
                    className="max-w-full h-auto rounded-lg border"
                  />
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No visualization generated yet</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

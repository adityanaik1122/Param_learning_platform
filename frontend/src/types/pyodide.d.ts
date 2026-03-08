/**
 * TypeScript declarations for Pyodide
 */

interface Window {
  loadPyodide: (config?: {
    indexURL?: string;
    fullStdLib?: boolean;
  }) => Promise<PyodideInterface>;
}

interface PyodideInterface {
  runPython(code: string): any;
  runPythonAsync(code: string): Promise<any>;
  loadPackage(packages: string | string[]): Promise<void>;
  globals: any;
  FS: any;
  pyimport(name: string): any;
}

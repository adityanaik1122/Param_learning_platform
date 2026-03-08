/**
 * Pyodide Runner Utility
 * Handles in-browser Python execution using Pyodide for ML/AI code
 */

let pyodideInstance: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

export interface ExecutionResult {
  output: string;
  error: string;
  executionTime: number;
  success: boolean;
}

/**
 * Initialize Pyodide with ML packages
 */
export async function initPyodide(): Promise<any> {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (isLoading && loadPromise) {
    return loadPromise;
  }

  isLoading = true;
  loadPromise = (async () => {
    try {
      // @ts-ignore - Pyodide is loaded from CDN
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      });

      // Pre-load common ML packages
      console.log('Loading Python packages...');
      await pyodide.loadPackage(['numpy', 'pandas', 'matplotlib', 'scikit-learn']);
      
      // Setup matplotlib for inline plotting and suppress warnings
      await pyodide.runPythonAsync(`
        import warnings
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        import io
        import base64
        
        # Suppress matplotlib backend warnings
        warnings.filterwarnings('ignore', category=UserWarning, module='matplotlib')
        
        def get_plot_base64():
            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight')
            buf.seek(0)
            img_str = base64.b64encode(buf.read()).decode('utf-8')
            plt.close()
            return img_str
      `);

      pyodideInstance = pyodide;
      console.log('Pyodide initialized with ML packages');
      return pyodide;
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
      throw error;
    } finally {
      isLoading = false;
    }
  })();

  return loadPromise;
}

/**
 * Execute Python code in browser using Pyodide
 */
export async function executePythonCode(code: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  
  try {
    // Initialize Pyodide if not already loaded
    const pyodide = await initPyodide();

    // Capture stdout
    let output = '';
    let errorOutput = '';
    let plotImage = '';

    // Setup stdout/stderr capture with warning suppression
    await pyodide.runPythonAsync(`
      import sys
      import warnings
      from io import StringIO
      
      # Suppress matplotlib warnings
      warnings.filterwarnings('ignore', category=UserWarning, module='matplotlib')
      
      # Capture stdout
      sys.stdout = StringIO()
      sys.stderr = StringIO()
    `);

    try {
      // Execute user code
      await pyodide.runPythonAsync(code);

      // Get stdout output
      output = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      errorOutput = await pyodide.runPythonAsync('sys.stderr.getvalue()');

      // Filter out matplotlib backend warnings from stderr
      if (errorOutput) {
        const lines = errorOutput.split('\n');
        const filteredLines = lines.filter(line => 
          !line.includes('Matplotlib is currently using agg') &&
          !line.includes('non-GUI backend') &&
          !line.includes('UserWarning')
        );
        errorOutput = filteredLines.join('\n').trim();
      }

      // Check if there's a plot to capture
      const hasPlot = await pyodide.runPythonAsync(`
        import matplotlib.pyplot as plt
        bool(plt.get_fignums())
      `);

      if (hasPlot) {
        plotImage = await pyodide.runPythonAsync('get_plot_base64()');
        if (plotImage) {
          output += `\n\n[Plot generated - displayed below]`;
        }
      }

    } catch (execError: any) {
      errorOutput = execError.message || String(execError);
    } finally {
      // Reset stdout/stderr
      await pyodide.runPythonAsync(`
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__
      `);
    }

    const executionTime = (performance.now() - startTime) / 1000;

    return {
      output: output || 'Code executed successfully (no output)',
      error: errorOutput,
      executionTime,
      success: !errorOutput,
    };

  } catch (error: any) {
    const executionTime = (performance.now() - startTime) / 1000;
    return {
      output: '',
      error: `Pyodide Error: ${error.message || String(error)}`,
      executionTime,
      success: false,
    };
  }
}

/**
 * Check if Pyodide is ready
 */
export function isPyodideReady(): boolean {
  return pyodideInstance !== null;
}

/**
 * Get loading status
 */
export function isPyodideLoading(): boolean {
  return isLoading;
}

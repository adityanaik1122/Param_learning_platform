from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from sandbox_manager import execute_code

app = FastAPI(title="Param Learning Compiler API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeExecutionRequest(BaseModel):
    code: str
    language: str = "python"
    timeout: int = 10

class CodeExecutionResponse(BaseModel):
    output: str
    error: str = ""
    execution_time: float
    image: Optional[str] = None

@app.get("/")
def read_root():
    return {"message": "Param Learning Compiler API", "status": "running"}

@app.post("/execute", response_model=CodeExecutionResponse)
async def execute_code_endpoint(request: CodeExecutionRequest):
    try:
        result = await execute_code(
            code=request.code,
            language=request.language,
            timeout=request.timeout
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="info")

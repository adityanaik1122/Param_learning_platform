export default function TestPage() {
  const handleClick = () => {
    alert('Button clicked!');
    console.log('Button clicked!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0e1a',
      color: 'white',
      padding: '2rem'
    }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '3rem' }}>
        Click Test Page
      </h1>
      
      <button
        onClick={handleClick}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.5rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        Click Me!
      </button>

      <div
        onClick={handleClick}
        style={{
          padding: '2rem',
          background: '#10b981',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        Click this div!
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          alert('Link clicked!');
          console.log('Link clicked!');
        }}
        style={{
          color: '#3b82f6',
          fontSize: '1.2rem',
          textDecoration: 'underline'
        }}
      >
        Click this link!
      </a>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>If nothing happens when you click, check the browser console (F12)</p>
        <p>Look for "Button clicked!" or "Link clicked!" messages</p>
      </div>
    </div>
  );
}

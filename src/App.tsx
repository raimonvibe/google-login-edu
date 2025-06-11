import { useState } from 'react'
import { Code, Play, CheckCircle, ExternalLink, Globe, Settings, Eye, Key, Shield, Monitor } from 'lucide-react'
import './App.css'

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  const copyToClipboard = async (text: string, buttonId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(buttonId)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setCopySuccess(`error-${buttonId}`)
      setTimeout(() => setCopySuccess(null), 2000)
    }
  }

  const steps = [
    {
      title: "Navigate to Google Cloud Console",
      description: "Access Google Cloud Console and create your project",
      detailedSteps: [
        "Go to https://console.cloud.google.com/",
        "Sign in with your Google account",
        "Click 'Select a project' dropdown at the top",
        "Click 'NEW PROJECT' button",
        "Enter your project name (e.g., 'My Login App')",
        "Click 'CREATE' and wait for project creation"
      ],
      code: `// Step 1: Access Google Cloud Console
https://console.cloud.google.com`,
      completed: false
    },
    {
      title: "Enable Google Identity Services",
      description: "Enable the required APIs for Google Sign-In",
      detailedSteps: [
        "In your project dashboard, click 'APIs & Services' in left menu",
        "Click 'Library' to browse available APIs",
        "Search for 'Google Identity Services API'",
        "Click on the API and press 'ENABLE'",
        "Wait for the API to be enabled (may take a few minutes)"
      ],
      code: `// Required API: Google Identity Services API`,
      completed: false
    },
    {
      title: "Create OAuth 2.0 Credentials",
      description: "Set up OAuth credentials for your web application",
      detailedSteps: [
        "Go to 'APIs & Services' > 'Credentials'",
        "Click '+ CREATE CREDENTIALS' > 'OAuth client ID'",
        "If prompted, configure OAuth consent screen first",
        "Select 'Web application' as application type",
        "Enter name for your OAuth client",
        "Add authorized JavaScript origins (e.g., http://localhost:3000)",
        "Add authorized redirect URIs if needed",
        "Click 'CREATE' and copy your Client ID"
      ],
      code: `// Your OAuth 2.0 Client ID will look like:
// 123456789-abcdefghijklmnop.apps.googleusercontent.com`,
      completed: false
    },
    {
      title: "Configure OAuth Consent Screen",
      description: "Set up the consent screen users will see",
      detailedSteps: [
        "Go to 'APIs & Services' > 'OAuth consent screen'",
        "Choose 'External' user type (unless you have Google Workspace)",
        "Fill in required fields: App name, User support email",
        "Add your email in Developer contact information",
        "Add scopes: email, profile, openid (basic scopes)",
        "Add test users if app is in testing mode",
        "Save and continue through all steps"
      ],
      code: `// Required OAuth scopes for basic login:`,
      completed: false
    },
    {
      title: "Include Google Identity Services",
      description: "Add the new Google Identity Services library",
      detailedSteps: [
        "Add the Google Identity Services script to your HTML head",
        "Include your OAuth client ID in a meta tag",
        "The new library replaces the old platform.js",
        "Initialize the Google Identity Services in your JavaScript"
      ],
      code: `<!-- Add to your HTML <head> section -->
<script src="https://accounts.google.com/gsi/client" async defer></script>
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">

<!-- Alternative: Load library dynamically -->
<script>
  window.onload = function() {
    google.accounts.id.initialize({
      client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
  }
</script>`,
      completed: false
    },
    {
      title: "Create the Sign-In Button",
      description: "Add Google Sign-In button with modern styling",
      detailedSteps: [
        "Use the new Google Identity Services button",
        "Configure button appearance and behavior",
        "Set up callback function for handling responses",
        "Style the button to match your design"
      ],
      code: `<!-- Modern Google Sign-In Button -->
<div id="g_id_onload"
     data-client_id="YOUR_CLIENT_ID.apps.googleusercontent.com"
     data-callback="handleCredentialResponse">
</div>
<div class="g_id_signin" data-type="standard"></div>

<!-- Custom styled button -->
<button id="custom-signin" class="google-signin-btn">
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  Sign in with Google
</button>`,
      completed: false
    },
    {
      title: "Handle Authentication Response",
      description: "Process the JWT token from Google",
      detailedSteps: [
        "Create callback function to handle the credential response",
        "Decode the JWT token to get user information",
        "Verify the token on your backend (recommended)",
        "Update your UI based on authentication state"
      ],
      code: `function handleCredentialResponse(response) {
  const credential = response.credential;
  
  const payload = JSON.parse(atob(credential.split('.')[1]));
  
  console.log('User Info:', {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  });
  
  fetch('/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ credential: credential })
  })
  .then(response => response.json())
  .then(data => {
    updateUI(data.user);
  })
  .catch(error => {
    console.error('Authentication error:', error);
  });
}`,
      completed: false
    },
    {
      title: "Implement Sign-Out",
      description: "Add sign-out functionality",
      detailedSteps: [
        "Use Google Identity Services revoke method",
        "Clear user session data",
        "Reset UI to signed-out state",
        "Handle sign-out errors gracefully"
      ],
      code: `function signOut() {
  google.accounts.id.disableAutoSelect();
  
  clearUserSession();
  
  document.getElementById('signin-section').style.display = 'block';
  document.getElementById('user-section').style.display = 'none';
  
  console.log('User signed out successfully');
}

function clearUserSession() {
  localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
}`,
      completed: false
    }
  ]

  const demoCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Sign-In Demo</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .google-signin-btn {
            display: flex;
            align-items: center;
            gap: 10px;
            background: white;
            color: #333;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: box-shadow 0.3s;
            margin: 20px 0;
        }
        .google-signin-btn:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .user-info {
            text-align: center;
            padding: 20px;
        }
        .user-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        .signout-btn {
            background: #ff4757;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Google Sign-In Demo</h1>
        <p>Click the button below to sign in with your Google account:</p>
        
        <div id="signin-section">
            <div id="g_id_onload"
                 data-client_id="YOUR_CLIENT_ID.apps.googleusercontent.com"
                 data-callback="handleCredentialResponse">
            </div>
            <div class="g_id_signin" data-type="standard" data-theme="filled_blue"></div>
        </div>
        
        <div id="user-section" class="user-info" style="display:none;">
            <img id="user-avatar" class="user-avatar" src="" alt="User Avatar">
            <h2 id="user-name"></h2>
            <p id="user-email"></p>
            <button id="signout-btn" class="signout-btn">Sign Out</button>
        </div>
    </div>

    <script>
        function handleCredentialResponse(response) {
            const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
            
            document.getElementById('signin-section').style.display = 'none';
            document.getElementById('user-section').style.display = 'block';
            
            document.getElementById('user-name').textContent = responsePayload.name;
            document.getElementById('user-email').textContent = responsePayload.email;
            document.getElementById('user-avatar').src = responsePayload.picture;
            
            console.log('User signed in:', responsePayload);
        }

        function signOut() {
            google.accounts.id.disableAutoSelect();
            document.getElementById('signin-section').style.display = 'block';
            document.getElementById('user-section').style.display = 'none';
            console.log('User signed out');
        }

        window.onload = function() {
            google.accounts.id.initialize({
                client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
                callback: handleCredentialResponse
            });
            
            document.getElementById('signout-btn').addEventListener('click', signOut);
        }
    </script>
</body>
</html>`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Google Login Tutorial</h1>
                <p className="text-purple-300">Complete guide to implementing Google OAuth with JavaScript</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="https://developers.google.com/identity/gsi/web" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Official Docs</span>
              </a>
              <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
                <span>Google Console</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Tutorial Steps
              </h2>
              <nav className="space-y-3">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                        activeStep === index ? 'bg-white text-purple-600' : 'bg-gray-600 text-white'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-medium text-sm">{step.title}</span>
                    </div>
                  </button>
                ))}
              </nav>
              
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center"
              >
                <Play className="w-4 h-4 mr-2" />
                {showDemo ? 'Hide Demo' : 'Show Complete Demo'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            {!showDemo ? (
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Step {activeStep + 1}: {steps[activeStep].title}
                  </h2>
                  <p className="text-purple-300 text-lg">{steps[activeStep].description}</p>
                </div>

                <div className="mb-6 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-400" />
                    Step-by-Step Instructions
                  </h3>
                  <ol className="text-purple-200 space-y-2">
                    {steps[activeStep].detailedSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Code Example</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(steps[activeStep].code, 'step-code')}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      {copySuccess === 'step-code' ? '✓ Copied!' : 
                       copySuccess === 'error-step-code' ? '✗ Failed' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{steps[activeStep].code}</code>
                  </pre>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Play className="w-6 h-6 mr-2 text-green-400" />
                  Complete Working Example
                </h2>
                
                <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Full HTML Example</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(demoCode, 'demo-code')}
                      className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                    >
                      {copySuccess === 'demo-code' ? '✓ Copied!' : 
                       copySuccess === 'error-demo-code' ? '✗ Failed' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto max-h-96 overflow-y-auto">
                    <code>{demoCode}</code>
                  </pre>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Key className="w-5 h-5 mr-2 text-yellow-400" />
                    🚀 Quick Start Guide
                  </h3>
                  <ol className="text-purple-200 space-y-2">
                    <li>1. Replace <code className="bg-gray-800 px-2 py-1 rounded text-yellow-300">YOUR_CLIENT_ID</code> with your actual Google OAuth client ID</li>
                    <li>2. Save the code as an HTML file</li>
                    <li>3. Serve it from a web server (not file:// protocol)</li>
                    <li>4. Test the Google Sign-In functionality</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Console Setup</h3>
            <p className="text-purple-300 text-sm">Detailed Google Cloud Console navigation with screenshots and step-by-step instructions.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Modern Code</h3>
            <p className="text-purple-300 text-sm">Updated examples using Google Identity Services API with JWT tokens.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Security Best Practices</h3>
            <p className="text-purple-300 text-sm">Learn proper token verification and security considerations.</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Live Demo</h3>
            <p className="text-purple-300 text-sm">Complete working example you can test and modify for your projects.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

const LoginPage = () => {
    return (
      <div className="flex flex-col min-h-screen justify-start items-center bg-gray-100 pt-16">
        <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Alpine!</h1>
          <p className="text-lg mb-8 text-center">
            Alpine is an AI-powered Knowledge Base and Chatbot for Customer Service Agents.
          </p>
          <p className="text-lg mb-8 text-center">
            It helps agents quickly find answers to customer queries, resulting in improved customer satisfaction and business success.
          </p>
          <p className="text-lg mb-8 text-center">
            To get started, please log in with your Pine-Mobile email address and password.
          </p>
          <a href="/api/auth/login" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 block w-full text-center font-semibold">
            Log In
          </a>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  
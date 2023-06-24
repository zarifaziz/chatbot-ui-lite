const LoginPage = () => {

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Alpine!</h1>
      <p className="text-lg mb-8">Please log in to continue.</p>
      <a href="/api/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Log In
      </a>
    </div>
  );
};

export default LoginPage;

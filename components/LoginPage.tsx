import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError('يرجى إدخال اسم المستخدم وكلمة المرور.');
            return;
        }
        setError('');
        // This is a mock login. In a real app, you'd validate credentials.
        onLogin();
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <div className="flex justify-center items-center space-x-4 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.799 12.522a8.03 8.03 0 01-1.258.974c-1.332.8-3.033 1.156-4.79.917-2.126-.288-3.92-1.42-4.9-3.153a5.836 5.836 0 01-.01-5.526c.98-1.733 2.774-2.865 4.9-3.153 1.757-.239 3.458.117 4.79.917a8.03 8.03 0 011.258.974" />
                    </svg>
                    <h1 className="text-3xl font-bold text-slate-100">تقارير المعلم AI</h1>
                </div>
                <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-purple-900/10 border border-slate-700">
                    <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">تسجيل الدخول</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">اسم المستخدم</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-slate-300 mb-1">كلمة المرور</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500"
                                autoComplete="current-password"
                            />
                        </div>

                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-purple-800 disabled:cursor-not-allowed"
                        >
                            تسجيل الدخول
                        </button>
                         <div className="text-center text-sm">
                            <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                                نسيت كلمة المرور؟
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">L</div>
                <span className="ml-3 font-semibold text-xl tracking-tight dark:text-white">AppBoard</span>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <div className="hidden md:flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
                <img className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-600" src="https://ui-avatars.com/api/?name=User&background=eff6ff&color=4f46e5" alt="User Profile" />
                <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-200">ユーザー名</span>
              </div>
              <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                ログアウト
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">ダッシュボード</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ログイン後のメイン画面（仮）</p>
          </div>
          <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md active:scale-95 duration-200">
            新規プロジェクト作成
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((card) => (
            <div key={card} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 transition-colors">
                  <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">プロジェクト {card}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">最終更新: 2時間前</p>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-slate-700 dark:text-slate-300">進捗</span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">{card * 25}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${card * 25}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

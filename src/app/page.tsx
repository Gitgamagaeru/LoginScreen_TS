import { auth, signOut } from "@/auth"
import Link from 'next/link';
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  // 未ログインの場合はログイン画面へリダイレクト
  if (!session) {
    redirect("/login");
  }

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
                <img 
                  className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-600" 
                  src={session.user?.image || "https://ui-avatars.com/api/?name=" + (session.user?.name || "User") + "&background=eff6ff&color=4f46e5"} 
                  alt="User Profile" 
                />
                <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {session.user?.name || session.user?.email || "ユーザー"}
                </span>
              </div>
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <button type="submit" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  ログアウト
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">ダッシュボード</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ログイン後のメイン画面（セッション取得済み）</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">現在のセッション情報</h2>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm text-slate-800 dark:text-slate-300">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}

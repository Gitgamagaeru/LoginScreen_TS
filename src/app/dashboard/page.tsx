import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const session = await auth();

    // 万が一、未ログインでこのページに来たらログイン画面へ戻す (Proxyでもガードしていますが念のため)
    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ダッシュボード</h1>
                        <p className="text-slate-500 text-sm">ようこそ、{session.user?.name} さん</p>
                    </div>

                    <form action={async () => {
                        'use server';
                        await signOut();
                    }}>
                        <button className="px-5 py-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl text-sm font-semibold transition-all">
                            ログアウト
                        </button>
                    </form>
                </header>

                <main className="grid gap-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-500/20">
                        <h2 className="text-xl font-bold mb-2">ログインに成功しました。</h2>
                        <p className="opacity-90">Google OAuth 認証と Prisma によるユーザー保存が正しく動作しています。</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

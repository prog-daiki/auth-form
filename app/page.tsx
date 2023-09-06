import AuthForm from "@/components/auth-form";

export default function Home() {
  return (
    <div className="flex h-full flex-col justify-center py-12 px-6  bg-gray-100 w-full ">
      <div className="mx-auto w-full max-w-lg">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          登録フォーム
        </h2>
      </div>
      <AuthForm />
    </div>

  )
}

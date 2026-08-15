import { AuthForm } from '@/components/shared/AuthForm'

type LoginPageProps = {
  searchParams: Promise<{ registered?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  return <AuthForm mode="login" showSuccess={params.registered === '1'} />
}

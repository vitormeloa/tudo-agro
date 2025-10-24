import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/login'

  if (code) {
    try {
      // Trocar o código de autorização por uma sessão
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${requestUrl.origin}/login?error=Erro ao confirmar email`)
      }

      if (data.user) {
        // Verificar se o usuário já existe na tabela users
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (userError && userError.code === 'PGRST116') {
          // Usuário não existe, criar perfil
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email || '',
              name: data.user.user_metadata?.name || null,
              phone: data.user.user_metadata?.phone || null,
              cpf: data.user.user_metadata?.cpf || null,
              cnpj: data.user.user_metadata?.cnpj || null,
              avatar_url: data.user.user_metadata?.avatar_url || null
            })

          if (insertError) {
            console.error('Error creating user profile:', insertError)
            return NextResponse.redirect(`${requestUrl.origin}/login?error=Erro ao criar perfil do usuário`)
          }

          // Atribuir role padrão de comprador
          const { data: roles } = await supabase
            .from('roles')
            .select('id')
            .eq('name', 'comprador')
            .single()

          if (roles) {
            await supabase
              .from('user_roles')
              .insert({
                user_id: data.user.id,
                role_id: roles.id
              })
          }
        }

        // Redirecionar para o painel com mensagem de sucesso
        return NextResponse.redirect(`${requestUrl.origin}/login?message=Email confirmado com sucesso! Faça login para continuar.`)
      }
    } catch (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=Erro interno do servidor`)
    }
  }

  // Se não há código, redirecionar para login
  return NextResponse.redirect(`${requestUrl.origin}/login`)
}
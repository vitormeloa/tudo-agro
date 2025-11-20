import { NextRequest, NextResponse } from 'next/server';
import { findBestAnswer, getDefaultResponse } from '@/lib/agroia-knowledge';
import { z } from 'zod';

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })),
  includeActions: z.boolean().optional()
});

/**
 * Determina se a resposta deve incluir uma ação (link/botão)
 */
function generateAction(answer: string): { label: string; link: string } | null {
  const lowerAnswer = answer.toLowerCase();

  // Sugerir ação baseada no conteúdo da resposta
  if (lowerAnswer.includes('leilão') || lowerAnswer.includes('leilões')) {
    return {
      label: 'Ver Leilões Disponíveis',
      link: '/dashboard/leiloes'
    };
  }

  if (lowerAnswer.includes('animal') || lowerAnswer.includes('gado') || lowerAnswer.includes('nelore')) {
    return {
      label: 'Explorar Animais',
      link: '/dashboard/animais'
    };
  }

  if (lowerAnswer.includes('sêmen') || lowerAnswer.includes('reprodução')) {
    return {
      label: 'Ver Produtos de Reprodução',
      link: '/dashboard/mercado-agro'
    };
  }

  if (lowerAnswer.includes('comprar') || lowerAnswer.includes('compra')) {
    return {
      label: 'Ir para Mercado',
      link: '/dashboard/mercado-agro'
    };
  }

  return null;
}

/**
 * API Route para processar mensagens do chat da AgroIA
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = chatSchema.parse(body);

    // Pega a última mensagem do usuário
    const lastMessage = validatedData.messages
      .filter(msg => msg.role === 'user')
      .pop();

    if (!lastMessage) {
      return NextResponse.json(
        { error: 'Nenhuma mensagem de usuário encontrada' },
        { status: 400 }
      );
    }

    // Busca a melhor resposta na base de conhecimento
    const result = findBestAnswer(lastMessage.content);

    let message: string;
    let action: { label: string; link: string } | null = null;

    if (result) {
      message = result.answer;

      // Adiciona nota de confiança se for baixa
      if (result.confidence < 0.7) {
        message += "\n\n_Essa resposta pode não ser exatamente o que você procura. Tente reformular sua pergunta ou escolha uma das perguntas rápidas disponíveis._";
      }

      // Gera ação sugerida se solicitado
      if (validatedData.includeActions) {
        action = generateAction(message);
      }
    } else {
      message = getDefaultResponse();
    }

    // Simula um pequeno delay para parecer mais natural
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      message,
      action,
      confidence: result?.confidence || 0
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('AgroIA Chat error:', error);
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        message: 'Desculpe, houve um erro ao processar sua mensagem. Tente novamente.'
      },
      { status: 500 }
    );
  }
}

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
  console.log('=== AgroIA Chat API Called ===');

  try {
    console.log('Parsing request body...');
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    console.log('Validating data...');
    const validatedData = chatSchema.parse(body);
    console.log('Data validated successfully');

    // Pega a última mensagem do usuário
    const lastMessage = validatedData.messages
      .filter(msg => msg.role === 'user')
      .pop();

    if (!lastMessage) {
      console.log('No user message found');
      return NextResponse.json(
        { error: 'Nenhuma mensagem de usuário encontrada' },
        { status: 400 }
      );
    }

    console.log('Last user message:', lastMessage.content);

    // Busca a melhor resposta na base de conhecimento
    console.log('Searching for best answer...');
    const result = findBestAnswer(lastMessage.content);
    console.log('Search result:', result ? `Found with confidence ${result.confidence}` : 'Not found');

    let message: string;
    let action: { label: string; link: string } | null = null;

    if (result) {
      message = result.answer;
      console.log('Answer length:', message.length);

      // Adiciona nota de confiança se for baixa
      if (result.confidence < 0.7) {
        message += "\n\n_Essa resposta pode não ser exatamente o que você procura. Tente reformular sua pergunta ou escolha uma das perguntas rápidas disponíveis._";
      }

      // Gera ação sugerida se solicitado
      if (validatedData.includeActions) {
        action = generateAction(message);
        console.log('Generated action:', action);
      }
    } else {
      message = getDefaultResponse();
      console.log('Using default response');
    }

    // Simula um pequeno delay para parecer mais natural
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = {
      message,
      action,
      confidence: result?.confidence || 0
    };

    console.log('Sending response:', { messageLength: message.length, hasAction: !!action, confidence: response.confidence });
    console.log('=== AgroIA Chat API Success ===');

    return NextResponse.json(response);

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      );
    }

    console.error('=== AgroIA Chat API Error ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        message: 'Desculpe, houve um erro ao processar sua mensagem. Tente novamente.'
      },
      { status: 500 }
    );
  }
}

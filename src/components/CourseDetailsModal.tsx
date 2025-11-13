import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, BookOpen, Clock, Users, Star, PlayCircle } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  level: 'Iniciante' | 'Intermediario' | 'Avancado';
  rating: number;
  students: number;
  price: number;
  image: string;
  progress?: number;
  enrolled?: boolean;
  featured?: boolean;
  lessons: number;
  modules: number;
  color: string;
  description: string;
}

interface CourseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onPurchaseClick: (course: Course) => void;
}

export const CourseDetailsModal = ({ isOpen, onClose, course, onPurchaseClick }: CourseDetailsModalProps) => {
  if (!course) return null;

  // Gerar pontos de aprendizado baseados na categoria do curso
  const getLearningPoints = () => {
    const pointsByCategory: Record<string, string[]> = {
      'Geral': [
        'História e evolução do agronegócio brasileiro',
        'Principais cadeias produtivas do setor',
        'Fundamentos de gestão rural',
        'Análise de mercado e tendências'
      ],
      'Marketing': [
        'Estratégias de marketing digital para o agro',
        'Como usar redes sociais para promover seu negócio',
        'Criação de conteúdo relevante',
        'Análise de métricas e resultados'
      ],
      'Jurídico': [
        'Legislação ambiental aplicada ao campo',
        'Regularização fundiária e documentação',
        'Contratos e negociações no agro',
        'Compliance e boas práticas regulatórias'
      ],
      'Gestão': [
        'Técnicas de liderança no ambiente rural',
        'Gestão de equipes e produtividade',
        'Comunicação eficaz com colaboradores',
        'Resolução de conflitos no campo'
      ],
      'Finanças': [
        'Planejamento financeiro para propriedades rurais',
        'Controle de custos e despesas',
        'Análise de rentabilidade e investimentos',
        'Crédito rural e linhas de financiamento'
      ],
      'Tecnologia': [
        'Sistemas modernos de irrigação',
        'Automação e controle de processos',
        'Economia de água e recursos',
        'ROI de tecnologias agrícolas'
      ]
    };

    return pointsByCategory[course.category] || [
      'Conceitos fundamentais da área',
      'Aplicações práticas no dia a dia',
      'Ferramentas e técnicas essenciais',
      'Cases de sucesso e exemplos reais'
    ];
  };

  const learningPoints = getLearningPoints();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>{course.title}</DialogTitle>
        </VisuallyHidden>
        {/* Header */}
        <div className="flex flex-row items-start justify-between p-6 border-b">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="border-transparent">
                {course.level}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            <h3 className="font-semibold tracking-tight text-xl mb-2">{course.title}</h3>
            <p className="text-muted-foreground">Por {course.instructor}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative">
              <Button className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90">
                <PlayCircle className="h-6 w-6 ml-1" />
              </Button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white">
                  <h4 className="font-medium">Prévia do Curso</h4>
                  <p className="text-sm opacity-90">{course.title}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-accent/50 rounded-lg">
                <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{course.duration}</p>
                <p className="text-xs text-muted-foreground">Duração</p>
              </div>
              <div className="text-center p-4 bg-accent/50 rounded-lg">
                <BookOpen className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{course.modules} módulos</p>
                <p className="text-xs text-muted-foreground">Conteúdo</p>
              </div>
              <div className="text-center p-4 bg-accent/50 rounded-lg">
                <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{course.students}</p>
                <p className="text-xs text-muted-foreground">Alunos</p>
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sobre o curso</h3>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </div>

            {/* Learning Points */}
            <div>
              <h3 className="text-lg font-semibold mb-3">O que você vai aprender</h3>
              <ul className="grid grid-cols-1 gap-2">
                {learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Purchase */}
            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
              <div>
                <p className="text-2xl font-bold text-primary">
                  R$ {course.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">Acesso vitalício</p>
              </div>
              <Button
                onClick={() => onPurchaseClick(course)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Comprar - R$ {course.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

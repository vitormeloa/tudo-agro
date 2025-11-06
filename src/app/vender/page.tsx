'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Upload, Camera, FileText, MapPin, DollarSign, Calendar, CheckCircle, AlertCircle, Plus, X, User, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/hooks/useAuth'

export default function VenderPage() {
  const { user, signIn, signUp } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [saleType, setSaleType] = useState<'direct' | 'auction'>('direct')
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    // Dados básicos
    title: '',
    category: '',
    breed: '',
    gender: '',
    age: '',
    weight: '',
    description: '',
    
    // Preço e venda
    price: '',
    negotiable: false,
    auctionDate: '',
    startingBid: '',
    
    // Localização
    state: '',
    city: '',
    address: '',
    
    // Saúde e documentos
    healthStatus: '',
    vaccinated: false,
    registered: false,
    
    // Contato
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    preferredContact: 'whatsapp'
  })

  const steps = [
    { number: 1, title: 'Tipo de Venda', description: 'Escolha como vender' },
    { number: 2, title: 'Dados do Animal', description: 'Informações básicas' },
    { number: 3, title: 'Fotos e Documentos', description: 'Mídia e comprovantes' },
    { number: 4, title: 'Preço e Localização', description: 'Valores e endereço' },
    { number: 5, title: 'Revisão', description: 'Confirmar dados' }
  ]

  const categories = [
    { value: 'gado-corte', label: 'Gado de Corte' },
    { value: 'gado-leite', label: 'Gado de Leite' },
    { value: 'cavalos', label: 'Cavalos' },
    { value: 'semen', label: 'Sêmen' }
  ]

  const breeds = {
    'gado-corte': ['Nelore', 'Angus', 'Brahman', 'Hereford', 'Simmental'],
    'gado-leite': ['Holandesa', 'Jersey', 'Gir Leiteiro', 'Girolando'],
    'cavalos': ['Mangalarga', 'Quarto de Milha', 'Crioulo', 'Paint Horse'],
    'semen': ['Nelore', 'Angus', 'Brahman', 'Holandesa']
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).slice(0, 10 - images.length)
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleDocumentUpload = (files: FileList | null) => {
    if (files) {
      const newDocs = Array.from(files).slice(0, 5 - documents.length)
      setDocuments([...documents, ...newDocs])
    }
  }

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setAuthError('')

    try {
      if (isLoginMode) {
        const { error } = await signIn(authData.email, authData.password)
        if (error) {
          setAuthError(error)
        } else {
          setShowLoginModal(false)
          // Continuar com o envio do anúncio
          await submitAnnouncement()
        }
      } else {
        const { error } = await signUp(authData.email, authData.password, {
          name: authData.name,
          phone: authData.phone
        })
        if (error) {
          setAuthError(error)
        } else {
          setAuthError('Conta criada! Verifique seu email para confirmar.')
          setIsLoginMode(true)
        }
      }
    } catch (error) {
      setAuthError('Erro interno do servidor')
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitAnnouncement = async () => {
    try {
      // Implementar lógica de envio do anúncio
      console.log('Dados do anúncio:', formData)
      console.log('Imagens:', images)
      console.log('Documentos:', documents)
      
      // Aqui você implementaria a lógica de envio para o backend
      alert('Anúncio publicado com sucesso!')
    } catch (error) {
      console.error('Erro ao publicar anúncio:', error)
      alert('Erro ao publicar anúncio. Tente novamente.')
    }
  }

  const isFormValid = () => {
    const requiredFields = [
      'title', 'category', 'breed', 'gender', 'age', 'description',
      'state', 'city', 'contactName', 'contactPhone'
    ]
    
    if (saleType === 'direct') {
      requiredFields.push('price')
    } else {
      requiredFields.push('startingBid', 'auctionDate')
    }
    
    return requiredFields.every(field => {
      const value = formData[field as keyof typeof formData]
      return value && value.toString().trim() !== ''
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos obrigatórios antes de continuar.')
      return
    }
    
    if (user) {
      // Usuário já logado, enviar diretamente
      submitAnnouncement()
    } else {
      // Usuário não logado, mostrar modal de login
      setShowLoginModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(5,150,105,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#101828] mb-6 leading-tight">
              Venda seu{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent">animal</span>
              <br />
              com facilidade
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cadastre seu animal e alcance compradores de todo o Brasil com segurança total
            </p>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                <p className="text-emerald-800 font-medium">
                  Preencha todos os dados primeiro. O login será solicitado apenas no final para publicar o anúncio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' 
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-emerald-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-emerald-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl border-0 bg-white rounded-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center text-[#101828]">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-center text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Tipo de Venda */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-[#101828] mb-2">
                      Como você quer vender?
                    </h3>
                    <p className="text-gray-600">
                      Escolha a modalidade que melhor se adapta ao seu negócio
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <button
                      type="button"
                      onClick={() => setSaleType('direct')}
                      className={`p-6 border-2 rounded-xl transition-all duration-300 text-left hover:shadow-lg ${
                        saleType === 'direct' 
                          ? 'border-emerald-600 bg-emerald-50 shadow-lg' 
                          : 'border-gray-200 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <DollarSign className="w-8 h-8 text-emerald-600 mr-3" />
                        <div>
                          <h4 className="font-bold text-[#101828]">Venda Direta</h4>
                          <Badge className="bg-emerald-600 text-white text-xs">RECOMENDADO</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Defina um preço fixo e negocie diretamente com os compradores interessados.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-emerald-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Venda mais rápida
                        </div>
                        <div className="flex items-center text-emerald-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Controle total do preço
                        </div>
                        <div className="flex items-center text-emerald-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Negociação direta
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSaleType('auction')}
                      className={`p-6 border-2 rounded-xl transition-all duration-300 text-left hover:shadow-lg ${
                        saleType === 'auction' 
                          ? 'border-emerald-600 bg-emerald-50 shadow-lg' 
                          : 'border-gray-200 hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <Calendar className="w-8 h-8 text-amber-600 mr-3" />
                        <div>
                          <h4 className="font-bold text-[#101828]">Leilão Online</h4>
                          <Badge className="bg-amber-600 text-white text-xs">MAIOR VALOR</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Agende um leilão e deixe os compradores disputarem pelo melhor preço.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-amber-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Potencial de maior valor
                        </div>
                        <div className="flex items-center text-amber-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Competição entre compradores
                        </div>
                        <div className="flex items-center text-amber-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Transparência total
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-1">
                          Dica importante
                        </h4>
                        <p className="text-sm text-emerald-700">
                          {saleType === 'direct' 
                            ? 'Na venda direta, você pode aceitar propostas e negociar o preço final com os interessados.'
                            : 'No leilão, defina um lance mínimo realista para atrair mais participantes e garantir um bom resultado.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Dados do Animal */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-[#101828] mb-2">
                        Título do Anúncio *
                      </label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Ex: Touro Nelore PO Certificado"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-[#101828] mb-2">
                        Categoria *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="breed" className="block text-sm font-medium text-[#101828] mb-2">
                        Raça *
                      </label>
                      <Select value={formData.breed} onValueChange={(value) => setFormData({...formData, breed: value})}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Selecione a raça" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.category && breeds[formData.category as keyof typeof breeds]?.map((breed) => (
                            <SelectItem key={breed} value={breed.toLowerCase()}>{breed}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-[#101828] mb-2">
                        Sexo *
                      </label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                        <SelectTrigger className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Selecione o sexo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="macho">Macho</SelectItem>
                          <SelectItem value="femea">Fêmea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-[#101828] mb-2">
                        Idade *
                      </label>
                      <Input
                        id="age"
                        type="text"
                        placeholder="Ex: 3 anos"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-[#101828] mb-2">
                        Peso (kg)
                      </label>
                      <Input
                        id="weight"
                        type="text"
                        placeholder="Ex: 850"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="healthStatus" className="block text-sm font-medium text-[#101828] mb-2">
                        Estado de Saúde
                      </label>
                      <Select value={formData.healthStatus} onValueChange={(value) => setFormData({...formData, healthStatus: value})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excelente">Excelente</SelectItem>
                          <SelectItem value="bom">Bom</SelectItem>
                          <SelectItem value="regular">Regular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#101828] mb-2">
                      Descrição Detalhada *
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      placeholder="Descreva as características do animal, histórico, alimentação, etc."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E4D2B] focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        id="vaccinated"
                        type="checkbox"
                        checked={formData.vaccinated}
                        onChange={(e) => setFormData({...formData, vaccinated: e.target.checked})}
                        className="h-4 w-4 text-emerald-800 focus:ring-[#1E4D2B] border-gray-300 rounded"
                      />
                      <label htmlFor="vaccinated" className="ml-3 text-sm text-[#101828]">
                        Animal vacinado
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="registered"
                        type="checkbox"
                        checked={formData.registered}
                        onChange={(e) => setFormData({...formData, registered: e.target.checked})}
                        className="h-4 w-4 text-emerald-800 focus:ring-[#1E4D2B] border-gray-300 rounded"
                      />
                      <label htmlFor="registered" className="ml-3 text-sm text-[#101828]">
                        Animal registrado
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Fotos e Documentos */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  {/* Upload de Fotos */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#101828] mb-4 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-amber-600" />
                      Fotos do Animal (máximo 10)
                    </h3>
                    
                    <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                      <Camera className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-[#101828] mb-2">
                        Adicionar Fotos
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Fotos de qualidade aumentam as chances de venda
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button type="button" className="bg-[#C89F45] hover:bg-[#B8913D] text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Escolher Fotos
                        </Button>
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-[#B8413D] text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-[#A03730] transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Upload de Documentos */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#101828] mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-emerald-800" />
                      Documentos (máximo 5)
                    </h3>
                    
                    <div className="border-2 border-dashed border-[#1E4D2B] rounded-lg p-6 text-center hover:border-[#C89F45] transition-colors duration-300">
                      <FileText className="w-12 h-12 text-emerald-800 mx-auto mb-4" />
                      <h4 className="font-semibold text-[#101828] mb-2">
                        Adicionar Documentos
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Certificados, exames, registro, etc.
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleDocumentUpload(e.target.files)}
                        className="hidden"
                        id="document-upload"
                      />
                      <label htmlFor="document-upload">
                        <Button type="button" variant="outline" className="border-[#1E4D2B] text-emerald-800 hover:bg-[#1E4D2B] hover:text-white">
                          <Upload className="w-4 h-4 mr-2" />
                          Escolher Documentos
                        </Button>
                      </label>
                    </div>

                    {documents.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-[#F7F6F2] p-3 rounded-lg">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 text-emerald-800 mr-3" />
                              <span className="text-sm text-[#101828]">{doc.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-red-600 hover:text-[#A03730] transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Preço e Localização */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Preço */}
                  <div className="bg-[#1E4D2B]/5 border border-[#1E4D2B]/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#101828] mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-emerald-800" />
                      {saleType === 'direct' ? 'Preço de Venda' : 'Configuração do Leilão'}
                    </h3>

                    {saleType === 'direct' ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-[#101828] mb-2">
                            Preço (R$) *
                          </label>
                          <Input
                            id="price"
                            type="text"
                            placeholder="Ex: 45000"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="h-12"
                            required
                          />
                        </div>
                        <div className="flex items-center pt-8">
                          <input
                            id="negotiable"
                            type="checkbox"
                            checked={formData.negotiable}
                            onChange={(e) => setFormData({...formData, negotiable: e.target.checked})}
                            className="h-4 w-4 text-emerald-800 focus:ring-[#1E4D2B] border-gray-300 rounded"
                          />
                          <label htmlFor="negotiable" className="ml-3 text-sm text-[#101828]">
                            Aceito propostas
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startingBid" className="block text-sm font-medium text-[#101828] mb-2">
                            Lance Inicial (R$) *
                          </label>
                          <Input
                            id="startingBid"
                            type="text"
                            placeholder="Ex: 20000"
                            value={formData.startingBid}
                            onChange={(e) => setFormData({...formData, startingBid: e.target.value})}
                            className="h-12"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="auctionDate" className="block text-sm font-medium text-[#101828] mb-2">
                            Data do Leilão *
                          </label>
                          <Input
                            id="auctionDate"
                            type="datetime-local"
                            value={formData.auctionDate}
                            onChange={(e) => setFormData({...formData, auctionDate: e.target.value})}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Localização */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#101828] mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                      Localização
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-[#101828] mb-2">
                          Estado *
                        </label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="Ex: GO"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-[#101828] mb-2">
                          Cidade *
                        </label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Ex: Goiânia"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-[#101828] mb-2">
                        Endereço da Fazenda
                      </label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Endereço completo (opcional)"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Contato */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#101828] mb-4">
                      Informações de Contato
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-[#101828] mb-2">
                          Nome para Contato *
                        </label>
                        <Input
                          id="contactName"
                          type="text"
                          placeholder="Seu nome"
                          value={formData.contactName}
                          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-[#101828] mb-2">
                          WhatsApp *
                        </label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Revisão */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      isFormValid() ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      {isFormValid() ? (
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-amber-600" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#101828] mb-2">
                      {isFormValid() ? 'Anúncio Pronto!' : 'Complete os Dados'}
                    </h3>
                    <p className="text-gray-600">
                      {isFormValid() 
                        ? 'Confira todos os dados antes de publicar'
                        : 'Preencha todos os campos obrigatórios para continuar'
                      }
                    </p>
                  </div>

                  <div className="bg-[#F7F6F2] rounded-lg p-6">
                    <h4 className="font-semibold text-[#101828] mb-4">Resumo do Anúncio</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Título:</span>
                        <div className="font-semibold text-[#101828]">{formData.title || 'Não informado'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Categoria:</span>
                        <div className="font-semibold text-[#101828]">{formData.category || 'Não informado'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Tipo de Venda:</span>
                        <div className="font-semibold text-[#101828]">
                          {saleType === 'direct' ? 'Venda Direta' : 'Leilão Online'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          {saleType === 'direct' ? 'Preço:' : 'Lance Inicial:'}
                        </span>
                        <div className="font-semibold text-emerald-800">
                          R$ {(saleType === 'direct' ? formData.price : formData.startingBid) || '0'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Localização:</span>
                        <div className="font-semibold text-[#101828]">
                          {formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Não informado'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Fotos:</span>
                        <div className="font-semibold text-[#101828]">{images.length} imagem(ns)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1E4D2B]/5 border border-[#1E4D2B]/20 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">
                      ✓ Próximos passos:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {!user && (
                        <li className="text-emerald-600 font-medium">• Fazer login ou criar conta (próximo passo)</li>
                      )}
                      <li>• Análise e aprovação do anúncio (até 24h)</li>
                      <li>• Publicação no catálogo</li>
                      <li>• Notificação por e-mail e WhatsApp</li>
                      <li>• Acompanhamento de visualizações e contatos</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-[#6E7D5B] text-gray-600 hover:bg-[#6E7D5B] hover:text-white"
                >
                  Anterior
                </Button>

                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#1E4D2B] hover:bg-[#163B20] text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={`px-8 transition-all duration-300 transform hover:scale-105 ${
                      isFormValid() 
                        ? 'bg-[#C89F45] hover:bg-[#B8913D] text-white' 
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!isFormValid()}
                  >
                    {user ? 'Publicar Anúncio' : 'Continuar para Login'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Precisa de ajuda para criar seu anúncio?
          </p>
          <Button variant="outline" className="border-[#C89F45] text-amber-600 hover:bg-[#C89F45] hover:text-white">
            Falar com Especialista
          </Button>
        </div>
      </div>

      {/* Modal de Login/Cadastro */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-[#101828]">
                {isLoginMode ? 'Fazer Login' : 'Criar Conta'}
              </CardTitle>
              <p className="text-gray-600">
                {isLoginMode 
                  ? 'Entre com sua conta para publicar o anúncio'
                  : 'Crie uma conta gratuita para publicar seu anúncio'
                }
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLoginMode && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#101828] mb-2">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={authData.name}
                        onChange={(e) => setAuthData({...authData, name: e.target.value})}
                        className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                        required={!isLoginMode}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#101828] mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={authData.email}
                      onChange={(e) => setAuthData({...authData, email: e.target.value})}
                      className="pl-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                {!isLoginMode && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#101828] mb-2">
                      WhatsApp *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={authData.phone}
                      onChange={(e) => setAuthData({...authData, phone: e.target.value})}
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      required={!isLoginMode}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#101828] mb-2">
                    Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{authError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-[#2E7A5A] text-white h-12 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : (isLoginMode ? 'Entrar' : 'Criar Conta')}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginMode(!isLoginMode)
                      setAuthError('')
                    }}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    {isLoginMode 
                      ? 'Não tem conta? Criar conta gratuita' 
                      : 'Já tem conta? Fazer login'
                    }
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}
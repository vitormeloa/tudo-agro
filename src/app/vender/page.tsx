'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Upload, Camera, FileText, MapPin, DollarSign, Calendar, CheckCircle, AlertCircle, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function VenderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [saleType, setSaleType] = useState<'direct' | 'auction'>('direct')
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar lógica de envio
    console.log('Dados do anúncio:', formData)
    console.log('Imagens:', images)
    console.log('Documentos:', documents)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#1E4D2B]">
                AgroMarket
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Início</Link>
              <Link href="/catalogo" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Catálogo</Link>
              <Link href="/leiloes" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Leilões</Link>
              <Link href="/vender" className="text-[#C89F45] font-semibold">Vender</Link>
              <Link href="/sobre" className="text-[#2B2E2B] hover:text-[#C89F45] transition-colors duration-300">Sobre</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-[#1E4D2B] hover:bg-[#163B20] text-white">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2B2E2B] mb-4">
            Vender Animal
          </h1>
          <p className="text-xl text-[#6E7D5B]">
            Cadastre seu animal e alcance compradores de todo o Brasil
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-[#1E4D2B] border-[#1E4D2B] text-white' 
                    : 'border-[#6E7D5B] text-[#6E7D5B]'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-[#1E4D2B]' : 'text-[#6E7D5B]'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-[#6E7D5B]">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-[#1E4D2B]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-center text-[#2B2E2B]">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-center text-[#6E7D5B]">
              {steps[currentStep - 1].description}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Tipo de Venda */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-2">
                      Como você quer vender?
                    </h3>
                    <p className="text-[#6E7D5B]">
                      Escolha a modalidade que melhor se adapta ao seu negócio
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <button
                      type="button"
                      onClick={() => setSaleType('direct')}
                      className={`p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                        saleType === 'direct' 
                          ? 'border-[#1E4D2B] bg-[#1E4D2B]/5' 
                          : 'border-gray-200 hover:border-[#C89F45]'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <DollarSign className="w-8 h-8 text-[#1E4D2B] mr-3" />
                        <div>
                          <h4 className="font-bold text-[#2B2E2B]">Venda Direta</h4>
                          <Badge className="bg-[#3D9970] text-white text-xs">RECOMENDADO</Badge>
                        </div>
                      </div>
                      <p className="text-[#6E7D5B] mb-4">
                        Defina um preço fixo e negocie diretamente com os compradores interessados.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-[#3D9970]">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Venda mais rápida
                        </div>
                        <div className="flex items-center text-[#3D9970]">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Controle total do preço
                        </div>
                        <div className="flex items-center text-[#3D9970]">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Negociação direta
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSaleType('auction')}
                      className={`p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                        saleType === 'auction' 
                          ? 'border-[#1E4D2B] bg-[#1E4D2B]/5' 
                          : 'border-gray-200 hover:border-[#C89F45]'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <Calendar className="w-8 h-8 text-[#C89F45] mr-3" />
                        <div>
                          <h4 className="font-bold text-[#2B2E2B]">Leilão Online</h4>
                          <Badge className="bg-[#C89F45] text-white text-xs">MAIOR VALOR</Badge>
                        </div>
                      </div>
                      <p className="text-[#6E7D5B] mb-4">
                        Agende um leilão e deixe os compradores disputarem pelo melhor preço.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-[#C89F45]">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Potencial de maior valor
                        </div>
                        <div className="flex items-center text-[#C89F45]">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Competição entre compradores
                        </div>
                        <div className="flex items-center text-[#C89F45]">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Transparência total
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="bg-[#1E4D2B]/5 border border-[#1E4D2B]/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-[#1E4D2B] mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#1E4D2B] mb-1">
                          Dica importante
                        </h4>
                        <p className="text-sm text-[#6E7D5B]">
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
                      <label htmlFor="title" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Título do Anúncio *
                      </label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Ex: Touro Nelore PO Certificado"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Categoria *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="h-12">
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
                      <label htmlFor="breed" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Raça *
                      </label>
                      <Select value={formData.breed} onValueChange={(value) => setFormData({...formData, breed: value})}>
                        <SelectTrigger className="h-12">
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
                      <label htmlFor="gender" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Sexo *
                      </label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Selecione o sexo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="macho">Macho</SelectItem>
                          <SelectItem value="femea">Fêmea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-[#2B2E2B] mb-2">
                        Idade *
                      </label>
                      <Input
                        id="age"
                        type="text"
                        placeholder="Ex: 3 anos"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                      <label htmlFor="healthStatus" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                    <label htmlFor="description" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                        className="h-4 w-4 text-[#1E4D2B] focus:ring-[#1E4D2B] border-gray-300 rounded"
                      />
                      <label htmlFor="vaccinated" className="ml-3 text-sm text-[#2B2E2B]">
                        Animal vacinado
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="registered"
                        type="checkbox"
                        checked={formData.registered}
                        onChange={(e) => setFormData({...formData, registered: e.target.checked})}
                        className="h-4 w-4 text-[#1E4D2B] focus:ring-[#1E4D2B] border-gray-300 rounded"
                      />
                      <label htmlFor="registered" className="ml-3 text-sm text-[#2B2E2B]">
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
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-4 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-[#C89F45]" />
                      Fotos do Animal (máximo 10)
                    </h3>
                    
                    <div className="border-2 border-dashed border-[#C89F45] rounded-lg p-6 text-center hover:border-[#1E4D2B] transition-colors duration-300">
                      <Camera className="w-12 h-12 text-[#C89F45] mx-auto mb-4" />
                      <h4 className="font-semibold text-[#2B2E2B] mb-2">
                        Adicionar Fotos
                      </h4>
                      <p className="text-sm text-[#6E7D5B] mb-4">
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
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-[#1E4D2B]" />
                      Documentos (máximo 5)
                    </h3>
                    
                    <div className="border-2 border-dashed border-[#1E4D2B] rounded-lg p-6 text-center hover:border-[#C89F45] transition-colors duration-300">
                      <FileText className="w-12 h-12 text-[#1E4D2B] mx-auto mb-4" />
                      <h4 className="font-semibold text-[#2B2E2B] mb-2">
                        Adicionar Documentos
                      </h4>
                      <p className="text-sm text-[#6E7D5B] mb-4">
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
                        <Button type="button" variant="outline" className="border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white">
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
                              <FileText className="w-5 h-5 text-[#1E4D2B] mr-3" />
                              <span className="text-sm text-[#2B2E2B]">{doc.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-[#B8413D] hover:text-[#A03730] transition-colors"
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
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-[#1E4D2B]" />
                      {saleType === 'direct' ? 'Preço de Venda' : 'Configuração do Leilão'}
                    </h3>

                    {saleType === 'direct' ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                            className="h-4 w-4 text-[#1E4D2B] focus:ring-[#1E4D2B] border-gray-300 rounded"
                          />
                          <label htmlFor="negotiable" className="ml-3 text-sm text-[#2B2E2B]">
                            Aceito propostas
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startingBid" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                          <label htmlFor="auctionDate" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-[#C89F45]" />
                      Localização
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                        <label htmlFor="city" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                      <label htmlFor="address" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-4">
                      Informações de Contato
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactName" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-[#2B2E2B] mb-2">
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
                    <div className="w-16 h-16 bg-[#1E4D2B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#1E4D2B]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#2B2E2B] mb-2">
                      Revisar Anúncio
                    </h3>
                    <p className="text-[#6E7D5B]">
                      Confira todos os dados antes de publicar
                    </p>
                  </div>

                  <div className="bg-[#F7F6F2] rounded-lg p-6">
                    <h4 className="font-semibold text-[#2B2E2B] mb-4">Resumo do Anúncio</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#6E7D5B]">Título:</span>
                        <div className="font-semibold text-[#2B2E2B]">{formData.title || 'Não informado'}</div>
                      </div>
                      <div>
                        <span className="text-[#6E7D5B]">Categoria:</span>
                        <div className="font-semibold text-[#2B2E2B]">{formData.category || 'Não informado'}</div>
                      </div>
                      <div>
                        <span className="text-[#6E7D5B]">Tipo de Venda:</span>
                        <div className="font-semibold text-[#2B2E2B]">
                          {saleType === 'direct' ? 'Venda Direta' : 'Leilão Online'}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#6E7D5B]">
                          {saleType === 'direct' ? 'Preço:' : 'Lance Inicial:'}
                        </span>
                        <div className="font-semibold text-[#1E4D2B]">
                          R$ {(saleType === 'direct' ? formData.price : formData.startingBid) || '0'}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#6E7D5B]">Localização:</span>
                        <div className="font-semibold text-[#2B2E2B]">
                          {formData.city && formData.state ? `${formData.city}, ${formData.state}` : 'Não informado'}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#6E7D5B]">Fotos:</span>
                        <div className="font-semibold text-[#2B2E2B]">{images.length} imagem(ns)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1E4D2B]/5 border border-[#1E4D2B]/20 rounded-lg p-4">
                    <h4 className="font-semibold text-[#1E4D2B] mb-2">
                      ✓ Próximos passos:
                    </h4>
                    <ul className="text-sm text-[#6E7D5B] space-y-1">
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
                  className="border-[#6E7D5B] text-[#6E7D5B] hover:bg-[#6E7D5B] hover:text-white"
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
                    className="bg-[#C89F45] hover:bg-[#B8913D] text-white px-8 transition-all duration-300 transform hover:scale-105"
                  >
                    Publicar Anúncio
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-[#6E7D5B] mb-4">
            Precisa de ajuda para criar seu anúncio?
          </p>
          <Button variant="outline" className="border-[#C89F45] text-[#C89F45] hover:bg-[#C89F45] hover:text-white">
            Falar com Especialista
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#4A3218] text-[#F7F6F2] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-[#C89F45] mb-4">AgroMarket</h3>
              <p className="text-[#F7F6F2]/80 mb-4">
                A maior plataforma de negócios do agronegócio brasileiro.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Categorias</h4>
              <ul className="space-y-2">
                <li><Link href="/catalogo?categoria=gado-corte" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Corte</Link></li>
                <li><Link href="/catalogo?categoria=gado-leite" className="hover:text-[#C89F45] transition-colors duration-300">Gado de Leite</Link></li>
                <li><Link href="/catalogo?categoria=cavalos" className="hover:text-[#C89F45] transition-colors duration-300">Cavalos</Link></li>
                <li><Link href="/catalogo?categoria=semen" className="hover:text-[#C89F45] transition-colors duration-300">Sêmen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Empresa</h4>
              <ul className="space-y-2">
                <li><Link href="/sobre" className="hover:text-[#C89F45] transition-colors duration-300">Sobre Nós</Link></li>
                <li><Link href="/contato" className="hover:text-[#C89F45] transition-colors duration-300">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#C89F45]">Suporte</h4>
              <ul className="space-y-2">
                <li><Link href="/ajuda" className="hover:text-[#C89F45] transition-colors duration-300">Central de Ajuda</Link></li>
                <li><Link href="/termos" className="hover:text-[#C89F45] transition-colors duration-300">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#C89F45]/20 mt-8 pt-8 text-center">
            <p className="text-[#F7F6F2]/60">
              © 2024 AgroMarket. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
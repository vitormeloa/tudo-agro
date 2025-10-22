export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F6F2] to-[#FFFDF7] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/fotos/tudo-agro-logo.png" 
              className="h-16 w-auto" 
              alt="TudoAgro Logo"
            />
            <span className="text-3xl font-bold text-[#2B2E2B]">
              TudoAgro
            </span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-[#6E7D5B] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#6E7D5B] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-[#6E7D5B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="mt-4 text-[#6E7D5B]">Carregando...</p>
      </div>
    </div>
  )
}
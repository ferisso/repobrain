import Logo from "./Logo";


export default function MainLoader() {
  return (
    <div className="w-full h-screen flex justify-center items-center text-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="animate-bounce">
          <Logo height="72" />
        </div>
        <span className="text-sm text-zinc-600">Carregando...</span>
      </div>
    </div>
  )
}
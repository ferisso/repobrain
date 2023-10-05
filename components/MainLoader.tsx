import Logo from "./Logo";

export default function MainLoader({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <div style={{ height: fullscreen ? "100vh" : "100%" }} className="w-full flex justify-center items-center text-center opacity-75 backdrop-blur-md">
      <div className="flex flex-col gap-2 items-center">
        <div className="animate-bounce">
          <Logo height="72" />
        </div>
        <span className="text-sm text-zinc-600">Carregando...</span>
      </div>
    </div>
  )
}
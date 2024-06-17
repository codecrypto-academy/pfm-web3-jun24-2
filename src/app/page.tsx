import ConnectWallet from '@/componets/ConnectWallet'

export default function Home() {
  return <div className='bg-slate-500 h-screen grid content-center justify-center'>
    <div className='border border-black'>Home para conectar la wallet</div>
    <ul className="list-disc list-inside">
      <li>Si está registrado, redirecciona al dashboard del rol correspondiente</li>
      <li>Si no está registrado, le invitamos a que realice una donación o que se registre como una empresa</li>
    </ul>
    <ConnectWallet></ConnectWallet>
  </div>
}

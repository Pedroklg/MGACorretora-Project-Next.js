import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="h-60" style={{ backgroundImage: "url(/footer-bg.png)" }}>
            <div className='flex justify-center text-xl font-bold gap-24'>
                <Link href="/" passHref legacyBehavior>
                    <a>
                        <Image src="/logo.png" alt="MGA Corretora" width={200} height={200} />
                    </a>
                </Link>
                <div className="flex">
                    <div className="mx-8">
                        <h4 className="p-2 text-2xl text-red-800">A MGA</h4>
                        <ul>
                            <li className="p-1 hover:text-red-800"><a href="/sobre">Sobre</a></li>
                            <li className="p-1 hover:text-red-800"><a href="/contato">Fale Conosco</a></li>
                            <li className="p-1 hover:text-red-800"><a href="/politica-de-privacidade">Política de Privacidade</a></li>
                        </ul>
                    </div>
                    <div className="mx-16">
                        <h4 className="p-2 text-2xl text-red-800">ONDE ESTAMOS?</h4>
                        <p className="p-1 hover:text-red-800 flex flex-wrap">Curitiba - PR | <a href="tel:+5541995400788">41 99540-0788</a></p>
                        <p className="p-1 hover:text-red-800 flex flex-wrap">Ponta Grossa - PR | <a href="tel:+5542999094741">42 99909-4741</a></p>
                        <p className="p-1 hover:text-red-800 flex flex-wrap">Email: <a href="mailto:contato@mgacorretora.com.br">contato@mgacorretora.com.br</a></p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

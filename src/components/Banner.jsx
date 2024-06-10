import Image from 'next/image';

export default function Banner() {

    return (
        <div className="hidden md:flex w-full items-center content-center z-0 shadow-lg">
            <Image className="w-full h-auto rounded-sm" src="/Banner_1.png" alt="banner" />
        </div>
    )
}

'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { User } from '@prisma/client';
import { logoutUser } from '@/actions/auth'
import { useRouter } from 'next/navigation';
import HeaderSearchBar from './HeaderSearchBar';
import { useShallow } from 'zustand/shallow';
import { useCartStore } from '@/stores/cart-store';
const AnouncementBar = () => {
    return (
        <div className='w-full bg-black py-2'>
            <div className='cotainer mx-auto flex items-center justify-center'>
                <span className='text-center text-sm font-medium text-white tracking-wide'>
                    FREE SHIPING IN INDIA
                </span>
            </div>
        </div>
    )
}


type HeaderProps = {
    user: Omit<User, 'passwordHash'> | null;
    categorySelector: React.ReactNode;
}

const Header = ({ user, categorySelector }: HeaderProps) => {
    const router = useRouter();
    const [isopen, setIsOpen] = useState<boolean>(true);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);
    const { open, getTotalItems } = useCartStore(
        useShallow((state) => ({
            open: state.open,
            getTotalItems: state.getTotalItems,
        }))
    );


    useEffect(() => {
        const handleScroll = () => {
            const currentSCrollY = window.scrollY;
            const scrolledUp = currentSCrollY < prevScrollY;
            if (scrolledUp) {
                setIsOpen(true);
            } else if (currentSCrollY > 100) {
                setIsOpen(false);
            }

            setPrevScrollY(currentSCrollY);
        }
        setPrevScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollY])

    return (
        <header className='w-full sticky top-0 z-50'>
            <div className={`w-full transform transition-transform duration-300 ease-in-out ${isopen ? 'translate-y-0' : '-translate-y-full'}`}>
                <AnouncementBar />

                <div className='flex w-full justify-between text-black items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-grey-100 backdrop-blur-sm'>
                    <div className='flex justify-between items-center container mx-auto px-8'>
                        <div className='flex-1 justify-start  items-center gap-4 '>
                            <button className='text-gray-700 hover:text-gray-900 md:hidden'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                                </svg>
                            </button>
                            <nav className='hidden md:flex gap-6 text-sm font-medium'>
                                {categorySelector}
                                <Link href=''>sale</Link>

                            </nav>
                        </div>
                        <Link href='' className='absolute left-1/2 -translate-x-1/2'>
                            <span className='text-xl sm:text-2xl font-bold tracking-tighter'>
                                CROWN
                            </span>
                        </Link>
                        <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4'>
                            {/* <button className='text-gray-700 hover:text-gray-900 hidden sm:block'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                                </svg> 
                            </button>*/}
                                <HeaderSearchBar />

                            {user ? (
                                <div className='flex items-center gap-3 sm:gap-4'>
                                    <span className='text-sm text-gray-700 hidden md:block'>{user.email}
                                    </span>
                                    <Link
                                        href='#'
                                        className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await logoutUser();
                                            router.refresh();
                                        }}
                                    >
                                        Sign Out
                                    </Link>
                                </div>

                            ) : (
                                <React.Fragment>
                                    <Link href='/auth/sign-in' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                                        Sign In
                                    </Link>
                                    <Link href='/auth/sign-up' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                                        Sign Up
                                    </Link>
                                </React.Fragment>
                            )}

                            <button onClick ={()=> open()} className='text-gray-700 hover:text-gray-900 relative'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                                <span className='absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center'>
                                    {getTotalItems()}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

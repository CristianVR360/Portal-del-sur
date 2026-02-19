import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle smooth scrolling for hash links on the home page
    const handleNavigation = (e, targetHref) => {
        e.preventDefault();
        setIsOpen(false); // Close mobile menu if open

        if (targetHref.startsWith('#')) {
            // Hash link (e.g., #nosotros, #contacto)
            if (location.pathname !== '/') {
                // If not on home page, navigate to home then scroll
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(targetHref);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                // If already on home page, just scroll
                const element = document.querySelector(targetHref);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            // Regular route (e.g., /catalogo)
            navigate(targetHref);
            window.scrollTo(0, 0);
        }
    };

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Nosotros', href: '#nosotros' },
        { name: 'Catálogo', href: '/catalogo' },
        { name: 'Recetas', href: '/recetas' },
        { name: 'Contacto', href: '#contacto' },
    ];

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'glass py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}assets/logos/logo.svg`}
                        alt="Portal del Sur"
                        className="h-12 w-auto drop-shadow-md transition-all"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavigation(e, link.href)}
                            className={`font-medium transition-colors duration-200 cursor-pointer ${scrolled || !isHome ? 'text-primary hover:text-accent' : 'text-white hover:text-accent drop-shadow-md'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden ${scrolled || !isHome ? 'text-primary' : 'text-white'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-gray-200 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4 items-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-primary hover:text-accent font-medium text-lg w-full text-center py-2 cursor-pointer"
                                    onClick={(e) => handleNavigation(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

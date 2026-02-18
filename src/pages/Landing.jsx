import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const slides = [
    { id: 1, image: 'assets/slides/cereales.webp', title: 'Cereales Seleccionados', subtitle: 'La base de una alimentación sana' },
    { id: 2, image: 'assets/slides/condimentos.webp', title: 'Condimentos Premium', subtitle: 'Realza el sabor de tus comidas' },
    { id: 3, image: 'assets/slides/encurtidos.webp', title: 'Encurtidos Artesanales', subtitle: 'Tradición y sabor en cada frasco' },
    { id: 4, image: 'assets/slides/frutos-secos.webp', title: 'Frutos Secos', subtitle: 'Energía natural para tu día' },
    { id: 5, image: 'assets/slides/granos.webp', title: 'Granos de Calidad', subtitle: 'Del campo a tu mesa' },
    { id: 6, image: 'assets/slides/reposteria.webp', title: 'Repostería', subtitle: 'Dulzura con ingredientes nobles' },
];

const Landing = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance loop
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-neutral-50 min-h-screen font-sans selection:bg-[#D4A373] selection:text-[#d52d12]">
            {/* --- HERO SECTION --- */}
            <section id="inicio" className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">

                {/* Background Carousel */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={slides[currentSlide].id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full z-0"
                    >
                        <div className="absolute inset-0 bg-black/70 md:bg-transparent bg-gradient-to-b from-black/80 via-black/60 to-black/95 z-10" />
                        <img
                            src={`${import.meta.env.BASE_URL}${slides[currentSlide].image}`}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover object-[75%] md:object-center"
                        />

                    </motion.div>
                </AnimatePresence>

                {/* Static Hero Elements */}
                <img
                    src={`${import.meta.env.BASE_URL}assets/shape.svg`}
                    className="absolute bottom-0 left-0 w-full z-15 pointer-events-none"
                    alt=""
                />

                {/* Hero Content (Centered Logo & Text) */}
                <div className="relative z-20 flex flex-col items-center justify-center px-4 w-full h-full">

                    {/* Floating Logo Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                        className="mb-8"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}assets/logos/logo.svg`}
                            alt="Portal del Sur Logo"
                            className="w-48 md:w-64 lg:w-80 h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Dynamic Text based on Slide */}
                    <div className="text-center space-y-4 max-w-4xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: '0.5em' }}
                            animate={{ opacity: 1, letterSpacing: '0.2em' }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="block text-[#D4A373] font-bold uppercase text-sm md:text-lg tracking-[0.2em]"
                        >
                            Calidad Premium desde la Araucanía
                        </motion.span>

                        <div className="h-20 md:h-24 overflow-hidden relative mb-4">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={currentSlide}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg"
                                >
                                    {slides[currentSlide].title}
                                </motion.h1>
                            </AnimatePresence>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto"
                        >
                            Productos envasados con frescura garantizada y el sabor auténtico del sur.
                        </motion.p>
                    </div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="mt-12 flex flex-col sm:flex-row gap-6 w-full max-w-md sm:w-auto"
                    >
                        <button
                            onClick={() => {
                                navigate('/catalogo');
                                window.scrollTo(0, 0);
                            }}
                            className="cursor-pointer group relative px-8 py-4 bg-[#D4A373] text-[#d52d12] font-bold text-lg rounded-full overflow-hidden shadow-xl hover:shadow-[#D4A373]/30 transition-all duration-300"
                        >
                            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Ver Catálogo</span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#d52d12]" />
                        </button>

                        <a
                            href="#contacto"
                            className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-md shadow-lg text-center cursor-pointer"
                        >
                            Contáctanos
                        </a>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ChevronDown className="w-10 h-10 text-white/50" />
                    </motion.div>
                </motion.div>
            </section>

            {/* --- NOSOTROS / ABOUT SECTION --- */}
            <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Composition */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-[#D4A373] rounded-2xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/5] bg-white">
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/productos/mix-productos.webp`}
                                    alt="Gran Variedad de Productos Portal del Sur"
                                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-[#d52d12]/10 text-[#d52d12] font-bold text-xs tracking-wider uppercase mb-4">
                                Presencia Regional
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#d52d12] mb-6 leading-tight">
                                Variedad que une <br />
                                <span className="text-[#D4A373] relative">
                                    a la Región
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#D4A373]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                    </svg>
                                </span>
                            </h2>

                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    En <strong>Portal del Sur</strong> nos enorgullece ser la marca elegida por los comercios de toda la región. Ofrecemos una <strong>inmensa variedad</strong> de productos esenciales, desde cereales, frutos secos y encurtidos hasta condimentos y repostería.
                                </p>
                                <p>
                                    Nuestra misión es simple: llevar calidad premium a tu mesa al <strong>mejor precio del mercado</strong>, asegurando que cada despensa de la Araucanía tenga acceso a lo mejor de nuestra tierra.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-100">
                                {[
                                    { number: '+500', label: 'Comercios Asociados' },
                                    { number: '100%', label: 'Surtido Completo' },
                                    { number: 'Mejor', label: 'Precio Calidad' }
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center sm:text-left">
                                        <span className="block text-3xl md:text-4xl font-serif font-bold text-[#d52d12] mb-1">{stat.number}</span>
                                        <span className="text-sm text-gray-500 font-medium leading-tight block">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- CATEGORIES SECTION --- */}
            <section className="py-24 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#D4A373] font-bold tracking-widest uppercase text-sm mb-2 block">Descubre</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#d52d12]">Nuestras Categorías</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { id: 'cereales', name: 'Cereales', img: 'assets/productos/cereales/card.jpg' },
                            { id: 'condimentos', name: 'Condimentos', img: 'assets/productos/condimentos/card.jpg' },
                            { id: 'encurtidos', name: 'Encurtidos', img: 'assets/productos/encurtidos/card.jpg' },
                            { id: 'frutos-secos', name: 'Frutos Secos', img: 'assets/productos/frutos-secos/card.jpg' },
                            { id: 'granos', name: 'Granos', img: 'assets/productos/granos/card.jpg' },
                            { id: 'reposteria', name: 'Repostería', img: 'assets/productos/reposteria/card.jpg' }
                        ].map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                                onClick={() => {
                                    // Navigate to catalog with state to pre-filter
                                    navigate('/catalogo', { state: { category: cat.id } });
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
                                <img
                                    src={`${import.meta.env.BASE_URL}${cat.img}`}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                                    <h3 className="text-white font-serif text-3xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">{cat.name}</h3>
                                    <span className="text-[#D4A373] font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                        Ver Productos
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;

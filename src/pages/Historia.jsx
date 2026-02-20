import React from 'react';
import { motion } from 'framer-motion';

const Historia = () => {
    return (
        <div className="bg-neutral-50 min-h-screen font-sans selection:bg-[#D4A373] selection:text-white">

            {/* --- HERO BANNER --- */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    {/* Placeholder image using existing asset */}
                    <img
                        src={`${import.meta.env.BASE_URL}assets/slides/condimentos.webp`}
                        alt="Portal del Sur Historia"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                            El Sabor de la Perseverancia
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-white/90 tracking-wide font-serif italic">
                            La Historia de Portal del Sur
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- EDITORIAL CONTENT --- */}
            <section className="py-20 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Introduction - Lead style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16 md:mb-20 text-center"
                    >
                        <span className="block w-16 h-1 bg-[#D4A373] mx-auto mb-8"></span>
                        <h2 className="text-2xl md:text-3xl font-serif text-[#d52d12] font-bold mb-6">
                            Un Comienzo con Sello Propio (1986 - 1990)
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
                            Todo gran proyecto nace de una observación y una oportunidad. En 1986, don <strong className="font-semibold text-[#d52d12]">Nelson Mardones</strong>, quien conocía a fondo el movimiento del consumo masivo gracias a su labor como reponedor de supermercados, decidió dar un paso audaz. Junto a su señora, transformaron su hogar en el primer centro de operaciones de lo que hoy conocemos como <strong className="font-semibold">Portal del Sur</strong>.
                        </p>
                    </motion.div>

                    {/* Image Break - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 md:mb-20 rounded-2xl overflow-hidden shadow-xl aspect-[16/9] md:aspect-[21/9] relative bg-gray-100"
                    >
                        {/* Visual placeholder using existing asset but styled differently */}
                        <img
                            src={`${import.meta.env.BASE_URL}assets/productos/mix-productos.webp`}
                            alt="Inicios de Portal del Sur"
                            className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent text-white text-sm font-medium">
                            <span className="opacity-90 tracking-wider uppercase text-xs">Nuestros Orígenes</span>
                        </div>
                    </motion.div>

                    {/* Section 1 - 2 Columns on large screens for narrative flow */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-20">
                        <div className="md:col-span-12">
                            <p className="text-lg text-gray-600 leading-8 mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-[#D4A373] first-letter:mr-3 first-letter:float-left">
                                En aquellos años, la producción era puramente artesanal. Con bolsas, solapas y corcheteras, envasaban manualmente displays de 50 y 100 gramos. Pero desde ese primer gramo de comino o pimentón, hubo una promesa inquebrantable: la <strong className="text-gray-800">calidad</strong>. Mientras otros buscaban rendir los productos con mezclas, don Nelson se mantuvo fiel a la pureza del origen, seleccionando los mejores condimentos de distribuidores locales y nacionales como Dimerco.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 - Text wrapping image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 clearfix"
                    >
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#d52d12] mb-8 pb-4 border-b border-gray-100">
                            La Consolidación de un Sueño (1990)
                        </h3>

                        <div className="md:float-right md:ml-8 md:mb-4 mb-8 w-full md:w-1/2 lg:w-5/12">
                            <div className="bg-[#faf7f4] p-2 rounded-xl shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373] to-[#d52d12] opacity-80 mix-blend-multiply"></div>
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/slides/granos.webp`}
                                        className="w-full h-full object-cover mix-blend-overlay opacity-60 grayscale"
                                        alt="Consolidación"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white/80 font-serif text-2xl font-bold italic border-2 border-white/30 px-4 py-2">1990</span>
                                    </div>
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-2 font-medium uppercase tracking-widest py-1">Hitos que marcan historia</p>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 leading-8 mb-6">
                            Lo que comenzó como un emprendimiento familiar tomó forma oficial en 1990. Con la constitución de la empresa, Portal del Sur dejó de ser un proyecto para convertirse en un actor relevante del comercio regional.
                        </p>
                        <p className="text-lg text-gray-600 leading-8">
                            El gran hito que marcó un antes y un después fue la entrada a las grandes ligas locales: lograr la confianza de los supermercados y de establecimientos emblemáticos de Temuco, como <span className="font-semibold text-[#D4A373]">Muñoz Hermanos</span>.
                        </p>
                    </motion.div>

                    {/* Pull Quote */}
                    <div className="my-20 py-10 border-y border-[#D4A373]/20 relative">
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[#D4A373] text-4xl font-serif">"</span>
                        <blockquote className="text-center font-serif text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed max-w-2xl mx-auto">
                            La presentación debía estar a la altura de lo que había dentro.
                        </blockquote>
                    </div>

                    {/* Section 3 - Content */}
                    <div className="mb-20">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#d52d12] mb-6">
                            Evolución y Tecnología
                        </h3>
                        <p className="text-lg text-gray-600 leading-8 mb-6">
                            El crecimiento trajo consigo la necesidad de evolucionar. Pasamos de las bolsas corcheteadas a un packaging de alta calidad, entendiendo que la presentación debía estar a la altura de lo que había dentro. Tras 15 años de labor manual, la empresa dio el salto hacia la automatización, incorporando envasado con rollos y tecnología de punta que nos permitió profesionalizar cada entrega sin perder nuestra esencia.
                        </p>
                    </div>

                    {/* Image Banner Break */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-20">
                        <div className="absolute inset-0 bg-black/60 z-10"></div>
                        <img
                            src={`${import.meta.env.BASE_URL}assets/slides/reposteria.webp`}
                            alt="Tecnología y Tradición"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center">
                            <div>
                                <h4 className="text-white font-serif text-3xl font-bold mb-2">Pasión por la Calidad</h4>
                                <div className="w-16 h-1 bg-[#D4A373] mx-auto"></div>
                            </div>
                        </div>
                    </div>

                    {/* Final Section */}
                    <div className="mb-12">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#d52d12] mb-8 pb-4 border-b border-gray-100">
                            Portal del Sur Hoy: Del Corazón de la Araucanía al Sur de Chile
                        </h3>
                        <div className="bg-[#fffcf5] p-8 md:p-12 rounded-3xl border border-[#D4A373]/20 shadow-sm">
                            <p className="text-lg text-gray-600 leading-8 mb-6">
                                Tras más de tres décadas, nuestra base de productos —desde el orégano más puro hasta el aliño completo más equilibrado— está consolidado en el mercado. Hoy, nuestra presencia se extiende con fuerza por la Octava y Novena Región, con la mirada puesta en seguir conquistando cada rincón del sur de Chile.
                            </p>
                            <p className="text-xl font-serif font-medium text-[#d52d12] mt-6">
                                Seguimos creciendo, incorporando nuevas líneas de productos y perfeccionando nuestros procesos, pero manteniendo siempre la misma responsabilidad y calidad que don Nelson imprimió en aquellas primeras bolsas hace 40 años.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Historia;

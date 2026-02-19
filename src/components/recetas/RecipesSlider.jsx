import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { recetasData } from '../../data/recetasData';

/**
 * RecipesSlider — sección de slider de recetas para el Home.
 * Es completamente independiente: no modifica ninguna sección existente.
 */
const RecipesSlider = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);
    const total = recetasData.length;

    const goTo = useCallback(
        (idx) => {
            setDirection(idx > current ? 1 : -1);
            setCurrent((idx + total) % total);
        },
        [current, total]
    );

    const prev = () => goTo(current - 1);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);

    // Autoplay
    useEffect(() => {
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [next]);

    const receta = recetasData[current];

    const variants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
        center: { opacity: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
    };

    return (
        <section className="recipes-slider-section" aria-label="Sección de recetas destacadas">
            {/* Header */}
            <div className="recipes-slider-header">
                <span className="recipes-slider-eyebrow">
                    <UtensilsCrossed size={14} />
                    Recetas con nuestros productos
                </span>
                <h2 className="recipes-slider-heading">
                    Sácale el máximo provecho a tus{' '}
                    <span className="recipes-slider-heading-accent">productos Portal del Sur</span>
                </h2>
                <p className="recipes-slider-subheading">
                    Recetas fáciles, sabrosas y hechas con ingredientes que ya tienes en casa.
                </p>
            </div>

            {/* Slider */}
            <div className="recipes-slider-wrapper">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={receta.id}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        className="recipes-slider-slide"
                    >
                        {/* Imagen */}
                        <div className="recipes-slider-img-col">
                            <div className="recipes-slider-img-wrap">
                                <img
                                    src={`${import.meta.env.BASE_URL}${receta.imagen}`}
                                    alt={receta.nombre}
                                    className="recipes-slider-img"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = `https://placehold.co/600x420/f5e6d3/c8885a?text=${encodeURIComponent(receta.nombre)}`;
                                    }}
                                />
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="recipes-slider-content">
                            <div className="recipes-slider-tags">
                                {receta.productos.map((tag) => (
                                    <span key={tag} className="receta-tag-pill">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="recipes-slider-title">{receta.nombre}</h3>
                            <p className="recipes-slider-desc">{receta.descripcionCorta}</p>
                            <div className="recipes-slider-times">
                                <span>⏱ Prep: <strong>{receta.tiempoPrep}</strong></span>
                                <span>🍳 Cocción: <strong>{receta.tiempoCoccion}</strong></span>
                            </div>
                            <button
                                onClick={() => { navigate('/recetas'); window.scrollTo(0, 0); }}
                                className="recipes-slider-cta"
                                aria-label="Ver todas las recetas"
                            >
                                Ver todas las recetas
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controles */}
                <button
                    onClick={prev}
                    className="recipes-slider-nav recipes-slider-nav--prev"
                    aria-label="Receta anterior"
                >
                    <ChevronLeft size={22} />
                </button>
                <button
                    onClick={next}
                    className="recipes-slider-nav recipes-slider-nav--next"
                    aria-label="Receta siguiente"
                >
                    <ChevronRight size={22} />
                </button>
            </div>

            {/* Dots */}
            <div className="recipes-slider-dots" role="tablist" aria-label="Recetas">
                {recetasData.map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === current}
                        aria-label={`Receta ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`recipes-slider-dot ${i === current ? 'recipes-slider-dot--active' : ''}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecipesSlider;

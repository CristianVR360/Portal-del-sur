import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ChefHat, Tag } from 'lucide-react';
import { products } from '../../data/products';

/**
 * RecetaModal — modal de detalle para una receta.
 * Props:
 *   receta: object | null  — receta activa (null = cerrado)
 *   onClose: () => void    — callback para cerrar
 */
const RecetaModal = ({ receta, onClose }) => {
    // Cerrar con ESC — sólo cuando hay receta activa
    useEffect(() => {
        if (!receta) return; // ← sin receta activa: no hacer nada

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // bloquear scroll del body sólo cuando el modal está abierto

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; // restaurar scroll al cerrar
        };
    }, [receta, onClose]); // depende de receta: sólo se activa cuando hay una abierta

    // Buscar productos relacionados por coincidencia de tags (nombre parcial)
    const productosRelacionados = receta
        ? products.filter((p) =>
            receta.productos.some(
                (tag) =>
                    p.name.toLowerCase().includes(tag.toLowerCase()) ||
                    p.category.toLowerCase().includes(tag.toLowerCase())
            )
        ).slice(0, 6)
        : [];

    return (
        <AnimatePresence>
            {receta && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="receta-modal-backdrop"
                        className="receta-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Panel */}
                    <motion.div
                        key="receta-modal-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label={receta.nombre}
                        className="receta-modal-panel"
                        initial={{ opacity: 0, scale: 0.93, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: 40 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="receta-modal-close-btn"
                            aria-label="Cerrar modal"
                        >
                            <X size={20} />
                        </button>

                        {/* Scroll interno */}
                        <div className="receta-modal-scroll scrollbar-hide">
                            {/* Hero imagen */}
                            <div className="receta-modal-hero">
                                <img
                                    src={`${import.meta.env.BASE_URL}${receta.imagen}`}
                                    alt={receta.nombre}
                                    className="receta-modal-hero-img"
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = `https://placehold.co/800x400/f5e6d3/c8885a?text=${encodeURIComponent(receta.nombre)}`;
                                    }}
                                />
                                <div className="receta-modal-hero-overlay" />
                                <h2 className="receta-modal-title">{receta.nombre}</h2>
                            </div>

                            {/* Cuerpo */}
                            <div className="receta-modal-body">
                                {/* Tiempos */}
                                <div className="receta-modal-times">
                                    <div className="receta-modal-time-item">
                                        <Clock size={16} className="receta-modal-time-icon" />
                                        <span className="receta-modal-time-label">Prep.</span>
                                        <span className="receta-modal-time-value">{receta.tiempoPrep}</span>
                                    </div>
                                    <div className="receta-modal-time-divider" />
                                    <div className="receta-modal-time-item">
                                        <ChefHat size={16} className="receta-modal-time-icon" />
                                        <span className="receta-modal-time-label">Cocción</span>
                                        <span className="receta-modal-time-value">{receta.tiempoCoccion}</span>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <p className="receta-modal-desc">{receta.descripcion}</p>

                                {/* Tags productos */}
                                <div className="receta-modal-tags">
                                    <Tag size={14} className="receta-modal-tag-icon" />
                                    {receta.productos.map((tag) => (
                                        <span key={tag} className="receta-tag-pill">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Grid: ingredientes + pasos */}
                                <div className="receta-modal-grid">
                                    {/* Ingredientes */}
                                    <div>
                                        <h3 className="receta-modal-section-title">🛒 Ingredientes</h3>
                                        <ul className="receta-ingredients-list">
                                            {receta.ingredientes.map((ing, i) => (
                                                <li key={i} className="receta-ingredient-item">
                                                    <span className="receta-ingredient-dot" />
                                                    {ing}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Pasos */}
                                    <div>
                                        <h3 className="receta-modal-section-title">👨‍🍳 Preparación</h3>
                                        <ol className="receta-steps-list">
                                            {receta.pasos.map((paso, i) => (
                                                <li key={i} className="receta-step-item">
                                                    <span className="receta-step-number">{i + 1}</span>
                                                    <span>{paso}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>

                                {/* Productos relacionados */}
                                {productosRelacionados.length > 0 && (
                                    <div className="receta-related">
                                        <h3 className="receta-modal-section-title">🏪 Productos relacionados</h3>
                                        <div className="receta-related-grid">
                                            {productosRelacionados.map((prod) => (
                                                <div key={prod.id} className="receta-related-card">
                                                    <img
                                                        src={`${import.meta.env.BASE_URL}${prod.image}`}
                                                        alt={prod.name}
                                                        className="receta-related-img"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.src = `https://placehold.co/120x120/f5e6d3/c8885a?text=Prod`;
                                                        }}
                                                    />
                                                    <p className="receta-related-name">{prod.name}</p>
                                                    <span className="receta-related-format">{prod.format}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default RecetaModal;

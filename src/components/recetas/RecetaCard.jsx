import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';

/**
 * RecetaCard — card clickeable de receta para el grid.
 * Props:
 *   receta: object
 *   onClick: () => void
 *   index: number (para animación stagger)
 */
const RecetaCard = ({ receta, onClick, index = 0 }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onClick={onClick}
            className="receta-card group"
            tabIndex={0}
            role="button"
            aria-label={`Ver receta: ${receta.nombre}`}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
        >
            {/* Imagen */}
            <div className="receta-card-img-wrapper">
                <img
                    src={`${import.meta.env.BASE_URL}${receta.imagen}`}
                    alt={receta.nombre}
                    className="receta-card-img"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = `https://placehold.co/400x260/f5e6d3/c8885a?text=${encodeURIComponent(receta.nombre)}`;
                    }}
                />
                <div className="receta-card-img-overlay" />
            </div>

            {/* Contenido */}
            <div className="receta-card-body">
                <h3 className="receta-card-title">{receta.nombre}</h3>
                <p className="receta-card-desc">{receta.descripcionCorta}</p>

                {/* Footer de la card */}
                <div className="receta-card-footer">
                    <div className="receta-card-time">
                        <Clock size={13} />
                        <span>{receta.tiempoPrep}</span>
                    </div>
                    <div className="receta-card-tags">
                        {receta.productos.slice(0, 3).map((tag) => (
                            <span key={tag} className="receta-tag-pill receta-tag-pill--sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Indicador hover */}
            <div className="receta-card-hover-bar" aria-hidden="true" />
        </motion.article>
    );
};

export default RecetaCard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import RecetaCard from '../components/recetas/RecetaCard';
import RecetaModal from '../components/recetas/RecetaModal';
import { recetasData } from '../data/recetasData';

/**
 * Página /recetas — grid de recetas con modal de detalle.
 * Completamente aislada del resto del proyecto.
 */
const Recetas = () => {
    const [recetaActiva, setRecetaActiva] = useState(null);

    return (
        <div className="recetas-page">
            {/* Hero de página */}
            <section className="recetas-hero">
                <div className="recetas-hero-bg" aria-hidden="true" />
                <motion.div
                    className="recetas-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="recetas-hero-eyebrow">
                        <UtensilsCrossed size={16} />
                        Cocina con Portal del Sur
                    </span>
                    <h1 className="recetas-hero-title">Recetas</h1>
                    <p className="recetas-hero-subtitle">
                        Descubre cómo sacarle el máximo provecho a nuestros productos.<br />
                        Recetas fáciles, caseras y llenas de sabor sureño.
                    </p>
                </motion.div>
            </section>

            {/* Grid de recetas */}
            <section className="recetas-grid-section">
                <div className="recetas-grid-container">
                    <div className="recetas-grid">
                        {recetasData.map((receta, index) => (
                            <RecetaCard
                                key={receta.id}
                                receta={receta}
                                index={index}
                                onClick={() => setRecetaActiva(receta)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <RecetaModal receta={recetaActiva} onClose={() => setRecetaActiva(null)} />
        </div>
    );
};

export default Recetas;

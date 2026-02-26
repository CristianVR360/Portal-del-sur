import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    Mail,
    Globe,
    BookOpen,
    Instagram,
    X,
    ExternalLink,
    ArrowLeft,
} from 'lucide-react';

const links = [
    {
        id: 'phone',
        label: 'Llámanos',
        subtitle: '+56 9 7446 9955',
        href: 'tel:+56974469955',
        icon: Phone,
        gradient: 'from-emerald-500 to-teal-600',
        hoverGlow: 'hover:shadow-emerald-500/30',
    },
    {
        id: 'email',
        label: 'Escríbenos',
        subtitle: 'info@portaldelsurltda.cl',
        href: 'mailto:info@portaldelsurltda.cl',
        icon: Mail,
        gradient: 'from-sky-500 to-blue-600',
        hoverGlow: 'hover:shadow-sky-500/30',
    },
    {
        id: 'website',
        label: 'Sitio Web',
        subtitle: 'www.portaldelsurltda.cl',
        href: 'https://www.portaldelsurltda.cl',
        icon: Globe,
        gradient: 'from-violet-500 to-purple-600',
        hoverGlow: 'hover:shadow-violet-500/30',
        external: true,
    },
    {
        id: 'catalog',
        label: 'Catálogo',
        subtitle: 'Descubre nuestros productos',
        href: 'https://www.portaldelsurltda.cl/catalogo',
        icon: BookOpen,
        gradient: 'from-amber-500 to-orange-600',
        hoverGlow: 'hover:shadow-amber-500/30',
        external: true,
    },
    {
        id: 'instagram',
        label: 'Instagram',
        subtitle: '@portaldelsur limitada',
        href: null, // opens modal
        icon: Instagram,
        gradient: 'from-pink-500 to-rose-600',
        hoverGlow: 'hover:shadow-pink-500/30',
        isInstagram: true,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
};

const Linktree = () => {
    const [showIgModal, setShowIgModal] = useState(false);

    const handleClick = (link) => {
        if (link.isInstagram) {
            setShowIgModal(true);
        } else if (link.href) {
            window.open(link.href, link.external ? '_blank' : '_self');
        }
    };

    return (
        <div className="linktree-page">
            {/* Animated Background */}
            <div className="linktree-bg">
                <div className="linktree-bg-orb linktree-bg-orb--1" />
                <div className="linktree-bg-orb linktree-bg-orb--2" />
                <div className="linktree-bg-orb linktree-bg-orb--3" />
            </div>

            <div className="linktree-container">
                {/* Back button */}
                <motion.a
                    href="/"
                    className="linktree-back-btn"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <ArrowLeft size={18} />
                    <span>Volver al sitio</span>
                </motion.a>

                {/* Avatar / Logo */}
                <motion.div
                    className="linktree-avatar"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}assets/logos/logo-blanco.svg`}
                        alt="Portal del Sur Logo"
                        className="linktree-avatar-img"
                    />
                </motion.div>

                {/* Title */}
                <motion.div
                    className="linktree-header"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <h1 className="linktree-title">Portal del Sur</h1>
                    <p className="linktree-subtitle">
                        El sabor auténtico de la Araucanía 🌿
                    </p>
                </motion.div>

                {/* Links */}
                <motion.div
                    className="linktree-links"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {links.map((link) => (
                        <motion.button
                            key={link.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleClick(link)}
                            className={`linktree-link-btn ${link.hoverGlow}`}
                            id={`linktree-${link.id}`}
                        >
                            {/* Icon container with gradient */}
                            <span className={`linktree-link-icon bg-gradient-to-br ${link.gradient}`}>
                                <link.icon size={20} strokeWidth={2.2} />
                            </span>

                            {/* Text */}
                            <span className="linktree-link-text">
                                <span className="linktree-link-label">{link.label}</span>
                                <span className="linktree-link-subtitle">{link.subtitle}</span>
                            </span>

                            {/* Arrow / external indicator */}
                            <ExternalLink size={16} className="linktree-link-arrow" />
                        </motion.button>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.p
                    className="linktree-footer-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    © {new Date().getFullYear()} Portal del Sur Ltda.
                </motion.p>
            </div>

            {/* Instagram Modal */}
            <AnimatePresence>
                {showIgModal && (
                    <>
                        <motion.div
                            className="linktree-modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowIgModal(false)}
                        />
                        <motion.div
                            className="linktree-modal"
                            initial={{ opacity: 0, scale: 0.85, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 40 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <button
                                className="linktree-modal-close"
                                onClick={() => setShowIgModal(false)}
                                aria-label="Cerrar"
                            >
                                <X size={20} />
                            </button>
                            <div className="linktree-modal-content">
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/ig.webp`}
                                    alt="Instagram @portaldelsur limitada"
                                    className="linktree-modal-img"
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Linktree;

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, X, Check, ArrowUpDown, Package } from 'lucide-react';
import { categories, products } from '../data/products';

// --- Custom Reusable Dropdown Component ---
const MultiSelectDropdown = ({ label, icon: Icon, options, selectedValues, onChange, color = "primary" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const themeColor = color === "accent" ? "text-accent border-accent" : "text-[#1B4332] border-[#1B4332]";
    const themeBg = color === "accent" ? "bg-accent text-[#1B4332]" : "bg-[#1B4332] text-white";

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-200 ${isOpen || selectedValues.length > 0
                    ? `${themeBg} shadow-lg ring-2 ring-offset-1 ring-[#1B4332]/20 border-transparent`
                    : `bg-white text-gray-700 border-gray-200 hover:border-[${color === 'primary' ? '#1B4332' : '#D4A373'}]`
                    }`}
            >
                {Icon && <Icon size={18} />}
                <span className="font-medium mr-1">{label}</span>
                {selectedValues.length > 0 && (
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                        {selectedValues.length}
                    </span>
                )}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden"
                    >
                        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-1">
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(option.id);
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => onChange(option.id)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${isSelected ? 'bg-[#1B4332]/5 text-[#1B4332] font-semibold' : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2 text-left">
                                            {/* Custom Checkbox UI */}
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#1B4332] border-[#1B4332]' : 'border-gray-300'}`}>
                                                {isSelected && <Check size={10} className="text-white" strokeWidth={4} />}
                                            </div>
                                            {option.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Catalog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('relevant'); // 'relevant', 'az', 'za'

    // Infer formats or "Pack Types" from data for the filter
    const formatOptions = [
        { id: 'bolsa', name: 'Bolsa' },
        { id: 'frasco', name: 'Frasco' },
    ];

    const handleCategoryChange = (id) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleFormatChange = (id) => {
        setSelectedFormats(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedFormats([]);
        setSearchQuery('');
        setSortBy('relevant');
    };

    const [isSticky, setIsSticky] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        // Pre-select category if passed via navigation state
        if (location.state?.category) {
            setSelectedCategories([location.state.category]);
            // Clear state so it doesn't persist on refresh/navigation
            window.history.replaceState({}, document.title);
        }

        const handleScroll = () => {
            // Adjust threshold based on header height
            setIsSticky(window.scrollY > 200);
            if (window.scrollY <= 200) setMobileFiltersOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.state]); // Added dependency on location.state

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            // 1. Category Filter
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

            // 2. Format/Pack Type Filter (Simple inference from name/desc)
            // Check if product name or desc contains 'bolsa' or 'frasco'
            const productText = (product.name + ' ' + product.description).toLowerCase();
            const matchesFormat = selectedFormats.length === 0 || selectedFormats.some(fmt => productText.includes(fmt));

            // 3. Search Filter
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesFormat && matchesSearch;
        });

        // 4. Sorting
        if (sortBy === 'az') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'za') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }
        // 'relevant' keeps default order (by id usually)

        return result;
    }, [selectedCategories, selectedFormats, searchQuery, sortBy]);

    return (
        <section id="catalogo" className="py-12 bg-[#F8F9FA] relative min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Title */}
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1B4332] mb-4">Catálogo de Productos</h2>
                    <p className="text-gray-500">Explora nuestros sabores filtrando según tus preferencias.</p>
                </div>

                {/* --- Toolbar Filter Section --- */}
                <div
                    className={`bg-white rounded-2xl shadow-soft border border-gray-100 mb-12 transition-all duration-300 z-30
                        ${isSticky
                            ? 'sticky top-16 md:top-20 py-3 px-4 shadow-xl translate-y-2 !rounded-xl'
                            : 'p-6 relative'
                        }`}
                >
                    <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">

                        {/* Search Bar - Prominent */}
                        <div className={`relative w-full group transition-all duration-300 ${isSticky ? 'lg:w-64' : 'lg:w-96'}`}>
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-gray-400 group-focus-within:text-[#D4A373] transition-colors" size={20} />
                            </span>
                            <input
                                type="text"
                                placeholder={isSticky ? "Buscar..." : "¿Qué estás buscando hoy?"}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`pl-11 pr-4 w-full rounded-xl bg-gray-50 border-gray-200 border group-focus-within:border-[#D4A373] group-focus-within:ring-4 group-focus-within:ring-[#D4A373]/10 transition-all focus:outline-none placeholder-gray-400 font-medium ${isSticky ? 'py-2 text-sm' : 'py-3'}`}
                            />
                        </div>

                        {/* Mobile Toggle Button (Only visible when sticky) */}
                        {isSticky && (
                            <button
                                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                className="flex lg:hidden items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors w-full sm:w-auto justify-center"
                            >
                                <Filter size={16} />
                                Filtros {mobileFiltersOpen ? <ChevronDown size={14} className="rotate-180 transition-transform" /> : <ChevronDown size={14} className="transition-transform" />}
                            </button>
                        )}

                        {/* Filters Group */}
                        <div className={`
                            flex-wrap items-center gap-3 w-full lg:w-auto transition-all duration-300
                            ${isSticky
                                ? `lg:flex ${mobileFiltersOpen ? 'flex flex-col sm:flex-row absolute top-full left-0 right-0 bg-white p-4 shadow-xl border-t border-gray-100 mt-2 rounded-b-xl' : 'hidden'}`
                                : 'flex'
                            }
                        `}>
                            <div className={`flex items-center gap-2 text-gray-400 mr-2 ${isSticky ? 'hidden' : ''}`}>
                                <Filter size={18} />
                                <span className="text-sm font-semibold uppercase tracking-wider hidden sm:block">Filtros</span>
                            </div>

                            <MultiSelectDropdown
                                label="Categoría"
                                icon={null}
                                options={categories}
                                selectedValues={selectedCategories}
                                onChange={handleCategoryChange}
                            />

                            <MultiSelectDropdown
                                label="Envase"
                                icon={Package}
                                options={formatOptions}
                                selectedValues={selectedFormats}
                                onChange={handleFormatChange}
                                color="accent"
                            />

                            {/* Sort Dropdown */}
                            <div className="relative group w-full sm:w-auto">
                                <div className={`flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors w-full sm:w-auto ${isSticky ? 'px-3 py-2' : 'px-5 py-3'}`}>
                                    <ArrowUpDown size={18} className="text-gray-500" />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-transparent outline-none text-gray-700 font-medium pr-6 cursor-pointer text-sm w-full"
                                    >
                                        <option value="relevant">Relevancia</option>
                                        <option value="az">Nombre (A-Z)</option>
                                        <option value="za">Nombre (Z-A)</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Tags (Pills) */}
                    <AnimatePresence>
                        {(selectedCategories.length > 0 || selectedFormats.length > 0) && !isSticky && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100"
                            >
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest py-1 mr-2 self-center">Activos:</span>

                                {/* Category Chips */}
                                {selectedCategories.map(id => {
                                    const cat = categories.find(c => c.id === id);
                                    return (
                                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1B4332]/10 text-[#1B4332] rounded-full text-sm font-semibold border border-[#1B4332]/10">
                                            {cat?.name}
                                            <button onClick={() => handleCategoryChange(id)} className="hover:text-red-500"><X size={14} /></button>
                                        </span>
                                    );
                                })}

                                {/* Format Chips */}
                                {selectedFormats.map(id => {
                                    const fmt = formatOptions.find(f => f.id === id);
                                    return (
                                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4A373]/20 text-[#9e764f] rounded-full text-sm font-semibold border border-[#D4A373]/20">
                                            {fmt?.name}
                                            <button onClick={() => handleFormatChange(id)} className="hover:text-red-500"><X size={14} /></button>
                                        </span>
                                    );
                                })}

                                <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-[#1B4332] underline ml-2 decoration-dotted">
                                    Borrar todo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center mb-6 text-sm text-gray-500 px-2">
                    <span>Mostrando <span className="font-bold text-[#1B4332]">{filteredProducts.length}</span> productos</span>
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100 flex flex-col h-full"
                            >
                                <div className="aspect-square overflow-hidden relative bg-gray-50 border-b border-gray-50">
                                    <div className="absolute inset-0 bg-white/50 group-hover:bg-transparent transition-colors duration-300"></div>
                                    <img
                                        src={`${import.meta.env.BASE_URL}${product.image}`}
                                        alt={product.name}
                                        loading="lazy"
                                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'bg-gray-100');
                                            e.target.parentNode.innerHTML = `<span class="text-gray-400 text-xs font-serif italic text-center px-4 w-full">Imagen no disponible<br/>${product.name}</span>`;
                                        }}
                                    />

                                    {/* Category Badge overlay */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/95 backdrop-blur shadow-sm text-[#1B4332] text-[10px] font-bold px-2 py-1 rounded border border-gray-100 uppercase tracking-wider">
                                            {categories.find(c => c.id === product.category)?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow relative">
                                    <div className="mb-auto">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="font-serif text-lg font-bold text-[#1B4332] leading-tight">{product.name}</h3>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-4">{product.description}</p>
                                    </div>

                                    <div className="space-y-3 mt-4">
                                        {product.format && (
                                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                                                <Package size={14} className="text-[#D4A373]" />
                                                {product.format}
                                            </div>
                                        )}

                                        <button className="w-full bg-[#1B4332] hover:bg-[#153426] text-white font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#1B4332]/20 hover:shadow-[#1B4332]/40 active:scale-95">
                                            Consultar
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="bg-[#FFF8F3] p-6 rounded-full inline-block mb-4">
                            <Search size={40} className="text-[#D4A373]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1B4332] mb-2">Sin resultados</h3>
                        <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                        >
                            Limpiar todo
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Catalog;
